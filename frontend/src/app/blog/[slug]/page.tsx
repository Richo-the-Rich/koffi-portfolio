'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getArticleBySlug, getRelatedArticles, articles } from '@/data/articles'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState, useEffect } from 'react'

const heroBg: Record<string, string> = {
  blue: 'from-blue-600 to-blue-900',
  purple: 'from-purple-600 to-purple-900',
  orange: 'from-orange-500 to-orange-900',
  green: 'from-green-600 to-green-900',
  red: 'from-red-600 to-red-900',
  teal: 'from-teal-600 to-teal-900',
}

const categoryColors: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  teal: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
}

/** Converts markdown-like content to JSX elements */
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let keyCounter = 0

  while (i < lines.length) {
    const line = lines[i]

    // Code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={keyCounter++} className="my-6 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
          {lang && (
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">{lang}</span>
              <span className="text-xs text-gray-500">code</span>
            </div>
          )}
          <pre className="bg-gray-900 p-5 overflow-x-auto text-sm">
            <code className="text-green-300 font-mono leading-relaxed">
              {codeLines.join('\n')}
            </code>
          </pre>
        </div>
      )
      i++
      continue
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={keyCounter++} className="text-2xl font-bold mt-10 mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={keyCounter++} className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-100">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').filter(c => c.trim()).map(c => c.trim())
      i += 2 // skip separator
      const rows: string[][] = []
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').filter(c => c.trim()).map(c => c.trim()))
        i++
      }
      elements.push(
        <div key={keyCounter++} className="my-6 overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Bullet list (✅ ❌ ⚠️ - •)
    if (line.match(/^[✅❌⚠️•\-]\s/) || line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && (lines[i].match(/^[✅❌⚠️•\-]\s/) || lines[i].startsWith('- '))) {
        listItems.push(lines[i])
        i++
      }
      elements.push(
        <ul key={keyCounter++} className="my-4 space-y-2">
          {listItems.map((item, ii) => (
            <li key={ii} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <span className="mt-0.5 flex-shrink-0">
                {item.startsWith('✅') ? '✅' : item.startsWith('❌') ? '❌' : item.startsWith('⚠️') ? '⚠️' : '•'}
              </span>
              <span>{renderInline(item.replace(/^[✅❌⚠️•\-]\s?/, ''))}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (line.match(/^\d+\.\s/)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        listItems.push(lines[i])
        i++
      }
      elements.push(
        <ol key={keyCounter++} className="my-4 space-y-2 list-decimal list-inside">
          {listItems.map((item, ii) => (
            <li key={ii} className="text-gray-700 dark:text-gray-300">
              {renderInline(item.replace(/^\d+\.\s/, ''))}
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Blockquote
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote key={keyCounter++} className="my-4 border-l-4 border-blue-500 pl-4 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg text-gray-700 dark:text-gray-300 italic">
          {line.slice(2)}
        </blockquote>
      )
      i++
      continue
    }

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={keyCounter++} className="my-3 text-gray-700 dark:text-gray-300 leading-relaxed">
        {renderInline(line)}
      </p>
    )
    i++
  }

  return elements
}

/** Renders inline markdown: **bold**, `code` */
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const raw = match[0]
    if (raw.startsWith('**')) {
      parts.push(<strong key={match.index} className="font-semibold text-gray-900 dark:text-white">{raw.slice(2, -2)}</strong>)
    } else if (raw.startsWith('`')) {
      parts.push(<code key={match.index} className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">{raw.slice(1, -1)}</code>)
    }
    lastIndex = match.index + raw.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts
}

export default function ArticlePage() {
  const params = useParams()
  const { t, lang } = useLanguage()
  const slug = params?.slug as string
  const article = getArticleBySlug(slug)
  const related = article ? getRelatedArticles(article) : []
  const [readProgress, setReadProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setReadProgress(Math.min(100, Math.max(0, progress)))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">{t('Article introuvable', 'Article not found')}</h1>
          <Link href="/blog" className="text-blue-600 hover:underline">
            ← {t('Retour au blog', 'Back to blog')}
          </Link>
        </div>
      </div>
    )
  }

  const content = lang === 'fr' ? article.contentFr : article.contentEn

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transition-all duration-100"
        style={{ width: `${readProgress}%` }}
      />

      {/* Hero */}
      <section className={`relative bg-gradient-to-br ${heroBg[article.categoryColor]} py-16 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              {t('Accueil', 'Home')}
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-white/90 truncate max-w-xs">
              {t(article.titleFr, article.titleEn)}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-3xl">{article.emoji}</span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold">
                {t(article.categoryFr, article.categoryEn)}
              </span>
              <span className="text-white/70 text-sm">⏱ {article.readTime} {t('de lecture', 'read')}</span>
              <span className="text-white/70 text-sm">📅 {t(article.date, article.dateEn)}</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              {t(article.titleFr, article.titleEn)}
            </h1>

            <p className="text-lg text-white/80 leading-relaxed mb-6">
              {t(article.excerptFr, article.excerptEn)}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-white/10 text-white/90 border border-white/20 px-3 py-1 rounded-full text-xs font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Author card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 mb-10"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
              KA
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white">Koffi AZOUGO</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('Ingénieur IA & Full-Stack · Backend Lead @ Kirusa (USA)', 'AI & Full-Stack Engineer · Backend Lead @ Kirusa (USA)')}
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Link
                href="https://github.com/Richo-the-Rich"
                target="_blank"
                className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg"
              >
                GitHub
              </Link>
            </div>
          </motion.div>

          {/* Article content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose-custom"
          >
            {renderContent(content)}
          </motion.div>

          {/* Share / Nav */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/blog"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                ← {t('Tous les articles', 'All articles')}
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{t('Partager :', 'Share:')}</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(t(article.titleFr, article.titleEn))}&url=${encodeURIComponent('https://frontend-two-pied-79.vercel.app/blog/' + article.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium hover:bg-sky-200 dark:hover:bg-sky-800/40 transition-colors"
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://frontend-two-pied-79.vercel.app/blog/' + article.slug)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                📚 {t('Articles similaires', 'Related Articles')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`}>
                    <div className="group p-5 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">{rel.emoji}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[rel.categoryColor]}`}>
                          {t(rel.categoryFr, rel.categoryEn)}
                        </span>
                        <span className="text-xs text-gray-400 ml-auto">⏱ {rel.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {t(rel.titleFr, rel.titleEn)}
                      </h4>
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                        {t(rel.excerptFr, rel.excerptEn)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-center text-white"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-bold mb-2">
              {t("Vous avez un projet en tête ?", "Have a project in mind?")}
            </h3>
            <p className="text-blue-100 text-sm mb-5">
              {t(
                "Discutons de votre projet d'IA Agentique ou Backend.",
                "Let's discuss your Agentic AI or Backend project."
              )}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors text-sm"
            >
              {t("Me contacter", "Get in touch")} →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
