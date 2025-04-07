"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, CircleCheck, Sparkles, Zap } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [planName, setPlanName] = useState<string>("");
  const [billingCycle, setBillingCycle] = useState<string>("");
  
  useEffect(() => {
    if (!user) {
      // Not logged in, redirect to login
      router.push("/auth/login");
      return;
    }
    
    const fetchSessionDetails = async () => {
      try {
        setIsLoading(true);
        
        // Check if this is a demo mode checkout
        const isDemo = searchParams.get("demo") === "true";
        
        if (isDemo) {
          // Handle demo checkout
          const plan = searchParams.get("plan") || "pro";
          const billing = searchParams.get("billing") || "annual";
          
          setPlanName(plan === "pro" ? "Pro" : "Enterprise");
          setBillingCycle(billing);
          setSuccess(true);
          
          // In a real app, you would update the user's plan in the database
          console.log(`Demo checkout complete: ${plan} plan (${billing})`);
        } else {
          // Handle real Stripe checkout
          const sessionId = searchParams.get("session_id");
          
          if (!sessionId) {
            setSuccess(false);
            return;
          }
          
          // In a real app, you would verify the session with your backend
          // For now, we'll just simulate a successful checkout
          
          // You would normally fetch the session details from your backend API
          // const response = await fetch(`/api/checkout/verify?session_id=${sessionId}`);
          // const data = await response.json();
          
          // For demo purposes:
          setPlanName("Pro"); // This would come from your backend in a real app
          setBillingCycle("annual"); // This would come from your backend in a real app
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error verifying checkout session:", error);
        setSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSessionDetails();
  }, [router, searchParams, user]);
  
  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-zinc-950 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
        <Card className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 overflow-hidden ${success ? 'border-green-500/20' : 'border-red-500/20'}`}>
          <div className={`absolute top-0 right-0 left-0 h-1 ${success ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-red-500 to-red-400'}`}></div>
          
          <CardHeader className="text-center pb-2">
            <div className="mx-auto h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
              {success ? (
                <Check className="h-6 w-6 text-white" />
              ) : (
                <CircleCheck className="h-6 w-6 text-white" />
              )}
            </div>
            
            <CardTitle className="text-2xl">
              {success ? "Subscription Activated!" : "Checkout Incomplete"}
            </CardTitle>
            
            <CardDescription className="text-zinc-400">
              {success 
                ? `Your ${planName} subscription has been successfully activated.` 
                : "There was an issue with your checkout. Please try again."}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-4">
            {success ? (
              <div className="space-y-6">
                <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Plan</span>
                    <div className="flex items-center">
                      {planName === "Pro" ? (
                        <Sparkles className="h-4 w-4 mr-1.5 text-blue-400" />
                      ) : (
                        <Zap className="h-4 w-4 mr-1.5 text-purple-400" />
                      )}
                      <span className="font-medium">{planName} Plan</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Billing</span>
                    <span className="font-medium">
                      {billingCycle === "annual" ? "Annual" : "Monthly"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Trial Period</span>
                    <span className="font-medium text-green-500">14 days</span>
                  </div>
                </div>
                
                <div className="text-sm text-zinc-400 text-center">
                  <p>You can manage your subscription from your account settings.</p>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                    onClick={() => router.push('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    onClick={() => router.push('/account/settings')}
                  >
                    Manage Subscription
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                  <p className="text-sm text-zinc-400">
                    Your checkout was not completed successfully. This could be due to:
                  </p>
                  <ul className="text-sm text-zinc-400 list-disc pl-5 space-y-1">
                    <li>The payment was declined</li>
                    <li>The checkout session expired</li>
                    <li>The session was already completed</li>
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                    onClick={() => router.push('/pricing')}
                  >
                    Try Again
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                    onClick={() => router.push('/dashboard')}
                  >
                    Return to Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 