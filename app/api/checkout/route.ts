import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { getUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { priceId, billingCycle = "annual" } = await request.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customerId = user.id;

    try {
      // createCheckoutSession now handles cases when Stripe is not initialized
      const sessionUrl = await createCheckoutSession(
        priceId,
        customerId,
        billingCycle
      );
      return NextResponse.json({ url: sessionUrl });
    } catch (error) {
      console.error("Error creating checkout session:", error);

      // If we're in development/demo mode without Stripe API key
      if (!process.env.STRIPE_SECRET_KEY) {
        // Extract plan type from priceId
        const isPro = priceId.toLowerCase().includes("pro");
        const plan = isPro ? "pro" : "enterprise";

        // Create a demo checkout URL
        const demoSessionId = Math.random().toString(36).substring(2, 15);
        const checkoutSuccessUrl = new URL("/checkout/success", request.url);

        // Add query parameters for demo mode
        checkoutSuccessUrl.searchParams.append("demo", "true");
        checkoutSuccessUrl.searchParams.append("plan", plan);
        checkoutSuccessUrl.searchParams.append("billing", billingCycle);
        checkoutSuccessUrl.searchParams.append("session_id", demoSessionId);

        return NextResponse.json({ url: checkoutSuccessUrl.toString() });
      }

      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
