"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Sparkles, Shield, Zap, Building2, X } from "lucide-react"
import { CheckoutButton } from "@/components/checkout-button"
import { PRODUCTS } from "@/lib/stripe"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  
  const tiers = [
    {
      name: "Free",
      id: "tier-free",
      planType: "FREE",
      price: { 
        monthly: "$0", 
        annual: "$0" 
      },
      description: "Perfect for getting started",
      features: [
        "Up to 1,000 prompts per month",
        "Access to basic prompt templates",
        "Content & creative writing tools",
        "Limited prompt history (7 days)",
        "Basic email support",
      ],
      notIncluded: [
        "Advanced prompt enhancement",
        "Image generation prompts",
        "Code & technical prompts",
        "API access",
      ],
      cta: "Get Started Free",
      mostPopular: false,
      icon: <Shield className="h-5 w-5 text-blue-400" />,
    },
    {
      name: "Pro",
      id: "tier-pro",
      planType: "PRO",
      price: { 
        monthly: "$19", 
        annual: "$15" 
      },
      description: "Ideal for professionals and creators",
      features: [
        "Unlimited prompts",
        "All prompt templates & categories",
        "Advanced prompt enhancement",
        "Image generation prompts",
        "Code & technical prompts",
        "API access",
        "Unlimited prompt history",
        "Priority support",
        "5 users included",
      ],
      notIncluded: [
        "Custom AI models",
        "Team collaboration workspace",
        "Advanced analytics",
      ],
      cta: "Start 14-Day Free Trial",
      mostPopular: true,
      icon: <Sparkles className="h-5 w-5 text-blue-400" />,
    },
    {
      name: "Enterprise",
      id: "tier-enterprise",
      planType: "ENTERPRISE",
      price: { 
        monthly: "$49", 
        annual: "$39" 
      },
      description: "For organizations with advanced AI needs",
      features: [
        "Everything in Pro",
        "Custom AI models & training",
        "Team collaboration workspace",
        "Advanced analytics dashboard",
        "Enhanced security features",
        "Priority support",
        "Custom integrations",
        "Unlimited users",
        "Dedicated account manager",
      ],
      notIncluded: [],
      cta: "Contact Sales",
      mostPopular: false,
      icon: <Building2 className="h-5 w-5 text-purple-400" />,
    },
  ]

  return (
    <section id="pricing" className="relative py-20 bg-black overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-400 backdrop-blur mb-5">
            <Shield className="mr-2 h-3 w-3 text-blue-400" />
            Flexible Plans
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Simple, Transparent <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-3xl mx-auto">
            Choose the plan that's right for you and start creating professional-quality AI prompts today.
          </p>
          
          <div className="flex items-center justify-center mt-8 space-x-3">
            <Label htmlFor="billing-toggle" className={billingCycle === "monthly" ? "text-white" : "text-zinc-500"}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={billingCycle === "annual"}
              onCheckedChange={(checked) => setBillingCycle(checked ? "annual" : "monthly")}
            />
            <div className="flex items-center">
              <Label htmlFor="billing-toggle" className={billingCycle === "annual" ? "text-white" : "text-zinc-500"}>
                Annual
              </Label>
              <Badge className="ml-2 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-0">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`flex flex-col bg-zinc-900 border-zinc-800 ${
                tier.mostPopular ? "shadow-xl relative border-blue-900/50 md:scale-105 z-10" : ""
              }`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 transform -translate-y-1/2 inset-x-0 flex justify-center">
                  <span className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-xs font-semibold text-white z-20">
                    Most Popular
                  </span>
                </div>
              )}
              
              {/* Top gradient border */}
              <div className={`absolute top-0 right-0 left-0 h-1 
                ${tier.name === "Free" ? "bg-gradient-to-r from-blue-500 to-blue-400" : 
                  tier.name === "Pro" ? "bg-gradient-to-r from-blue-600 to-purple-600" : 
                  "bg-gradient-to-r from-purple-600 to-pink-600"}`}>
              </div>
              
              <CardHeader>
                <div className="flex items-center mb-2">
                  {tier.icon}
                  <CardTitle className="text-2xl text-white ml-2">{tier.name}</CardTitle>
                </div>
                <CardDescription className="text-zinc-400">{tier.description}</CardDescription>
                
                <div className="mt-2 mb-8">
                  <span className="text-4xl font-bold text-white">{tier.price[billingCycle]}</span>
                  <span className="text-zinc-400 ml-2">
                    {tier.name !== "Free" ? 
                      `/${billingCycle === "monthly" ? "month" : "month, billed annually"}` : 
                      "forever"}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mr-2 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                  
                  {tier.notIncluded && tier.notIncluded.map((feature) => (
                    <li key={feature} className="flex items-start text-zinc-500">
                      <X className="h-5 w-5 text-zinc-600 shrink-0 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <CheckoutButton
                  planType={tier.planType as "FREE" | "PRO" | "ENTERPRISE"}
                  billingCycle={billingCycle}
                  text={tier.cta}
                  isEnterprise={tier.name === "Enterprise"}
                  className={`w-full ${
                    tier.mostPopular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0"
                      : tier.name === "Enterprise"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                        : "bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700"
                  }`}
                  variant={tier.name === "Free" ? "outline" : "default"}
                />
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-500">All paid plans include a 14-day free trial. No credit card required for free plan.</p>
        </div>
      </div>
    </section>
  )
}

