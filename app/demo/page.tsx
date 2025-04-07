"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, Zap, ArrowRight, Info, AlertTriangle, Lock, Check, Copy, 
  ImageIcon, PenTool, Code, MessageSquare, LucideIcon, ExternalLink, ListChecks
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/authContext";
import { UpgradeAlert } from "@/components/upgrade-alert";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Maximum number of prompts a user can generate in the demo
const DEMO_LIMIT = 3;

// Define an interface for prompt examples
interface Example {
  id: string;
  name: string;
  input: string;
  enhanced: string;
}

// Define an interface for prompt categories with an icon
interface PromptCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  examples: Example[];
}

// Prompt categories with examples
const PROMPT_CATEGORIES: PromptCategory[] = [
  {
    id: "content",
    name: "Content Writing",
    icon: PenTool,
    description: "Create engaging blog posts, articles, and marketing materials",
    examples: [
      {
        id: "blog",
        name: "Blog Post",
        input: "Write about AI tools.",
        enhanced: "Write a 1500-word comprehensive blog post about the top 5 AI productivity tools for 2023. Include pros, cons, pricing, use cases, and a comparison table. Target audience is tech-savvy professionals looking to enhance their workflow.",
      },
      {
        id: "social",
        name: "Social Media",
        input: "Create a social post about our new product.",
        enhanced: "Create a series of 5 engaging Instagram captions for our new AI writing assistant product launch. Include relevant hashtags, a clear value proposition, and a compelling call-to-action. Each caption should be under 125 characters and appeal to freelance writers and content creators.",
      },
      {
        id: "newsletter",
        name: "Email Newsletter",
        input: "Write a newsletter about tech trends.",
        enhanced: "Create a 600-word email newsletter about emerging AI technologies in Q3 2023. Structure it with an attention-grabbing subject line, a personal introduction, 3 main trend sections with practical takeaways, relevant industry statistics, and a conversational conclusion with a clear next-step CTA. Optimize for mobile readability with short paragraphs and bulleted lists.",
      },
      {
        id: "product",
        name: "Product Description",
        input: "Write a description for a smartwatch.",
        enhanced: "Write a compelling 250-word product description for our premium smartwatch targeting health-conscious professionals. Highlight 5 key features including heart rate monitoring, sleep tracking, and 7-day battery life. Use sensory language to describe the lightweight feel and premium materials. Include technical specifications in a scannable format and emphasize the benefits of each feature.",
      }
    ],
  },
  {
    id: "creative",
    name: "Creative Writing",
    icon: MessageSquare,
    description: "Generate stories, characters, and creative content",
    examples: [
      {
        id: "story",
        name: "Short Story",
        input: "Write a story about a detective.",
        enhanced: "Write a 2000-word noir-style detective story set in cyberpunk Tokyo, 2075. The protagonist is a grizzled detective with cybernetic enhancements who's investigating the disappearance of a prominent AI researcher. Include themes of technological ethics, corporate espionage, and the blurring line between human and machine consciousness.",
      },
      {
        id: "character",
        name: "Character Development",
        input: "Create a fantasy character.",
        enhanced: "Create a detailed character profile for a morally ambiguous antagonist in a high fantasy setting. Include their physical appearance, psychological traits, motivations, background story, strengths, weaknesses, and three defining relationships that shaped their worldview. The character should have an internal conflict related to their magical abilities.",
      },
      {
        id: "dialogue",
        name: "Dialogue Scene",
        input: "Write a conversation between two friends.",
        enhanced: "Write a tension-filled dialogue scene between two childhood friends who haven't spoken in 15 years after a betrayal. Set in a quiet coffee shop during a thunderstorm, the conversation should gradually reveal their shared history without exposition dumps. Use subtext, varying sentence lengths, and minimal dialogue tags. The conversation should end with an unresolved emotional cliffhanger.",
      },
      {
        id: "worldbuilding",
        name: "World Building",
        input: "Create a fictional world.",
        enhanced: "Develop a detailed post-apocalyptic world 200 years after a global ecological collapse. Describe the new societal structures that emerged, the environmental adaptations humans made, three major geographic regions with distinct cultures, the new economic system based on water purification, and the mythologies that evolved to explain the collapse. Include sensory details about daily life and the technological regression/advancement in different domains."
      }
    ],
  },
  {
    id: "business",
    name: "Business Writing",
    icon: Zap,
    description: "Professional emails, proposals, and business documents",
    examples: [
      {
        id: "email",
        name: "Email Sequence",
        input: "Write a follow-up email.",
        enhanced: "Create a 5-email sales sequence for our SaaS product targeting enterprise CIOs. The sequence should start with a pain point about data security, introduce our solution in email 2, provide social proof in email 3, address common objections in email 4, and end with a time-limited offer in email 5. Each email should be 150-200 words with compelling subject lines and clear CTAs.",
      },
      {
        id: "proposal",
        name: "Business Proposal",
        input: "Write a business proposal.",
        enhanced: "Write a detailed 3-page business proposal for a digital transformation project for a mid-size retail company. Include an executive summary, problem statement, proposed solution with implementation timeline, detailed budget breakdown, expected ROI with metrics, and team qualifications. The proposal should address the client's pain points of declining foot traffic and inefficient inventory management.",
      },
      {
        id: "presentation",
        name: "Presentation Script",
        input: "Write a presentation about our quarterly results.",
        enhanced: "Create a 10-minute presentation script for the Q2 financial results meeting with stakeholders. Structure it with a compelling hook highlighting our 22% growth, three main sections on revenue streams, cost optimization initiatives, and market expansion, with supporting data points for each claim. Include transition phrases between sections, audience engagement questions, and a forward-looking conclusion with three actionable strategic priorities for Q3.",
      },
      {
        id: "job",
        name: "Job Description",
        input: "Write a job posting for a developer.",
        enhanced: "Create a comprehensive job description for a Senior Full-Stack Developer position that attracts top talent. Include specific responsibilities (system architecture, code review processes, mentoring junior developers), required technical skills with years of experience (React, Node.js, AWS), soft skills (cross-functional collaboration, communication), company benefits with specific details (remote work policy, professional development budget of $2,500/year), and a compelling company mission statement that emphasizes impact and innovation.",
      }
    ],
  },
  {
    id: "image",
    name: "Image Generation",
    icon: ImageIcon,
    description: "Create detailed prompts for AI image generators",
    examples: [
      {
        id: "landscape",
        name: "Landscape",
        input: "Create an image of a mountain.",
        enhanced: "Generate a photorealistic landscape of a majestic mountain peak at golden hour with dramatic backlighting. The foreground should feature a crystal-clear alpine lake reflecting the mountain and surrounding pine forest. Include small details like distant hikers on a winding trail and eagles soaring overhead. The atmosphere should have volumetric light with subtle mist rising from the valley. Ultra-detailed 8K resolution with cinematic composition using rule of thirds.",
      },
      {
        id: "character",
        name: "Character Design",
        input: "Create an image of a wizard.",
        enhanced: "Create a highly detailed character portrait of an elderly wizard with weather-worn skin and piercing blue eyes. He should have an intricate robe with embroidered astronomical symbols in gold thread, and be holding a gnarled staff topped with a levitating crystal. The lighting should be dramatic chiaroscuro style with magical blue light emanating from the crystal illuminating his face from below. Background should show a blurred ancient library. Style should blend photorealism with fantasy illustration, 4K quality.",
      },
      {
        id: "product",
        name: "Product Visualization",
        input: "Create an image of headphones.",
        enhanced: "Generate a professional product visualization of premium wireless headphones with a minimalist design. The headphones should be floating/exploded view against a gradient background transitioning from deep blue to purple. Incorporate subtle metallic accents on the ear cups, ultra-soft leather ear cushions with visible texture, and illuminated touch controls. Use studio lighting with soft highlights that accentuate the curves and premium materials. Add depth of field to create a commercial photography aesthetic, 8K resolution, advertising quality.",
      },
      {
        id: "concept",
        name: "Concept Art",
        input: "Create a futuristic city.",
        enhanced: "Generate concept art of a vertical futuristic city in the year 2150 built into a massive cliff face overlooking an ocean. The architecture should blend organic forms with advanced technology, featuring transparent skyways connecting buildings, lush hanging gardens cascading down levels, and anti-gravity transportation pods moving between structures. The color palette should include teal, amber, and silver with bioluminescent elements throughout. Lighting should show a sunset casting long shadows across the structure, with the city's lights just beginning to illuminate. Style should resemble professional digital concept art with atmospheric perspective and dramatic scale.",
      }
    ],
  },
  {
    id: "code",
    name: "Code & Technical",
    icon: Code,
    description: "Generate code, documentation, and technical content",
    examples: [
      {
        id: "function",
        name: "Code Function",
        input: "Write a function to sort an array.",
        enhanced: "Write a TypeScript function that implements a custom sorting algorithm for an array of objects representing financial transactions. The function should accept parameters for the array, the key to sort by (date, amount, category), sort direction, and an optional callback for custom comparison logic. Include type definitions, error handling for invalid inputs, performance optimization for large datasets, comprehensive JSDoc documentation with examples, and unit tests covering edge cases like empty arrays and duplicate values.",
      },
      {
        id: "api",
        name: "API Documentation",
        input: "Document a REST API endpoint.",
        enhanced: "Create comprehensive API documentation for a user authentication endpoint. Include the exact endpoint URL structure (/api/v2/auth/login), accepted HTTP methods (POST), required and optional request headers, request body parameters with data types and validation rules, all possible response status codes with example response bodies, rate limiting information, authentication requirements, common error scenarios and troubleshooting steps, and code examples in JavaScript, Python, and cURL formats.",
      },
      {
        id: "tutorial",
        name: "Technical Tutorial",
        input: "Write a tutorial on setting up React.",
        enhanced: "Create a step-by-step tutorial for setting up a production-ready React application with TypeScript, Tailwind CSS, and testing infrastructure. Structure it with prerequisites (specific versions), environment setup sections, configuration explanations with code snippets, common pitfalls and solutions, performance optimization techniques, deployment instructions for AWS and Vercel, and a troubleshooting section addressing the 5 most common errors. Include a GitHub repository link with the complete working code and a live demo URL.",
      },
      {
        id: "algorithm",
        name: "Algorithm Explanation",
        input: "Explain a sorting algorithm.",
        enhanced: "Create an in-depth explanation of the QuickSort algorithm tailored for a mid-level developer. Include the theoretical foundation with mathematical time/space complexity analysis (best, average, and worst cases), pseudocode representation, a fully commented implementation in JavaScript with type annotations, step-by-step visualization of the algorithm working through a specific example array, optimization techniques for different input cases, common implementation pitfalls, and comparisons with MergeSort and HeapSort in different scenarios. Add references to academic papers and advanced resources.",
      }
    ],
  }
];

// Type for usage data from API
interface DemoUsageData {
  usageCount: number;
  remainingCount: number;
  hasReachedLimit: boolean;
  limit: number;
}

// Extend Window interface to include our custom function
declare global {
  interface Window {
    updateFavicon?: (count: number) => void;
  }
}

export default function DemoPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("content");
  const [selectedExample, setSelectedExample] = useState<string>("");
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [enhancedPrompt, setEnhancedPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [usageCount, setUsageCount] = useState<number>(0);
  const [remainingCount, setRemainingCount] = useState<number>(3);
  const [showLimitAlert, setShowLimitAlert] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  
  // Load usage data from API on mount
  useEffect(() => {
    const fetchUsageData = async () => {
      try {
        const response = await fetch('/api/demo-usage');
        const data: DemoUsageData = await response.json();
        
        setUsageCount(data.usageCount);
        setRemainingCount(data.remainingCount);
        setShowLimitAlert(data.hasReachedLimit);
      } catch (error) {
        console.error('Failed to fetch usage data:', error);
        // Fall back to defaults
        setUsageCount(0);
        setRemainingCount(3);
      } finally {
        setIsLoading(false);
      }
    };

    if (!user) {
      fetchUsageData();
    } else {
      setIsLoading(false);
    }
  }, [user]);
  
  // Update the favicon when remainingCount changes
  useEffect(() => {
    // Only update favicon for non-authenticated users
    if (!user && !isLoading) {
      // Check if window.updateFavicon function is available
      if (typeof window !== 'undefined' && window.updateFavicon) {
        window.updateFavicon(remainingCount);
      }
    }
  }, [remainingCount, user, isLoading]);
  
  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedExample("");
    setInputPrompt("");
    setEnhancedPrompt("");
  };
  
  // Handle example selection
  const handleExampleSelect = (exampleId: string) => {
    setSelectedExample(exampleId);
    
    // Get corresponding example data
    const category = PROMPT_CATEGORIES.find(c => c.id === selectedCategory);
    if (category) {
      const example = category.examples.find(e => e.id === exampleId);
      if (example) {
        setInputPrompt(example.input);
        setEnhancedPrompt(""); // Clear any previous enhanced prompt
      }
    }
  };
  
  // Clear example and let user enter their own prompt
  const handleUseOwnPrompt = () => {
    setSelectedExample("");
    setInputPrompt("");
    setEnhancedPrompt("");
  };
  
  // Toggle comparison view
  const toggleComparison = () => {
    setShowComparison(prev => !prev);
  };
  
  // Generate enhanced prompt
  const generateEnhancedPrompt = async () => {
    if (!inputPrompt.trim()) return;
    
    // Check if user is logged in or has remaining uses
    if (!user && showLimitAlert) {
      return;
    }
    
    setIsGenerating(true);
    setShowComparison(false); // Reset comparison view on new generation
    
    try {
      if (!user) {
        // Increment usage via API for non-authenticated users
        try {
          const response = await fetch('/api/demo-usage', {
            method: 'POST',
          });
          
          if (response.ok) {
            const data: DemoUsageData = await response.json();
            setUsageCount(data.usageCount);
            setRemainingCount(data.remainingCount);
            setShowLimitAlert(data.hasReachedLimit);
          } else {
            // If we got an error, check if it's because the limit is reached
            const errorData = await response.json();
            if (response.status === 403) {
              setShowLimitAlert(true);
              toast({
                title: "Demo limit reached",
                description: "You've reached the demo limit. Create an account to continue.",
                variant: "destructive",
              });
              setIsGenerating(false);
              return;
            }
          }
        } catch (error) {
          console.error('Failed to update usage count:', error);
        }
      }

      // Call our enhance-prompt API endpoint
      try {
        const enhanceResponse = await fetch('/api/enhance-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: inputPrompt.trim(),
            category: selectedCategory,
          }),
        });
        
        if (enhanceResponse.ok) {
          const data = await enhanceResponse.json();
          if (data.success && data.enhancedPrompt) {
            setEnhancedPrompt(data.enhancedPrompt);
          } else {
            // If the API returns a success: false, fall back to local enhancement
            const enhanced = enhancePrompt(inputPrompt);
            setEnhancedPrompt(enhanced);
          }
        } else {
          // If API call fails, fall back to local enhancement
          const enhanced = enhancePrompt(inputPrompt);
          setEnhancedPrompt(enhanced);
        }
      } catch (error) {
        console.error('Error calling enhance-prompt API:', error);
        // Fallback to local enhancement if API call fails
        const enhanced = enhancePrompt(inputPrompt);
        setEnhancedPrompt(enhanced);
      }
      
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating enhanced prompt:', error);
      setIsGenerating(false);
    }
  };
  
  // Mock prompt enhancement function
  const enhancePrompt = (prompt: string): string => {
    // If it's an example, return the predefined enhanced version
    if (selectedExample) {
      const category = PROMPT_CATEGORIES.find(c => c.id === selectedCategory);
      if (category) {
        const example = category.examples.find(e => e.id === selectedExample);
        if (example) {
          return example.enhanced;
        }
      }
    }
    
    // Real prompt enhancement logic based on category
    const inputText = prompt.trim();
    
    // Base enhancement frameworks by category
    const enhancementFrameworks: Record<string, (input: string) => string> = {
      "content": (input) => {
        // Content writing enhancements
        const wordCount = Math.max(Math.round(input.length * 2.5), 600);
        const sections = Math.floor(Math.random() * 3) + 3; // 3-5 sections
        
        const contentFormats = ["blog post", "article", "guide", "analysis", "review"];
        const format = contentFormats[Math.floor(Math.random() * contentFormats.length)];
        
        const audiences = ["professionals", "beginners", "enthusiasts", "experts", "general audience"];
        const audience = audiences[Math.floor(Math.random() * audiences.length)];
        
        const structures = [
          "with an engaging introduction, detailed body, and actionable conclusion",
          "structured with headers, subheaders, and bullet points for clarity",
          "using the AIDA (Attention, Interest, Desire, Action) framework",
          "with a compelling narrative arc and supporting evidence",
          "including real-world examples and case studies"
        ];
        const structure = structures[Math.floor(Math.random() * structures.length)];
        
        return `Write a ${wordCount}-word comprehensive ${format} about ${input}. Include ${sections} distinct sections ${structure}. Target audience is ${audience}. Incorporate relevant statistics, actionable takeaways, and address potential questions or objections from readers.`;
      },
      "creative": (input) => {
        // Creative writing enhancements
        const genres = ["science fiction", "fantasy", "mystery", "romance", "thriller", "historical fiction"];
        const genre = genres[Math.floor(Math.random() * genres.length)];
        
        const wordCount = Math.max(Math.round(input.length * 3), 1000);
        
        const elements = [
          "vivid sensory details and atmospheric descriptions",
          "complex character motivations and internal conflicts",
          "unexpected plot twists and subversions of genre conventions",
          "thematic depth exploring moral ambiguity",
          "unique worldbuilding elements that influence the narrative"
        ];
        const element = elements[Math.floor(Math.random() * elements.length)];
        
        const techniques = [
          "using show-don't-tell techniques",
          "with varied sentence structure and pacing",
          "employing metaphor and symbolism throughout",
          "using dialogue to reveal character and advance plot",
          "with a distinctive narrative voice"
        ];
        const technique = techniques[Math.floor(Math.random() * techniques.length)];
        
        return `Create a ${wordCount}-word ${genre} piece about ${input}. Incorporate ${element}, ${technique}. Develop a compelling narrative arc with rising action, climax, and resolution. Characters should have clear motivations, flaws, and growth. The setting should feel immersive and integral to the story.`;
      },
      "business": (input) => {
        // Business writing enhancements
        const formats = ["proposal", "report", "presentation", "strategy document", "analysis", "case study"];
        const format = formats[Math.floor(Math.random() * formats.length)];
        
        const businessAspects = [
          "ROI and financial projections",
          "market analysis and competitive positioning",
          "implementation timeline and milestones",
          "risk assessment and mitigation strategies",
          "resource allocation and team structure"
        ];
        const aspect1 = businessAspects[Math.floor(Math.random() * businessAspects.length)];
        let aspect2 = businessAspects[Math.floor(Math.random() * businessAspects.length)];
        while (aspect2 === aspect1) {
          aspect2 = businessAspects[Math.floor(Math.random() * businessAspects.length)];
        }
        
        const structures = [
          "executive summary, problem statement, solution, implementation, and conclusion",
          "situation analysis, objectives, strategies, tactics, and evaluation metrics",
          "background, findings, recommendations, and next steps",
          "current state, desired state, gap analysis, and roadmap"
        ];
        const structure = structures[Math.floor(Math.random() * structures.length)];
        
        return `Develop a professional ${format} for ${input} that includes detailed sections on ${aspect1} and ${aspect2}. Structure the document with ${structure}. Use precise business terminology, data-driven insights, and actionable recommendations. Format with clear headers, bullet points for key takeaways, and visual elements where appropriate. Include measurable objectives and success criteria.`;
      },
      "image": (input) => {
        // Image prompt enhancements
        const styles = [
          "photorealistic", "cinematic", "digital art", "oil painting", 
          "watercolor", "concept art", "3D rendering", "anime"
        ];
        const style = styles[Math.floor(Math.random() * styles.length)];
        
        const lighting = [
          "golden hour sunlight", "dramatic side lighting", "soft diffused light", 
          "neon lights", "moonlight", "studio lighting", "backlighting"
        ];
        const lightType = lighting[Math.floor(Math.random() * lighting.length)];
        
        const compositions = [
          "rule of thirds", "dynamic perspective", "symmetrical composition",
          "extreme close-up", "panoramic view", "low angle shot", "bird's eye view"
        ];
        const composition = compositions[Math.floor(Math.random() * compositions.length)];
        
        const details = [
          "intricate details", "vibrant colors", "high contrast", 
          "atmospheric elements", "textured surfaces", "shallow depth of field"
        ];
        const detail = details[Math.floor(Math.random() * details.length)];
        
        const resolutions = ["8K", "4K", "ultra-detailed"];
        const resolution = resolutions[Math.floor(Math.random() * resolutions.length)];
        
        return `Generate a ${style} image of ${input} with ${lightType} and ${detail}. Use ${composition} for visual interest. The scene should have foreground, midground, and background elements to create depth. Include subtle environmental elements that enhance the mood and tell a story. ${resolution} resolution with photorealistic textures and accurate proportions.`;
      },
      "code": (input) => {
        // Code prompt enhancements
        const languages = ["JavaScript", "Python", "TypeScript", "Java", "C#", "Go", "Ruby"];
        const language = languages[Math.floor(Math.random() * languages.length)];
        
        const codeTypes = [
          "function", "class", "API endpoint", "utility", 
          "algorithm implementation", "data structure", "CLI tool"
        ];
        const codeType = codeTypes[Math.floor(Math.random() * codeTypes.length)];
        
        const requirements = [
          "type safety and input validation",
          "error handling and logging",
          "performance optimization",
          "memory efficiency",
          "test cases and examples",
          "documentation and comments"
        ];
        const req1 = requirements[Math.floor(Math.random() * requirements.length)];
        let req2 = requirements[Math.floor(Math.random() * requirements.length)];
        while (req2 === req1) {
          req2 = requirements[Math.floor(Math.random() * requirements.length)];
        }
        
        return `Write a well-structured ${language} ${codeType} that ${input}. Include ${req1} and ${req2}. The code should follow best practices for readability and maintainability with appropriate naming conventions. Add detailed comments explaining complex logic, and include JSDoc or equivalent documentation. Provide example usage scenarios that demonstrate different input cases and expected outputs. The implementation should be production-ready and follow modern coding standards.`;
      }
    };
    
    // Get the appropriate enhancement function based on category
    const enhancementFunction = enhancementFrameworks[selectedCategory] || enhancementFrameworks["content"];
    
    // Apply category-specific enhancement
    let enhancedPrompt = enhancementFunction(inputText);
    
    // Add universal prompt engineering elements for any AI model
    const universalElements = [
      `\n\nPlease make the output ${["detailed", "comprehensive", "specific", "precise", "thorough"][Math.floor(Math.random() * 5)]}.`,
      `\n\nFormat the response to be ${["easy to read", "well-structured", "visually organized", "scannable", "logically flowing"][Math.floor(Math.random() * 5)]}.`,
      `\n\nEnsure high quality by ${["using evidence-based information", "providing concrete examples", "avoiding fluff or filler content", "balancing depth and brevity", "focusing on practical application"][Math.floor(Math.random() * 5)]}.`
    ];
    
    // Add 1-2 universal elements randomly
    const numElements = Math.floor(Math.random() * 2) + 1;
    const shuffledElements = [...universalElements].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < numElements; i++) {
      enhancedPrompt += shuffledElements[i];
    }
    
    return enhancedPrompt;
  };
  
  // Copy enhanced prompt to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Get current category
  const currentCategory = PROMPT_CATEGORIES.find(c => c.id === selectedCategory) || PROMPT_CATEGORIES[0];
  const CategoryIcon = currentCategory.icon;
  
  // Calculate progress percentage
  const usagePercentage = ((DEMO_LIMIT - remainingCount) / DEMO_LIMIT) * 100;
  
  // Get progress color based on remaining counts
  const getProgressColor = () => {
    if (remainingCount === 0) return "bg-red-500"; 
    if (remainingCount === 1) return "bg-amber-500";
    return "bg-blue-500";
  };
  
  // Format the enhanced prompt with highlights
  const formatEnhancedPrompt = (text: string) => {
    if (!text) return "";
    
    // Highlight numbers and metrics
    let formattedText = text.replace(
      /\b(\d+(?:[,.]\d+)?(?:\s*%|\s*px|\s*words|\s*characters|\s*K|\s*MB|\s*GB)?)\b/g, 
      '<span class="text-blue-300 font-medium">$1</span>'
    );
    
    // Highlight keywords based on category
    const categoryKeywords: Record<string, string[]> = {
      "content": ["blog post", "article", "newsletter", "caption", "word count", "sections", "paragraph", "introduction", "conclusion"],
      "creative": ["character", "story", "scene", "dialogue", "world", "setting", "plot", "narrative"],
      "business": ["proposal", "email", "presentation", "report", "budget", "timeline", "ROI", "metrics"],
      "image": ["photorealistic", "lighting", "composition", "background", "foreground", "style", "color", "texture", "resolution"],
      "code": ["function", "algorithm", "implementation", "documentation", "code", "API", "types", "syntax"]
    };
    
    // Get keywords for the current category
    const keywords = categoryKeywords[selectedCategory] || [];
    
    // Highlight category-specific keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
      formattedText = formattedText.replace(regex, '<span class="text-purple-300 font-medium">$1</span>');
    });
    
    // Highlight structure keywords
    const structureKeywords = ["Include", "Create", "Generate", "Write", "Develop", "Structure", "Design", "Optimize"];
    structureKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
      formattedText = formattedText.replace(regex, '<span class="text-amber-300 font-medium">$1</span>');
    });
    
    return formattedText;
  };
  
  // Get suggestion tools based on category
  const getSuggestionTools = () => {
    const tools: Record<string, { name: string; icon: LucideIcon; url: string; description: string; logo: string }[]> = {
      "content": [
        { name: "ChatGPT", icon: MessageSquare, url: "https://chat.openai.com/", description: "OpenAI's powerful conversation model", logo: "/tool-logos/chatgpt.svg" },
        { name: "Claude", icon: MessageSquare, url: "https://claude.ai/", description: "Anthropic's helpful and harmless AI assistant", logo: "/tool-logos/claude.svg" },
        { name: "Bard", icon: MessageSquare, url: "https://bard.google.com/", description: "Google's experimental conversational AI", logo: "/tool-logos/bard.svg" },
        { name: "Jasper", icon: Sparkles, url: "https://www.jasper.ai/", description: "AI content platform for marketing teams", logo: "/tool-logos/jasper.svg" },
        { name: "Copy.ai", icon: Copy, url: "https://www.copy.ai/", description: "AI copywriting tool for marketers", logo: "/tool-logos/copyai.svg" },
        { name: "Notion AI", icon: PenTool, url: "https://www.notion.so/product/ai", description: "AI writing assistant inside Notion", logo: "/tool-logos/notion.svg" },
      ],
      "creative": [
        { name: "ChatGPT", icon: MessageSquare, url: "https://chat.openai.com/", description: "OpenAI's powerful conversation model", logo: "/tool-logos/chatgpt.svg" },
        { name: "Claude", icon: MessageSquare, url: "https://claude.ai/", description: "Anthropic's helpful and harmless AI assistant", logo: "/tool-logos/claude.svg" },
        { name: "NovelAI", icon: PenTool, url: "https://novelai.net/", description: "AI storytelling and worldbuilding assistant", logo: "/tool-logos/novelai.svg" },
        { name: "Sudowrite", icon: Sparkles, url: "https://www.sudowrite.com/", description: "AI writing partner for novelists", logo: "/tool-logos/sudowrite.svg" },
        { name: "Character.AI", icon: MessageSquare, url: "https://character.ai/", description: "Create and chat with AI characters", logo: "/tool-logos/characterai.svg" },
        { name: "Dreamily", icon: PenTool, url: "https://dreamily.ai/", description: "AI-powered creative writing partner", logo: "/tool-logos/dreamily.svg" },
      ],
      "business": [
        { name: "ChatGPT", icon: MessageSquare, url: "https://chat.openai.com/", description: "OpenAI's powerful conversation model", logo: "/tool-logos/chatgpt.svg" },
        { name: "Claude", icon: MessageSquare, url: "https://claude.ai/", description: "Anthropic's helpful and harmless AI assistant", logo: "/tool-logos/claude.svg" },
        { name: "Jasper", icon: Sparkles, url: "https://www.jasper.ai/", description: "AI content platform for businesses", logo: "/tool-logos/jasper.svg" },
        { name: "Bard", icon: MessageSquare, url: "https://bard.google.com/", description: "Google's experimental conversational AI", logo: "/tool-logos/bard.svg" },
        { name: "Grammarly", icon: Check, url: "https://www.grammarly.com/", description: "AI writing assistant for error-free content", logo: "/tool-logos/grammarly.svg" },
        { name: "Notion AI", icon: PenTool, url: "https://www.notion.so/product/ai", description: "AI writing assistant inside Notion", logo: "/tool-logos/notion.svg" },
      ],
      "image": [
        { name: "Midjourney", icon: ImageIcon, url: "https://www.midjourney.com/", description: "AI art generation via Discord", logo: "/tool-logos/midjourney.svg" },
        { name: "DALL-E", icon: ImageIcon, url: "https://labs.openai.com/", description: "OpenAI's image generation model", logo: "/tool-logos/dalle.svg" },
        { name: "Stable Diffusion", icon: ImageIcon, url: "https://stability.ai/", description: "Open-source image generation model", logo: "/tool-logos/stablediffusion.svg" },
        { name: "Leonardo.AI", icon: ImageIcon, url: "https://leonardo.ai/", description: "AI-powered creative studio for artists", logo: "/tool-logos/leonardo.svg" },
        { name: "Runway", icon: ImageIcon, url: "https://runwayml.com/", description: "AI video and image creation platform", logo: "/tool-logos/runway.svg" },
        { name: "Adobe Firefly", icon: ImageIcon, url: "https://www.adobe.com/products/firefly.html", description: "Adobe's generative AI for creative workflows", logo: "/tool-logos/firefly.svg" },
      ],
      "code": [
        { name: "ChatGPT", icon: MessageSquare, url: "https://chat.openai.com/", description: "OpenAI's powerful conversation model", logo: "/tool-logos/chatgpt.svg" },
        { name: "GitHub Copilot", icon: Code, url: "https://github.com/features/copilot", description: "AI pair programmer in your editor", logo: "/tool-logos/copilot.svg" },
        { name: "Claude", icon: MessageSquare, url: "https://claude.ai/", description: "Anthropic's helpful and harmless AI assistant", logo: "/tool-logos/claude.svg" },
        { name: "Replit", icon: Code, url: "https://replit.com/", description: "Collaborative browser-based IDE with AI", logo: "/tool-logos/replit.svg" },
        { name: "Tabnine", icon: Code, url: "https://www.tabnine.com/", description: "AI coding assistant with autocomplete", logo: "/tool-logos/tabnine.svg" },
        { name: "CodeWhisperer", icon: Code, url: "https://aws.amazon.com/codewhisperer/", description: "Amazon's AI code generator", logo: "/tool-logos/codewhisperer.svg" },
      ],
    };
    
    return tools[selectedCategory] || tools.content;
  };
  
  // Skip rendering content during initial load
  if (isLoading && !user) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Dynamic favicon script */}
      <Script src="/dynamic-favicon.js" strategy="afterInteractive" />
      
      <h1 className="text-3xl font-bold text-white mb-2">Interactive Demo</h1>
      <p className="text-zinc-400 mb-4">
        Try IntelliPrompt's prompt engineering capabilities with this interactive demo.
      </p>
      
      {/* Prominent usage counter for non-logged in users */}
      {!user && (
        <div className="mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Info className="h-5 w-5 text-blue-400 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-white">Demo Mode</h3>
                <p className="text-zinc-400">Sign up for unlimited access to all features</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-white">{remainingCount} <span className="text-zinc-400 text-sm">/ {DEMO_LIMIT}</span></div>
              <div className="text-sm text-zinc-400">Prompts remaining</div>
            </div>
          </div>
          <div className="relative pt-1">
            <div className={cn("h-2 w-full rounded-full bg-zinc-700 overflow-hidden")}>
              <div 
                className={cn("h-full transition-all", getProgressColor())}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
          </div>
          {remainingCount === 1 && (
            <p className="text-amber-400 text-xs mt-2 text-right">
              ⚠️ This is your last free prompt. Sign up to continue using IntelliPrompt.
            </p>
          )}
        </div>
      )}
      
      {showLimitAlert && !user && (
        <UpgradeAlert type="demo-limit" className="mb-6" />
      )}
      
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 mb-1">
            <CategoryIcon className="h-5 w-5 text-blue-400" />
            <CardTitle className="text-white">{currentCategory.name}</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            {currentCategory.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
            <TabsList className="bg-zinc-800 border-zinc-700 mb-6 flex w-full">
              {PROMPT_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-blue-600 text-zinc-300 data-[state=active]:text-white flex items-center gap-1 flex-1"
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {PROMPT_CATEGORIES.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-zinc-400">Select an example:</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                      onClick={handleUseOwnPrompt}
                    >
                      <PenTool className="h-3 w-3 mr-1" />
                      Try with your own prompt
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.examples.map((example) => (
                      <Button
                        key={example.id}
                        variant={selectedExample === example.id ? "default" : "outline"}
                        size="sm"
                        className={
                          selectedExample === example.id
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        }
                        onClick={() => handleExampleSelect(example.id)}
                      >
                        {example.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Your basic prompt:
              </label>
              <Textarea
                placeholder="Enter your prompt here..."
                className="bg-zinc-800 border-zinc-700 text-zinc-300 min-h-[100px]"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
              />
            </div>

            <Button
              onClick={generateEnhancedPrompt}
              disabled={!inputPrompt || isGenerating || (showLimitAlert && !user)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enhance My Prompt
                </>
              )}
            </Button>

            {enhancedPrompt && (
              <div className="animate-fadeIn">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                    <label className="text-sm font-medium text-blue-400">
                      Enhanced prompt:
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-zinc-300"
                      onClick={toggleComparison}
                    >
                      {showComparison ? (
                        <>Hide Comparison</>
                      ) : (
                        <>Show Comparison</>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex gap-1 items-center"
                      onClick={handleCopyToClipboard}
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" /> Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {showComparison ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-zinc-500">Basic prompt:</div>
                      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4 text-zinc-400 whitespace-pre-wrap h-full">
                        {inputPrompt}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-blue-400">Enhanced prompt:</div>
                      <div className="relative h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md blur-xl"></div>
                        <div className="relative bg-zinc-800/90 backdrop-blur-sm border border-blue-600/30 rounded-md p-4 text-blue-100 whitespace-pre-wrap h-full shadow-lg">
                          <div dangerouslySetInnerHTML={{ __html: formatEnhancedPrompt(enhancedPrompt) }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md blur-xl"></div>
                    <div className="relative bg-zinc-800/90 backdrop-blur-sm border border-blue-600/30 rounded-md p-5 text-blue-100 whitespace-pre-wrap shadow-lg">
                      <div dangerouslySetInnerHTML={{ __html: formatEnhancedPrompt(enhancedPrompt) }} />
                    </div>
                  </div>
                )}
                
                <div className="mt-3 flex flex-wrap gap-3 items-center">
                  <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-300 px-2 py-1">
                    <Zap className="h-3 w-3 mr-1 inline" /> High-quality output
                  </Badge>
                  {selectedCategory === "image" && (
                    <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-300 px-2 py-1">
                      <ImageIcon className="h-3 w-3 mr-1 inline" /> Optimized for AI image generation
                    </Badge>
                  )}
                  {selectedCategory === "code" && (
                    <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-300 px-2 py-1">
                      <Code className="h-3 w-3 mr-1 inline" /> Technical precision
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-green-500/30 bg-green-500/10 text-green-300 px-2 py-1">
                    <Check className="h-3 w-3 mr-1 inline" /> Ready to use
                  </Badge>
                  
                  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                      >
                        <ListChecks className="h-3 w-3 mr-1" /> Use this prompt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-blue-400" />
                          Where to use this prompt
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                          Copy and paste this enhanced prompt into any of these AI tools:
                        </DialogDescription>
                      </DialogHeader>
                      
                      {/* Prompt Text Box (Copyable) */}
                      <div className="mt-2 mb-4 bg-zinc-800/80 border border-zinc-700 rounded-md p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-sm text-zinc-400">Your enhanced prompt:</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-zinc-400 hover:text-zinc-300 h-7 px-2"
                            onClick={handleCopyToClipboard}
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 mr-1" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3 mr-1" /> Copy
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="text-sm text-blue-100 whitespace-pre-wrap max-h-32 overflow-y-auto">
                          {enhancedPrompt}
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-zinc-400 mb-2 flex items-center">
                        <CategoryIcon className="h-4 w-4 mr-2 text-blue-400" />
                        Recommended {currentCategory.name} Tools
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                        {getSuggestionTools().map((tool) => (
                          <a 
                            key={tool.name} 
                            href={tool.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-3 bg-zinc-800 hover:bg-zinc-700/80 rounded-md transition-colors border border-zinc-700/50 hover:border-blue-500/30 group"
                          >
                            <div className="h-12 w-12 bg-zinc-700 rounded-md flex items-center justify-center mr-3 overflow-hidden relative group-hover:ring-1 group-hover:ring-blue-500/50">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                              <div className="relative z-10">
                                {tool.logo ? (
                                  <div className="relative h-8 w-8">
                                    <Image
                                      src={tool.logo}
                                      alt={tool.name}
                                      className="object-contain"
                                      fill
                                      sizes="32px"
                                      onError={(e) => {
                                        // Fallback to icon if image fails to load
                                        e.currentTarget.style.display = 'none';
                                        const iconContainer = e.currentTarget.parentElement;
                                        if (iconContainer) {
                                          const iconElement = document.createElement('div');
                                          iconElement.className = 'flex items-center justify-center h-full w-full';
                                          iconContainer.appendChild(iconElement);
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <tool.icon className="h-5 w-5 text-blue-400" />
                                )}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-white group-hover:text-blue-300 transition-colors flex items-center">
                                {tool.name}
                                <ExternalLink className="h-3 w-3 ml-1.5 opacity-70" />
                              </div>
                              <div className="text-xs text-zinc-400 truncate">
                                {tool.description}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 mt-4 p-4 rounded-md border border-blue-500/20">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-white">Get more features</h4>
                            <p className="text-xs text-zinc-400 mt-1">
                              Sign up for full access to unlimited enhanced prompts, advanced customization, 
                              and AI-powered recommendations tailored to your specific needs.
                            </p>
                            <div className="mt-3">
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
                                onClick={() => {
                                  setModalOpen(false);
                                  router.push('/pricing');
                                }}
                              >
                                <Sparkles className="h-3 w-3 mr-1" />
                                Upgrade now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <div className="flex-1 flex justify-end text-xs text-zinc-500">
                    {enhancedPrompt.length} characters · ~{Math.ceil(enhancedPrompt.length / 5)} words
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 bg-zinc-900 border-zinc-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">How IntelliPrompt Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="bg-blue-600/20 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-blue-400 font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium text-white">Analyze Your Prompt</h3>
            <p className="text-zinc-400">Our AI analyzes your basic prompt to understand your intent and the subject matter.</p>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-600/20 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-blue-400 font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium text-white">Apply Best Practices</h3>
            <p className="text-zinc-400">We apply industry-specific prompt engineering techniques to enhance clarity, context, and specificity.</p>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-600/20 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-blue-400 font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium text-white">Transform & Optimize</h3>
            <p className="text-zinc-400">Your simple prompt is transformed into a comprehensive instruction that generates higher quality AI outputs.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 