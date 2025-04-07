import { NextRequest, NextResponse } from "next/server";
import { stripe, getPlanDetailsByPriceId } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  // Check if we're in demo mode without Stripe
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log("Webhook received in demo mode - no Stripe API key available");
    return NextResponse.json({ received: true, demo: true });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      // Here you would:
      // 1. Match the session ID to your database
      // 2. Update the user's subscription status
      console.log("Checkout session completed:", checkoutSession.id);

      try {
        // Get billing cycle from metadata
        const billingCycle = checkoutSession.metadata?.billingCycle || "annual";

        // Get customer email
        const customerEmail = checkoutSession.customer_details?.email;

        // Get the price ID from the line items (in a real app, you should retrieve line items from the API)
        if (checkoutSession.subscription) {
          // Retrieve the subscription to get price info
          const subscription = await stripe.subscriptions.retrieve(
            checkoutSession.subscription as string
          );

          if (subscription.items.data.length > 0) {
            const priceId = subscription.items.data[0].price.id;

            // Get plan details from price ID
            const planDetails = getPlanDetailsByPriceId(priceId);

            // In a real app, you would update the user's plan in the database
            console.log(
              `Upgrading user (${customerEmail}) to ${planDetails.name} plan (${billingCycle} billing)`
            );
          }
        }
      } catch (error) {
        console.error("Error processing checkout session:", error);
      }
      break;

    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object;

      try {
        if (subscription.items.data.length > 0) {
          const priceId = subscription.items.data[0].price.id;

          // Get plan details from price ID
          const planDetails = getPlanDetailsByPriceId(priceId);

          // Get customer email
          const customerData = await stripe.customers.retrieve(
            subscription.customer as string
          );

          // Handle customer data properly - check if it's a deleted customer or a normal customer
          const customerEmail = !customerData.deleted
            ? (customerData as Stripe.Customer).email
            : null;

          // Determine if this is an annual or monthly subscription based on price ID
          const isBillingAnnual = priceId.includes("annual");
          const billingCycle = isBillingAnnual ? "annual" : "monthly";

          // In a real app, you would update the user's subscription in your database
          console.log(
            `Subscription ${subscription.status} for user (${customerEmail}): ${planDetails.name} plan (${billingCycle} billing)`
          );
        }
      } catch (error) {
        console.error("Error processing subscription update:", error);
      }
      break;

    case "invoice.payment_succeeded":
      const invoice = event.data.object;
      // Here you would record the successful payment
      console.log("Payment succeeded for invoice:", invoice.id);
      break;

    case "invoice.payment_failed":
      const failedInvoice = event.data.object;
      // Here you would handle failed payments
      console.log("Payment failed for invoice:", failedInvoice.id);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
