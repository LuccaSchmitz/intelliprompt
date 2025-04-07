"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/authContext";
import { 
  Sparkles, 
  Clock, 
  FileText, 
  PenTool, 
  BarChart3, 
  Zap, 
  Lock, 
  Plus,
  Folder,
  ArrowRight,
  ImageIcon,
  Code,
  Building2
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [promptsUsed, setPromptsUsed] = useState<number>(0);
  const [promptsRemaining, setPromptsRemaining] = useState<number>(0);
  const [recentPrompts, setRecentPrompts] = useState<Array<any>>([]);
  const [favoriteTemplates, setFavoriteTemplates] = useState<Array<any>>([]);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    
    // Simulated data for demo purposes
    setPromptsUsed(452);
    setPromptsRemaining(548);
    setRecentPrompts([
      { 
        id: '1', 
        title: 'Marketing copy for new AI product', 
        category: 'content',
        categoryName: 'Content Writing',
        icon: PenTool,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), 
        status: 'draft'
      },
      { 
        id: '2', 
        title: 'Adventure story set in fantasy world', 
        category: 'creative',
        categoryName: 'Creative Writing',
        icon: FileText,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), 
        status: 'completed'
      },
      { 
        id: '3', 
        title: 'Quarterly business proposal template', 
        category: 'business',
        categoryName: 'Business Writing',
        icon: FileText,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), 
        status: 'completed'
      }
    ]);
    setFavoriteTemplates([
      { id: '1', name: 'Product Description', category: 'content', icon: PenTool },
      { id: '2', name: 'Science Fiction Story', category: 'creative', icon: FileText },
      { id: '3', name: 'Business Email', category: 'business', icon: FileText },
      { id: '4', name: 'API Documentation', category: 'code', icon: Code }
    ]);
  }, [user, loading, router]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    return `${Math.floor(diffSeconds / 86400)} days ago`;
  };
  
  // Calculate plan limit based on user's plan
  const getPlanLimit = () => {
    if (!user) return 0;
    
    switch (user.plan) {
      case 'enterprise':
        return 'Unlimited';
      case 'pro':
        return 2000;
      case 'free':
      default:
        return 1000;
    }
  };
  
  // Calculate percentage used of plan limit
  const getUsagePercentage = () => {
    if (!user || user.plan === 'enterprise') return 0;
    const limit = user.plan === 'pro' ? 2000 : 1000;
    return Math.floor((promptsUsed / limit) * 100);
  };
  
  // Determine if a feature is locked based on user's plan
  const isFeatureLocked = (requiredPlan: 'free' | 'pro' | 'enterprise') => {
    if (!user) return true;
    
    if (requiredPlan === 'free') return false;
    if (requiredPlan === 'pro') return user.plan !== 'pro' && user.plan !== 'enterprise';
    if (requiredPlan === 'enterprise') return user.plan !== 'enterprise';
    
    return true;
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}</h1>
        <p className="text-zinc-400 mt-1">
          Here's an overview of your AI prompt activity and tools.
        </p>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white" 
            onClick={() => router.push('/dashboard/studio')}
          >
            <Sparkles className="h-4 w-4 mr-2" />
            New Prompt
          </Button>
          
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => router.push('/dashboard/templates')}>
            <FileText className="h-4 w-4 mr-2" />
            Browse Templates
          </Button>
          
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" onClick={() => router.push('/dashboard/history')}>
            <Clock className="h-4 w-4 mr-2" />
            View History
          </Button>
          
          <div className="ml-auto flex items-center text-sm text-zinc-400">
            <div className="hidden md:block mr-4">
              <span className="font-medium text-white">{promptsUsed}</span> prompts used this month
            </div>
            <Badge variant="outline" className="ml-2 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
              {user.plan === 'free' ? 'Free Plan' : user.plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Plan Overview */}
      <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg text-white mb-1 flex items-center">
              {user?.plan === 'free' ? (
                <>
                  <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                  Free Plan
                </>
              ) : user?.plan === 'pro' ? (
                <>
                  <Zap className="h-5 w-5 mr-2 text-blue-400" />
                  Pro Plan
                </>
              ) : (
                <>
                  <Building2 className="h-5 w-5 mr-2 text-purple-400" />
                  Enterprise Plan
                </>
              )}
            </h3>
            <p className="text-zinc-400">
              {user?.plan === 'free' ? 
                'Upgrade to unlock more features and AI tools' : 
                user?.plan === 'pro' ? 
                'You have access to all Pro features' : 
                'You have access to all Enterprise features'}
            </p>
          </div>
          {user?.plan === 'free' && (
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              onClick={() => router.push('/pricing')}
            >
              Upgrade to Pro
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-sm text-zinc-400 mb-1">Monthly Limit</div>
            <div className="text-xl font-semibold">
              {user?.plan === 'enterprise' ? 'Unlimited' : 
               user?.plan === 'pro' ? '2,000 prompts' : 
               '1,000 prompts'}
            </div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-sm text-zinc-400 mb-1">Available Features</div>
            <div className="text-xl font-semibold">
              {user?.plan === 'enterprise' ? 'All features' : 
               user?.plan === 'pro' ? 'Pro features' : 
               'Basic features'}
            </div>
          </div>
          
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="text-sm text-zinc-400 mb-1">Renews On</div>
            <div className="text-xl font-semibold">
              {user?.plan === 'free' ? 'N/A' : 'July 15, 2023'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Usage Stats Card */}
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
              Usage Stats
            </CardTitle>
            <CardDescription>Your AI prompt usage this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-400">Prompts Used</span>
                <span className="font-medium">{promptsUsed} / {getPlanLimit()}</span>
              </div>
              {user.plan !== 'enterprise' && (
                <>
                  <div className="h-2 w-full rounded-full bg-zinc-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${getUsagePercentage()}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{getUsagePercentage()}% of monthly limit</span>
                    <span>Resets in 12 days</span>
                  </div>
                </>
              )}
              
              <div className="pt-2 mt-2 border-t border-zinc-800">
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Features included:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                    {user.plan === 'free' ? '1,000' : user.plan === 'pro' ? '2,000' : 'Unlimited'} monthly prompts
                  </li>
                  <li className="flex items-center text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                    {user.plan === 'free' ? '5' : 'All'} AI tools supported
                  </li>
                  {(user.plan === 'pro' || user.plan === 'enterprise') && (
                    <li className="flex items-center text-zinc-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                      Advanced customization
                    </li>
                  )}
                  {user.plan === 'enterprise' && (
                    <li className="flex items-center text-zinc-400">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                      API access
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            {user.plan !== 'enterprise' && (
              <Button 
                variant="outline" 
                className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                onClick={() => router.push('/pricing')}
              >
                Upgrade Plan
              </Button>
            )}
          </CardFooter>
        </Card>

        {/* Recent Prompts Card */}
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-400" />
              Recent Prompts
            </CardTitle>
            <CardDescription>Your latest AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPrompts.map((prompt) => (
                <div key={prompt.id} className="space-y-1 border-l-2 border-blue-500/30 pl-3 py-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-zinc-300 truncate max-w-[200px]">{prompt.title}</span>
                    <Badge variant="outline" className={`text-xs ${
                      prompt.status === 'draft' ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {prompt.status === 'draft' ? 'Draft' : 'Completed'}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs">
                    <prompt.icon className="h-3 w-3 text-zinc-500 mr-1" />
                    <span className="text-zinc-500">{prompt.categoryName}</span>
                    <span className="text-zinc-600 mx-1.5">•</span>
                    <span className="text-zinc-500">{formatDate(prompt.createdAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              onClick={() => router.push('/dashboard/history')}
            >
              View All Prompts
            </Button>
          </CardFooter>
        </Card>

        {/* Templates Card */}
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-400" />
              Templates
            </CardTitle>
            <CardDescription>Quick access to your favorite templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {favoriteTemplates.map((template) => (
                <Button 
                  key={template.id} 
                  variant="ghost" 
                  className="w-full justify-start text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => router.push(`/dashboard/templates/${template.id}`)}
                >
                  <template.icon className="h-4 w-4 mr-2 text-zinc-500" />
                  {template.name}
                </Button>
              ))}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-blue-400 hover:bg-blue-900/20 hover:text-blue-300"
                onClick={() => router.push('/dashboard/templates')}
              >
                <Plus className="h-4 w-4 mr-2" />
                Browse All Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tools Grid */}
      <h2 className="text-xl font-bold text-white mt-10 mb-5 flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
        AI Prompt Tools
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px]" onClick={() => router.push('/dashboard/tools/content')}>
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <PenTool className="h-5 w-5 mr-2 text-blue-400" />
                Content Writing
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Create blog posts, articles, and social media content</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px]" onClick={() => router.push('/dashboard/tools/creative')}>
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-400" />
                Creative Writing
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Generate stories, characters, and creative content</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px]" onClick={() => router.push('/dashboard/tools/business')}>
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Zap className="h-5 w-5 mr-2 text-blue-400" />
                Business Writing
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Professional emails, proposals, and business documents</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px] ${isFeatureLocked('pro') ? 'relative' : ''}`} onClick={() => !isFeatureLocked('pro') ? router.push('/dashboard/tools/image') : router.push('/pricing')}>
          {isFeatureLocked('pro') && (
            <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center px-4">
                <Lock className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                <p className="text-white font-medium mb-1">Pro Feature</p>
                <p className="text-zinc-400 text-sm mb-3">Upgrade to Pro to access image generation prompts</p>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/pricing');
                  }}>
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          )}
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-blue-400" />
                Image Generation
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Create detailed prompts for AI image generators</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px] ${isFeatureLocked('pro') ? 'relative' : ''}`} onClick={() => !isFeatureLocked('pro') ? router.push('/dashboard/tools/code') : router.push('/pricing')}>
          {isFeatureLocked('pro') && (
            <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center px-4">
                <Lock className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                <p className="text-white font-medium mb-1">Pro Feature</p>
                <p className="text-zinc-400 text-sm mb-3">Upgrade to Pro to access code & technical prompts</p>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/pricing');
                  }}>
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          )}
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Code className="h-5 w-5 mr-2 text-blue-400" />
                Code & Technical
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Generate code, documentation, and technical content</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors group cursor-pointer min-h-[140px] ${isFeatureLocked('enterprise') ? 'relative' : ''}`} onClick={() => !isFeatureLocked('enterprise') ? router.push('/dashboard/tools/custom') : router.push('/pricing')}>
          {isFeatureLocked('enterprise') && (
            <div className="absolute inset-0 bg-zinc-900/70 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center px-4">
                <Lock className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                <p className="text-white font-medium mb-1">Enterprise Feature</p>
                <p className="text-zinc-400 text-sm mb-3">Upgrade to Enterprise for custom AI models</p>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/pricing');
                  }}>
                  Contact Sales
                </Button>
              </div>
            </div>
          )}
          <CardHeader className="pb-2 min-h-[100px]">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Folder className="h-5 w-5 mr-2 text-blue-400" />
                Custom AI Models
              </CardTitle>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </div>
            <CardDescription className="mt-2">Train and use your own custom AI models</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
} 