"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UpgradeAlert } from "@/components/upgrade-alert";
import {
  Search,
  Clock,
  Calendar,
  ArrowUpDown,
  Star,
  StarOff,
  Trash2,
  Copy,
  Edit,
  PenTool,
  MessageSquare,
  Zap,
  ImageIcon,
  Code,
  Filter,
  Check,
  XCircle,
  ArrowRight
} from "lucide-react";

// Sample history data (in a real app, this would come from an API)
const HISTORY_ITEMS = [
  {
    id: "h1",
    name: "Marketing copy for SaaS product",
    description: "Blog post about AI-powered analytics",
    category: "content",
    categoryName: "Content Writing",
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    status: "completed",
    favorited: true
  },
  {
    id: "h2",
    name: "Fantasy world building",
    description: "Detailed world building for a steampunk novel",
    category: "creative",
    categoryName: "Creative Writing",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "completed",
    favorited: false
  },
  {
    id: "h3",
    name: "Business proposal template",
    description: "Client proposal for web development project",
    category: "business",
    categoryName: "Business Writing",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "completed",
    favorited: true
  },
  {
    id: "h4",
    name: "Product landing page copy",
    description: "Hero section copy for new feature launch",
    category: "content",
    categoryName: "Content Writing",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "completed",
    favorited: false
  },
  {
    id: "h5",
    name: "Character development for protagonist",
    description: "Main character development for fantasy novel",
    category: "creative",
    categoryName: "Creative Writing",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "draft",
    favorited: false
  },
  {
    id: "h6",
    name: "Logo design prompt",
    description: "Modern logo for tech startup",
    category: "image",
    categoryName: "Image Generation",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: "completed",
    favorited: true
  },
  {
    id: "h7",
    name: "API Documentation for RESTful service",
    description: "User authentication API documentation",
    category: "code",
    categoryName: "Code & Technical",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    status: "completed",
    favorited: false
  }
];

export default function HistoryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<typeof HISTORY_ITEMS>([]);
  const [viewMode, setViewMode] = useState<string>("grid");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    
    // In a real app, this would be an API call to fetch the user's history
    setHistoryItems(HISTORY_ITEMS);
  }, [user, loading, router]);
  
  // Format date to readable string
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds} seconds ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Filter and sort history items
  const filteredItems = historyItems
    .filter(item => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      
      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }
      
      // Favorites filter
      if (showFavoritesOnly && !item.favorited) {
        return false;
      }
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.date.getTime() - a.date.getTime();
      } else if (sortBy === "oldest") {
        return a.date.getTime() - b.date.getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "category") {
        return a.categoryName.localeCompare(b.categoryName);
      }
      
      return 0;
    });
  
  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setHistoryItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, favorited: !item.favorited } 
          : item
      )
    );
  };
  
  // Delete item
  const deleteItem = (id: string) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };
  
  // Get category icon
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
        return PenTool;
    }
  };
  
  // Handle editing an item
  const editItem = (id: string) => {
    router.push(`/dashboard/studio?edit=${id}`);
  };
  
  // Handle copying/using an item
  const useItem = (id: string) => {
    router.push(`/dashboard/studio?template=${id}`);
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
        <h1 className="text-3xl font-bold text-white">Prompt History</h1>
        <p className="text-zinc-400 mt-1">
          View, edit, and reuse your past prompts
        </p>
      </div>
      
      {/* Filters Bar */}
      <div className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                {user.plan !== "free" && (
                  <>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="code">Code</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant={showFavoritesOnly ? "default" : "outline"}
              size="sm"
              className={`h-10 ${showFavoritesOnly ? "bg-blue-600 hover:bg-blue-700" : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star className="h-4 w-4 mr-1" />
              {showFavoritesOnly ? "All Prompts" : "Favorites"}
            </Button>
            
            <div className="flex h-10 rounded-md bg-zinc-800 p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={`rounded-sm ${viewMode === "grid" ? "bg-blue-600 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("grid")}
              >
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="h-1 w-1 rounded-sm bg-current"></div>
                  <div className="h-1 w-1 rounded-sm bg-current"></div>
                  <div className="h-1 w-1 rounded-sm bg-current"></div>
                  <div className="h-1 w-1 rounded-sm bg-current"></div>
                </div>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={`rounded-sm ${viewMode === "list" ? "bg-blue-600 text-white" : "text-zinc-400"}`}
                onClick={() => setViewMode("list")}
              >
                <div className="flex flex-col gap-0.5">
                  <div className="h-0.5 w-4 rounded-sm bg-current"></div>
                  <div className="h-0.5 w-4 rounded-sm bg-current"></div>
                  <div className="h-0.5 w-4 rounded-sm bg-current"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* History Items */}
      {filteredItems.length > 0 ? (
        viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              const isProFeature = (item.category === "image" || item.category === "code") && user.plan === "free";
              
              return (
                <Card 
                  key={item.id} 
                  className={`bg-zinc-900/70 backdrop-blur-sm border-zinc-800 ${isProFeature ? 'opacity-50' : 'hover:bg-zinc-800/70'} transition-colors group`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CategoryIcon className="h-5 w-5 mr-2 text-blue-400" />
                        <CardTitle className="text-lg truncate">{item.name}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-zinc-400 hover:text-yellow-400 hover:bg-transparent"
                        onClick={() => toggleFavorite(item.id)}
                        disabled={isProFeature}
                      >
                        {item.favorited ? (
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="secondary" className={`
                        ${item.status === 'completed' 
                          ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-950/50 text-amber-400 border-amber-500/20'}
                      `}>
                        {item.status === 'completed' ? 'Completed' : 'Draft'}
                      </Badge>
                      <div className="flex items-center text-zinc-500 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                    
                    <CardDescription className="mt-2 line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardFooter className="flex gap-2 pt-0">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex-1"
                      onClick={() => useItem(item.id)}
                      disabled={isProFeature}
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Use
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 flex-1"
                      onClick={() => editItem(item.id)}
                      disabled={isProFeature}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-zinc-700 text-red-400 hover:bg-red-950/30 hover:text-red-300 h-8 w-8"
                      onClick={() => deleteItem(item.id)}
                      disabled={isProFeature}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              const isProFeature = (item.category === "image" || item.category === "code") && user.plan === "free";
              
              return (
                <div 
                  key={item.id} 
                  className={`flex items-start gap-4 p-4 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-lg ${isProFeature ? 'opacity-50' : 'hover:bg-zinc-800/70'} transition-colors`}
                >
                  <div className="hidden sm:flex h-10 w-10 rounded-full items-center justify-center bg-blue-950/30 border border-blue-900/50">
                    <CategoryIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                      <h3 className="font-medium text-white truncate">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`
                          ${item.status === 'completed' 
                            ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20' 
                            : 'bg-amber-950/50 text-amber-400 border-amber-500/20'}
                        `}>
                          {item.status === 'completed' ? 'Completed' : 'Draft'}
                        </Badge>
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-zinc-800/50">
                          {item.categoryName}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-zinc-400 text-sm line-clamp-1 mb-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-zinc-500 text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-zinc-400 hover:text-yellow-400 hover:bg-transparent"
                          onClick={() => toggleFavorite(item.id)}
                          disabled={isProFeature}
                        >
                          {item.favorited ? (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <StarOff className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-zinc-400 hover:text-blue-400 hover:bg-transparent hidden sm:flex"
                          onClick={() => useItem(item.id)}
                          disabled={isProFeature}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Use
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-zinc-400 hover:text-blue-400 hover:bg-transparent hidden sm:flex"
                          onClick={() => editItem(item.id)}
                          disabled={isProFeature}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-zinc-400 hover:text-red-400 hover:bg-transparent h-8 w-8"
                          onClick={() => deleteItem(item.id)}
                          disabled={isProFeature}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
          <XCircle className="h-12 w-12 text-zinc-700 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-zinc-400 mb-1">No prompts found</h3>
          <p className="text-zinc-500 mb-6">
            {searchQuery || showFavoritesOnly || selectedCategory !== "all" || statusFilter !== "all"
              ? "Try adjusting your filters or search query"
              : "You haven't created any prompts yet. Create your first prompt to get started."}
          </p>
          {(!searchQuery && !showFavoritesOnly && selectedCategory === "all" && statusFilter === "all") && (
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              onClick={() => router.push('/dashboard/studio')}
            >
              Create a Prompt
            </Button>
          )}
        </div>
      )}
      
      {/* Pro Features Alert - shown if free user is browsing history with pro items (image, code) */}
      {user.plan === "free" && filteredItems.some(item => item.category === "image" || item.category === "code") && (
        <div className="mt-8">
          <UpgradeAlert type="feature-locked" />
        </div>
      )}
    </div>
  );
} 