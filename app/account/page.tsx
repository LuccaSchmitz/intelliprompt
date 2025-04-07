import { UserAccount } from "@/components/auth/user-account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account | IntelliPrompt",
  description: "Manage your IntelliPrompt account settings and preferences.",
};

export default function AccountPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="w-full max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account details and preferences
          </p>
        </div>
        <UserAccount />
      </div>
    </main>
  );
} 