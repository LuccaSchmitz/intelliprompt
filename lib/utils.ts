import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date using Intl.DateTimeFormat
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {}
) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  }).format(date);
}

/**
 * Parse a string to a number or return a default value
 */
export function parseNumber(
  value: string | undefined | null,
  defaultValue = 0
): number {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Create a URL with query parameters
 */
export function createUrl(
  pathname: string,
  params: Record<string, string | number | undefined | null>
) {
  const url = new URL(pathname, window.location.origin);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Capitalize the first letter of a string
 */
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
