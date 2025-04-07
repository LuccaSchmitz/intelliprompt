"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/authContext";
import { UpgradeAlert } from "@/components/upgrade-alert";
import {
  Sparkles,
  Copy,
  Check,
  PenTool,
  FileText,
  Zap,
  ImageIcon,
  Code,
  Save,
  Loader2,
  Lock,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

// Tool icons mapping (same as in demo page)
const icons: Record<string, any> = {
  "content": PenTool,
  "creative": MessageSquare,
  "business": Zap,
  "image": ImageIcon,
  "code": Code
};

export default function PromptStudioPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // State for the prompt studio
  const [selectedCategory, setSelectedCategory] = useState<string>("content");
  const [promptName, setPromptName] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [advancedSettings, setAdvancedSettings] = useState<boolean>(false);
  const [promptLength, setPromptLength] = useState<number>(75); // 0-100 representing percentage of max length
  const [tone, setTone] = useState<string>("professional");
  const [audience, setAudience] = useState<string>("general");
  const [includeExamples, setIncludeExamples] = useState<boolean>(true);
  const [includeCaveats, setIncludeCaveats] = useState<boolean>(true);
  
  // Feature locking based on plan
  const isAdvancedSettingsLocked = user?.plan === "free";
  const isSavingLocked = user?.plan === "free";
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setEnhancedPrompt("");
  };
  
  const handleCopyToClipboard = () => {
    if (enhancedPrompt) {
      navigator.clipboard.writeText(enhancedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to clipboard",
        description: "The enhanced prompt has been copied to your clipboard.",
        duration: 2000,
      });
    }
  };
  
  const generateEnhancedPrompt = async () => {
    if (!inputPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt before enhancing.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the enhance-prompt API
      const response = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: inputPrompt.trim(),
          category: selectedCategory,
          settings: advancedSettings ? {
            promptLength,
            tone,
            audience,
            includeExamples,
            includeCaveats
          } : undefined
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.enhancedPrompt) {
          setEnhancedPrompt(data.enhancedPrompt);
        } else {
          throw new Error("Failed to enhance prompt");
        }
      } else {
        throw new Error("API call failed");
      }
    } catch (error) {
      console.error('Error generating enhanced prompt:', error);
      toast({
        title: "Error",
        description: "Failed to enhance prompt. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to client-side enhancement
      const CategoryIcon = icons[selectedCategory] || PenTool;
      setEnhancedPrompt(`Enhanced version of "${inputPrompt}" for ${selectedCategory} category. This is a placeholder as the API call failed.`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const savePrompt = async () => {
    if (!promptName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for your prompt before saving.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call to save the prompt
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Prompt saved",
        description: "Your prompt has been saved successfully.",
      });
    }, 1000);
  };
  
  // Determine category description based on selected category
  const getCategoryDescription = () => {
    switch (selectedCategory) {
      case "content":
        return "Create engaging blog posts, articles, and marketing materials";
      case "creative":
        return "Generate stories, characters, and creative content";
      case "business":
        return "Professional emails, proposals, and business documents";
      case "image":
        return "Create detailed prompts for AI image generators";
      case "code":
        return "Generate code, documentation, and technical content";
      default:
        return "";
    }
  };
  
  // Get current category icon
  const CategoryIcon = icons[selectedCategory] || PenTool;

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Prompt Studio</h1>
        <p className="text-zinc-400 mt-1">
          Enhance your prompts for better AI outputs
        </p>
      </div>
      
      {/* Premium feature alert for free users */}
      {(user.plan === "free" && (advancedSettings || isSavingLocked)) && (
        <UpgradeAlert type="feature-locked" className="mb-6" />
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                Input Prompt
              </CardTitle>
              <CardDescription>
                Enter your basic prompt to enhance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-full">
                  <TabsList className="bg-zinc-800 border-zinc-700 mb-2 grid w-full grid-cols-5">
                    <TabsTrigger value="content" className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white">
                      Content
                    </TabsTrigger>
                    <TabsTrigger value="creative" className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white">
                      Creative
                    </TabsTrigger>
                    <TabsTrigger value="business" className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white">
                      Business
                    </TabsTrigger>
                    <TabsTrigger 
                      value="image" 
                      className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white relative"
                      disabled={user.plan === "free"}
                    >
                      {user.plan === "free" && (
                        <div className="absolute -top-1 -right-1">
                          <Lock className="h-3 w-3 text-amber-400" />
                        </div>
                      )}
                      Image
                    </TabsTrigger>
                    <TabsTrigger 
                      value="code" 
                      className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white relative"
                      disabled={user.plan === "free"}
                    >
                      {user.plan === "free" && (
                        <div className="absolute -top-1 -right-1">
                          <Lock className="h-3 w-3 text-amber-400" />
                        </div>
                      )}
                      Code
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex items-center space-x-2 text-sm text-zinc-400">
                  <CategoryIcon className="h-4 w-4 text-blue-400" />
                  <span>{getCategoryDescription()}</span>
                </div>
              </div>
              
              {/* Prompt Name Input */}
              <div className="space-y-2">
                <Label htmlFor="promptName">Prompt Name</Label>
                <Input 
                  id="promptName" 
                  placeholder="Enter a name for your prompt"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  className="bg-zinc-800 border-zinc-700"
                />
              </div>
              
              {/* Basic Prompt Input */}
              <div className="space-y-2">
                <Label htmlFor="inputPrompt">Your Basic Prompt</Label>
                <Textarea 
                  id="inputPrompt"
                  placeholder={`Enter your prompt here...\nExample: "Write about AI"`}
                  value={inputPrompt}
                  onChange={(e) => setInputPrompt(e.target.value)}
                  className="bg-zinc-800 border-zinc-700 min-h-[150px]"
                />
              </div>
              
              {/* Advanced Settings */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-zinc-400 hover:text-zinc-300 p-0 h-auto" 
                      onClick={() => !isAdvancedSettingsLocked && setAdvancedSettings(!advancedSettings)}
                    >
                      {advancedSettings ? (
                        <ChevronUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ChevronDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">Advanced Settings</span>
                    </Button>
                    {isAdvancedSettingsLocked && (
                      <div className="flex items-center">
                        <Lock className="h-3 w-3 text-amber-400 mr-1" />
                        <span className="text-xs text-amber-400">Pro Feature</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {advancedSettings && !isAdvancedSettingsLocked && (
                  <div className="space-y-4 pt-2 pb-1 px-2 border border-zinc-800 rounded-md">
                    {/* Prompt Length */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="promptLength" className="text-xs">Prompt Length</Label>
                        <span className="text-xs text-zinc-400">
                          {promptLength < 33 ? "Concise" : promptLength < 66 ? "Balanced" : "Detailed"}
                        </span>
                      </div>
                      <Slider 
                        id="promptLength"
                        min={0} 
                        max={100} 
                        step={1} 
                        value={[promptLength]} 
                        onValueChange={(value) => setPromptLength(value[0])}
                        className="py-1"
                      />
                    </div>
                    
                    {/* Tone Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="tone" className="text-xs">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger id="tone" className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Target Audience */}
                    <div className="space-y-2">
                      <Label htmlFor="audience" className="text-xs">Target Audience</Label>
                      <Select value={audience} onValueChange={setAudience}>
                        <SelectTrigger id="audience" className="bg-zinc-800 border-zinc-700">
                          <SelectValue placeholder="Select audience" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="beginners">Beginners</SelectItem>
                          <SelectItem value="experts">Experts</SelectItem>
                          <SelectItem value="professionals">Professionals</SelectItem>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="executives">Executives</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Include Examples Switch */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeExamples" className="text-xs cursor-pointer">Include Examples</Label>
                      <Switch 
                        id="includeExamples" 
                        checked={includeExamples}
                        onCheckedChange={setIncludeExamples}
                      />
                    </div>
                    
                    {/* Include Caveats Switch */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="includeCaveats" className="text-xs cursor-pointer">Include Limitations/Caveats</Label>
                      <Switch 
                        id="includeCaveats" 
                        checked={includeCaveats}
                        onCheckedChange={setIncludeCaveats}
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                onClick={generateEnhancedPrompt}
                disabled={isGenerating || !inputPrompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Enhance Prompt
                  </>
                )}
              </Button>
              
              {/* Warning for free tier users on limited capabilities */}
              {user.plan === "free" && (
                <div className="flex items-center text-xs text-amber-400">
                  <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>Free plan limited to basic prompt enhancement</span>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-blue-400" />
                Enhanced Prompt
              </CardTitle>
              <CardDescription>
                Your prompt transformed with AI expertise
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {enhancedPrompt ? (
                <div className="rounded-md bg-gradient-to-r p-[1px] from-blue-500/20 to-purple-500/20">
                  <div className="bg-zinc-800/80 rounded-md p-4 min-h-[250px] max-h-[500px] overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-blue-100 font-sans">
                      {enhancedPrompt}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="border border-dashed border-zinc-700 rounded-md p-8 flex flex-col items-center justify-center min-h-[250px]">
                  <Sparkles className="h-8 w-8 text-zinc-600 mb-4" />
                  <p className="text-zinc-500 text-center">
                    Your enhanced prompt will appear here after you enhance a prompt.
                  </p>
                  <p className="text-zinc-600 text-xs text-center mt-2">
                    Enter a prompt on the left and click "Enhance Prompt" to get started.
                  </p>
                </div>
              )}
            </CardContent>
            {enhancedPrompt && (
              <CardFooter className="flex flex-wrap gap-3 justify-between">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                
                <div className="flex gap-3">
                  {/* Save Button - Pro feature */}
                  <Button
                    variant="outline"
                    className={`border-zinc-700 ${isSavingLocked ? 'text-zinc-500' : 'text-zinc-300 hover:bg-zinc-800'}`}
                    onClick={savePrompt}
                    disabled={isSavingLocked || isSaving || !enhancedPrompt || !promptName.trim()}
                  >
                    {isSavingLocked ? (
                      <>
                        <Lock className="mr-2 h-4 w-4 text-amber-400" />
                        Pro Feature
                      </>
                    ) : isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Prompt
                      </>
                    )}
                  </Button>
                  
                  {/* Use button */}
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                  >
                    Use This Prompt
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
} 