'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { articles } from '@/data/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const heroBg: Record<string, string> = {
  blue: 'from-blue-500 to-blue-700',
  purple: 'from-purple-500 to-purple-800',
  orange: 'from-orange-400 to-orange-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  teal: 'from-teal-500 to-teal-700',
}

const categoryColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
}

export default function LatestBlogPosts() {
  const { t } = useLanguage()
  const latest = articles.slice(0, 3)
  const featured = latest[0]
  const rest = latest.slice(1)

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            ✍️ {t('Articles récents', 'Recent Articles')}
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {t('Derniers', 'Latest')}{' '}
            <span className="gradient-text">{t('Articles', 'Articles')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Guides techniques sur l'IA Agentique, LLMs, MLOps et Backend. Du code concret, des résultats réels.",
              'Technical guides on Agentic AI, LLMs, MLOps and Backend. Concrete code, real results.'
            )}
          </p>
        </motion.div>

        {/* Layout: featured large + 2 cards */}
        <div className="grid lg:grid-cols-5 gap-6 mb-10">
          {/* Featured — large card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <Link href={`/blog/${featured.slug}`}>
              <article className="group relative h-full min-h-[340px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${heroBg[featured.categoryColor]}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{featured.emoji}</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {t(featured.categoryFr, featured.categoryEn)}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white/90 px-3 py-1 rounded-full text-xs">
                      ⏱ {featured.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                    {t(featured.titleFr, featured.titleEn)}
                  </h3>

                  <p className="text-white/75 text-sm leading-relaxed mb-5 line-clamp-2">
                    {t(featured.excerptFr, featured.excerptEn)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {featured.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="bg-white/10 text-white/80 text-xs px-2 py-0.5 rounded-md font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-white font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {t('Lire', 'Read')} →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>

          {/* 2 side cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {rest.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="flex-1"
              >
                <Link href={`/blog/${article.slug}`}>
                  <article className="group h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex flex-col">
                    {/* Top accent */}
                    <div className={`h-1.5 bg-gradient-to-r ${heroBg[article.categoryColor]}`} />

                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{article.emoji}</span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[article.categoryColor]}`}>
                            {t(article.categoryFr, article.categoryEn)}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">⏱ {article.readTime}</span>
                      </div>

                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {t(article.titleFr, article.titleEn)}
                      </h3>

                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
                        {t(article.excerptFr, article.excerptEn)}
                      </p>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <span className="text-xs text-gray-400">📅 {t(article.date, article.dateEn)}</span>
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                          {t('Lire', 'Read')} →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mb-10 py-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700"
        >
          {[
            { n: articles.length, labelFr: 'Articles publiés', labelEn: 'Articles published' },
            { n: '6', labelFr: 'Catégories', labelEn: 'Categories' },
            { n: articles.reduce((s, a) => s + parseInt(a.readTime), 0) + ' min', labelFr: 'de contenu total', labelEn: 'total content' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-6">
              <div className="text-2xl font-bold gradient-text">{stat.n}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t(stat.labelFr, stat.labelEn)}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 btn-primary"
          >
            {t('Voir tous les articles', 'View all articles')}
            <span className="ml-1">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
