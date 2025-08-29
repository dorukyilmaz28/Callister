'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

const navLinks = [
  { nameKey: 'nav.home', href: '/' },
  { nameKey: 'nav.about', href: '/about' },
  { nameKey: 'nav.team', href: '/team' },
  { nameKey: 'nav.projects', href: '/projects' },
  { nameKey: 'nav.events', href: '/events' },
  { nameKey: 'nav.awards', href: '/awards' },
  { nameKey: 'nav.sponsors', href: '/sponsors' },
  { nameKey: 'nav.contact', href: '/contact' },
]

export default function Navbar() {
  const { t, currentLanguage } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  // Mobile menü açıkken scroll'u engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // HTML lang attribute'unu güncelle
  useEffect(() => {
    document.documentElement.lang = currentLanguage
  }, [currentLanguage])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav 
        className={`navbar sticky top-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 ease-in-out ${
          isVisible || isHovered ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3 select-none" onClick={closeMobileMenu}>
          {/* Animated Logo Video */}
          <div className="relative">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full shadow object-cover"
              style={{ objectFit: 'cover' }}
            >
              <source src="/videos/logo.mp4" type="video/mp4" />
              {/* Fallback static logo */}
              <Image src="/logo.png" alt="Callister Logo" width={56} height={56} className="rounded-full shadow" priority />
            </video>
          </div>
          <span className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-tight text-gradient">Callister #9024</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex gap-6 items-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base lg:text-lg font-medium text-white px-2 py-1 rounded transition-all duration-200 hover:text-soft hover:bg-white/10 hover:backdrop-blur-sm"
                >
                  {t(link.nameKey)}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 hover:bg-white/10 rounded transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full">
            <ul className="flex flex-col gap-6 items-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-2xl font-medium text-white px-4 py-2 rounded transition-all duration-200 hover:text-soft hover:bg-white/10"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
} 