import { sql } from "./database"

export interface ComplianceEvent {
  id: string
  userId: string
  eventType: "access" | "modify" | "delete" | "export" | "consent" | "breach"
  dataType: "phi" | "pii" | "sensitive" | "public"
  description: string
  ipAddress: string
  userAgent: string
  timestamp: Date
  metadata: Record<string, any>
}

export interface ConsentRecord {
  userId: string
  consentType: "data_processing" | "marketing" | "analytics" | "third_party" | "medical_data"
  granted: boolean
  timestamp: Date
  version: string
  ipAddress: string
  withdrawnAt?: Date
}

export interface DataSubjectRequest {
  id: string
  userId: string
  requestType: "access" | "rectification" | "erasure" | "portability" | "restriction" | "objection"
  status: "pending" | "processing" | "completed" | "rejected"
  requestedAt: Date
  completedAt?: Date
  requestData: Record<string, any>
  responseData?: Record<string, any>
}

export class ComplianceEngine {
  private static instance: ComplianceEngine
  private auditBuffer: ComplianceEvent[] = []

  static getInstance(): ComplianceEngine {
    if (!ComplianceEngine.instance) {
      ComplianceEngine.instance = new ComplianceEngine()
    }
    return ComplianceEngine.instance
  }

  // HIPAA/GDPR Audit Logging
  async logComplianceEvent(event: Omit<ComplianceEvent, "id" | "timestamp">): Promise<void> {
    const complianceEvent: ComplianceEvent = {
      ...event,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }

    // Buffer events for batch processing
    this.auditBuffer.push(complianceEvent)

    // Flush buffer if it gets too large
    if (this.auditBuffer.length >= 100) {
      await this.flushAuditBuffer()
    }

    // Immediate logging for critical events
    if (event.eventType === "breach" || event.dataType === "phi") {
      await this.persistAuditEvent(complianceEvent)
    }
  }

  private async flushAuditBuffer(): Promise<void> {
    if (this.auditBuffer.length === 0) return

    const events = [...this.auditBuffer]
    this.auditBuffer = []

    try {
      await sql`
        INSERT INTO compliance_audit_log (
          id, user_id, event_type, data_type, description, 
          ip_address, user_agent, timestamp, metadata
        )
        SELECT * FROM ${sql(
          events.map((event) => [
            event.id,
            event.userId,
            event.eventType,
            event.dataType,
            event.description,
            event.ipAddress,
            event.userAgent,
            event.timestamp,
            JSON.stringify(event.metadata),
          ]),
        )}
      `
    } catch (error) {
      console.error("[ComplianceEngine] Failed to flush audit buffer:", error)
      // Re-add events to buffer for retry
      this.auditBuffer.unshift(...events)
    }
  }

  private async persistAuditEvent(event: ComplianceEvent): Promise<void> {
    await sql`
      INSERT INTO compliance_audit_log (
        id, user_id, event_type, data_type, description,
        ip_address, user_agent, timestamp, metadata
      ) VALUES (
        ${event.id}, ${event.userId}, ${event.eventType}, ${event.dataType},
        ${event.description}, ${event.ipAddress}, ${event.userAgent},
        ${event.timestamp}, ${JSON.stringify(event.metadata)}
      )
    `
  }

  // Consent Management (GDPR Article 7)
  async recordConsent(consent: ConsentRecord): Promise<void> {
    await sql`
      INSERT INTO user_consent (
        user_id, consent_type, granted, timestamp, version, ip_address
      ) VALUES (
        ${consent.userId}, ${consent.consentType}, ${consent.granted},
        ${consent.timestamp}, ${consent.version}, ${consent.ipAddress}
      )
      ON CONFLICT (user_id, consent_type) 
      DO UPDATE SET 
        granted = ${consent.granted},
        timestamp = ${consent.timestamp},
        version = ${consent.version},
        ip_address = ${consent.ipAddress},
        withdrawn_at = ${consent.withdrawnAt || null}
    `

    await this.logComplianceEvent({
      userId: consent.userId,
      eventType: "consent",
      dataType: "pii",
      description: `Consent ${consent.granted ? "granted" : "withdrawn"} for ${consent.consentType}`,
      ipAddress: consent.ipAddress,
      userAgent: "system",
      metadata: { consentType: consent.consentType, version: consent.version },
    })
  }

  async getConsentStatus(userId: string): Promise<Record<string, ConsentRecord>> {
    const consents = await sql`
      SELECT * FROM user_consent 
      WHERE user_id = ${userId} 
      ORDER BY timestamp DESC
    `

    return consents.reduce(
      (acc, consent) => {
        acc[consent.consent_type] = {
          userId: consent.user_id,
          consentType: consent.consent_type,
          granted: consent.granted,
          timestamp: consent.timestamp,
          version: consent.version,
          ipAddress: consent.ip_address,
          withdrawnAt: consent.withdrawn_at,
        }
        return acc
      },
      {} as Record<string, ConsentRecord>,
    )
  }

  // Data Subject Rights (GDPR Articles 15-22)
  async createDataSubjectRequest(request: Omit<DataSubjectRequest, "id" | "status" | "requestedAt">): Promise<string> {
    const requestId = crypto.randomUUID()

    await sql`
      INSERT INTO data_subject_requests (
        id, user_id, request_type, status, requested_at, request_data
      ) VALUES (
        ${requestId}, ${request.userId}, ${request.requestType}, 'pending',
        NOW(), ${JSON.stringify(request.requestData)}
      )
    `

    await this.logComplianceEvent({
      userId: request.userId,
      eventType: "access",
      dataType: "pii",
      description: `Data subject request created: ${request.requestType}`,
      ipAddress: request.requestData.ipAddress || "unknown",
      userAgent: request.requestData.userAgent || "unknown",
      metadata: { requestId, requestType: request.requestType },
    })

    // Auto-process certain request types
    if (request.requestType === "access") {
      await this.processDataAccessRequest(requestId)
    }

    return requestId
  }

  private async processDataAccessRequest(requestId: string): Promise<void> {
    const request = await sql`
      SELECT * FROM data_subject_requests WHERE id = ${requestId}
    `

    if (request.length === 0) return

    const userId = request[0].user_id

    // Gather all user data across tables
    const userData = await this.gatherUserData(userId)

    await sql`
      UPDATE data_subject_requests 
      SET status = 'completed', completed_at = NOW(), response_data = ${JSON.stringify(userData)}
      WHERE id = ${requestId}
    `

    await this.logComplianceEvent({
      userId,
      eventType: "export",
      dataType: "pii",
      description: "Data access request completed",
      ipAddress: "system",
      userAgent: "system",
      metadata: { requestId, dataSize: JSON.stringify(userData).length },
    })
  }

  private async gatherUserData(userId: string): Promise<Record<string, any>> {
    const [user, healthMetrics, transformationPhotos, moodEntries, workoutEntries] = await Promise.all([
      sql`SELECT * FROM users WHERE id = ${userId}`,
      sql`SELECT * FROM health_metrics WHERE user_id = ${userId}`,
      sql`SELECT * FROM transformation_photos WHERE user_id = ${userId}`,
      sql`SELECT * FROM mood_entries WHERE user_id = ${userId}`,
      sql`SELECT * FROM workout_entries WHERE user_id = ${userId}`,
    ])

    return {
      profile: user[0] || {},
      healthMetrics: healthMetrics || [],
      transformationPhotos: transformationPhotos || [],
      moodEntries: moodEntries || [],
      workoutEntries: workoutEntries || [],
      exportedAt: new Date().toISOString(),
    }
  }

  // Data Retention & Deletion
  async processDataRetention(): Promise<void> {
    const retentionPolicies = [
      { dataType: "audit_logs", retentionDays: 2555 }, // 7 years for HIPAA
      { dataType: "health_metrics", retentionDays: 2555 }, // 7 years for HIPAA
      { dataType: "user_sessions", retentionDays: 90 },
      { dataType: "analytics_events", retentionDays: 1095 }, // 3 years
    ]

    for (const policy of retentionPolicies) {
      await this.deleteExpiredData(policy.dataType, policy.retentionDays)
    }
  }

  private async deleteExpiredData(dataType: string, retentionDays: number): Promise<void> {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays)

    let deletedCount = 0

    switch (dataType) {
      case "audit_logs":
        const auditResult = await sql`
          DELETE FROM compliance_audit_log 
          WHERE timestamp < ${cutoffDate}
        `
        deletedCount = auditResult.count
        break

      case "user_sessions":
        const sessionResult = await sql`
          DELETE FROM user_sessions 
          WHERE created_at < ${cutoffDate}
        `
        deletedCount = sessionResult.count
        break

      case "analytics_events":
        const analyticsResult = await sql`
          DELETE FROM analytics_events 
          WHERE timestamp < ${cutoffDate}
        `
        deletedCount = analyticsResult.count
        break
    }

    if (deletedCount > 0) {
      await this.logComplianceEvent({
        userId: "system",
        eventType: "delete",
        dataType: "sensitive",
        description: `Automated data retention: deleted ${deletedCount} ${dataType} records`,
        ipAddress: "system",
        userAgent: "retention-service",
        metadata: { dataType, retentionDays, deletedCount },
      })
    }
  }

  // Data Breach Detection & Response
  async detectDataBreach(event: {
    type: "unauthorized_access" | "data_leak" | "system_compromise" | "insider_threat"
    severity: "low" | "medium" | "high" | "critical"
    affectedUsers: string[]
    description: string
    metadata: Record<string, any>
  }): Promise<void> {
    const breachId = crypto.randomUUID()

    await sql`
      INSERT INTO data_breaches (
        id, breach_type, severity, affected_users, description, 
        detected_at, status, metadata
      ) VALUES (
        ${breachId}, ${event.type}, ${event.severity}, 
        ${JSON.stringify(event.affectedUsers)}, ${event.description},
        NOW(), 'detected', ${JSON.stringify(event.metadata)}
      )
    `

    // Log breach event for each affected user
    for (const userId of event.affectedUsers) {
      await this.logComplianceEvent({
        userId,
        eventType: "breach",
        dataType: "phi",
        description: `Data breach detected: ${event.description}`,
        ipAddress: "system",
        userAgent: "breach-detection",
        metadata: { breachId, breachType: event.type, severity: event.severity },
      })
    }

    // Trigger breach response procedures
    await this.initiateBreachResponse(breachId, event)
  }

  private async initiateBreachResponse(
    breachId: string,
    event: {
      type: string
      severity: string
      affectedUsers: string[]
      description: string
    },
  ): Promise<void> {
    // HIPAA requires notification within 60 days, GDPR within 72 hours
    const notificationDeadline = event.severity === "critical" ? 72 : 1440 // hours

    await sql`
      INSERT INTO breach_response_tasks (
        breach_id, task_type, status, deadline, created_at
      ) VALUES 
        (${breachId}, 'assess_impact', 'pending', NOW() + INTERVAL '4 hours', NOW()),
        (${breachId}, 'contain_breach', 'pending', NOW() + INTERVAL '8 hours', NOW()),
        (${breachId}, 'notify_authorities', 'pending', NOW() + INTERVAL '${notificationDeadline} hours', NOW()),
        (${breachId}, 'notify_users', 'pending', NOW() + INTERVAL '${notificationDeadline * 2} hours', NOW())
    `

    // Send immediate alerts to security team
    console.error(`[SECURITY BREACH] ${event.type} - ${event.severity} - ${event.affectedUsers.length} users affected`)
  }

  // Privacy Impact Assessment (DPIA)
  async conductPrivacyImpactAssessment(assessment: {
    projectName: string
    dataTypes: string[]
    processingPurpose: string
    legalBasis: string
    riskLevel: "low" | "medium" | "high"
    mitigationMeasures: string[]
  }): Promise<string> {
    const dpiaId = crypto.randomUUID()

    await sql`
      INSERT INTO privacy_impact_assessments (
        id, project_name, data_types, processing_purpose, legal_basis,
        risk_level, mitigation_measures, conducted_at, status
      ) VALUES (
        ${dpiaId}, ${assessment.projectName}, ${JSON.stringify(assessment.dataTypes)},
        ${assessment.processingPurpose}, ${assessment.legalBasis}, ${assessment.riskLevel},
        ${JSON.stringify(assessment.mitigationMeasures)}, NOW(), 'completed'
      )
    `

    return dpiaId
  }

  // Compliance Monitoring & Reporting
  async generateComplianceReport(timeframe: "daily" | "weekly" | "monthly" | "quarterly"): Promise<any> {
    const startDate = this.getReportStartDate(timeframe)

    const [auditStats, consentStats, breachStats, requestStats] = await Promise.all([
      this.getAuditStatistics(startDate),
      this.getConsentStatistics(startDate),
      this.getBreachStatistics(startDate),
      this.getDataSubjectRequestStats(startDate),
    ])

    return {
      timeframe,
      reportDate: new Date().toISOString(),
      auditStatistics: auditStats,
      consentManagement: consentStats,
      dataBreaches: breachStats,
      dataSubjectRequests: requestStats,
      complianceScore: this.calculateComplianceScore(auditStats, consentStats, breachStats),
    }
  }

  private getReportStartDate(timeframe: string): Date {
    const date = new Date()
    switch (timeframe) {
      case "daily":
        date.setDate(date.getDate() - 1)
        break
      case "weekly":
        date.setDate(date.getDate() - 7)
        break
      case "monthly":
        date.setMonth(date.getMonth() - 1)
        break
      case "quarterly":
        date.setMonth(date.getMonth() - 3)
        break
    }
    return date
  }

  private async getAuditStatistics(startDate: Date) {
    const stats = await sql`
      SELECT 
        event_type,
        data_type,
        COUNT(*) as count
      FROM compliance_audit_log 
      WHERE timestamp >= ${startDate}
      GROUP BY event_type, data_type
    `

    return stats.reduce(
      (acc, stat) => {
        if (!acc[stat.event_type]) acc[stat.event_type] = {}
        acc[stat.event_type][stat.data_type] = Number.parseInt(stat.count)
        return acc
      },
      {} as Record<string, Record<string, number>>,
    )
  }

  private async getConsentStatistics(startDate: Date) {
    const stats = await sql`
      SELECT 
        consent_type,
        granted,
        COUNT(*) as count
      FROM user_consent 
      WHERE timestamp >= ${startDate}
      GROUP BY consent_type, granted
    `

    return stats.reduce(
      (acc, stat) => {
        if (!acc[stat.consent_type]) acc[stat.consent_type] = { granted: 0, withdrawn: 0 }
        acc[stat.consent_type][stat.granted ? "granted" : "withdrawn"] = Number.parseInt(stat.count)
        return acc
      },
      {} as Record<string, { granted: number; withdrawn: number }>,
    )
  }

  private async getBreachStatistics(startDate: Date) {
    const breaches = await sql`
      SELECT severity, COUNT(*) as count
      FROM data_breaches 
      WHERE detected_at >= ${startDate}
      GROUP BY severity
    `

    return breaches.reduce(
      (acc, breach) => {
        acc[breach.severity] = Number.parseInt(breach.count)
        return acc
      },
      {} as Record<string, number>,
    )
  }

  private async getDataSubjectRequestStats(startDate: Date) {
    const requests = await sql`
      SELECT request_type, status, COUNT(*) as count
      FROM data_subject_requests 
      WHERE requested_at >= ${startDate}
      GROUP BY request_type, status
    `

    return requests.reduce(
      (acc, req) => {
        if (!acc[req.request_type]) acc[req.request_type] = {}
        acc[req.request_type][req.status] = Number.parseInt(req.count)
        return acc
      },
      {} as Record<string, Record<string, number>>,
    )
  }

  private calculateComplianceScore(auditStats: any, consentStats: any, breachStats: any): number {
    let score = 100

    // Deduct points for breaches
    const totalBreaches = Object.values(breachStats).reduce((sum: number, count) => sum + (count as number), 0)
    score -= totalBreaches * 10

    // Deduct points for consent withdrawals
    const totalWithdrawals = Object.values(consentStats).reduce(
      (sum: number, consent: any) => sum + (consent.withdrawn || 0),
      0,
    )
    score -= totalWithdrawals * 2

    return Math.max(0, Math.min(100, score))
  }
}

export const complianceEngine = ComplianceEngine.getInstance()
