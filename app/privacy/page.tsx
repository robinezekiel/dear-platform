"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Shield, Eye, Download, Trash2, Edit, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function PrivacyPolicyPage() {
  const [consentStatus, setConsentStatus] = useState({
    dataProcessing: true,
    marketing: false,
    analytics: true,
    thirdParty: false,
    medicalData: true,
  })

  const handleConsentChange = (consentType: string, granted: boolean) => {
    setConsentStatus((prev) => ({
      ...prev,
      [consentType]: granted,
    }))
    // TODO: Call API to update consent
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Privacy & Data Protection</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our priority. We are committed to protecting your personal health information in compliance
            with HIPAA, GDPR, and other applicable privacy regulations.
          </p>
        </div>

        <Tabs defaultValue="policy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="policy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="consent">Consent Management</TabsTrigger>
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="policy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>DEAR Privacy Policy</CardTitle>
                <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">1. Information We Collect</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong>Health Information (PHI):</strong> We collect protected health information including
                      biometric data, health metrics, transformation photos, mood entries, and workout data to provide
                      personalized health insights.
                    </p>
                    <p>
                      <strong>Personal Information:</strong> Name, email address, date of birth, and contact information
                      for account management and communication.
                    </p>
                    <p>
                      <strong>Technical Information:</strong> Device information, IP address, browser type, and usage
                      analytics to improve our services.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">2. How We Use Your Information</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Provide AI-powered health analysis and personalized recommendations</p>
                    <p>• Connect you with healthcare providers and community members</p>
                    <p>• Improve our services through anonymized analytics</p>
                    <p>• Ensure platform security and prevent fraud</p>
                    <p>• Comply with legal obligations and regulatory requirements</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">3. Data Sharing and Disclosure</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      We do not sell your personal health information. We may share your information only in the
                      following circumstances:
                    </p>
                    <p>• With your explicit consent</p>
                    <p>• With healthcare providers you choose to connect with</p>
                    <p>• With service providers under strict data processing agreements</p>
                    <p>• When required by law or to protect safety</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">4. Data Security</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      We implement industry-standard security measures including AES-256 encryption, secure data
                      transmission, access controls, and regular security audits to protect your information.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">5. Data Retention</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      We retain your health information for 7 years as required by HIPAA regulations. Other personal
                      data is retained only as long as necessary to provide our services or as required by law.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">6. International Transfers</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      Your data may be processed in countries outside your residence. We ensure adequate protection
                      through standard contractual clauses and other appropriate safeguards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Your Consent</CardTitle>
                <CardDescription>
                  Control how your data is used. You can withdraw consent at any time without affecting the lawfulness
                  of processing based on consent before its withdrawal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Essential Data Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Required for core platform functionality and health analysis
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Required</Badge>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Marketing Communications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and health tips
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={consentStatus.marketing ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConsentChange("marketing", !consentStatus.marketing)}
                      >
                        {consentStatus.marketing ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Analytics & Improvements</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us improve the platform through anonymized usage analytics
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={consentStatus.analytics ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConsentChange("analytics", !consentStatus.analytics)}
                      >
                        {consentStatus.analytics ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium">Third-Party Integrations</h4>
                      <p className="text-sm text-muted-foreground">
                        Share data with connected healthcare providers and services
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={consentStatus.thirdParty ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConsentChange("thirdParty", !consentStatus.thirdParty)}
                      >
                        {consentStatus.thirdParty ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">Important Notice</h4>
                      <p className="text-xs text-muted-foreground">
                        Changes to your consent preferences may affect the functionality of certain features. Essential
                        data processing cannot be disabled as it's required for core platform operation.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Data Rights</CardTitle>
                <CardDescription>
                  Under GDPR and other privacy laws, you have specific rights regarding your personal data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-0 bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Eye className="h-5 w-5 text-primary mt-1" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Right to Access</h4>
                          <p className="text-sm text-muted-foreground">
                            Request a copy of all personal data we hold about you
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="h-4 w-4 mr-2" />
                            Request Data Export
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Edit className="h-5 w-5 text-primary mt-1" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Right to Rectification</h4>
                          <p className="text-sm text-muted-foreground">
                            Correct any inaccurate or incomplete personal data
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Request Correction
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Trash2 className="h-5 w-5 text-destructive mt-1" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Right to Erasure</h4>
                          <p className="text-sm text-muted-foreground">
                            Request deletion of your personal data (subject to legal requirements)
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Request Deletion
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Download className="h-5 w-5 text-primary mt-1" />
                        <div className="space-y-2">
                          <h4 className="font-medium">Right to Portability</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive your data in a structured, machine-readable format
                          </p>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            Export Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">How to Exercise Your Rights</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      To exercise any of these rights, please contact our Data Protection Officer at{" "}
                      <a href="mailto:privacy@dear.com" className="text-primary hover:underline">
                        privacy@dear.com
                      </a>
                    </p>
                    <p>
                      We will respond to your request within 30 days. In some cases, we may need to verify your identity
                      before processing your request.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-medium text-blue-900">Processing Times</h4>
                      <p className="text-sm text-blue-700">
                        • Data access requests: Up to 30 days
                        <br />• Data correction requests: Up to 30 days
                        <br />• Data deletion requests: Up to 30 days (subject to legal retention requirements)
                        <br />• Data portability requests: Up to 30 days
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Measures</CardTitle>
                <CardDescription>
                  We implement comprehensive security measures to protect your health information and personal data.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Technical Safeguards</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">AES-256 encryption at rest</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">TLS 1.3 encryption in transit</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Multi-factor authentication</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Regular security audits</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Intrusion detection systems</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Administrative Safeguards</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Role-based access controls</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Employee security training</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Incident response procedures</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Business associate agreements</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">Regular compliance monitoring</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Compliance Certifications</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="border-0 bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-medium">HIPAA Compliant</h4>
                        <p className="text-xs text-muted-foreground">
                          Health Insurance Portability and Accountability Act
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-medium">GDPR Compliant</h4>
                        <p className="text-xs text-muted-foreground">General Data Protection Regulation</p>
                      </CardContent>
                    </Card>
                    <Card className="border-0 bg-muted/50">
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                        <h4 className="font-medium">SOC 2 Type II</h4>
                        <p className="text-xs text-muted-foreground">Security, Availability, and Confidentiality</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div className="space-y-1">
                      <h4 className="font-medium text-green-900">Security Commitment</h4>
                      <p className="text-sm text-green-700">
                        We continuously monitor and improve our security measures to protect your sensitive health
                        information. Our security team conducts regular assessments and implements the latest security
                        technologies and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Questions about privacy or data protection?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Data Protection Officer</h4>
                <p className="text-sm text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:privacy@dear.com" className="text-primary hover:underline">
                    privacy@dear.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">General Support</h4>
                <p className="text-sm text-muted-foreground">
                  Email:{" "}
                  <a href="mailto:support@dear.com" className="text-primary hover:underline">
                    support@dear.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
