import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Sparkles, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 sm:py-32">
      {/* Animated grid background with more contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Enhanced glowing orbs */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-purple-600/25 rounded-full blur-3xl opacity-80"></div>
      <div className="absolute -bottom-20 right-0 w-80 h-80 bg-blue-600/25 rounded-full blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="mb-8 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1 text-sm text-zinc-300 backdrop-blur-sm">
              <span className="mr-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-1.5 py-0.5 text-xs font-semibold text-white">NEW</span>
              Advanced AI Prompt Engineering
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block">Next-Gen AI Results</span>
              <span className="block bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Without the Effort</span>
            </h1>
            <p className="mt-6 text-lg text-zinc-400 max-w-3xl">
              IntelliPrompt helps you craft expert-level prompts that unlock the full potential of AI tools like ChatGPT,
              Midjourney, and DALL-E. Stop settling for mediocre results and start getting professional-quality outputs.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8 shadow-lg shadow-blue-700/20">
                <Sparkles className="mr-2 h-4 w-4" />
                Try for Free
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-zinc-700 text-zinc-300 hover:bg-zinc-800/80" asChild>
                <Link href="/demo">
                  <Play className="mr-2 h-4 w-4 text-blue-400" />
                  Try a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-zinc-950 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-zinc-950 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-zinc-950 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-zinc-950 shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                    alt="User"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center justify-center h-9 w-9 rounded-full ring-2 ring-zinc-950 bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg">
                  +12
                </div>
              </div>
              <span className="ml-3 text-sm font-medium text-zinc-300">
                Trusted by <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">5,000+</span> professionals
              </span>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
            <div className="relative mx-auto max-w-xl">
              {/* Card with enhanced gradient border */}
              <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-5">
                  {/* Top bar with dots */}
                  <div className="flex items-center mb-5">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-xs text-zinc-400 font-mono">IntelliPrompt Generator</div>
                  </div>
                  
                  {/* Split view */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-800/80 rounded-lg border border-zinc-700/30">
                      <div className="text-xs text-zinc-400 mb-2 font-mono">Basic prompt:</div>
                      <div className="font-mono text-xs text-zinc-300">
                        Write about AI.
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-800/80 rounded-lg border border-blue-900/30">
                      <div className="text-xs text-blue-400 mb-2 font-mono">IntelliPrompt:</div>
                      <div className="font-mono text-xs text-blue-300">
                        Write a 1500-word expert analysis on AI governance frameworks for 2024, with focus on...
                      </div>
                    </div>
                  </div>
                  
                  {/* Result comparison */}
                  <div className="mt-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
                    <div className="flex items-center mb-3">
                      <Zap className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-xs text-zinc-300 font-medium">Results comparison</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-28 bg-zinc-800/80 rounded-md p-2 border border-zinc-700/30">
                        <div className="text-xs text-zinc-500 mb-1">Basic result</div>
                        <div className="text-[10px] text-zinc-400">
                          AI is a technology that helps computers think like humans...
                        </div>
                      </div>
                      <div className="h-28 bg-gradient-to-br from-zinc-800/80 to-zinc-900 rounded-md p-2 border border-blue-500/20">
                        <div className="text-xs text-blue-400 mb-1">IntelliPrompt result</div>
                        <div className="text-[10px] text-blue-100">
                          The emergence of advanced AI governance frameworks in 2024 marks a critical inflection point...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced glowing dots decoration */}
              <div className="absolute -top-6 -right-6 w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/70"></div>
              <div className="absolute -bottom-6 -left-6 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

