import Stripe from "stripe";

// Initialize Stripe conditionally to handle missing API key
let stripeInstance: Stripe | null = null;

// Only initialize if we have an API key
if (process.env.STRIPE_SECRET_KEY) {
  try {
    // Initialize without specifying API version to use the default
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.error("Failed to initialize Stripe:", error);
  }
}

// Export a wrapper that handles the null case
export const stripe = {
  checkout: {
    sessions: {
      create: async (params: any) => {
        if (!stripeInstance) {
          throw new Error("Stripe is not initialized - missing API key");
        }
        return stripeInstance.checkout.sessions.create(params);
      },
    },
  },
  customers: {
    retrieve: async (id: string) => {
      if (!stripeInstance) {
        throw new Error("Stripe is not initialized - missing API key");
      }
      return stripeInstance.customers.retrieve(id);
    },
  },
  subscriptions: {
    retrieve: async (id: string) => {
      if (!stripeInstance) {
        throw new Error("Stripe is not initialized - missing API key");
      }
      return stripeInstance.subscriptions.retrieve(id);
    },
  },
  webhooks: {
    constructEvent: (payload: string, signature: string, secret: string) => {
      if (!stripeInstance) {
        throw new Error("Stripe is not initialized - missing API key");
      }
      return stripeInstance.webhooks.constructEvent(payload, signature, secret);
    },
  },
  billingPortal: {
    sessions: {
      create: async (params: any) => {
        if (!stripeInstance) {
          throw new Error("Stripe is not initialized - missing API key");
        }
        return stripeInstance.billingPortal.sessions.create(params);
      },
    },
  },
};

// Define the product IDs that correspond to each tier
export const PRODUCTS = {
  FREE: "free_plan", // Free plan has no Stripe product ID
  PRO: {
    MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "price_pro_monthly",
    ANNUAL: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || "price_pro_annual",
  },
  ENTERPRISE: {
    MONTHLY:
      process.env.STRIPE_ENTERPRISE_MONTHLY_PRICE_ID ||
      "price_enterprise_monthly",
    ANNUAL:
      process.env.STRIPE_ENTERPRISE_ANNUAL_PRICE_ID ||
      "price_enterprise_annual",
  },
};

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(
  priceId: string,
  customerId: string,
  billingCycle: string = "annual"
): Promise<string> {
  if (!stripe) {
    console.log("Creating demo checkout session (Stripe not initialized)");
    // For demo/development mode, return a mock URL
    const isPro = priceId.toLowerCase().includes("pro");
    const planType = isPro ? "pro" : "enterprise";
    return `/checkout/success?demo=true&plan=${planType}&billing=${billingCycle}`;
  }

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          billingCycle,
        },
      },
    });

    return session.url || "";
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}

// Function to create a customer portal session
export async function createCustomerPortalSession(customerId: string) {
  try {
    // In demo mode without Stripe, return a mock portal URL
    if (!stripeInstance) {
      console.log("Creating mock customer portal session for demo mode");
      return {
        url: "/account?demo=true",
      };
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/account`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    throw error;
  }
}

// Helper function to get plan details by price ID
export function getPlanDetailsByPriceId(priceId: string) {
  if (priceId === PRODUCTS.PRO.MONTHLY || priceId === PRODUCTS.PRO.ANNUAL) {
    return {
      name: "Pro",
      plan: "pro",
      isTrial: true,
      trialDays: 14,
    };
  } else if (
    priceId === PRODUCTS.ENTERPRISE.MONTHLY ||
    priceId === PRODUCTS.ENTERPRISE.ANNUAL
  ) {
    return {
      name: "Enterprise",
      plan: "enterprise",
      isTrial: true,
      trialDays: 14,
    };
  }

  return {
    name: "Free",
    plan: "free",
    isTrial: false,
    trialDays: 0,
  };
}
