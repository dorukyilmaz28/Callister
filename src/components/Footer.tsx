'use client'

import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/callisterfrc?igsh=MTMwNWdmZGJ1OWcwMg==', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@callisterfrc?feature=shared', icon: Youtube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/callisterfrc/', icon: Linkedin },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  return (
    <footer className="footer mt-16 sm:mt-20 lg:mt-24 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl sm:text-2xl font-extrabold text-gradient mb-2 select-none">Callister #9024</div>
                      <div className="text-secondary text-sm mb-2">{t('footer.copyright', { year: currentYear }) as string}</div>
            <div className="text-secondary/80 text-xs px-4 sm:px-0">{t('footer.description') as string}</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors duration-200 p-2 hover:bg-white/10 rounded-full"
              aria-label={social.name}
            >
              <social.icon size={24} className="sm:w-7 sm:h-7" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
} 