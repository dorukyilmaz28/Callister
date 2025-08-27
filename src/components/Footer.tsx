import Link from 'next/link'
import { Instagram, Youtube, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/callisterfrc?igsh=MTMwNWdmZGJ1OWcwMg==', icon: Instagram },
  { name: 'YouTube', href: 'https://youtube.com/@callisterfrc?feature=shared', icon: Youtube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/callisterfrc/', icon: Linkedin },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer mt-24 py-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="text-2xl font-extrabold text-gradient mb-2 select-none">Callister #9024</div>
          <div className="text-secondary text-sm mb-2">© {currentYear} Callister #9024 FRC Takımı</div>
          <div className="text-secondary/80 text-xs">Bilim, teknoloji ve toplumsal etki için birlikte çalışıyoruz.</div>
        </div>
        <div className="flex gap-4 items-center justify-center">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-accent transition-colors duration-200"
              aria-label={social.name}
            >
              <social.icon size={28} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
} 