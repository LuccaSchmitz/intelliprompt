"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Building, Users, Check, Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | IntelliPrompt",
  description: "Get in touch with our team.",
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Request received!",
      description: "Our team will contact you within 1 business day.",
    });
  };
  
  if (isSubmitted) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border-zinc-800">
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thanks for your interest!</h2>
            <p className="text-zinc-400 mb-6 max-w-lg">
              Your business inquiry has been received. A member of our team will be in touch with you within 1 business day.
            </p>
            <Button onClick={() => router.push("/")}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Business Inquiry</h1>
        <p className="text-zinc-400 mt-2">
          Get in touch with our sales team to learn more about our business solutions
        </p>
      </div>
      
      <Card className="w-full bg-zinc-900/80 backdrop-blur-sm border-zinc-800">
        <CardHeader>
          <CardTitle>Contact Sales</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you within 1 business day
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required className="bg-zinc-800/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required className="bg-zinc-800/50" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" type="email" placeholder="john.doe@company.com" required className="bg-zinc-800/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="bg-zinc-800/50" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input id="company" placeholder="Acme Inc." required className="bg-zinc-800/50 pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-zinc-500 z-10" />
                  <Select>
                    <SelectTrigger id="companySize" className="bg-zinc-800/50 pl-10">
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1001+">1001+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">How can we help?</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your needs and requirements..."
                rows={5}
                className="bg-zinc-800/50"
                required
              />
            </div>
            
            <div className="bg-zinc-800/30 rounded-md p-4 text-sm text-zinc-400">
              By submitting this form, you agree to our Privacy Policy and Terms of Service.
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 