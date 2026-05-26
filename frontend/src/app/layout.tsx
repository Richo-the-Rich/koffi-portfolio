import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Koffi Ulrich AZOUGO – AI Systems & Full-Stack Engineer',
    template: '%s | Koffi Ulrich AZOUGO'
  },
  description: 'Portfolio of Koffi Ulrich AZOUGO – AI Systems & Agentic Engineer, Full-Stack Developer. Expert in LangGraph, CrewAI, MCP, Django, AWS. Available Remote/Hybrid.',
  keywords: ['AI Engineer', 'Agentic AI', 'LangGraph', 'CrewAI', 'MCP', 'LLM', 'Full-Stack', 'Python', 'Django', 'AWS', 'Portfolio', 'Koffi AZOUGO'],
  authors: [{ name: 'Koffi Ulrich AZOUGO' }],
  creator: 'Koffi Ulrich AZOUGO',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://koffi-portfolio.vercel.app',
    title: 'Koffi Ulrich AZOUGO – AI Systems & Full-Stack Engineer',
    description: 'Expert en IA Agentique & Full-Stack – LangGraph, CrewAI, MCP, Django, AWS. Disponible Remote/Hybrid.',
    siteName: 'Koffi AZOUGO Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Koffi Ulrich AZOUGO – AI Systems & Full-Stack Engineer',
    description: 'Expert en IA Agentique & Full-Stack – LangGraph, CrewAI, MCP, Django, AWS.',
    creator: '@koffi_azougo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
