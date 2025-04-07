import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from "@/components/navbar"
import FooterWrapper from "@/components/footer-wrapper"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/authContext"

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'IntelliPrompt - AI-Powered Writing Assistant',
  description: 'Streamline your writing process with IntelliPrompt, the AI-powered tool that helps you create high-quality content faster than ever before.',
  generator: 'v0.dev',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${spaceGrotesk.className} bg-black text-white`}>
        <AuthProvider>
          <div className="relative min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <FooterWrapper />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
