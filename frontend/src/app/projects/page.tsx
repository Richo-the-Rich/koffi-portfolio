'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', labelFr: 'Tous', labelEn: 'All' },
    { id: 'ai', labelFr: '🤖 IA Agentique', labelEn: '🤖 Agentic AI' },
    { id: 'backend', labelFr: '🐍 Backend & API', labelEn: '🐍 Backend & API' },
    { id: 'mlops', labelFr: '⚙️ MLOps', labelEn: '⚙️ MLOps' },
    { id: 'mobile', labelFr: '📱 Mobile', labelEn: '📱 Mobile' },
  ]

  const projects = [
    {
      id: 1,
      title: 'AQGPT',
      cat: 'ai',
      descFr: "Système Q&A basé sur des LLMs avec architecture multi-agents autonomes pour automatiser des workflows métier complexes. Développé en partenariat avec PAQS / Kirusa (USA).",
      descEn: "LLM-based Q&A system with multi-agent autonomous architecture to automate complex business workflows. Developed in partnership with PAQS / Kirusa (USA).",
      technologies: ['LangGraph', 'CrewAI', 'MCP', 'Python', 'OpenAI', 'AWS', 'Docker'],
      image: '🤖',
      featured: true,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["Multi-agents autonomes en production", "Automatisation de workflows métier"],
      resultsEn: ["Autonomous multi-agents in production", "Business workflow automation"],
    },
    {
      id: 2,
      title: 'HappyFIT API',
      cat: 'backend',
      descFr: "API RESTful scalable et sécurisée pour une application fitness. Lead Backend – conception du schéma DB, développement d'endpoints performants. Kirusa (USA).",
      descEn: "Scalable and secure RESTful API for a fitness application. Backend Lead – DB schema design, performant endpoint development. Kirusa (USA).",
      technologies: ['Django', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions', 'Redis'],
      image: '💪',
      featured: true,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["APIs sécurisées et performantes", "CI/CD automatisé via GitHub Actions"],
      resultsEn: ["Secure and performant APIs", "Automated CI/CD via GitHub Actions"],
    },
    {
      id: 3,
      title: t('Pipeline MLOps AWS', 'AWS MLOps Pipeline'),
      cat: 'mlops',
      descFr: "Entraînement et déploiement de modèles ML sur AWS (EC2, Lambda, S3) avec pipelines CI/CD automatisés. Scalabilité et uptime maximum.",
      descEn: "ML model training and deployment on AWS (EC2, Lambda, S3) with automated CI/CD pipelines. Maximum scalability and uptime.",
      technologies: ['Python', 'PyTorch', 'AWS Lambda', 'S3', 'EC2', 'Docker', 'GitHub Actions'],
      image: '⚙️',
      featured: true,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["Déploiement automatisé modèles ML", "Infrastructure Cloud AWS scalable"],
      resultsEn: ["Automated ML model deployment", "Scalable AWS Cloud infrastructure"],
    },
    {
      id: 4,
      title: t('Système Multi-Agents CrewAI', 'CrewAI Multi-Agent System'),
      cat: 'ai',
      descFr: "Orchestration d'agents IA spécialisés avec CrewAI pour automatiser des processus de recherche, d'analyse et de génération de contenu.",
      descEn: "Orchestration of specialized AI agents with CrewAI to automate research, analysis, and content generation processes.",
      technologies: ['CrewAI', 'LangChain', 'Python', 'OpenAI SDK', 'HuggingFace'],
      image: '🧠',
      featured: false,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["Agents spécialisés collaboratifs", "Automatisation de pipelines de recherche"],
      resultsEn: ["Collaborative specialized agents", "Research pipeline automation"],
    },
    {
      id: 5,
      title: t('Application de Sécurité Mobile', 'Mobile Security Application'),
      cat: 'mobile',
      descFr: "Applications mobiles cross-platform (Flutter) avec backend Symfony (PHP) pour une entreprise de sécurité. Sécurité 360 SARL – Togo.",
      descEn: "Cross-platform mobile applications (Flutter) with Symfony (PHP) backend for a security company. Sécurité 360 SARL – Togo.",
      technologies: ['Flutter', 'Symfony', 'PHP', 'MySQL', 'REST API'],
      image: '🔐',
      featured: false,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["Application cross-platform iOS/Android", "Backend sécurisé Symfony"],
      resultsEn: ["Cross-platform iOS/Android app", "Secure Symfony backend"],
    },
    {
      id: 6,
      title: t('Portail E-commerce Full-Stack', 'Full-Stack E-commerce Portal'),
      cat: 'backend',
      descFr: "Application web full-stack avec React (frontend) et Django + PostgreSQL (backend). CI/CD automatisé et déploiement AWS EC2. Digital Fortress – Inde.",
      descEn: "Full-stack web application with React (frontend) and Django + PostgreSQL (backend). Automated CI/CD and AWS EC2 deployment. Digital Fortress – India.",
      technologies: ['React', 'Django', 'PostgreSQL', 'AWS EC2', 'GitHub Actions', 'Docker'],
      image: '🛒',
      featured: false,
      github: 'https://github.com/Richo-the-Rich',
      demo: '#',
      resultsFr: ["End-to-end React + Django", "CI/CD automatisé GitHub Actions"],
      resultsEn: ["End-to-end React + Django", "Automated GitHub Actions CI/CD"],
    },
  ]

  const filtered = projects.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.cat === selectedCategory
    const term = searchTerm.toLowerCase()
    const matchSearch =
      !term ||
      p.title.toLowerCase().includes(term) ||
      t(p.descFr, p.descEn).toLowerCase().includes(term) ||
      p.technologies.some((tech) => tech.toLowerCase().includes(term))
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="section-padding hero-gradient">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {t('Mes', 'My')}{' '}
              <span className="gradient-text">{t('Projets', 'Projects')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Réalisations en IA Agentique, LLMs, Backend Full-Stack et MLOps – de PAQS/Kirusa (USA) à Togotulawo (Togo)",
                "Projects in Agentic AI, LLMs, Full-Stack Backend and MLOps – from PAQS/Kirusa (USA) to Togotulawo (Togo)"
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { emoji: '🤖', fr: '3 Projets IA', en: '3 AI Projects' },
                { emoji: '🐍', fr: '2 APIs Backend', en: '2 Backend APIs' },
                { emoji: '⚙️', fr: '1 MLOps Pipeline', en: '1 MLOps Pipeline' },
              ].map((badge, i) => (
                <span key={i} className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                  {badge.emoji} {t(badge.fr, badge.en)}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {t(cat.labelFr, cat.labelEn)}
                </button>
              ))}
            </div>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('Rechercher...', 'Search...')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 w-64 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 dark:border-gray-700"
              >
                {/* Image */}
                <div className="h-44 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center relative">
                  <div className="text-6xl">{project.image}</div>
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {project.featured && (
                      <span className="bg-yellow-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">⭐ Featured</span>
                    )}
                    <span className="ml-auto text-xs font-semibold text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 px-2.5 py-1 rounded-full">
                      {t(categories.find((c) => c.id === project.cat)?.labelFr || '', categories.find((c) => c.id === project.cat)?.labelEn || '')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                    {t(project.descFr, project.descEn)}
                  </p>

                  {/* Results */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {t('Résultats', 'Results')}
                    </h4>
                    <ul className="space-y-1">
                      {(t('fr', 'en') === 'fr' ? project.resultsFr : project.resultsEn).map((r, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a href={project.demo} className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium">
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                      Demo
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors text-sm font-medium">
                      <CodeBracketIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">{t('Aucun projet trouvé', 'No projects found')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('Modifiez vos critères de recherche.', 'Try modifying your search criteria.')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {t('Intéressé par mes réalisations ?', 'Interested in my work?')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {t(
                "Discutons de votre prochain projet en IA Agentique ou Full-Stack !",
                "Let's discuss your next Agentic AI or Full-Stack project!"
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t('Démarrer un projet', 'Start a project')}
              </a>
              <a href="https://github.com/Richo-the-Rich" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                GitHub →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
