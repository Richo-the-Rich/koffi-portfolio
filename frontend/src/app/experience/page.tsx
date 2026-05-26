'use client'

import { motion } from 'framer-motion'
import { BriefcaseIcon, AcademicCapIcon, TrophyIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ExperiencePage() {
  const { t } = useLanguage()

  const experiences = [
    {
      id: 1,
      roleFr: 'Ingénieur IA/ML & Lead Backend',
      roleEn: 'AI/ML Engineer & Backend Lead',
      company: 'Kirusa (USA) / PAQS',
      locationFr: 'USA – Remote',
      locationEn: 'USA – Remote',
      period: t('Sept. 2023 – Présent', 'Sept. 2023 – Present'),
      isCurrent: true,
      icon: '🤖',
      color: 'bg-blue-600',
      responsibilitiesFr: [
        "Coordination du développement technique d'AQGPT en partenariat avec PAQS ; architecture système, roadmap et encadrement des développeurs.",
        "Conception d'architectures multi-agents autonomes et d'assistants conversationnels LLM pour automatiser des processus métier complexes.",
        "Direction de l'équipe backend pour HappyFIT ; conception du schéma de base de données et développement d'APIs RESTful scalables et sécurisées.",
        "Entraînement et déploiement de modèles ML sur AWS (EC2, Lambda, S3) pour la scalabilité de l'application.",
      ],
      responsibilitiesEn: [
        'Coordinate end-to-end technical development of AQGPT in partnership with PAQS; manage system architecture, technical roadmaps, and developer task alignment.',
        'Design multi-agent autonomous frameworks and production-grade LLM conversational assistants to automate complex business workflows.',
        'Head the backend engineering team for HappyFIT; architect database schemas and develop scalable, secure RESTful APIs optimized for production.',
        'Integrate, train, and deploy custom ML models onto AWS (EC2, Lambda, S3) ensuring maximum scalability and uptime.',
      ],
      technologies: ['LangGraph', 'CrewAI', 'MCP', 'Python', 'Django', 'AWS EC2', 'Lambda', 'S3', 'Docker', 'PostgreSQL'],
    },
    {
      id: 2,
      roleFr: 'Consultant Python & Cloud',
      roleEn: 'Python & Cloud Consultant',
      company: 'Togotulawo',
      locationFr: 'Togo',
      locationEn: 'Togo',
      period: t('Jan. 2024 – Présent', 'Jan. 2024 – Present'),
      isCurrent: true,
      icon: '☁️',
      color: 'bg-green-600',
      responsibilitiesFr: [
        "Architecture d'applications métiers robustes avec Django et Flask.",
        'Automatisation de workflows critiques sur AWS via architectures Serverless (Lambda) et stockage S3.',
        "Déploiement et supervision d'architectures microservices conteneurisées avec Docker pour des cycles de production standardisés.",
      ],
      responsibilitiesEn: [
        'Engineered resilient web backend systems for corporate applications using Django and Flask.',
        'Automated critical workflows on AWS via Serverless (Lambda) and S3 storage.',
        'Deployed and supervised scalable microservices architecture with Docker for standardized production lifecycles.',
      ],
      technologies: ['Python', 'Django', 'Flask', 'AWS Lambda', 'S3', 'Docker', 'PostgreSQL'],
    },
    {
      id: 3,
      roleFr: 'Enseignant Missionnaire (Consultant)',
      roleEn: 'Missionary Teacher (Consultant)',
      company: t('Université de Kara', 'University of Kara'),
      locationFr: 'Togo',
      locationEn: 'Togo',
      period: t('Juin 2024 – Présent', 'June 2024 – Present'),
      isCurrent: true,
      icon: '🎓',
      color: 'bg-purple-600',
      responsibilitiesFr: [
        "Dispensation de cours et transfert d'expertises avancées en IA et développement logiciel au département informatique.",
      ],
      responsibilitiesEn: [
        'Deliver lectures and share advanced AI & software engineering methodologies within the Computer Science department.',
      ],
      technologies: ['Python', 'Machine Learning', 'LLMs', 'Django'],
    },
    {
      id: 4,
      roleFr: 'Développeur Full-Stack – Stage',
      roleEn: 'Full-Stack Developer – Intern',
      company: 'Digital Fortress',
      locationFr: 'Inde',
      locationEn: 'India',
      period: t('Jan. – Juin 2023', 'Jan. – June 2023'),
      isCurrent: false,
      icon: '💻',
      color: 'bg-orange-500',
      responsibilitiesFr: [
        'Développement de modules end-to-end avec React (frontend) et Django + PostgreSQL (backend).',
        'Mise en place de pipelines CI/CD automatisés via GitHub Actions, réduisant le time-to-market sur AWS EC2.',
      ],
      responsibilitiesEn: [
        'Built end-to-end features using React (frontend) and Django + PostgreSQL (backend).',
        'Configured automated CI/CD pipelines via GitHub Actions, accelerating release cycles on AWS EC2.',
      ],
      technologies: ['React', 'Django', 'PostgreSQL', 'GitHub Actions', 'AWS EC2'],
    },
    {
      id: 5,
      roleFr: 'Développeur Backend & Mobile – Stage',
      roleEn: 'Backend & Mobile Developer – Intern',
      company: 'Sécurité 360 SARL',
      locationFr: 'Togo',
      locationEn: 'Togo',
      period: t('Août – Oct. 2021', 'Aug. – Oct. 2021'),
      isCurrent: false,
      icon: '🔐',
      color: 'bg-gray-600',
      responsibilitiesFr: [
        "Développement du backend d'applications de sécurité sous Symfony (PHP) et interfaces mobiles cross-platform avec Flutter.",
      ],
      responsibilitiesEn: [
        'Developed core backend under Symfony (PHP) and built cross-platform mobile interfaces with Flutter.',
      ],
      technologies: ['Symfony', 'PHP', 'Flutter', 'MySQL'],
    },
  ]

  const education = [
    {
      degreeFr: 'Master en Data Science',
      degreeEn: 'M.Sc. in Data Science',
      school: 'VIT – Vellore Institute of Technology',
      locationFr: 'Inde',
      locationEn: 'India',
      years: '2021 – 2023',
      gpa: 'GPA 8.65 / 10',
      icon: '🎓',
    },
    {
      degreeFr: 'Licence en Génie Logiciel',
      degreeEn: 'B.Sc. in Software Engineering',
      school: 'APG Shimla University',
      locationFr: 'Inde',
      locationEn: 'India',
      years: '2017 – 2020',
      gpa: 'GPA 9.28 / 10',
      icon: '🖥️',
    },
    {
      degreeFr: 'Baccalauréat Série C4',
      degreeEn: 'High School Diploma – Science',
      school: t('Lycée Scientifique de Lomé', 'Lycée Scientifique de Lomé'),
      locationFr: 'Togo',
      locationEn: 'Togo',
      years: '2016',
      gpa: t('Mention Bien', 'With Honors'),
      icon: '📚',
    },
  ]

  const certifications = [
    {
      nameFr: 'AI Engineer – Agentic Track',
      nameEn: 'AI Engineer – Agentic Track',
      issuer: t('Complete Agent & MCP Course · Udemy', 'Complete Agent & MCP Course · Udemy'),
    },
    {
      nameFr: 'AI Engineer – Core Track',
      nameEn: 'AI Engineer – Core Track',
      issuer: t('LLM Engineering, RAG, QLoRA & Agents · Udemy', 'LLM Engineering, RAG, QLoRA & Agents · Udemy'),
    },
    {
      nameFr: 'Supervised Learning',
      nameEn: 'Supervised Learning',
      issuer: t('Régression & Classification · DeepLearning.AI', 'Regression & Classification · DeepLearning.AI'),
    },
    {
      nameFr: 'REST API avec Flask & Docker',
      nameEn: 'REST API with Flask & Docker',
      issuer: t('Udemy · MongoDB for Developers', 'Udemy · MongoDB for Developers'),
    },
  ]

  const stats = [
    { label: t("Années d'expérience", 'Years experience'), value: '3+', icon: CalendarIcon },
    { label: t('Postes occupés', 'Positions held'), value: '5', icon: BriefcaseIcon },
    { label: t('Certifications', 'Certifications'), value: '4', icon: TrophyIcon },
    { label: t('Pays', 'Countries'), value: '3', icon: BuildingOfficeIcon },
  ]

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
              {t('Mon', 'My')}{' '}
              <span className="gradient-text">{t('Expérience', 'Experience')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t(
                "3 ans d'expertise en IA Agentique, LLMs et développement Full-Stack – USA, Inde, Togo",
                '3 years of expertise in Agentic AI, LLMs, and Full-Stack development – USA, India, Togo'
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('Parcours', 'Professional')}{' '}
              <span className="gradient-text">{t('Professionnel', 'Journey')}</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600 hidden md:block"></div>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative md:pl-16"
                >
                  {/* Dot */}
                  <div className={`absolute left-3 top-6 w-6 h-6 ${exp.color} rounded-full flex items-center justify-center text-white text-xs hidden md:flex shadow-lg border-2 border-white dark:border-gray-900`}>
                    {exp.icon}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{t(exp.roleFr, exp.roleEn)}</h3>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 mt-1 gap-1">
                          <BuildingOfficeIcon className="w-4 h-4" />
                          <span className="font-semibold text-sm">{exp.company}</span>
                          <span className="text-gray-400">·</span>
                          <span className="text-sm text-gray-500">{t(exp.locationFr, exp.locationEn)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                        {exp.isCurrent && (
                          <span className="text-xs font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                            {t('Actuel', 'Current')}
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {(t('fr', 'en') === 'fr' ? exp.responsibilitiesFr : exp.responsibilitiesEn).map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <span className="text-blue-500 mt-1 flex-shrink-0">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <AcademicCapIcon className="w-7 h-7 text-blue-600" />
                {t('Formation', 'Education')}
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{edu.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-base">{t(edu.degreeFr, edu.degreeEn)}</h3>
                          <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full font-semibold whitespace-nowrap">{edu.years}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{edu.school} · {t(edu.locationFr, edu.locationEn)}</p>
                        <span className="inline-block mt-2 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 rounded-full">
                          {edu.gpa}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <TrophyIcon className="w-7 h-7 text-blue-600" />
                {t('Certifications', 'Certifications')}
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-xl">
                      🏆
                    </div>
                    <div>
                      <h3 className="font-bold text-base">{t(cert.nameFr, cert.nameEn)}</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center gap-3">
                🌍 {t('Langues', 'Languages')}
              </h2>
              <div className="space-y-3">
                {[
                  { lang: t('Français', 'French'), level: t('Courant', 'Fluent'), dots: 5 },
                  { lang: t('Anglais', 'English'), level: t('Professionnel', 'Professional'), dots: 4 },
                  { lang: t('Éwé', 'Ewe'), level: t('Maternelle', 'Native'), dots: 5 },
                ].map((l) => (
                  <div key={l.lang} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex items-center justify-between border border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="font-semibold text-sm">{l.lang}</span>
                      <span className="text-xs text-gray-500 ml-2">— {l.level}</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full border-2 border-blue-500 ${i < l.dots ? 'bg-blue-500' : ''}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              {t('Prêt pour de nouveaux défis', 'Ready for new challenges')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {t(
                "Mon expérience est au service de votre innovation. Collaborons pour créer la prochaine solution qui marquera votre secteur.",
                "My expertise serves your innovation. Let's collaborate to build the next solution that will define your industry."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t('Discutons de votre projet', "Let's discuss your project")}
              </a>
              <a href="/projects" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-xl transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t('Découvrir mes projets', 'Discover my projects')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
