"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"; 
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CreditCard, 
  Check, 
  ChevronLeft, 
  Lock, 
  CreditCardIcon,
  Building2,
  Shield,
  ArrowRight
} from "lucide-react";

type PaymentMethod = "credit-card" | "paypal" | "bank-transfer";
type CheckoutStep = "payment" | "processing" | "confirmation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [plan, setPlan] = useState<string>("pro");
  const [billing, setBilling] = useState<string>("annual");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("payment");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [billingName, setBillingName] = useState(user?.name || "");
  const [billingEmail, setBillingEmail] = useState(user?.email || "");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (!user) {
      router.push("/auth/login?redirect=/checkout");
      return;
    }
    
    const planParam = searchParams.get("plan");
    const billingParam = searchParams.get("billing");
    
    if (planParam) {
      setPlan(planParam);
    }
    
    if (billingParam) {
      setBilling(billingParam);
    }
    
    // Pre-fill user details if available
    if (user) {
      setBillingName(user.name);
      setBillingEmail(user.email);
    }
  }, [user, router, searchParams]);

  const getPlanDetails = () => {
    const plans = {
      pro: {
        name: "Pro Plan",
        monthly: 19,
        annual: 15
      },
      enterprise: {
        name: "Enterprise Plan",
        monthly: 49,
        annual: 39
      }
    };
    
    const selectedPlan = plan === "enterprise" ? plans.enterprise : plans.pro;
    const price = billing === "annual" ? selectedPlan.annual : selectedPlan.monthly;
    const billingPeriod = billing === "annual" ? "year" : "month";
    const totalPrice = billing === "annual" ? price * 12 : price;
    
    return {
      name: selectedPlan.name,
      price,
      billingPeriod,
      totalPrice
    };
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!cardName) errors.cardName = "Cardholder name is required";
    if (!cardNumber) errors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) 
      errors.cardNumber = "Please enter a valid 16-digit card number";
    
    if (!cardExpiry) errors.cardExpiry = "Expiry date is required";
    else if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) 
      errors.cardExpiry = "Expiry format should be MM/YY";
    
    if (!cardCvc) errors.cardCvc = "CVC is required";
    else if (!/^\d{3,4}$/.test(cardCvc)) 
      errors.cardCvc = "CVC should be 3 or 4 digits";
    
    if (!billingName) errors.billingName = "Billing name is required";
    if (!billingEmail) errors.billingEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingEmail))
      errors.billingEmail = "Please enter a valid email";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setCurrentStep("processing");
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Simulate successful payment
    setCurrentStep("confirmation");
    setIsSubmitting(false);
  };

  const planDetails = getPlanDetails();

  if (currentStep === "confirmation") {
    return (
      <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-lg bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            <CardDescription className="text-zinc-400">
              Your subscription to {planDetails.name} has been activated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/50">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-400">Plan</span>
                <span className="font-medium">{planDetails.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-zinc-400">Billing</span>
                <span className="font-medium">
                  ${planDetails.price}/{planDetails.billingPeriod.substring(0,2)}
                </span>
              </div>
              <Separator className="my-3 bg-zinc-800" />
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Total</span>
                <span className="font-medium">${planDetails.totalPrice}</span>
              </div>
            </div>
            
            <div className="text-center text-zinc-400 text-sm">
              <p>A receipt has been sent to your email at {billingEmail}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              onClick={() => router.push("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/pricing" className="inline-flex items-center text-zinc-400 hover:text-white mb-8">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Pricing
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
                <CardHeader>
                  <CardTitle>Checkout</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Complete your purchase to upgrade to {planDetails.name}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {currentStep === "processing" ? (
                    <div className="h-64 flex flex-col items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
                      <p className="mt-4 text-zinc-400">Processing your payment...</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                        <RadioGroup 
                          value={paymentMethod} 
                          onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 border border-zinc-800 p-3 rounded-lg bg-zinc-900/50">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1">
                              <CreditCardIcon className="h-5 w-5 mr-2 text-zinc-400" />
                              Credit / Debit Card
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border border-zinc-800 p-3 rounded-lg bg-zinc-900/50">
                            <RadioGroupItem value="paypal" id="paypal" disabled />
                            <Label htmlFor="paypal" className="flex items-center cursor-pointer flex-1 text-zinc-500">
                              <Building2 className="h-5 w-5 mr-2" />
                              PayPal (Coming Soon)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 border border-zinc-800 p-3 rounded-lg bg-zinc-900/50">
                            <RadioGroupItem value="bank-transfer" id="bank-transfer" disabled />
                            <Label htmlFor="bank-transfer" className="flex items-center cursor-pointer flex-1 text-zinc-500">
                              <Building2 className="h-5 w-5 mr-2" />
                              Bank Transfer (Coming Soon)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {paymentMethod === "credit-card" && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Card Details</h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="card-name">Cardholder Name</Label>
                            <Input
                              id="card-name"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              placeholder="John Smith"
                              className="bg-zinc-950 border-zinc-800 text-white"
                            />
                            {formErrors.cardName && (
                              <p className="text-red-400 text-sm">{formErrors.cardName}</p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input
                              id="card-number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="bg-zinc-950 border-zinc-800 text-white"
                            />
                            {formErrors.cardNumber && (
                              <p className="text-red-400 text-sm">{formErrors.cardNumber}</p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-expiry">Expiry Date</Label>
                              <Input
                                id="card-expiry"
                                value={cardExpiry}
                                onChange={(e) => setCardExpiry(e.target.value)}
                                placeholder="MM/YY"
                                maxLength={5}
                                className="bg-zinc-950 border-zinc-800 text-white"
                              />
                              {formErrors.cardExpiry && (
                                <p className="text-red-400 text-sm">{formErrors.cardExpiry}</p>
                              )}
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="card-cvc">CVC</Label>
                              <Input
                                id="card-cvc"
                                value={cardCvc}
                                onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                                placeholder="123"
                                maxLength={4}
                                className="bg-zinc-950 border-zinc-800 text-white"
                              />
                              {formErrors.cardCvc && (
                                <p className="text-red-400 text-sm">{formErrors.cardCvc}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Billing Information</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billing-name">Name</Label>
                          <Input
                            id="billing-name"
                            value={billingName}
                            onChange={(e) => setBillingName(e.target.value)}
                            placeholder="John Smith"
                            className="bg-zinc-950 border-zinc-800 text-white"
                          />
                          {formErrors.billingName && (
                            <p className="text-red-400 text-sm">{formErrors.billingName}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billing-email">Email</Label>
                          <Input
                            id="billing-email"
                            type="email"
                            value={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="bg-zinc-950 border-zinc-800 text-white"
                          />
                          {formErrors.billingEmail && (
                            <p className="text-red-400 text-sm">{formErrors.billingEmail}</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                
                {currentStep === "payment" && (
                  <CardFooter>
                    <Button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Purchase <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
            
            <div>
              <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Plan</span>
                      <span className="font-medium">{planDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Billing</span>
                      <span className="font-medium">
                        {billing === "annual" ? "Annual" : "Monthly"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Price</span>
                      <span className="font-medium">
                        ${planDetails.price}/{billing === "annual" ? "mo" : "month"}
                      </span>
                    </div>
                    
                    {billing === "annual" && (
                      <div className="flex justify-between text-blue-400">
                        <span>Annual discount</span>
                        <span>Save 20%</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="bg-zinc-800" />
                  
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>
                      ${planDetails.totalPrice}
                      <span className="text-zinc-400 text-sm ml-1">
                        /{billing === "annual" ? "year" : "month"}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-zinc-400 mt-4">
                    <Lock className="h-3 w-3 mr-1" />
                    Secure payment processed by Stripe
                  </div>
                </CardContent>
                
                <CardFooter className="flex flex-col pt-0">
                  <div className="bg-zinc-800/50 p-4 rounded-lg text-sm space-y-3">
                    <div className="flex">
                      <Shield className="h-5 w-5 mr-2 text-blue-400 shrink-0" />
                      <p>14-day money-back guarantee if you're not satisfied</p>
                    </div>
                    <div className="flex">
                      <Check className="h-5 w-5 mr-2 text-green-500 shrink-0" />
                      <p>Cancel or change plans anytime</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 