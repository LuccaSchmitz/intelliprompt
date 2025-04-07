import { NextRequest, NextResponse } from "next/server";
import { demoLimitUtil } from "@/lib/demo-limit";

/**
 * Get the client IP from request headers
 */
function getClientIP(request: NextRequest): string {
  // Try to get the IP from various headers
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // Get the first IP if there are multiple in the header
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fall back to a placeholder if no IP is found
  return "unknown-ip";
}

/**
 * GET: Check demo usage for the current user
 */
export async function GET(request: NextRequest) {
  const ip = getClientIP(request);

  return NextResponse.json({
    usageCount: demoLimitUtil.getUsageCount(ip),
    remainingCount: demoLimitUtil.getRemainingCount(ip),
    hasReachedLimit: demoLimitUtil.hasReachedLimit(ip),
    limit: demoLimitUtil.DEMO_LIMIT,
  });
}

/**
 * POST: Increment demo usage for the current user
 */
export async function POST(request: NextRequest) {
  const ip = getClientIP(request);

  // Check if user already reached limit
  if (demoLimitUtil.hasReachedLimit(ip)) {
    return NextResponse.json({ error: "Demo limit reached" }, { status: 403 });
  }

  // Increment usage
  const newCount = demoLimitUtil.incrementUsage(ip);
  const hasReachedLimit = newCount >= demoLimitUtil.DEMO_LIMIT;

  return NextResponse.json({
    usageCount: newCount,
    remainingCount: demoLimitUtil.getRemainingCount(ip),
    hasReachedLimit,
    limit: demoLimitUtil.DEMO_LIMIT,
  });
}
