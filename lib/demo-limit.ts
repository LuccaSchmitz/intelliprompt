// Store demo usage by IP address
const demoUsageByIP = new Map<string, number>();

// Maximum number of demo prompts for unregistered users
const DEMO_LIMIT = 3;

/**
 * Utility for managing demo usage limits by IP address
 */
export const demoLimitUtil = {
  /**
   * Check if a user has reached their demo limit
   */
  hasReachedLimit: (ipAddress: string): boolean => {
    const usageCount = demoUsageByIP.get(ipAddress) || 0;
    return usageCount >= DEMO_LIMIT;
  },

  /**
   * Get the number of demo prompts a user has used
   */
  getUsageCount: (ipAddress: string): number => {
    return demoUsageByIP.get(ipAddress) || 0;
  },

  /**
   * Increment usage count for an IP address
   */
  incrementUsage: (ipAddress: string): number => {
    const currentCount = demoUsageByIP.get(ipAddress) || 0;
    const newCount = currentCount + 1;
    demoUsageByIP.set(ipAddress, newCount);
    return newCount;
  },

  /**
   * Get remaining demo prompts for an IP address
   */
  getRemainingCount: (ipAddress: string): number => {
    const usedCount = demoUsageByIP.get(ipAddress) || 0;
    return Math.max(0, DEMO_LIMIT - usedCount);
  },

  // Export the demo limit constant
  DEMO_LIMIT,
};
