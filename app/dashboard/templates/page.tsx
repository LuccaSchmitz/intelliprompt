"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpgradeAlert } from "@/components/upgrade-alert";
import {
  Search,
  PenTool,
  MessageSquare,
  Zap,
  ImageIcon,
  Code,
  Sparkles,
  BookOpen,
  Star,
  StarOff,
  Lock,
  Filter,
  Clock
} from "lucide-react";

// Sample template data
const TEMPLATES = [
  // Content Writing Templates
  {
    id: "c1",
    name: "SEO Blog Post",
    description: "Create an SEO-optimized blog post with proper structure and keywords",
    category: "content",
    featured: true,
    popular: true,
    premiumOnly: false,
    prompt: "Write a comprehensive, SEO-optimized blog post about [TOPIC]. Include a compelling introduction, at least 3 main sections with H2 headings, and a conclusion. Incorporate the following keywords naturally throughout the text: [KEYWORDS]. Target a word count of approximately 1500 words. Format the content to be scannable with bullet points, numbered lists, and short paragraphs where appropriate."
  },
  {
    id: "c2",
    name: "Product Description",
    description: "Craft persuasive product descriptions that highlight benefits and features",
    category: "content",
    featured: true,
    popular: false,
    premiumOnly: false,
    prompt: "Create a compelling product description for [PRODUCT NAME], a [PRODUCT TYPE]. Include key features, unique selling points, benefits, specifications, and a clear call to action. The tone should be persuasive and aligned with our brand voice which is [BRAND VOICE]. The description should be approximately 200-300 words and formatted to be visually scannable on both mobile and desktop devices."
  },
  {
    id: "c3",
    name: "Email Newsletter",
    description: "Generate professional email newsletters with engaging content",
    category: "content",
    featured: false,
    popular: true,
    premiumOnly: false,
    prompt: "Create an email newsletter about [TOPIC] for our [INDUSTRY] audience. Include a catchy subject line, a personalized greeting, 3-4 main content sections with appropriate headings, and a clear call to action. The newsletter should follow our brand voice which is [TONE] and be approximately 500 words. Format the content to be mobile-friendly with short paragraphs and visual breaks."
  },
  {
    id: "c4",
    name: "Social Media Campaign",
    description: "Create a cohesive set of social media posts across platforms",
    category: "content",
    featured: false,
    popular: false,
    premiumOnly: true,
    prompt: "Develop a coordinated social media campaign for [CAMPAIGN PURPOSE] across Instagram, Twitter, Facebook, and LinkedIn. Create 3 posts for each platform, adapted to the specific format and audience of each. Include suggested hashtags, posting times, and engagement questions. Posts should align with our brand voice which is [BRAND VOICE] and support our campaign goal to [CAMPAIGN GOAL]."
  },
  
  // Creative Writing Templates
  {
    id: "cr1",
    name: "Short Story Outline",
    description: "Develop a structured outline for a compelling short story",
    category: "creative",
    featured: true,
    popular: true,
    premiumOnly: false,
    prompt: "Create a detailed outline for a [GENRE] short story set in [SETTING]. Include character profiles for the protagonist and antagonist with clear motivations, a narrative arc with inciting incident, rising action, climax, falling action, and resolution. Define the central theme and conflict. The story should be suitable for a [WORD COUNT] word count and target [AUDIENCE] readers."
  },
  {
    id: "cr2",
    name: "Character Development",
    description: "Create rich, multi-dimensional fictional characters",
    category: "creative",
    featured: false,
    popular: true,
    premiumOnly: false,
    prompt: "Develop a complex, multi-dimensional character for a [GENRE] story. Include the character's physical appearance, personality traits (both strengths and flaws), background/history, motivations, internal and external conflicts, relationships with other characters, and arc of development throughout the story. The character should be [AGE] years old and have a profession as a [PROFESSION]. Include one unique quirk or habit that makes this character memorable."
  },
  {
    id: "cr3",
    name: "World Building",
    description: "Construct detailed fictional worlds with rich histories and cultures",
    category: "creative",
    featured: true,
    popular: false,
    premiumOnly: true,
    prompt: "Create a detailed fictional world for a [GENRE] story. Include the physical environment (geography, climate, ecosystems), cultures and societies (social structures, religious/belief systems, traditions, languages), history (major events, conflicts, technological development), political systems, economic systems, and magical/technological systems with clear rules and limitations. The world should have a unique aspect that sets it apart: [UNIQUE ELEMENT]."
  },
  
  // Business Writing Templates
  {
    id: "b1",
    name: "Business Proposal",
    description: "Draft professional business proposals that win clients",
    category: "business",
    featured: true,
    popular: true,
    premiumOnly: false,
    prompt: "Draft a professional business proposal for [PROJECT/SERVICE] targeting [CLIENT/INDUSTRY]. Include an executive summary, problem statement, proposed solution, implementation plan, timeline, budget breakdown, expected ROI, about us section, and terms and conditions. The proposal should be approximately [LENGTH] pages and use a professional tone while highlighting our company's unique value proposition: [VALUE PROPOSITION]."
  },
  {
    id: "b2",
    name: "Sales Email Sequence",
    description: "Create a series of persuasive sales emails to nurture leads",
    category: "business",
    featured: false,
    popular: true,
    premiumOnly: true,
    prompt: "Create a 5-email sales sequence for [PRODUCT/SERVICE] targeting [TARGET AUDIENCE]. The sequence should include: 1) An attention-grabbing initial email introducing the problem, 2) A follow-up highlighting your solution, 3) An email addressing common objections, 4) A case study/testimonial email, and 5) A final call-to-action email with offer. Each email should be 200-300 words maximum, include a compelling subject line, personalization elements, and clear next steps. The tone should be [TONE] and align with our brand voice."
  },
  
  // Image Generation Templates
  {
    id: "i1",
    name: "Product Photography Prompt",
    description: "Create detailed prompts for AI-generated product photos",
    category: "image",
    featured: true,
    popular: true,
    premiumOnly: true,
    prompt: "Generate a detailed prompt for an AI image generator to create a photorealistic product image of [PRODUCT] with the following specifications: Lighting: [LIGHTING STYLE], Background: [BACKGROUND DESCRIPTION], Angle: [CAMERA ANGLE], Composition: [COMPOSITION STYLE], Mood: [MOOD/ATMOSPHERE], Color scheme: [COLOR PALETTE]. The image should highlight the product's [KEY FEATURE] and be suitable for [USAGE CONTEXT]. Style references include [REFERENCE ARTISTS/STYLES]."
  },
  {
    id: "i2",
    name: "Character Illustration",
    description: "Design prompts for AI-generated character illustrations",
    category: "image",
    featured: false,
    popular: false,
    premiumOnly: true,
    prompt: "Create a detailed prompt for an AI image generator to illustrate a character with the following attributes: Gender: [GENDER], Age: [AGE], Ethnicity: [ETHNICITY], Clothing style: [CLOTHING], Distinctive features: [FEATURES], Pose: [POSE DESCRIPTION], Expression: [FACIAL EXPRESSION], Lighting: [LIGHTING STYLE], Background/Setting: [BACKGROUND], Art style: [ART STYLE], References: [SIMILAR CHARACTERS/ARTISTS]. The illustration should convey the character's [PERSONALITY TRAIT] nature and [EMOTION] emotional state."
  },
  
  // Code Templates
  {
    id: "code1",
    name: "API Documentation",
    description: "Generate comprehensive API documentation",
    category: "code",
    featured: true,
    popular: true,
    premiumOnly: true,
    prompt: "Create detailed API documentation for a [API_TYPE] endpoint that [API_FUNCTION]. Include the following sections: 1) Endpoint URL and HTTP method, 2) Request parameters (path, query, header, and body parameters) with descriptions, data types, validation rules, and whether they're required, 3) Authentication requirements, 4) Response format with status codes and example response bodies for success and error scenarios, 5) Rate limiting information, 6) Code examples in [LANGUAGE_1] and [LANGUAGE_2], 7) Common error scenarios and troubleshooting. Format the documentation in markdown."
  },
  {
    id: "code2",
    name: "Function Implementation",
    description: "Create well-structured functions with documentation",
    category: "code",
    featured: false,
    popular: false,
    premiumOnly: true,
    prompt: "Write a [LANGUAGE] function that [FUNCTION_PURPOSE]. The function should accept the following parameters: [PARAMETERS_LIST]. Implement proper error handling for scenarios including [ERROR_SCENARIOS]. Include comprehensive documentation comments that explain the function's purpose, parameters, return value, thrown exceptions, and usage examples. The code should follow best practices for [LANGUAGE] and include unit tests that cover the main functionality and edge cases."
  }
];

export default function TemplatesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([]);
  
  // Filter options
  const [showPremiumOnly, setShowPremiumOnly] = useState<boolean>(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);
  const [showPopularOnly, setShowPopularOnly] = useState<boolean>(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    
    // Simulate loading favorite templates
    setFavoriteTemplates(["c1", "cr1", "b1"]);
  }, [user, loading, router]);
  
  // Filter templates based on selected filters and search query
  const filteredTemplates = TEMPLATES.filter(template => {
    // Category filter
    if (selectedCategory !== "all" && template.category !== selectedCategory) {
      return false;
    }
    
    // Premium filter - if showing premium only and template is not premium, filter out
    if (showPremiumOnly && !template.premiumOnly) {
      return false;
    }
    
    // Featured filter
    if (showFeaturedOnly && !template.featured) {
      return false;
    }
    
    // Popular filter
    if (showPopularOnly && !template.popular) {
      return false;
    }
    
    // Favorites filter
    if (showFavoritesOnly && !favoriteTemplates.includes(template.id)) {
      return false;
    }
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        template.name.toLowerCase().includes(query) || 
        template.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const toggleFavorite = (templateId: string) => {
    setFavoriteTemplates(prev => 
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "content":
        return PenTool;
      case "creative":
        return MessageSquare;
      case "business":
        return Zap;
      case "image":
        return ImageIcon;
      case "code":
        return Code;
      default:
        return Sparkles;
    }
  };
  
  const useTemplate = (template: any) => {
    if (template.premiumOnly && user?.plan === "free") {
      // Show upgrade message instead of navigating
      return;
    }
    
    // Navigate to studio with pre-filled template
    router.push(`/dashboard/studio?template=${template.id}`);
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
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Prompt Templates</h1>
        <p className="text-zinc-400 mt-1">
          Browse and use pre-crafted prompt templates for various purposes
        </p>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 w-full"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              className={showFavoritesOnly ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star className="h-4 w-4 mr-1" />
              Favorites
            </Button>
            
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              size="sm"
              className={showFeaturedOnly ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            >
              <Sparkles className="h-4 w-4 mr-1" />
              Featured
            </Button>
            
            <Button
              variant={showPopularOnly ? "default" : "outline"}
              size="sm"
              className={showPopularOnly ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              onClick={() => setShowPopularOnly(!showPopularOnly)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Popular
            </Button>
            
            <Button
              variant={showPremiumOnly ? "default" : "outline"}
              size="sm"
              className={showPremiumOnly ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            >
              <Lock className="h-4 w-4 mr-1" />
              Premium
            </Button>
          </div>
        </div>
      </div>
      
      {/* Category Tabs */}
      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
        <TabsList className="bg-zinc-800 border-zinc-700 mb-6 grid grid-cols-3 md:grid-cols-6 md:w-fit">
          <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white">
            All
          </TabsTrigger>
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
      
      {/* Premium Features Alert */}
      {user.plan === "free" && (selectedCategory === "image" || selectedCategory === "code" || filteredTemplates.some(t => t.premiumOnly)) && (
        <UpgradeAlert type="feature-locked" className="mb-6" />
      )}
      
      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            // Get the category icon
            const CategoryIcon = getCategoryIcon(template.category);
            const isPremiumLocked = template.premiumOnly && user.plan === "free";
            
            return (
              <Card 
                key={template.id} 
                className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 hover:bg-zinc-800/70 transition-colors ${isPremiumLocked ? 'relative' : ''}`}
              >
                {isPremiumLocked && (
                  <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <div className="text-center px-4">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                      <p className="text-white font-medium mb-1">Premium Template</p>
                      <p className="text-zinc-400 text-sm mb-3">Upgrade to access premium templates</p>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                        onClick={() => router.push('/pricing')}
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CategoryIcon className="h-5 w-5 mr-2 text-blue-400" />
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-zinc-400 hover:text-yellow-400 hover:bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(template.id);
                      }}
                    >
                      {favoriteTemplates.includes(template.id) ? (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </Badge>
                    
                    {template.featured && (
                      <Badge variant="secondary" className="bg-blue-950/50 text-blue-400 border-blue-500/20">
                        Featured
                      </Badge>
                    )}
                    
                    {template.popular && (
                      <Badge variant="secondary" className="bg-purple-950/50 text-purple-400 border-purple-500/20">
                        Popular
                      </Badge>
                    )}
                    
                    {template.premiumOnly && (
                      <Badge variant="secondary" className="bg-amber-950/50 text-amber-400 border-amber-500/20">
                        Premium
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${isPremiumLocked ? 'bg-zinc-800 text-zinc-500' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white'}`}
                    onClick={() => useTemplate(template)}
                    disabled={isPremiumLocked}
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
          <Search className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-zinc-400 mb-1">No templates found</h3>
          <p className="text-zinc-500">
            Try adjusting your filters or search query
          </p>
        </div>
      )}
    </div>
  );
} 