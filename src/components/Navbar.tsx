'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const navLinks = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Takım', href: '/team' },
  { name: 'Projeler', href: '/projects' },
  { name: 'Etkinlikler', href: '/events' },
  { name: 'Ödüller', href: '/awards' },
  { name: 'Sponsorlar', href: '/sponsors' },
  { name: 'İletişim', href: '/contact' },
]

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Aşağı scroll - navbar'ı gizle
        setIsVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Yukarı scroll - navbar'ı göster
        setIsVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav 
      className={`navbar sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4 transition-all duration-300 ease-in-out ${
        isVisible || isHovered ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href="/" className="flex items-center gap-3 select-none">
        {/* Animated Logo Video */}
                  <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-14 h-14 rounded-full shadow object-cover"
              style={{ objectFit: 'cover' }}
            >
              <source src="/videos/logo.mp4" type="video/mp4" />
              {/* Fallback static logo */}
              <Image src="/logo.png" alt="Callister Logo" width={56} height={56} className="rounded-full shadow" priority />
            </video>
          </div>
        <span className="text-2xl font-extrabold tracking-tight text-gradient">Callister #9024</span>
      </Link>
      <ul className="flex gap-6 items-center">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-lg font-medium text-white px-2 py-1 rounded transition-all duration-200 hover:text-soft hover:bg-white/10 hover:backdrop-blur-sm"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 