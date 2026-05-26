'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPreview() {
  const { t } = useLanguage()

  const highlights = [
    {
      icon: AcademicCapIcon,
      title: t('Formation internationale', 'International Education'),
      description: t(
        "Master Data Science (GPA 8.65/10) au VIT – Inde. Licence Génie Logiciel (GPA 9.28/10) à APG Shimla University.",
        "M.Sc. Data Science (GPA 8.65/10) at VIT – India. B.Sc. Software Engineering (GPA 9.28/10) at APG Shimla University."
      ),
    },
    {
      icon: RocketLaunchIcon,
      title: t('IA Agentique & LLMs', 'Agentic AI & LLMs'),
      description: t(
        "Conception d'architectures multi-agents autonomes avec LangGraph, CrewAI et MCP pour automatiser des workflows métier complexes.",
        "Designing multi-agent autonomous architectures with LangGraph, CrewAI and MCP to automate complex business workflows."
      ),
    },
    {
      icon: GlobeAltIcon,
      title: t('Expérience internationale', 'International Experience'),
      description: t(
        "Trilingue (Français, Anglais, Éwé). Expérience en USA (Kirusa), Inde (VIT, Digital Fortress) et Togo.",
        "Trilingual (French, English, Ewe). Experience in USA (Kirusa), India (VIT, Digital Fortress) and Togo."
      ),
    },
  ]

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t("Passionné par l'", 'Passionate about')}{' '}
              <span className="gradient-text">{t('IA Agentique', 'Agentic AI')}</span>
              {t(' & le Full-Stack', ' & Full-Stack')}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t(
                "Ingénieur en Data Science spécialisé dans le déploiement en production de systèmes d'IA agentiques et d'applications Full-Stack. Lead Backend chez Kirusa (USA) depuis 2023, j'orchestre des agents autonomes et des LLMs pour automatiser des processus métier complexes.",
                "Data Science Engineer specializing in production deployment of agentic AI systems and Full-Stack applications. Backend Lead at Kirusa (USA) since 2023, I orchestrate autonomous agents and LLMs to automate complex business processes."
              )}
            </p>

            <div className="space-y-6 mb-8">
              {highlights.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Link href="/about" className="btn-primary">
              {t('En savoir plus', 'Learn more about me')}
            </Link>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8">
              {/* Quote */}
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">👨‍💻</div>
                <blockquote className="text-gray-700 dark:text-gray-200 italic text-base leading-relaxed">
                  {t(
                    "L'IA agentique n'est pas juste de la technologie – c'est l'art de donner de l'autonomie aux machines pour résoudre les problèmes impossibles.",
                    "Agentic AI is not just technology – it's the art of giving machines the autonomy to solve the impossible."
                  )}
                </blockquote>
              </div>

              {/* Language tags */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {['Français 🇫🇷', 'English 🇬🇧', 'Éwé 🇹🇬'].map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium">
                    {lang}
                  </span>
                ))}
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold gradient-text">8.65</div>
                  <div className="text-xs text-gray-500 mt-1">GPA – M.Sc. VIT</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold gradient-text">9.28</div>
                  <div className="text-xs text-gray-500 mt-1">GPA – B.Sc. Shimla</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold gradient-text">3+</div>
                  <div className="text-xs text-gray-500 mt-1">{t("Ans d'exp.", 'Years exp.')}</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow">
                  <div className="text-2xl font-bold gradient-text">5</div>
                  <div className="text-xs text-gray-500 mt-1">{t('Postes', 'Positions')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
