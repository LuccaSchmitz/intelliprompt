// This is a mock authentication system for demonstration purposes
// In a real application, this would be connected to a backend auth service

// Types for user data
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  plan: "free" | "pro" | "enterprise";
}

// Mock authenticated user
let currentUser: User | null = {
  id: "1",
  name: "Demo User",
  email: "user@example.com",
  image:
    "https://ui-avatars.com/api/?name=Demo+User&background=0D8ABC&color=fff",
  plan: "free",
};

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For demo purposes, any email/password is valid
  if (email && password) {
    // Use the email to create a personalized avatar
    const userName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "+");
    currentUser = {
      id: "1",
      name: userName.charAt(0).toUpperCase() + userName.slice(1),
      email: email,
      image: `https://ui-avatars.com/api/?name=${userName}&background=0D8ABC&color=fff`,
      plan: "free",
    };
    return currentUser;
  }

  throw new Error("Invalid email or password");
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock Google authentication
  currentUser = {
    id: "2",
    name: "Google User",
    email: "google.user@example.com",
    image:
      "https://ui-avatars.com/api/?name=Google+User&background=DB4437&color=fff",
    plan: "free",
  };

  return currentUser;
}

/**
 * Sign in with GitHub
 */
export async function signInWithGitHub(): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock GitHub authentication
  currentUser = {
    id: "3",
    name: "GitHub User",
    email: "github.user@example.com",
    image:
      "https://ui-avatars.com/api/?name=GitHub+User&background=333&color=fff",
    plan: "pro", // Demo GitHub users get Pro for demo purposes
  };

  return currentUser;
}

/**
 * Sign up with email and password
 */
export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<User | null> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For demo purposes, any valid input creates an account
  if (email && password && name) {
    currentUser = {
      id: "4",
      name: name,
      email: email,
      image: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=0D8ABC&color=fff`,
      plan: "free",
    };
    return currentUser;
  }

  throw new Error("Please provide all required information");
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Clear the current user
  currentUser = null;
}

/**
 * Get the current user
 */
export function getUser(): User | null {
  return currentUser;
}

/**
 * Check if a user is authenticated
 */
export function isAuthenticated(): boolean {
  return currentUser !== null;
}

// In a real app with Next.js, you would use a more robust approach:
// Example with NextAuth.js
/*
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}
*/
