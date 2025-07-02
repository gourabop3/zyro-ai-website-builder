"use client";

import Header from "@/components/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { PricingTable, useUser } from "@clerk/nextjs";

export default function PricingPage() {
  const { isLoaded } = useUser();

  const HeroSkeleton = () => (
    <section className="pt-16 pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
    </section>
  );

  const FeaturesSkeleton = () => (
    <div className="mb-12 text-center">
      <Skeleton className="h-8 w-1/2 mx-auto mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="p-6 rounded-lg bg-card border border-border"
          >
            <Skeleton className="w-12 h-12 rounded-lg mx-auto mb-4" />
            <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );

  const PricingTableSkeleton = () => (
    <div className="bg-card rounded-xl border border-border p-8">
      <div className="text-center mb-8">
        <Skeleton className="h-8 w-1/3 mx-auto mb-2" />
        <Skeleton className="h-5 w-1/2 mx-auto" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="p-6 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FAQSkeleton = () => (
    <div className="mt-16 max-w-3xl mx-auto">
      <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-card rounded-lg border border-border p-6"
          >
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {!isLoaded ? (
        <>
          <HeroSkeleton />
          <section className="pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              <FeaturesSkeleton />
              <PricingTableSkeleton />
              <FAQSkeleton />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Hero Section */}
          <section className="pt-16 pb-12 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Choose the Perfect Plan
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Unlock the full potential of AI-powered website building with
                our flexible pricing plans designed for creators, developers,
                and teams.
              </p>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="pb-16 px-4">
            <div className="max-w-6xl mx-auto">
              {/* Features Overview */}
              <div className="mb-12 text-center">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Everything you need to build amazing websites
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="p-6 rounded-lg bg-card border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      AI-Powered Generation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generate websites, components, and code with advanced AI
                      assistance
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-card border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Real-time Preview
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      See your changes instantly with live preview and hot
                      reload
                    </p>
                  </div>

                  <div className="p-6 rounded-lg bg-card border border-border">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Secure & Reliable
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security with 99.9% uptime guarantee
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Table */}
              <div className="bg-card rounded-xl border border-border p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Select Your Plan
                  </h3>
                  <p className="text-muted-foreground">
                    Start free and upgrade as you grow
                  </p>
                </div>
                <PricingTable />
              </div>

              {/* FAQ Section */}
              <div className="mt-16 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Can I change my plan anytime?
                    </h4>
                    <p className="text-muted-foreground">
                      Yes, you can upgrade or downgrade your plan at any time.
                      Changes take effect immediately.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      Is there a free trial?
                    </h4>
                    <p className="text-muted-foreground">
                      We offer a generous free tier to get you started. No
                      credit card required.
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-6">
                    <h4 className="font-semibold text-foreground mb-2">
                      What payment methods do you accept?
                    </h4>
                    <p className="text-muted-foreground">
                      We accept all major credit cards, PayPal, and bank
                      transfers for annual plans.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
