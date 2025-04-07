import Hero from "@/components/hero"
import Features from "@/components/features"
import BeforeAfter from "@/components/before-after"
import Pricing from "@/components/pricing"
import Reviews from "@/components/testimonials"
import CtaSection from "@/components/cta-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <main>
        <Hero />
        <Features />
        <BeforeAfter />
        <Pricing />
        <Reviews />
        <CtaSection />
      </main>
    </div>
  )
}

