'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { EnvelopeIcon, MapPinIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactCTA() {
  const { t } = useLanguage()

  return (
    <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
      {/* BG decor */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            {t('Prêt à concrétiser votre projet ?', 'Ready to bring your project to life?')}
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            {t(
              "Discutons de vos besoins en IA Agentique, LLMs ou Full-Stack. Transformons vos idées en solutions intelligentes.",
              "Let's discuss your Agentic AI, LLMs, or Full-Stack needs. Let's turn your ideas into intelligent solutions."
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <EnvelopeIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Email</h3>
            <p className="opacity-80 text-sm">azougo.ulrich@gmail.com</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{t('Localisation', 'Location')}</h3>
            <p className="opacity-80 text-sm">Lomé, Togo · {t('Remote / Hybride', 'Remote / Hybrid')}</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChatBubbleLeftRightIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{t('Consultation', 'Consultation')}</h3>
            <p className="opacity-80 text-sm">{t('Gratuite 30 min', 'Free 30 min')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/contact"
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            <EnvelopeIcon className="w-5 h-5" />
            {t('Démarrer un projet', 'Start a project')}
          </Link>

          <Link
            href="/projects"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            {t('Voir mon portfolio', 'View my portfolio')}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="opacity-70 text-sm">
            ⚡ {t('Réponse garantie sous 24h', 'Response guaranteed within 24h')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
