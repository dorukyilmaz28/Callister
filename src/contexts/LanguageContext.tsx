'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import tr from '@/data/locales/tr.json'
import en from '@/data/locales/en.json'

export type Language = 'tr' | 'en'

interface LanguageContextType {
  currentLanguage: Language
  changeLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string | string[]
  isEnglish: boolean
  isTurkish: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const locales = {
  tr,
  en
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('tr')
  const [translations, setTranslations] = useState(tr)

  useEffect(() => {
    // Local storage'dan dil tercihini al
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'tr' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage)
      setTranslations(locales[savedLanguage])
    } else {
      // Varsayılan olarak Türkçe kullan
      setCurrentLanguage('tr')
      setTranslations(tr)
      localStorage.setItem('language', 'tr')
      document.documentElement.lang = 'tr'
    }
  }, [])

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    setTranslations(locales[language])
    localStorage.setItem('language', language)
    
    // HTML lang attribute'unu güncelle
    document.documentElement.lang = language
  }

  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    if (typeof value === 'string') {
      // Parametreleri değiştir
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => {
          return params[param]?.toString() || match
        })
      }
      return value
    }

    if (Array.isArray(value)) {
      return value
    }

    return key
  }

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t,
    isEnglish: currentLanguage === 'en',
    isTurkish: currentLanguage === 'tr'
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
