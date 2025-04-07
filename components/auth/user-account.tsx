"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/authContext";
import { toast } from "@/components/ui/use-toast";

export function UserAccount() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      toast({
        title: "Success",
        description: "You have been signed out.",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="w-full max-w-md mx-auto bg-background/80 backdrop-blur-sm border-zinc-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Your Account</CardTitle>
        <CardDescription>
          Manage your account settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {user.plan === "free" ? "Free" : user.plan === "pro" ? "Pro" : "Enterprise"} Plan
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Account Details</h4>
            <div className="rounded-md bg-background/50 p-4 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">User ID</div>
                <div>{user.id}</div>
                <div className="text-muted-foreground">Joined</div>
                <div>April 2023</div>
                <div className="text-muted-foreground">Plan</div>
                <div className="capitalize">{user.plan}</div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-medium">Account Security</h4>
            <div className="rounded-md bg-background/50 p-4 text-sm">
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push("/auth/change-password")}>
                  Change Password
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push("/auth/security")}>
                  Security Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" onClick={handleSignOut} disabled={isLoading} className="w-full">
          {isLoading ? "Signing out..." : "Sign out"}
        </Button>
      </CardFooter>
    </Card>
  );
} 