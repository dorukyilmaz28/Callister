import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import { LanguageProvider } from '@/contexts/LanguageContext'

export const metadata: Metadata = {
  title: 'Callister #9024 - FRC Takımı',
  description: 'Callister #9024 FRC Takımı - Teknoloji, inovasyon ve sürdürülebilirlikte öncü',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Chatbot />
        </LanguageProvider>
      </body>
    </html>
  )
} 