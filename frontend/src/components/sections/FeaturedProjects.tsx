'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FeaturedProjects() {
  const { t } = useLanguage()

  const projects = [
    {
      id: 1,
      title: 'AQGPT',
      descFr: "Système de questions-réponses basé sur des LLMs avec architecture multi-agents autonomes pour automatiser des workflows métier complexes chez PAQS / Kirusa.",
      descEn: "LLM-based Q&A system with multi-agent autonomous architecture to automate complex business workflows at PAQS / Kirusa.",
      technologies: ['LangGraph', 'CrewAI', 'MCP', 'Python', 'AWS', 'Docker'],
      categoryFr: 'IA Agentique',
      categoryEn: 'Agentic AI',
      image: '🤖',
      demoUrl: '#',
      githubUrl: 'https://github.com/Richo-the-Rich',
    },
    {
      id: 2,
      title: 'HappyFIT API',
      descFr: "API RESTful hautement performante et sécurisée pour application fitness. Conception de schéma de base de données et lead de l'équipe backend.",
      descEn: "Highly performant and secure RESTful API for a fitness application. Database schema design and backend team leadership.",
      technologies: ['Django', 'PostgreSQL', 'Docker', 'AWS EC2', 'GitHub Actions'],
      categoryFr: 'Backend & API',
      categoryEn: 'Backend & API',
      image: '💪',
      demoUrl: '#',
      githubUrl: 'https://github.com/Richo-the-Rich',
    },
    {
      id: 3,
      title: t('Pipeline MLOps AWS', 'AWS MLOps Pipeline'),
      descFr: "Entraînement et déploiement de modèles ML sur AWS (EC2, Lambda, S3) avec pipelines CI/CD automatisés via GitHub Actions pour la scalabilité.",
      descEn: "ML model training and deployment on AWS (EC2, Lambda, S3) with automated CI/CD pipelines via GitHub Actions for scalability.",
      technologies: ['Python', 'PyTorch', 'AWS Lambda', 'S3', 'Docker', 'CI/CD'],
      categoryFr: 'MLOps',
      categoryEn: 'MLOps',
      image: '⚙️',
      demoUrl: '#',
      githubUrl: 'https://github.com/Richo-the-Rich',
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
            {t('Projets', 'Featured')}{' '}
            <span className="gradient-text">{t('Phares', 'Projects')}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Quelques-uns de mes projets les plus significatifs en IA Agentique et développement Full-Stack",
              "Some of my most significant projects in Agentic AI and Full-Stack development"
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 dark:border-gray-700"
            >
              {/* Image area */}
              <div className="h-44 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center relative">
                <div className="text-6xl">{project.image}</div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 px-3 py-1 rounded-full">
                    {t(project.categoryFr, project.categoryEn)}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm">
                  {t(project.descFr, project.descEn)}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.demoUrl}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1.5" />
                    Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <CodeBracketIcon className="w-4 h-4 mr-1.5" />
                    Code
                  </a>
                </div>
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
          <Link href="/projects" className="btn-primary">
            {t('Voir tous mes projets', 'View all my projects')}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
