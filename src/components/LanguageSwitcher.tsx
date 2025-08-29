'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { useLanguage, Language } from '@/contexts/LanguageContext'

const languages = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language)
    setIsOpen(false)
  }

  const currentLang = languages.find(lang => lang.code === currentLanguage)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        aria-label="Change language"
      >
        <Globe size={18} />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
        <span className="text-sm font-medium hidden sm:block">{currentLang?.name}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code as Language)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-white/10 transition-colors duration-200 ${
                  currentLanguage === language.code ? 'bg-white/20' : ''
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="text-white font-medium">{language.name}</span>
                {currentLanguage === language.code && (
                  <Check size={16} className="text-accent ml-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
