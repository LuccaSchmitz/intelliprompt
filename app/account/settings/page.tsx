"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  LinkIcon, 
  Save, 
  AlertTriangle,
  Trash,
  Clock
} from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<null | "saving" | "success" | "error">(null);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [language, setLanguage] = useState("en");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [newFeatures, setNewFeatures] = useState(true);
  const [apiEnabled, setApiEnabled] = useState(false);
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
    
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, loading, router]);

  const handleFormChange = () => {
    setIsDirty(true);
    setSaveStatus(null);
  };

  const handleSaveSettings = async () => {
    setSaveStatus("saving");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setSaveStatus("success");
    setIsDirty(false);
    
    // Reset success message after 3 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Handle account deletion
      alert("Account deletion functionality would be implemented here.");
    }
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
    <main className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-zinc-400 mt-1">
          Manage your account preferences and settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="profile" className="data-[state=active]:bg-zinc-800">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-zinc-800">
            <Shield className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-zinc-800">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-zinc-800">
            <LinkIcon className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleFormChange();
                  }}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleFormChange();
                  }}
                  className="bg-zinc-950 border-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={language}
                  onValueChange={(value) => {
                    setLanguage(value);
                    handleFormChange();
                  }}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={timezone}
                  onValueChange={(value) => {
                    setTimezone(value);
                    handleFormChange();
                  }}
                >
                  <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
              <div>
                {saveStatus === "success" && (
                  <p className="text-green-500 text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-1" /> Settings saved successfully
                  </p>
                )}
                {saveStatus === "error" && (
                  <p className="text-red-500 text-sm flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" /> Failed to save settings
                  </p>
                )}
              </div>
              <Button 
                onClick={handleSaveSettings} 
                disabled={!isDirty || saveStatus === "saving"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                {saveStatus === "saving" ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account security and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Current Plan</h3>
                  <p className="text-sm text-zinc-400">You are currently on the {user.plan} plan</p>
                </div>
                <Badge variant="outline" className="ml-2 border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                  {user.plan === 'free' ? 'Free Plan' : user.plan === 'pro' ? 'Pro Plan' : 'Enterprise Plan'}
                </Badge>
              </div>

              <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">Monthly Limit</h3>
                  <p className="text-sm text-zinc-400">
                    {user.plan === 'free' ? '1,000 prompts' : 
                     user.plan === 'pro' ? '2,000 prompts' : 
                     'Unlimited prompts'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  onClick={() => router.push('/pricing')}
                >
                  Upgrade
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-white mb-2">Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-950 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-950 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-zinc-950 border-zinc-800 text-white"
                  />
                </div>
                <Button 
                  className="mt-2 bg-zinc-800 hover:bg-zinc-700 text-white"
                >
                  Change Password
                </Button>
              </div>
              
              <div className="pt-4 mt-4 border-t border-zinc-800">
                <h3 className="font-medium text-white text-lg mb-2">Danger Zone</h3>
                <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
                  <h4 className="text-red-400 font-medium mb-1">Delete Account</h4>
                  <p className="text-sm text-zinc-400 mb-3">Once you delete your account, there is no going back. This action is permanent.</p>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="bg-red-700 hover:bg-red-600 text-white"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Control how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium text-white">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">All Emails</Label>
                    <p className="text-sm text-zinc-400">Receive all notification emails</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={(value) => {
                      setEmailNotifications(value);
                      handleFormChange();
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Digest</Label>
                    <p className="text-sm text-zinc-400">Get a summary of your prompts and usage</p>
                  </div>
                  <Switch
                    checked={weeklyDigest}
                    onCheckedChange={(value) => {
                      setWeeklyDigest(value);
                      handleFormChange();
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">New Features</Label>
                    <p className="text-sm text-zinc-400">Stay updated with new platform features</p>
                  </div>
                  <Switch
                    checked={newFeatures}
                    onCheckedChange={(value) => {
                      setNewFeatures(value);
                      handleFormChange();
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-white">Activity Frequency</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Weekly Digest Frequency</Label>
                  <Select
                    defaultValue="weekly"
                    onValueChange={handleFormChange}
                  >
                    <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
              <div>
                {saveStatus === "success" && (
                  <p className="text-green-500 text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-1" /> Settings saved successfully
                  </p>
                )}
              </div>
              <Button 
                onClick={handleSaveSettings} 
                disabled={!isDirty || saveStatus === "saving"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                {saveStatus === "saving" ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integration Settings */}
        <TabsContent value="integrations">
          <Card className="bg-zinc-900/70 backdrop-blur-sm border-zinc-800">
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Connect with external services and manage API access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-medium text-white">API Access</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable API Access</Label>
                    <p className="text-sm text-zinc-400">Allow access to your account via API</p>
                  </div>
                  <Switch
                    checked={apiEnabled}
                    onCheckedChange={(value) => {
                      setApiEnabled(value);
                      handleFormChange();
                    }}
                    disabled={user.plan === 'free'}
                  />
                </div>
                
                {user.plan === 'free' && (
                  <div className="p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                    <p className="text-sm text-blue-400 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      API access is available on Pro and Enterprise plans only
                    </p>
                  </div>
                )}
                
                {apiEnabled && user.plan !== 'free' && (
                  <div className="space-y-2">
                    <Label>Your API Key</Label>
                    <div className="flex">
                      <Input
                        readOnly
                        value="••••••••••••••••••••••••••••••"
                        className="bg-zinc-950 border-zinc-800 text-white rounded-r-none"
                      />
                      <Button className="rounded-l-none">
                        Copy
                      </Button>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">Last used: Never</p>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium text-white">Connected Services</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#4285F4] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Google</h4>
                        <p className="text-sm text-zinc-400">Not connected</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      Connect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">G</span>
                      </div>
                      <div>
                        <h4 className="font-medium">GitHub</h4>
                        <p className="text-sm text-zinc-400">Connected as {user.name}</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center mr-3">
                        <span className="text-white font-bold">L</span>
                      </div>
                      <div>
                        <h4 className="font-medium">LinkedIn</h4>
                        <p className="text-sm text-zinc-400">Not connected</p>
                      </div>
                    </div>
                    {user.plan === 'free' ? (
                      <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800" disabled>
                        Pro Feature
                      </Button>
                    ) : (
                      <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-zinc-800 pt-4">
              <div>
                {saveStatus === "success" && (
                  <p className="text-green-500 text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-1" /> Settings saved successfully
                  </p>
                )}
              </div>
              <Button 
                onClick={handleSaveSettings} 
                disabled={!isDirty || saveStatus === "saving"}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                {saveStatus === "saving" ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
} 