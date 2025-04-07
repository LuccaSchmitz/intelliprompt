import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, MessagesSquare, BadgeCheck } from "lucide-react"

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      content:
        "IntelliPrompt has completely transformed how I use AI tools. The quality difference is night and day, and I'm getting results I never thought possible.",
      author: {
        name: "Sarah Johnson",
        role: "Content Creator",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
    },
    {
      id: 2,
      content:
        "As a designer, I was skeptical about AI tools until I started using IntelliPrompt's templates. Now I can generate incredible concept art that actually matches my vision.",
      author: {
        name: "Michael Chen",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
    },
    {
      id: 3,
      content:
        "Our marketing team has cut content creation time in half while improving quality. IntelliPrompt pays for itself many times over each month.",
      author: {
        name: "Jessica Williams",
        role: "Marketing Director",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
    },
    {
      id: 4,
      content:
        "I've tried many prompt engineering tools, but IntelliPrompt is in a league of its own. The templates are thoughtfully designed and the results speak for themselves.",
      author: {
        name: "David Rodriguez",
        role: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      rating: 5,
    },
  ]

  // Trusted by logos/companies
  const trustedBy = [
    { name: "Microsoft", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968705.png" },
    { name: "Adobe", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968428.png" },
    { name: "Shopify", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968853.png" },
    { name: "Spotify", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968959.png" },
    { name: "Slack", logo: "https://cdn-icons-png.flaticon.com/256/5968/5968929.png" },
  ]

  return (
    <section id="reviews" className="relative py-20 bg-[#0A0A0F] overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Glowing accent */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Trusted by section */}
        <div className="mb-20 py-8 px-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 backdrop-blur-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center rounded-full border border-blue-900/50 bg-zinc-900/80 px-3 py-1 text-sm text-blue-400 backdrop-blur mb-2">
              <BadgeCheck className="mr-2 h-3 w-3 text-blue-400" />
              Trusted By Professionals
            </div>
            <h3 className="text-2xl font-semibold text-white">
              <span className="text-blue-400 font-bold">5,000+</span> professionals trust IntelliPrompt daily
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedBy.map((company) => (
              <div key={company.name} className="flex flex-col items-center">
                <div className="h-12 w-12 bg-zinc-800 p-2 rounded-full">
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-full w-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <span className="text-xs text-zinc-500 mt-2">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-400 backdrop-blur mb-5">
            <MessagesSquare className="mr-2 h-3 w-3 text-blue-400" />
            User Reviews
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What Our <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-3xl mx-auto">
            Join thousands of professionals who are getting more from their AI tools with IntelliPrompt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-zinc-900 border-zinc-800 shadow-xl relative group overflow-hidden">
              {/* Accent color */}
              <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-70"></div>
              
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-blue-400" />
                  ))}
                </div>
                
                <div className="absolute -right-1 -top-1 opacity-10 text-blue-500">
                  <Quote className="h-16 w-16" />
                </div>
                
                <p className="text-zinc-300 mb-6 relative z-10">"{review.content}"</p>
                
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4 ring-1 ring-zinc-700 shadow-lg">
                    <img
                      src={review.author.avatar}
                      alt={review.author.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{review.author.name}</h4>
                    <p className="text-xs text-zinc-500">{review.author.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

