'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDownIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HeroSection() {
  const { t, lang } = useLanguage()

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  const techBadges = [
    { label: 'LangGraph', color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200' },
    { label: 'CrewAI', color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200' },
    { label: 'MCP', color: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200' },
    { label: 'Django', color: 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200' },
    { label: 'AWS', color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200' },
    { label: 'Docker', color: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-200' },
    { label: 'PyTorch', color: 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200' },
    { label: 'RAG', color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-300/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              {t('Disponible Remote / Hybride', 'Available Remote / Hybrid')}
            </motion.div>

            {/* Name & Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight"
            >
              Koffi Ulrich{' '}
              <span className="gradient-text">AZOUGO</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-6"
            >
              {t(
                'Ingénieur Systèmes IA & Agentique · Développeur Full-Stack',
                'AI Systems & Agentic Engineer · Full-Stack Developer'
              )}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {t(
                "Ingénieur Data Science (Bac+5) avec 3 ans d'expérience dans l'architecture de systèmes d'IA Agentique, LLMs et applications Full-Stack. Spécialisé en orchestration d'agents autonomes (LangGraph, CrewAI, MCP) et infrastructure Cloud (AWS, Docker).",
                "Data Science Engineer (Master's) with 3 years of experience architecting Agentic AI systems, LLMs, and Full-Stack applications. Deep expertise in autonomous agent orchestration (LangGraph, CrewAI, MCP) and cloud infrastructure (AWS, Docker)."
              )}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">3+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t("Ans d'expérience", 'Years experience')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">5</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('Entreprises', 'Companies')}</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold gradient-text">2</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{t('Masters', 'Master')} GPA 8.65+</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/projects" className="btn-primary inline-flex items-center justify-center">
                <span>{t('Voir mes projets', 'View my projects')}</span>
                <ArrowDownIcon className="w-4 h-4 ml-2 transform rotate-[-45deg]" />
              </Link>

              <Link href="/contact" className="btn-secondary inline-flex items-center justify-center">
                <span>{t('Me contacter', 'Contact me')}</span>
              </Link>

              <a
                href="https://github.com/Richo-the-Rich"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                <span>GitHub</span>
                <ArrowDownTrayIcon className="w-4 h-4 ml-2 transform rotate-[-90deg]" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column – Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
              {/* Profile circle */}
              <div className="relative z-10 animate-float">
                <div className="w-72 h-72 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl font-extrabold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        KA
                      </div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-1">Koffi Ulrich</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -top-4 -left-4 glass-effect rounded-xl p-3 shadow-lg animate-float"
                style={{ animationDelay: '2s' }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🤖</span>
                  <div>
                    <div className="text-xs font-bold">LangGraph</div>
                    <div className="text-xs text-gray-500">Agentic AI</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="absolute -bottom-4 -right-4 glass-effect rounded-xl p-3 shadow-lg animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">☁️</span>
                  <div>
                    <div className="text-xs font-bold">AWS + Docker</div>
                    <div className="text-xs text-gray-500">Cloud & MLOps</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="absolute top-1/2 -right-10 glass-effect rounded-xl p-3 shadow-lg animate-float"
                style={{ animationDelay: '3s' }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🐍</span>
                  <div>
                    <div className="text-xs font-bold">Python</div>
                    <div className="text-xs text-gray-500">Django · Flask</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Tech badges cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {techBadges.map((badge) => (
                <span key={badge.label} className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.color}`}>
                  {badge.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full hover:bg-white/10 transition-colors duration-200 animate-bounce"
        aria-label="Scroll to next section"
      >
        <ArrowDownIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </motion.button>
    </section>
  )
}
