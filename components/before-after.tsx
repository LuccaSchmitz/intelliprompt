import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles, Dumbbell, Play } from "lucide-react"
import Link from "next/link"

export default function BeforeAfter() {
  const examples = [
    {
      id: 1,
      title: "Content Writing",
      before: "Write me a blog post about AI.",
      after:
        "Write a 1500-word blog post about the ethical implications of AI in healthcare, focusing on patient privacy, diagnostic accuracy, and the changing role of medical professionals. Include 3 real-world case studies, statistics from reputable sources, and a balanced perspective on both benefits and concerns.",
      beforeResult:
        "Artificial Intelligence (AI) is a technology that enables machines to mimic human intelligence. It has applications in various fields like healthcare, finance, and transportation. AI systems can learn from data, recognize patterns, and make decisions...",
      afterResult:
        "The Dawn of AI in Healthcare: Promise, Peril, and Patient Rights\n\nAs artificial intelligence transforms the medical landscape, healthcare providers face an ethical crossroads. Our analysis of Memorial Sloan Kettering's diagnostic AI system reveals a 23% improvement in early cancer detection rates while raising critical questions about data ownership...",
    },
    {
      id: 2,
      title: "Image Generation",
      before: "Create an image of a cat.",
      after:
        "Generate a photorealistic image of a Maine Coon cat in a sunlit forest clearing. The cat should have amber eyes, detailed fur texture with tabby markings, and be sitting majestically on a moss-covered rock. Use dramatic lighting with sun rays filtering through trees, creating dappled light patterns. Ultra-detailed, 8K quality.",
      beforeResult: "Basic cartoon-like cat image with minimal detail",
      afterResult: "Stunning photorealistic Maine Coon with intricate fur detail and perfect lighting",
    },
  ]

  return (
    <section id="examples" className="relative py-20 bg-zinc-900 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-40 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-400 backdrop-blur mb-5">
            <Dumbbell className="mr-2 h-3 w-3 text-blue-400" />
            AI Output Comparison
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            See the <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">IntelliPrompt Difference</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-3xl mx-auto">
            Compare basic prompts with IntelliPrompt-engineered prompts and see the dramatic difference in AI output
            quality.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {examples.map((example) => (
            <Card key={example.id} className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">{example.title}</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm font-medium text-zinc-400 mb-2">Basic Prompt:</div>
                    <div className="bg-zinc-800/50 p-3 rounded-md border border-zinc-700/50 text-zinc-300 text-xs">
                      {example.before}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-400 mb-2">IntelliPrompt:</div>
                    <div className="bg-zinc-800/50 p-3 rounded-md border border-blue-600/20 text-blue-100 text-xs">
                      {example.after}
                    </div>
                  </div>
                </div>

                <div className="text-sm font-medium text-zinc-300 mb-3">Output Comparison:</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">Basic result:</div>
                    <div className="bg-zinc-800/50 p-3 rounded-md border border-zinc-700/50 text-zinc-400 text-xs">
                      {example.beforeResult}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 mb-1">IntelliPrompt result:</div>
                    <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900 p-3 rounded-md border border-blue-500/20 text-blue-100 text-xs">
                      {example.afterResult}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 px-8" asChild>
            <Link href="/demo">
              <Play className="mr-2 h-4 w-4" />
              Try the Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

