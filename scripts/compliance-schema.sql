-- HIPAA/GDPR Compliance Database Schema

-- Comprehensive audit logging for HIPAA compliance
CREATE TABLE IF NOT EXISTS compliance_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('access', 'modify', 'delete', 'export', 'consent', 'breach')),
    data_type VARCHAR(50) NOT NULL CHECK (data_type IN ('phi', 'pii', 'sensitive', 'public')),
    description TEXT NOT NULL,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}',
    
    -- Indexes for performance
    INDEX idx_audit_user_id (user_id),
    INDEX idx_audit_timestamp (timestamp),
    INDEX idx_audit_event_type (event_type),
    INDEX idx_audit_data_type (data_type)
);

-- GDPR Consent Management
CREATE TABLE IF NOT EXISTS user_consent (
    user_id UUID NOT NULL,
    consent_type VARCHAR(100) NOT NULL CHECK (consent_type IN ('data_processing', 'marketing', 'analytics', 'third_party', 'medical_data')),
    granted BOOLEAN NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version VARCHAR(20) NOT NULL,
    ip_address INET,
    withdrawn_at TIMESTAMP WITH TIME ZONE,
    
    PRIMARY KEY (user_id, consent_type),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_consent_user_id (user_id),
    INDEX idx_consent_type (consent_type),
    INDEX idx_consent_timestamp (timestamp)
);

-- GDPR Data Subject Requests (Articles 15-22)
CREATE TABLE IF NOT EXISTS data_subject_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    request_type VARCHAR(50) NOT NULL CHECK (request_type IN ('access', 'rectification', 'erasure', 'portability', 'restriction', 'objection')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    request_data JSONB NOT NULL DEFAULT '{}',
    response_data JSONB,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    
    INDEX idx_dsr_user_id (user_id),
    INDEX idx_dsr_status (status),
    INDEX idx_dsr_type (request_type),
    INDEX idx_dsr_requested_at (requested_at)
);

-- Data Breach Management
CREATE TABLE IF NOT EXISTS data_breaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    breach_type VARCHAR(50) NOT NULL CHECK (breach_type IN ('unauthorized_access', 'data_leak', 'system_compromise', 'insider_threat')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    affected_users JSONB NOT NULL DEFAULT '[]',
    description TEXT NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contained_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'contained', 'investigating', 'resolved')),
    metadata JSONB DEFAULT '{}',
    
    INDEX idx_breach_severity (severity),
    INDEX idx_breach_detected_at (detected_at),
    INDEX idx_breach_status (status)
);

-- Breach Response Task Management
CREATE TABLE IF NOT EXISTS breach_response_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    breach_id UUID NOT NULL,
    task_type VARCHAR(50) NOT NULL CHECK (task_type IN ('assess_impact', 'contain_breach', 'notify_authorities', 'notify_users', 'investigate', 'remediate')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
    assigned_to UUID,
    deadline TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    
    FOREIGN KEY (breach_id) REFERENCES data_breaches(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_breach_tasks_breach_id (breach_id),
    INDEX idx_breach_tasks_status (status),
    INDEX idx_breach_tasks_deadline (deadline)
);

-- Privacy Impact Assessments (GDPR Article 35)
CREATE TABLE IF NOT EXISTS privacy_impact_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255) NOT NULL,
    data_types JSONB NOT NULL DEFAULT '[]',
    processing_purpose TEXT NOT NULL,
    legal_basis VARCHAR(100) NOT NULL,
    risk_level VARCHAR(20) NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
    mitigation_measures JSONB NOT NULL DEFAULT '[]',
    conducted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conducted_by UUID,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'completed', 'archived')),
    
    FOREIGN KEY (conducted_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_dpia_status (status),
    INDEX idx_dpia_risk_level (risk_level),
    INDEX idx_dpia_conducted_at (conducted_at)
);

-- Data Processing Records (GDPR Article 30)
CREATE TABLE IF NOT EXISTS data_processing_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    processing_activity VARCHAR(255) NOT NULL,
    controller_name VARCHAR(255) NOT NULL,
    controller_contact VARCHAR(255),
    dpo_contact VARCHAR(255),
    processing_purposes TEXT NOT NULL,
    data_categories JSONB NOT NULL DEFAULT '[]',
    data_subjects JSONB NOT NULL DEFAULT '[]',
    recipients JSONB NOT NULL DEFAULT '[]',
    third_country_transfers JSONB DEFAULT '[]',
    retention_schedule TEXT,
    security_measures TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_processing_activity (processing_activity),
    INDEX idx_processing_created_at (created_at)
);

-- Business Associate Agreements (HIPAA)
CREATE TABLE IF NOT EXISTS business_associate_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_name VARCHAR(255) NOT NULL,
    vendor_contact VARCHAR(255),
    agreement_type VARCHAR(50) NOT NULL CHECK (agreement_type IN ('baa', 'dpa', 'vendor_agreement')),
    signed_date DATE NOT NULL,
    expiry_date DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'terminated', 'pending')),
    covered_services TEXT NOT NULL,
    phi_access_level VARCHAR(50) NOT NULL CHECK (phi_access_level IN ('none', 'limited', 'full')),
    security_requirements JSONB DEFAULT '{}',
    compliance_certifications JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    INDEX idx_baa_vendor_name (vendor_name),
    INDEX idx_baa_status (status),
    INDEX idx_baa_expiry_date (expiry_date)
);

-- Data Classification and Labeling
CREATE TABLE IF NOT EXISTS data_classification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(255) NOT NULL,
    column_name VARCHAR(255) NOT NULL,
    classification VARCHAR(50) NOT NULL CHECK (classification IN ('public', 'internal', 'confidential', 'restricted', 'phi', 'pii')),
    sensitivity_level INTEGER NOT NULL CHECK (sensitivity_level BETWEEN 1 AND 5),
    retention_period_days INTEGER,
    encryption_required BOOLEAN DEFAULT FALSE,
    access_restrictions JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE (table_name, column_name),
    INDEX idx_data_class_table (table_name),
    INDEX idx_data_class_classification (classification),
    INDEX idx_data_class_sensitivity (sensitivity_level)
);

-- Compliance Monitoring and Alerts
CREATE TABLE IF NOT EXISTS compliance_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    alert_type VARCHAR(50) NOT NULL CHECK (alert_type IN ('consent_expiry', 'data_retention', 'access_violation', 'breach_risk', 'audit_required')),
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    affected_users JSONB DEFAULT '[]',
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    acknowledged_by UUID,
    resolved_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
    metadata JSONB DEFAULT '{}',
    
    FOREIGN KEY (acknowledged_by) REFERENCES users(id) ON DELETE SET NULL,
    
    INDEX idx_alerts_type (alert_type),
    INDEX idx_alerts_severity (severity),
    INDEX idx_alerts_status (status),
    INDEX idx_alerts_triggered_at (triggered_at)
);

-- Add compliance tracking to existing tables
ALTER TABLE users ADD COLUMN IF NOT EXISTS data_processing_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS analytics_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS consent_version VARCHAR(20) DEFAULT '1.0';
ALTER TABLE users ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMP WITH TIME ZONE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gdpr_compliant BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS hipaa_compliant BOOLEAN DEFAULT FALSE;

-- Add data classification to health metrics
ALTER TABLE health_metrics ADD COLUMN IF NOT EXISTS data_classification VARCHAR(50) DEFAULT 'phi';
ALTER TABLE health_metrics ADD COLUMN IF NOT EXISTS encrypted_data BOOLEAN DEFAULT TRUE;

-- Add audit trail to transformation photos
ALTER TABLE transformation_photos ADD COLUMN IF NOT EXISTS access_log JSONB DEFAULT '[]';
ALTER TABLE transformation_photos ADD COLUMN IF NOT EXISTS data_classification VARCHAR(50) DEFAULT 'phi';

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_consent_timestamp ON users(consent_timestamp);
CREATE INDEX IF NOT EXISTS idx_users_gdpr_compliant ON users(gdpr_compliant);
CREATE INDEX IF NOT EXISTS idx_users_hipaa_compliant ON users(hipaa_compliant);

-- Create compliance views for reporting
CREATE OR REPLACE VIEW compliance_dashboard AS
SELECT 
    'audit_events' as metric,
    COUNT(*) as value,
    'last_24h' as period
FROM compliance_audit_log 
WHERE timestamp >= NOW() - INTERVAL '24 hours'

UNION ALL

SELECT 
    'active_consents' as metric,
    COUNT(*) as value,
    'current' as period
FROM user_consent 
WHERE granted = TRUE AND withdrawn_at IS NULL

UNION ALL

SELECT 
    'pending_dsr' as metric,
    COUNT(*) as value,
    'current' as period
FROM data_subject_requests 
WHERE status IN ('pending', 'processing')

UNION ALL

SELECT 
    'active_breaches' as metric,
    COUNT(*) as value,
    'current' as period
FROM data_breaches 
WHERE status NOT IN ('resolved');

-- Compliance reporting function
CREATE OR REPLACE FUNCTION generate_compliance_report(report_period TEXT DEFAULT 'monthly')
RETURNS TABLE (
    report_date TIMESTAMP WITH TIME ZONE,
    total_audit_events BIGINT,
    phi_access_events BIGINT,
    consent_granted BIGINT,
    consent_withdrawn BIGINT,
    data_subject_requests BIGINT,
    active_breaches BIGINT,
    compliance_score NUMERIC
) AS $$
DECLARE
    start_date TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Calculate start date based on period
    CASE report_period
        WHEN 'daily' THEN start_date := NOW() - INTERVAL '1 day';
        WHEN 'weekly' THEN start_date := NOW() - INTERVAL '1 week';
        WHEN 'monthly' THEN start_date := NOW() - INTERVAL '1 month';
        WHEN 'quarterly' THEN start_date := NOW() - INTERVAL '3 months';
        ELSE start_date := NOW() - INTERVAL '1 month';
    END CASE;

    RETURN QUERY
    SELECT 
        NOW() as report_date,
        (SELECT COUNT(*) FROM compliance_audit_log WHERE timestamp >= start_date) as total_audit_events,
        (SELECT COUNT(*) FROM compliance_audit_log WHERE timestamp >= start_date AND data_type = 'phi') as phi_access_events,
        (SELECT COUNT(*) FROM user_consent WHERE timestamp >= start_date AND granted = TRUE) as consent_granted,
        (SELECT COUNT(*) FROM user_consent WHERE timestamp >= start_date AND granted = FALSE) as consent_withdrawn,
        (SELECT COUNT(*) FROM data_subject_requests WHERE requested_at >= start_date) as data_subject_requests,
        (SELECT COUNT(*) FROM data_breaches WHERE detected_at >= start_date AND status != 'resolved') as active_breaches,
        -- Simple compliance score calculation
        GREATEST(0, 100 - 
            (SELECT COUNT(*) FROM data_breaches WHERE detected_at >= start_date) * 10 -
            (SELECT COUNT(*) FROM user_consent WHERE timestamp >= start_date AND granted = FALSE) * 2
        ) as compliance_score;
END;
$$ LANGUAGE plpgsql;
