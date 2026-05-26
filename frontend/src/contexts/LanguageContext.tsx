'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'fr' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (fr: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'fr',
  setLang: () => {},
  t: (fr) => fr,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr')

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-lang') as Lang | null
    if (stored === 'fr' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('portfolio-lang', l)
  }

  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
