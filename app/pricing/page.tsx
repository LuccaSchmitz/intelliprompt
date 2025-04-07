"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Building, 
  CreditCard,
  Clock
} from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton";

export default function PricingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  // For free plan and navigation
  const handleFreePlan = () => {
    if (!user) {
      router.push(`/auth/signup?plan=free`);
    } else {
      router.push("/dashboard");
    }
  };

  // Get the price ID based on plan and billing cycle
  const getPriceId = (plan: string): string => {
    if (plan === "free") return "free";
    
    const priceMap = {
      pro: {
        monthly: "price_pro_monthly",
        annual: "price_pro_annual"
      },
      enterprise: {
        monthly: "price_enterprise_monthly",
        annual: "price_enterprise_annual"
      }
    };
    
    const planKey = plan.toLowerCase();
    if (planKey !== "pro" && planKey !== "enterprise") {
      return "free"; // Default fallback
    }
    
    return priceMap[planKey][billingCycle];
  };

  const getCurrentPlanLabel = (planName: string) => {
    if (!user) return null;
    return user.plan === planName.toLowerCase() ? 
      <Badge variant="outline" className="ml-2 border-blue-500/30 bg-blue-500/10 text-blue-400">
        Current Plan
      </Badge> : null;
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Choose the Right Plan for You
          </h1>
          <p className="text-lg text-zinc-400 mt-4 max-w-2xl mx-auto">
            Unlock the full potential of AI-powered prompts with our flexible pricing options 
            designed to fit your needs.
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  <CardTitle>Free</CardTitle>
                  {getCurrentPlanLabel("Free")}
                </div>
              </div>
              <CardDescription className="text-zinc-400">
                Perfect for getting started
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-zinc-400 ml-1">forever</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Up to 1,000 prompts per month</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Access to basic prompt templates</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Content & creative writing tools</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Limited prompt history (7 days)</span>
                </li>
                <li className="flex items-start text-zinc-500">
                  <X className="h-5 w-5 text-zinc-600 mr-2 shrink-0 mt-0.5" />
                  <span>Advanced prompt enhancement</span>
                </li>
                <li className="flex items-start text-zinc-500">
                  <X className="h-5 w-5 text-zinc-600 mr-2 shrink-0 mt-0.5" />
                  <span>Image generation prompts</span>
                </li>
                <li className="flex items-start text-zinc-500">
                  <X className="h-5 w-5 text-zinc-600 mr-2 shrink-0 mt-0.5" />
                  <span>Code & technical prompts</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleFreePlan}
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white"
              >
                {!user ? "Get Started" : 
                 user.plan === "free" ? "Current Plan" : 
                 "Downgrade to Free"}
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 relative overflow-hidden ring-2 ring-blue-500/20 transform md:scale-105 z-10">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute top-6 right-6 z-20">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <CardTitle>Pro</CardTitle>
                  {getCurrentPlanLabel("Pro")}
                </div>
              </div>
              <CardDescription className="text-zinc-400">
                For professionals and creators
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${billingCycle === "monthly" ? "19" : "15"}</span>
                <span className="text-zinc-400 ml-1">
                  /{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Unlimited prompts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>All prompt templates & categories</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Advanced prompt enhancement</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Image generation prompts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Code & technical prompts</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Unlimited prompt history</span>
                </li>
                <li className="flex items-start text-zinc-500">
                  <X className="h-5 w-5 text-zinc-600 mr-2 shrink-0 mt-0.5" />
                  <span>Custom AI models</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!user ? (
                <Button 
                  onClick={() => router.push('/auth/signup?plan=pro')}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                >
                  Sign Up Now
                </Button>
              ) : user.plan === "pro" ? (
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <CheckoutButton
                  planId={getPriceId("pro")}
                  billingCycle={billingCycle}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                >
                  {user.plan === "enterprise" ? "Downgrade to Pro" : "Upgrade to Pro"}
                </CheckoutButton>
              )}
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-purple-400" />
                  <CardTitle>Enterprise</CardTitle>
                  {getCurrentPlanLabel("Enterprise")}
                </div>
              </div>
              <CardDescription className="text-zinc-400">
                For teams and businesses
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">${billingCycle === "monthly" ? "49" : "39"}</span>
                <span className="text-zinc-400 ml-1">
                  /{billingCycle === "monthly" ? "month" : "month, billed annually"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Everything in Pro, plus:</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Custom AI models & training</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Team collaboration features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Advanced analytics dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Enhanced security features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {!user ? (
                <Button 
                  onClick={() => router.push('/auth/signup?plan=enterprise')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                >
                  Contact Sales
                </Button>
              ) : user.plan === "enterprise" ? (
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                  disabled
                >
                  Current Plan
                </Button>
              ) : (
                <CheckoutButton
                  planId={getPriceId("enterprise")}
                  billingCycle={billingCycle}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white"
                >
                  Upgrade to Enterprise
                </CheckoutButton>
              )}
            </CardFooter>
          </Card>
        </div>

        <div className="mt-20 bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <p className="text-zinc-400 mt-2">Have questions? We're here to help.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Can I change plans later?</h3>
              <p className="text-zinc-400">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">How do the prompt limits work?</h3>
              <p className="text-zinc-400">Free accounts are limited to 1,000 prompts per month. Pro and Enterprise plans have unlimited prompts.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Is there a refund policy?</h3>
              <p className="text-zinc-400">We offer a 14-day money-back guarantee for paid plans if you're not satisfied with our service.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Do you offer team discounts?</h3>
              <p className="text-zinc-400">Yes, we offer special pricing for teams of 5 or more. Contact our sales team for details.</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-zinc-400 mb-3">Have more questions? We're here to help.</p>
            <Link href="/contact">
              <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 