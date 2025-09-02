import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Target, Shield, Heart, Zap } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Beyond Transformation, Towards{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Unbreakable Flourishing
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            DEAR is democratizing profound personal evolution, making holistic health, unbreakable resilience, and
            self-mastery accessible, achievable, and sustainable for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              To be the divine beacon of hope for those seeking life-altering change, especially in the most underserved
              and sensitive areas like addiction and behavioral recovery.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  To become the #1 most trusted, indispensable, and impactful platform for personal transformation
                  globally, achieving $500M+ ARR within 5 years and positively impacting the lives of billions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Heart className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="text-xl">Our Promise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  The unshakeable path to your highest self. We provide a clear, actionable, and hyper-personalized step
                  every single day, intelligently adapting to move you closer to your ultimate transformation goal.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Principles</h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              The unshakeable foundation that guides everything we do.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success">
                  <Zap className="h-6 w-6 text-success-foreground" />
                </div>
                <CardTitle>Holistic Integration is Sacred</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  True flourishing demands the seamless fusion of physical, mental, and emotional health. DEAR's power
                  lies in its integrated, interconnected ecosystem.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle>Trust is Absolute</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Handling the most sensitive aspects of human life, DEAR operates with uncompromising security,
                  privacy-by-design, and ethical AI.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Heart className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle>Empathy-Driven Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  The user experience must be profoundly supportive, non-judgmental, and empowering, especially for
                  those navigating sensitive journeys like addiction recovery.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ready to Join the Movement?</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Be part of the new paradigm of human flourishing. Your transformation journey starts here.
          </p>
          <div className="mt-10">
            <Button size="lg" className="px-8 py-4 text-lg" asChild>
              <Link href="/signup">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
