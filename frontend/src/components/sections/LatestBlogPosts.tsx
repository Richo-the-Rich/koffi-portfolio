'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LatestBlogPosts() {
  const { t } = useLanguage()

  const posts = [
    {
      id: 1,
      titleFr: 'LangGraph vs CrewAI : Quelle architecture multi-agents choisir ?',
      titleEn: 'LangGraph vs CrewAI: Which multi-agent architecture to choose?',
      excerptFr: "Comparaison approfondie des deux frameworks leaders pour l'orchestration d'agents autonomes en production.",
      excerptEn: "In-depth comparison of the two leading frameworks for orchestrating autonomous agents in production.",
      date: t('12 Avril 2025', 'April 12, 2025'),
      readTime: '7 min',
      categoryFr: 'IA Agentique',
      categoryEn: 'Agentic AI',
    },
    {
      id: 2,
      titleFr: 'MCP (Model Context Protocol) : Le futur des LLM tools',
      titleEn: 'MCP (Model Context Protocol): The future of LLM tools',
      excerptFr: "Comprendre et implémenter le protocole MCP pour connecter vos agents IA à des outils et données externes.",
      excerptEn: "Understanding and implementing the MCP protocol to connect your AI agents to external tools and data sources.",
      date: t('28 Mars 2025', 'March 28, 2025'),
      readTime: '9 min',
      categoryFr: 'LLM & MCP',
      categoryEn: 'LLM & MCP',
    },
    {
      id: 3,
      titleFr: 'MLOps sur AWS : déployer un modèle PyTorch en production',
      titleEn: 'MLOps on AWS: deploying a PyTorch model to production',
      excerptFr: "Guide complet pour entraîner, containeriser et déployer un modèle ML sur AWS Lambda et EC2 avec Docker.",
      excerptEn: "Complete guide to training, containerizing, and deploying an ML model on AWS Lambda and EC2 with Docker.",
      date: t('15 Mars 2025', 'March 15, 2025'),
      readTime: '11 min',
      categoryFr: 'MLOps',
      categoryEn: 'MLOps',
    },
  ]

  return (
    <section className="section-padding bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('Derniers', 'Latest')}{' '}
            <span className="gradient-text">{t('Articles', 'Articles')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Mes réflexions et guides techniques sur l'IA Agentique, les LLMs et le MLOps",
              'My thoughts and technical guides on Agentic AI, LLMs, and MLOps'
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden card-hover border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    {t(post.categoryFr, post.categoryEn)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    ⏱ {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 leading-snug hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  <Link href={`/blog/${post.id}`}>
                    {t(post.titleFr, post.titleEn)}
                  </Link>
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                  {t(post.excerptFr, post.excerptEn)}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📅 {post.date}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm transition-colors duration-200"
                  >
                    {t('Lire →', 'Read →')}
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link href="/blog" className="btn-primary">
            {t('Voir tous les articles', 'View all articles')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
