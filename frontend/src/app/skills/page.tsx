'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

export default function SkillsPage() {
  const { t } = useLanguage()
  const [selected, setSelected] = useState('all')

  const categories = [
    { id: 'all', labelFr: 'Toutes', labelEn: 'All' },
    { id: 'ai', labelFr: '🤖 IA Agentique & LLMs', labelEn: '🤖 Agentic AI & LLMs' },
    { id: 'ml', labelFr: '📊 Data Science & ML', labelEn: '📊 Data Science & ML' },
    { id: 'fullstack', labelFr: '🖥️ Full-Stack', labelEn: '🖥️ Full-Stack' },
    { id: 'cloud', labelFr: '☁️ Cloud & DevOps', labelEn: '☁️ Cloud & DevOps' },
    { id: 'db', labelFr: '🗄️ Bases de données', labelEn: '🗄️ Databases' },
    { id: 'tools', labelFr: '🔧 Outils', labelEn: '🔧 Tools' },
  ]

  const skills = [
    // AI Agentique & LLMs
    { name: 'LangGraph', cat: 'ai', level: 92, hot: true, descFr: "Orchestration d'agents autonomes avec graphes d'état", descEn: 'Autonomous agent orchestration with state graphs' },
    { name: 'CrewAI', cat: 'ai', level: 90, hot: true, descFr: "Framework multi-agents pour workflows collaboratifs", descEn: 'Multi-agent framework for collaborative workflows' },
    { name: 'MCP', cat: 'ai', level: 88, hot: true, descFr: "Model Context Protocol pour outils LLM", descEn: 'Model Context Protocol for LLM tools' },
    { name: 'AutoGen', cat: 'ai', level: 80, hot: false, descFr: "Agents conversationnels autonomes Microsoft", descEn: 'Microsoft autonomous conversational agents' },
    { name: 'LangChain', cat: 'ai', level: 85, hot: false, descFr: "Framework LLM pour chaînes et agents", descEn: 'LLM framework for chains and agents' },
    { name: 'RAG', cat: 'ai', level: 87, hot: false, descFr: "Retrieval-Augmented Generation pour LLMs", descEn: 'Retrieval-Augmented Generation for LLMs' },
    { name: 'OpenAI SDK', cat: 'ai', level: 88, hot: false, descFr: "Intégration GPT-4, function calling, assistants", descEn: 'GPT-4 integration, function calling, assistants' },
    { name: 'HuggingFace', cat: 'ai', level: 82, hot: false, descFr: "Fine-tuning et déploiement de modèles open-source", descEn: 'Fine-tuning and deployment of open-source models' },
    // Data Science & ML
    { name: 'PyTorch', cat: 'ml', level: 84, hot: true, descFr: "Deep learning et recherche en IA", descEn: 'Deep learning and AI research' },
    { name: 'TensorFlow', cat: 'ml', level: 80, hot: false, descFr: "Modèles de deep learning en production", descEn: 'Deep learning models in production' },
    { name: 'Scikit-learn', cat: 'ml', level: 88, hot: false, descFr: "Machine learning classique et preprocessing", descEn: 'Classical machine learning and preprocessing' },
    { name: 'NLP', cat: 'ml', level: 82, hot: false, descFr: "Traitement du langage naturel", descEn: 'Natural Language Processing' },
    { name: 'Pipelines ML', cat: 'ml', level: 80, hot: false, descFr: "Pipelines de données et d'entraînement automatisés", descEn: 'Automated data and training pipelines' },
    // Full-Stack
    { name: 'Python', cat: 'fullstack', level: 95, hot: true, descFr: "Langage principal – IA, backend, scripting", descEn: 'Primary language – AI, backend, scripting' },
    { name: 'Django', cat: 'fullstack', level: 92, hot: true, descFr: "APIs RESTful et applications web robustes", descEn: 'RESTful APIs and robust web applications' },
    { name: 'Flask', cat: 'fullstack', level: 85, hot: false, descFr: "Micro-framework Python pour APIs légères", descEn: 'Python micro-framework for lightweight APIs' },
    { name: 'TypeScript', cat: 'fullstack', level: 80, hot: false, descFr: "JavaScript typé pour applications robustes", descEn: 'Typed JavaScript for robust applications' },
    { name: 'React', cat: 'fullstack', level: 82, hot: false, descFr: "Bibliothèque UI pour interfaces dynamiques", descEn: 'UI library for dynamic interfaces' },
    { name: 'Node.js', cat: 'fullstack', level: 78, hot: false, descFr: "Runtime JavaScript côté serveur", descEn: 'Server-side JavaScript runtime' },
    { name: 'Flutter', cat: 'fullstack', level: 75, hot: false, descFr: "Applications mobiles cross-platform", descEn: 'Cross-platform mobile applications' },
    { name: 'Symfony', cat: 'fullstack', level: 72, hot: false, descFr: "Framework PHP backend", descEn: 'PHP backend framework' },
    // Cloud & DevOps
    { name: 'AWS', cat: 'cloud', level: 85, hot: true, descFr: "EC2, Lambda, S3 – infrastructure cloud complète", descEn: 'EC2, Lambda, S3 – full cloud infrastructure' },
    { name: 'Docker', cat: 'cloud', level: 88, hot: true, descFr: "Conteneurisation et orchestration", descEn: 'Containerization and orchestration' },
    { name: 'CI/CD', cat: 'cloud', level: 82, hot: false, descFr: "Intégration et déploiement continus", descEn: 'Continuous integration and deployment' },
    { name: 'GitHub Actions', cat: 'cloud', level: 82, hot: false, descFr: "Pipelines automatisés GitHub", descEn: 'GitHub automated pipelines' },
    { name: 'AWS Lambda', cat: 'cloud', level: 80, hot: false, descFr: "Architectures Serverless", descEn: 'Serverless architectures' },
    // Databases
    { name: 'PostgreSQL', cat: 'db', level: 88, hot: true, descFr: "Base de données relationnelle avancée", descEn: 'Advanced relational database' },
    { name: 'MongoDB', cat: 'db', level: 82, hot: false, descFr: "Base NoSQL orientée documents", descEn: 'Document-oriented NoSQL database' },
    { name: 'MySQL', cat: 'db', level: 80, hot: false, descFr: "Base de données relationnelle", descEn: 'Relational database' },
    { name: 'Prisma ORM', cat: 'db', level: 75, hot: false, descFr: "ORM TypeScript/Node.js moderne", descEn: 'Modern TypeScript/Node.js ORM' },
    // Tools
    { name: 'Streamlit', cat: 'tools', level: 82, hot: false, descFr: "Dashboards IA interactifs en Python", descEn: 'Interactive AI dashboards in Python' },
    { name: 'Tableau', cat: 'tools', level: 75, hot: false, descFr: "Visualisation de données", descEn: 'Data visualization' },
    { name: 'Power BI', cat: 'tools', level: 72, hot: false, descFr: "Business Intelligence Microsoft", descEn: 'Microsoft Business Intelligence' },
    { name: 'Scrum', cat: 'tools', level: 82, hot: false, descFr: "Méthode agile – sprints, ceremonies", descEn: 'Agile method – sprints, ceremonies' },
  ]

  const filtered = selected === 'all' ? skills : skills.filter((s) => s.cat === selected)

  const colorMap: Record<string, string> = {
    ai: 'from-blue-500 to-indigo-600',
    ml: 'from-purple-500 to-pink-600',
    fullstack: 'from-green-500 to-emerald-600',
    cloud: 'from-orange-500 to-red-500',
    db: 'from-cyan-500 to-blue-500',
    tools: 'from-gray-500 to-gray-700',
  }

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
              <span className="gradient-text">{t('Compétences', 'Skills')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Stack technique complet – de l'orchestration d'agents IA autonomes au déploiement cloud en production",
                'Complete technical stack – from autonomous AI agent orchestration to cloud production deployment'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { v: `${skills.length}`, l: t('Technologies', 'Technologies') },
              { v: '3+', l: t("Ans d'exp.", 'Years exp.') },
              { v: '4', l: t('Certifications', 'Certifications') },
              { v: '5', l: t('Postes', 'Positions') },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-2">{s.v}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelected(cat.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  selected === cat.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {t(cat.labelFr, cat.labelEn)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg card-hover border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{skill.name}</h3>
                    {skill.hot && (
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-semibold">
                        ★ Expert
                      </span>
                    )}
                  </div>
                  <span className="text-base font-bold text-gray-500">{skill.level}%</span>
                </div>

                <div className="skill-bar mb-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className={`h-full rounded-full bg-gradient-to-r ${colorMap[skill.cat] || 'from-blue-500 to-purple-600'}`}
                  />
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t(skill.descFr, skill.descEn)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning */}
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
              {t("Parcours d'", 'Learning')}<span className="gradient-text">{t('apprentissage', ' Path')}</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                emoji: '🎯',
                titleFr: 'Actuellement',
                titleEn: 'Currently',
                color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10',
                items: {
                  fr: ["Approfondissement LangGraph & multi-agents", "RAG avancé et Vector DBs", "Fine-tuning QLoRA de LLMs", "Architecture microservices agentiques"],
                  en: ["Advanced LangGraph & multi-agents", "Advanced RAG and Vector DBs", "QLoRA LLM fine-tuning", "Agentic microservices architecture"],
                },
              },
              {
                emoji: '🚀',
                titleFr: 'Prochaines étapes',
                titleEn: 'Next steps',
                color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10',
                items: {
                  fr: ["IA générative avancée", "Kubernetes pour MLOps", "Certifications AWS ML", "Agents autonomes avec mémoire longue durée"],
                  en: ["Advanced generative AI", "Kubernetes for MLOps", "AWS ML certifications", "Agents with long-term memory"],
                },
              },
              {
                emoji: '🏆',
                titleFr: 'Objectifs 2025',
                titleEn: '2025 Goals',
                color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10',
                items: {
                  fr: ["Publication d'articles techniques", "Open source LLM contributions", "Mentorat développeurs juniors", "Conférences IA en Afrique"],
                  en: ["Technical article publications", "Open source LLM contributions", "Junior developer mentoring", "AI conferences in Africa"],
                },
              },
            ].map((block, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`bg-gradient-to-br ${block.color} p-8 rounded-2xl shadow`}
              >
                <div className="text-4xl mb-4">{block.emoji}</div>
                <h3 className="text-xl font-bold mb-4">{t(block.titleFr, block.titleEn)}</h3>
                <ul className="space-y-2">
                  {(t('fr', 'en') === 'fr' ? block.items.fr : block.items.en).map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500 font-bold mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
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
              {t('Mes compétences au service de vos projets', 'My skills at the service of your projects')}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t("Discuter d'un projet", "Discuss a project")}
              </a>
              <a href="/projects" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t('Voir mes réalisations', 'View my work')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
