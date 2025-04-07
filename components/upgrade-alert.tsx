"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  Star, 
  Lock, 
  Zap, 
  Sparkles, 
  ArrowRight 
} from "lucide-react";

interface UpgradeAlertProps {
  type?: "usage-limit" | "feature-locked" | "generic";
  className?: string;
}

export function UpgradeAlert({ 
  type = "generic", 
  className = "" 
}: UpgradeAlertProps) {
  const router = useRouter();
  
  // Get alert content based on type
  const getAlertContent = () => {
    switch (type) {
      case "usage-limit":
        return {
          title: "You've reached your monthly limit",
          description: "Upgrade to Pro for more monthly prompts and unlock advanced features.",
          icon: <AlertCircle className="h-5 w-5 text-amber-400" />,
          actionText: "View Plans"
        };
      case "feature-locked":
        return {
          title: "Premium feature",
          description: "Upgrade to access advanced features including image generation, code assistance, custom models, and more.",
          icon: <Lock className="h-5 w-5 text-amber-400" />,
          actionText: "Upgrade Now"
        };
      case "generic":
      default:
        return {
          title: "Enhance your experience",
          description: "Get unlimited prompts, advanced customization, and premium features with our Pro plan.",
          icon: <Star className="h-5 w-5 text-amber-400" />,
          actionText: "Explore Plans"
        };
    }
  };
  
  const content = getAlertContent();
  
  return (
    <div className={`relative overflow-hidden bg-gradient-to-r p-px from-blue-500/20 via-purple-500/20 to-amber-500/20 rounded-lg ${className}`}>
      <div className="relative flex items-center gap-4 rounded-[calc(0.5rem-1px)] bg-zinc-900 p-4">
        {content.icon}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white">{content.title}</h3>
          <p className="text-sm text-zinc-400 mt-0.5">
            {content.description}
          </p>
        </div>
        <Button
          size="sm"
          className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
          onClick={() => router.push('/pricing')}
        >
          {content.actionText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      {/* Decorative sparkles */}
      <div className="absolute top-0 left-1/4 -mt-1 h-8 w-8 text-blue-500/20 opacity-50">
        <Sparkles className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 right-1/4 -mb-1 h-8 w-8 text-purple-500/20 opacity-50">
        <Zap className="h-full w-full" />
      </div>
    </div>
  );
} 