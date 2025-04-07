import { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "About | IntelliPrompt",
  description: "Learn more about our company and mission.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-center">About Us</h1>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            eu lorem et ultricies. In porta lorem at dui semper, non ultrices
            ipsum tincidunt. Ut vel lectus vel velit vehicula dignissim.
          </p>

          <h2 className="text-2xl font-bold mt-8">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Donec ornare felis erat, non pulvinar tellus luctus nec. Aliquam vitae
            augue eu nisi sodales fermentum vel nec nunc. Mauris non metus eget
            libero viverra placerat. Nullam a sapien sit amet nisi malesuada
            pellentesque.
          </p>

          <h2 className="text-2xl font-bold mt-8">Our Vision</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Sed vehicula ipsum quis nisi lobortis, a iaculis justo tincidunt.
            Suspendisse potenti. Nam bibendum neque quis bibendum interdum.
            Vestibulum auctor, ante et placerat facilisis, arcu ipsum lobortis
            dui, eget tempus odio velit sit amet sem.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
} 