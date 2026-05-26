'use client'

import Link from 'next/link'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { labelFr: 'Accueil', labelEn: 'Home', href: '/' },
    { labelFr: 'À propos', labelEn: 'About', href: '/about' },
    { labelFr: 'Expérience', labelEn: 'Experience', href: '/experience' },
    { labelFr: 'Compétences', labelEn: 'Skills', href: '/skills' },
    { labelFr: 'Projets', labelEn: 'Projects', href: '/projects' },
    { labelFr: 'Contact', labelEn: 'Contact', href: '/contact' },
  ]

  const services = [
    { labelFr: 'IA Agentique & LLMs', labelEn: 'Agentic AI & LLMs' },
    { labelFr: 'Développement Backend', labelEn: 'Backend Development' },
    { labelFr: 'MLOps & Cloud AWS', labelEn: 'MLOps & AWS Cloud' },
    { labelFr: 'Consultation Technique', labelEn: 'Technical Consulting' },
  ]

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">KA</span>
              </div>
              <span className="font-bold text-xl">Koffi AZOUGO</span>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              {t(
                "Ingénieur Systèmes IA & Agentique · Développeur Full-Stack. Spécialisé en LangGraph, CrewAI, MCP, Django et AWS.",
                "AI Systems & Agentic Engineer · Full-Stack Developer. Specialized in LangGraph, CrewAI, MCP, Django, and AWS."
              )}
            </p>

            <div className="space-y-2.5">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <EnvelopeIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>azougo.ulrich@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <MapPinIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Lomé, Togo · {t('Remote / Hybride', 'Remote / Hybrid')}</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {t(link.labelFr, link.labelEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">▸</span>
                  {t(s.labelFr, s.labelEn)}
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Badges */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('Restons connectés', 'Stay connected')}</h3>
            <p className="text-gray-300 mb-4 text-sm">
              {t(
                "Suivez mes projets en IA Agentique et mes contributions open-source",
                'Follow my Agentic AI projects and open-source contributions'
              )}
            </p>

            <div className="flex gap-3 mb-6">
              {[
                { icon: FaGithub, url: 'https://github.com/Richo-the-Rich', label: 'GitHub', color: 'hover:text-white hover:bg-gray-700' },
                { icon: FaLinkedin, url: 'https://linkedin.com/in/koffi-azougo', label: 'LinkedIn', color: 'hover:text-blue-400 hover:bg-blue-900/30' },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:scale-110`}
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>

            {/* Availability badge */}
            <div className="bg-green-900/30 border border-green-700 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-xs font-semibold">{t('Disponible', 'Available')}</span>
              </div>
              <p className="text-gray-400 text-xs">{t('Remote / Hybride · Monde entier', 'Remote / Hybrid · Worldwide')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-gray-400 text-sm">
              © {year} Koffi Ulrich AZOUGO. {t('Tous droits réservés.', 'All rights reserved.')}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>🤖 {t('Ingénieur IA Agentique', 'Agentic AI Engineer')}</span>
              <span>·</span>
              <span>🐍 {t('Expert Python/Django', 'Python/Django Expert')}</span>
              <span>·</span>
              <span>☁️ AWS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
