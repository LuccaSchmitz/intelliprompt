"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  LayoutDashboard, 
  History, 
  Folder, 
  Settings, 
  LogOut,
  PenTool,
  BookOpen,
  FileText,
  ImageIcon,
  User,
  Code
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Prompt Studio", href: "/dashboard/studio", icon: Sparkles },
    { name: "Prompt History", href: "/dashboard/history", icon: History },
    { name: "Templates", href: "/dashboard/templates", icon: FileText },
    { name: "Categories", href: "/dashboard/categories", icon: Folder }
  ];

  const tools = [
    { name: "Content Writing", href: "/dashboard/tools/content", icon: PenTool },
    { name: "Creative Writing", href: "/dashboard/tools/creative", icon: BookOpen },
    { name: "Business Writing", href: "/dashboard/tools/business", icon: FileText },
    { name: "Image Generation", href: "/dashboard/tools/image", icon: ImageIcon },
    { name: "Code & Technical", href: "/dashboard/tools/code", icon: Code }
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-zinc-800 bg-zinc-900 flex-shrink-0">
        <div className="flex h-16 items-center px-6 border-b border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <span className="font-bold text-lg">IntelliPrompt</span>
          </Link>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] py-4">
          <div className="px-3 py-2">
            <div className="mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Main
            </div>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-zinc-800 group ${
                    (item.href === "/dashboard" && pathname === "/dashboard") || 
                    (pathname?.startsWith(item.href) && item.href !== "/dashboard")
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      (item.href === "/dashboard" && pathname === "/dashboard") || 
                      (pathname?.startsWith(item.href) && item.href !== "/dashboard")
                        ? "text-blue-500"
                        : "text-zinc-500 group-hover:text-zinc-400"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Tools
            </div>
            <nav className="space-y-1">
              {tools.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-zinc-800 group ${
                    pathname?.startsWith(item.href)
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      pathname?.startsWith(item.href)
                        ? "text-blue-500"
                        : "text-zinc-500 group-hover:text-zinc-400"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 mb-2 px-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Account
            </div>
            <nav className="space-y-1">
              <Link
                href="/account"
                className="flex items-center px-4 py-2 text-sm text-zinc-400 rounded-md hover:bg-zinc-800 group"
              >
                <User className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-zinc-400" />
                Profile
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center px-4 py-2 text-sm text-zinc-400 rounded-md hover:bg-zinc-800 group"
              >
                <Settings className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-zinc-400" />
                Settings
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center px-4 py-2 text-sm text-zinc-400 rounded-md hover:bg-zinc-800 group"
              >
                <LogOut className="mr-3 h-5 w-5 text-zinc-500 group-hover:text-zinc-400" />
                Sign out
              </button>
            </nav>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-zinc-950">
          {children}
        </div>
      </div>
    </div>
  );
} 