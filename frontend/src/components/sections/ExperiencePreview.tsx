'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ExperiencePreview() {
  const { t } = useLanguage()

  const timeline = [
    {
      period: t('Sept. 2023 – Présent', 'Sept. 2023 – Present'),
      role: t('Ingénieur IA/ML & Lead Backend', 'AI/ML Engineer & Backend Lead'),
      company: 'Kirusa (USA) / PAQS',
      color: 'bg-blue-600',
      icon: '🤖',
    },
    {
      period: t('Juin 2024 – Présent', 'June 2024 – Present'),
      role: t('Enseignant Consultant', 'Missionary Teacher (Consultant)'),
      company: t("Université de Kara – Togo", 'University of Kara – Togo'),
      color: 'bg-purple-600',
      icon: '🎓',
    },
    {
      period: t('Jan. 2024 – Présent', 'Jan. 2024 – Present'),
      role: t('Consultant Python & Cloud', 'Python & Cloud Consultant'),
      company: 'Togotulawo – Togo',
      color: 'bg-green-600',
      icon: '☁️',
    },
    {
      period: t('Jan. – Juin 2023', 'Jan. – June 2023'),
      role: t('Développeur Full-Stack (Stage)', 'Full-Stack Developer (Intern)'),
      company: 'Digital Fortress – India',
      color: 'bg-orange-500',
      icon: '💻',
    },
  ]

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('Mon', 'My')}{' '}
            <span className="gradient-text">{t('Parcours', 'Journey')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "3+ ans d'expérience dans l'innovation technologique – USA, Inde, Togo",
              '3+ years of experience in technological innovation – USA, India, Togo'
            )}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid lg:grid-cols-3 gap-8 text-center mb-14">
          {[
            { emoji: '⏱️', value: '3+', label: t("Ans d'expérience", 'Years experience') },
            { emoji: '🌍', value: '3', label: t('Pays (USA, Inde, Togo)', 'Countries (USA, India, Togo)') },
            { emoji: '🏢', value: '5', label: t('Postes occupés', 'Positions held') },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
            >
              <div className="text-4xl mb-3">{stat.emoji}</div>
              <h3 className="text-3xl font-bold gradient-text mb-2">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline preview */}
        <div className="max-w-2xl mx-auto mb-12">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 mb-6 last:mb-0"
            >
              <div className={`flex-shrink-0 w-10 h-10 ${item.color} rounded-full flex items-center justify-center text-lg shadow-md`}>
                {item.icon}
              </div>
              <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-4 shadow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="font-bold text-sm">{item.role}</h4>
                  <span className="text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                    {item.period}
                  </span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/experience" className="btn-primary">
            {t('Découvrir mon parcours complet', 'Discover my full journey')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
