"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface CheckoutButtonProps {
  planId: string;
  billingCycle?: "monthly" | "annual";
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export default function CheckoutButton({
  planId,
  billingCycle = "annual",
  className,
  variant = "default",
  size = "default",
  children,
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const handleCheckout = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      
      // Free plan just redirects to success page with demo params
      if (planId === "free") {
        router.push("/dashboard");
        return;
      }
      
      // Check if user is authenticated
      if (!user) {
        toast.error("You need to be logged in to upgrade");
        router.push("/auth/login");
        return;
      }
      
      // Create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: planId,
          billingCycle,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session");
      }
      
      // Redirect to checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button
      onClick={handleCheckout}
      className={className}
      variant={variant}
      size={size}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </Button>
  );
} 