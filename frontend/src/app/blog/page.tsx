'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { articles } from '@/data/articles'
import { useLanguage } from '@/contexts/LanguageContext'

const categoryColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
}

const heroBg: Record<string, string> = {
  blue: 'from-blue-500 to-blue-700',
  purple: 'from-purple-500 to-purple-800',
  orange: 'from-orange-400 to-orange-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  teal: 'from-teal-500 to-teal-700',
}

const allCategories = ['all', ...Array.from(new Set(articles.map(a => a.categoryColor)))]

export default function BlogPage() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  const categories = [
    { key: 'all', labelFr: 'Tous', labelEn: 'All' },
    { key: 'blue', labelFr: 'IA Agentique', labelEn: 'Agentic AI' },
    { key: 'purple', labelFr: 'LLM & MCP', labelEn: 'LLM & MCP' },
    { key: 'orange', labelFr: 'MLOps', labelEn: 'MLOps' },
    { key: 'green', labelFr: 'RAG', labelEn: 'RAG' },
    { key: 'red', labelFr: 'Fine-tuning', labelEn: 'Fine-tuning' },
    { key: 'teal', labelFr: 'Backend', labelEn: 'Backend' },
  ]

  const filtered = articles.filter(a => {
    const matchCat = activeFilter === 'all' || a.categoryColor === activeFilter
    const q = search.toLowerCase()
    const matchSearch = !q ||
      t(a.titleFr, a.titleEn).toLowerCase().includes(q) ||
      a.tags.some(tag => tag.toLowerCase().includes(q))
    return matchCat && matchSearch
  })

  const featured = articles[0]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              ✍️ {t('Articles techniques', 'Technical Articles')}
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {t('Blog &', 'Blog &')}{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t('Insights', 'Insights')}
              </span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t(
                "Mes réflexions sur l'IA Agentique, les LLMs, MLOps et le développement Backend. Du concret, du code, des résultats.",
                "My thoughts on Agentic AI, LLMs, MLOps and Backend development. Real content, real code, real results."
              )}
            </p>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-8"
          >
            {[
              { n: articles.length, labelFr: 'Articles', labelEn: 'Articles' },
              { n: '6', labelFr: 'Catégories', labelEn: 'Categories' },
              { n: articles.reduce((s, a) => s + parseInt(a.readTime), 0) + ' min', labelFr: 'de lecture', labelEn: 'of reading' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.n}</div>
                <div className="text-gray-400 text-sm">{t(stat.labelFr, stat.labelEn)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured post */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              ⭐ {t('Article à la une', 'Featured Article')}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </div>

          <Link href={`/blog/${featured.slug}`}>
            <div className="group relative rounded-3xl overflow-hidden bg-gray-900 dark:bg-gray-800 cursor-pointer transition-transform hover:-translate-y-1 duration-300 shadow-2xl">
              {/* Gradient bg based on category */}
              <div className={`absolute inset-0 bg-gradient-to-br ${heroBg[featured.categoryColor]} opacity-80`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{featured.emoji}</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                    {t(featured.categoryFr, featured.categoryEn)}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
                    ⏱ {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl lg:text-4xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors leading-tight max-w-3xl">
                  {t(featured.titleFr, featured.titleEn)}
                </h2>

                <p className="text-gray-200 text-lg mb-6 max-w-2xl leading-relaxed">
                  {t(featured.excerptFr, featured.excerptEn)}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {featured.tags.slice(0, 4).map(tag => (
                      <span key={tag} className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-white font-semibold group-hover:translate-x-2 transition-transform duration-200 flex items-center gap-1">
                    {t('Lire', 'Read')} →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder={t('Rechercher un article...', 'Search articles...')}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeFilter === cat.key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t(cat.labelFr, cat.labelEn)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl">{t('Aucun article trouvé', 'No articles found')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800/80 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Card header gradient */}
                <div className={`h-2 bg-gradient-to-r ${heroBg[article.categoryColor]}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{article.emoji}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[article.categoryColor]}`}>
                        {t(article.categoryFr, article.categoryEn)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">⏱ {article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-3 leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {t(article.titleFr, article.titleEn)}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {t(article.excerptFr, article.excerptEn)}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-400">+{article.tags.length - 3}</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-xs text-gray-400">
                      📅 {t(article.date, article.dateEn)}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:translate-x-1 transition-transform duration-200 flex items-center gap-1"
                    >
                      {t('Lire', 'Read')} →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-10 text-center text-white"
        >
          <div className="text-4xl mb-4">📬</div>
          <h3 className="text-2xl font-bold mb-2">
            {t("Restez au courant", "Stay in the loop")}
          </h3>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            {t(
              "Nouveaux articles sur l'IA Agentique, MLOps et Backend. Pas de spam.",
              "New articles on Agentic AI, MLOps and Backend. No spam."
            )}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            {t("Me contacter", "Contact me")} →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
