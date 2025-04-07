"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { PRODUCTS } from "@/lib/stripe";

interface CheckoutButtonProps {
  planType: "FREE" | "PRO" | "ENTERPRISE";
  text: string;
  billingCycle?: "monthly" | "annual";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
  isEnterprise?: boolean;
}

export function CheckoutButton({
  planType,
  text,
  billingCycle = "annual",
  variant = "default",
  className,
  isEnterprise = false,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (planType === "FREE") {
      // Free plan has no checkout - redirect to dashboard
      window.location.href = "/dashboard";
      return;
    }
    
    if (isEnterprise && planType === "ENTERPRISE") {
      // Enterprise tier redirects to contact sales
      window.location.href = "/contact";
      return;
    }

    try {
      setIsLoading(true);

      // If the user is not logged in, redirect to the login page
      if (!user) {
        // Save the checkout info to local storage for after login
        localStorage.setItem("checkoutPlanType", planType);
        localStorage.setItem("checkoutBillingCycle", billingCycle);
        window.location.href = "/auth/login?returnUrl=/pricing";
        return;
      }

      // Determine correct price ID based on plan and billing cycle
      let priceId = "";
      if (planType === "PRO") {
        priceId = billingCycle === "monthly" ? PRODUCTS.PRO.MONTHLY : PRODUCTS.PRO.ANNUAL;
      } else if (planType === "ENTERPRISE") {
        priceId = billingCycle === "monthly" ? PRODUCTS.ENTERPRISE.MONTHLY : PRODUCTS.ENTERPRISE.ANNUAL;
      }

      // Call the checkout API to create a Stripe checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          priceId,
          billingCycle
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        description: "Could not initiate checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
} 