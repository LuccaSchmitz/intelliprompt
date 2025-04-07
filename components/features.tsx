import { Sparkles, Terminal, Wand2, Bot, Braces, Layers, Zap, Gauge } from "lucide-react"

export default function Features() {
  const features = [
    {
      title: "Advanced Prompt Templates",
      description: "Access a library of expert-crafted prompt templates optimized for specific AI models and use cases.",
      icon: <Wand2 className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Context Analyzer",
      description: "Our AI automatically analyzes your objective and suggests the optimal prompt structure for your specific needs.",
      icon: <Layers className="h-6 w-6 text-purple-400" />,
    },
    {
      title: "Model-Specific Optimization",
      description: "Tailor your prompts specifically for ChatGPT, DALL-E, Midjourney, Claude, or any other AI model.",
      icon: <Bot className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Parameter Control",
      description: "Fine-tune temperature, top-p, frequency penalty and other parameters with visual controls and explanations.",
      icon: <Gauge className="h-6 w-6 text-purple-400" />,
    },
    {
      title: "Result Comparison",
      description: "See side-by-side comparisons between basic prompts and IntelliPrompt-enhanced versions.",
      icon: <Terminal className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Custom Variables",
      description: "Create reusable prompt templates with custom variables that can be modified for different use cases.",
      icon: <Braces className="h-6 w-6 text-purple-400" />,
    },
    {
      title: "Output Analyzer",
      description: "Get AI-powered feedback on your results and suggestions for further prompt refinements.",
      icon: <Zap className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "History & Versions",
      description: "Keep track of your prompt history and save different versions to refine your approach over time.",
      icon: <Sparkles className="h-6 w-6 text-purple-400" />,
    },
  ]

  return (
    <section id="features" className="relative py-20 bg-[#0B0B11] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-400 backdrop-blur mb-5">
            <Sparkles className="mr-2 h-3 w-3 text-blue-400" />
            AI Features
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Supercharge Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">AI Prompts</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-3xl mx-auto">
            IntelliPrompt delivers powerful features that transform basic AI interactions into professional-grade outputs.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 group hover:border-blue-900/50 transition-colors duration-300"
            >
              {/* Highlight accent */}
              <div className="absolute h-1 w-10 top-0 left-6 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              
              <div className="mb-4 bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 rounded-lg w-12 h-12 flex items-center justify-center group-hover:from-zinc-900 group-hover:to-zinc-950">
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400 text-sm">{feature.description}</p>
              
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-r from-blue-500/30 to-purple-600/30 pointer-events-none"></div>
          <div className="p-8 md:p-12 bg-zinc-900/70 backdrop-blur-sm rounded-2xl border border-zinc-800">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-blue-900/50 bg-zinc-900/80 px-3 py-1 text-sm text-blue-400 backdrop-blur mb-4">
                  <Zap className="mr-2 h-3 w-3 text-blue-400" />
                  Highlighted Feature
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Context Analyzer</h3>
                <p className="text-zinc-400 mb-6">
                  Our powerful Context Analyzer examines your goals and automatically structures your prompt with the elements 
                  needed for optimal results. It adds relevant context, clarifies instructions, and fine-tunes the tone for 
                  your specific AI model.
                </p>
                <ul className="space-y-2">
                  {["Automatic goal detection", "Structure optimization", "Model-specific adjustments", "Continuous learning"].map((item, i) => (
                    <li key={i} className="flex items-center text-zinc-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl p-6 border border-zinc-700/50 shadow-xl">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-zinc-400 font-mono">IntelliPrompt Context Analyzer</div>
                </div>
                <div className="space-y-3">
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                    <div className="text-xs text-blue-400 font-mono mb-1">Goal Detected:</div>
                    <div className="text-xs text-zinc-300 font-mono">Create compelling product description</div>
                  </div>
                  <div className="bg-zinc-950 p-2 rounded border border-zinc-800">
                    <div className="text-xs text-blue-400 font-mono mb-1">Suggested Context Elements:</div>
                    <div className="space-y-1">
                      <div className="text-xs text-zinc-300 font-mono flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Target audience details
                      </div>
                      <div className="text-xs text-zinc-300 font-mono flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Product benefits (not just features)
                      </div>
                      <div className="text-xs text-zinc-300 font-mono flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Emotional appeal elements
                      </div>
                      <div className="text-xs text-zinc-300 font-mono flex items-center">
                        <span className="text-green-500 mr-2">✓</span> Brand voice guidelines
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 