'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturedSkills() {
  const { t } = useLanguage()

  const skillGroups = [
    {
      groupLabel: t('🤖 IA Agentique & LLMs', '🤖 Agentic AI & LLMs'),
      color: 'from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50 dark:bg-blue-900/20',
      skills: [
        { name: 'LangGraph', level: 92, hot: true },
        { name: 'CrewAI', level: 90, hot: true },
        { name: 'MCP', level: 88, hot: true },
        { name: 'LangChain', level: 85, hot: false },
        { name: 'RAG', level: 87, hot: false },
        { name: 'OpenAI SDK', level: 88, hot: false },
      ],
    },
    {
      groupLabel: t('🐍 Backend & Full-Stack', '🐍 Backend & Full-Stack'),
      color: 'from-green-500 to-emerald-600',
      lightBg: 'bg-green-50 dark:bg-green-900/20',
      skills: [
        { name: 'Python', level: 95, hot: true },
        { name: 'Django', level: 92, hot: true },
        { name: 'React', level: 82, hot: false },
        { name: 'TypeScript', level: 80, hot: false },
        { name: 'Flutter', level: 75, hot: false },
        { name: 'Node.js', level: 78, hot: false },
      ],
    },
    {
      groupLabel: t('☁️ Cloud & DevOps', '☁️ Cloud & DevOps'),
      color: 'from-orange-500 to-red-500',
      lightBg: 'bg-orange-50 dark:bg-orange-900/20',
      skills: [
        { name: 'AWS', level: 85, hot: true },
        { name: 'Docker', level: 88, hot: true },
        { name: 'GitHub Actions', level: 82, hot: false },
        { name: 'Lambda / S3 / EC2', level: 80, hot: false },
        { name: 'PostgreSQL', level: 88, hot: true },
        { name: 'PyTorch', level: 84, hot: true },
      ],
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
            {t('Mes', 'My')}{' '}
            <span className="gradient-text">{t('Compétences', 'Top Skills')}</span>{' '}
            {t('Principales', '')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Technologies et outils maîtrisés pour créer des systèmes d'IA agentiques et des applications robustes",
              'Technologies mastered to build agentic AI systems and robust applications'
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.15 }}
              className={`${group.lightBg} rounded-2xl p-6 shadow-lg`}
            >
              <h3 className="font-bold text-base mb-5">{group.groupLabel}</h3>
              <div className="space-y-4">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                        {skill.hot && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded font-semibold">
                            {t('Expert', 'Expert')}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.3 + si * 0.08 }}
                        className={`h-full rounded-full bg-gradient-to-r ${group.color}`}
                      />
                    </div>
                  </div>
                ))}
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
          <Link href="/skills" className="btn-primary">
            {t('Voir toutes mes compétences', 'View all my skills')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
