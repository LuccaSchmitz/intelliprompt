import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
          {/* Glowing gradient border */}
          <div className="absolute inset-0 p-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none"></div>
          
          {/* Glowing orb in background */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl opacity-50"></div>
          
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between relative">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your AI results?
                <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-2">
                  Start your free trial today.
                </span>
              </h2>
              <p className="mt-4 text-lg text-zinc-400 max-w-2xl">
                Join thousands of professionals who are getting 10x better results from the AI tools they already use.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                  <Zap className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

