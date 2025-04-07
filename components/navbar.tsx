"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Braces, Sparkles, User, Play } from "lucide-react"
import { useAuth } from "@/lib/authContext"

export default function Navbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 shadow-md" 
        : "bg-zinc-950/90 backdrop-blur-sm border-b border-zinc-900"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <Braces className="h-6 w-6 mr-2 text-blue-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
                IntelliPrompt
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                href="#features"
                className="text-zinc-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </Link>
              <Link
                href="/demo"
                className="text-zinc-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                <Play className="h-4 w-4 inline mr-1" />
                Demo
              </Link>
              <Link
                href="#pricing"
                className="text-zinc-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#reviews"
                className="text-zinc-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
              >
                Reviews
              </Link>
              
              {user ? (
                <>
                  <Button variant="ghost" className="text-zinc-300" asChild>
                    <Link href="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0" asChild>
                    <Link href="/account">
                      <User className="h-4 w-4 mr-2" /> Account
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="text-zinc-300" asChild>
                    <Link href="/auth/login">
                      Log in
                    </Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0" asChild>
                    <Link href="/auth/register">
                      <Sparkles className="h-4 w-4 mr-2" /> Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-zinc-900 border-b border-zinc-800">
            <Link
              href="#features"
              className="text-zinc-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/demo"
              className="text-zinc-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Play className="h-4 w-4 inline mr-1" />
              Demo
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#reviews"
              className="text-zinc-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </Link>
            <div className="pt-4 pb-3 border-t border-zinc-700">
              {user ? (
                <>
                  <Button variant="ghost" className="w-full mb-2 text-zinc-300" asChild>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0" asChild>
                    <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                      <User className="h-4 w-4 mr-2" /> Account
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full mb-2 text-zinc-300" asChild>
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0" asChild>
                    <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                      <Sparkles className="h-4 w-4 mr-2" /> Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

