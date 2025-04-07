import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Send, Braces, Github, ChevronRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-zinc-800 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center group">
              <Braces className="h-5 w-5 mr-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                IntelliPrompt
              </span>
            </Link>
            <p className="mt-4 text-zinc-400">Get 10X better results from the AI tools you already pay for.</p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-zinc-600 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-zinc-600 hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-zinc-600 hover:text-blue-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-zinc-600 hover:text-blue-500 transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Prompt Library
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Custom Prompts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Integrations
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-zinc-400 hover:text-blue-400 flex items-center group">
                  <ChevronRight className="h-3 w-3 text-zinc-700 group-hover:text-blue-500 mr-1 transition-colors" />
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Subscribe</h3>
            <p className="mt-4 text-zinc-400">
              Get the latest news and prompt engineering tips delivered to your inbox.
            </p>
            <div className="mt-4 flex">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none bg-zinc-900 border-zinc-800 text-zinc-300 focus-visible:ring-blue-600"
              />
              <Button type="submit" className="rounded-l-none bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <p className="text-center text-zinc-500 text-sm">
            &copy; {new Date().getFullYear()} IntelliPrompt. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-blue-400">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-blue-400">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

