'use client'

import { motion } from 'framer-motion'
import { AcademicCapIcon, BriefcaseIcon, CodeBracketIcon, LightBulbIcon, RocketLaunchIcon, TrophyIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    { label: t("Années d'expérience", 'Years experience'), value: '3+', icon: BriefcaseIcon },
    { label: t('Postes occupés', 'Positions held'), value: '5', icon: CodeBracketIcon },
    { label: t('Pays (USA, Inde, Togo)', 'Countries (USA, India, Togo)'), value: '3', icon: GlobeAltIcon },
    { label: t('GPA Max obtenu', 'Highest GPA'), value: '9.28', icon: AcademicCapIcon },
  ]

  const values = [
    {
      icon: LightBulbIcon,
      titleFr: 'Innovation',
      titleEn: 'Innovation',
      descFr: "Je crois en l'innovation comme moteur du progrès. Chaque système agentique que je conçois est une opportunité d'explorer de nouvelles frontières en IA.",
      descEn: "I believe innovation drives progress. Every agentic system I design is an opportunity to push new frontiers in AI.",
    },
    {
      icon: UserGroupIcon,
      titleFr: 'Collaboration',
      titleEn: 'Collaboration',
      descFr: "Lead Backend chez Kirusa, j'ai appris que les meilleures solutions naissent de la synergie entre des équipes techniques pluridisciplinaires.",
      descEn: 'As Backend Lead at Kirusa, I learned that the best solutions emerge from cross-functional team synergy.',
    },
    {
      icon: TrophyIcon,
      titleFr: 'Excellence',
      titleEn: 'Excellence',
      descFr: "Un GPA de 9.28/10 en Licence et 8.65/10 en Master reflète mon exigence constante de la qualité – du code comme des résultats.",
      descEn: "A GPA of 9.28/10 in B.Sc. and 8.65/10 in M.Sc. reflects my constant pursuit of quality – in code as in results.",
    },
    {
      icon: RocketLaunchIcon,
      titleFr: 'Impact',
      titleEn: 'Impact',
      descFr: "Chaque solution que je déploie – qu'il s'agisse d'un agent autonome ou d'une API RESTful – doit apporter une valeur mesurable en production.",
      descEn: "Every solution I deploy – whether an autonomous agent or a RESTful API – must deliver measurable production value.",
    },
  ]

  const journey = [
    {
      year: '2016–2020',
      titleFr: 'Formation & premiers projets',
      titleEn: 'Education & first projects',
      descFr: "Bac C4 (Mention Bien) au Lycée Scientifique de Lomé. Licence Génie Logiciel (GPA 9.28/10) à APG Shimla University, Inde.",
      descEn: "High School Diploma (With Honors) at Lycée Scientifique de Lomé. B.Sc. Software Engineering (GPA 9.28/10) at APG Shimla University, India.",
    },
    {
      year: '2021–2023',
      titleFr: 'Master Data Science & stage',
      titleEn: "M.Sc. Data Science & internship",
      descFr: "Master Data Science (GPA 8.65/10) au VIT, Inde. Stage Backend & Mobile chez Sécurité 360 SARL (2021). Stage Full-Stack chez Digital Fortress, Inde (Jan–Juin 2023).",
      descEn: "M.Sc. Data Science (GPA 8.65/10) at VIT, India. Backend & Mobile intern at Sécurité 360 SARL (2021). Full-Stack intern at Digital Fortress, India (Jan–June 2023).",
    },
    {
      year: '2023',
      titleFr: 'Kirusa – Lead Backend',
      titleEn: 'Kirusa – Backend Lead',
      descFr: "Rejoins Kirusa (USA) comme Ingénieur IA/ML & Lead Backend. Développement d'AQGPT et de HappyFIT. Spécialisation en systèmes agentiques.",
      descEn: "Joined Kirusa (USA) as AI/ML Engineer & Backend Lead. Built AQGPT and HappyFIT. Specialization in agentic systems.",
    },
    {
      year: '2024',
      titleFr: 'Consultant & Enseignant',
      titleEn: 'Consultant & Educator',
      descFr: "Consultant Python & Cloud chez Togotulawo. Enseignant missionnaire à l'Université de Kara – transmission de l'expertise IA à la prochaine génération.",
      descEn: "Python & Cloud Consultant at Togotulawo. Missionary teacher at University of Kara – passing on AI expertise to the next generation.",
    },
  ]

  const skillsHighlight = [
    { group: t('IA Agentique', 'Agentic AI'), items: ['LangGraph', 'CrewAI', 'MCP', 'AutoGen', 'LangChain', 'RAG'] },
    { group: t('Full-Stack', 'Full-Stack'), items: ['Python', 'Django', 'Flask', 'React', 'TypeScript', 'Flutter'] },
    { group: t('Cloud & DevOps', 'Cloud & DevOps'), items: ['AWS', 'Docker', 'CI/CD', 'Lambda', 'S3', 'EC2'] },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="section-padding hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {t("Passionné par l'", 'Passionate about ')}<span className="gradient-text">{t('IA Agentique', 'Agentic AI')}</span>
                <br />
                {t('& le Full-Stack', '& Full-Stack')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {t(
                  "Ingénieur en Data Science (Bac+5) avec 3 ans d'expérience dans l'architecture de systèmes IA agentiques, LLMs et applications Full-Stack. Trilingue (Français, Anglais, Éwé), fort d'une expérience internationale en USA et en Inde.",
                  "Data Science Engineer (Master's Degree) with 3 years of experience architecting agentic AI systems, LLMs, and Full-Stack applications. Trilingual (French, English, Ewe) with international experience in USA and India."
                )}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">🤖 {t('IA Agentique', 'Agentic AI')}</span>
                <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold">🚀 LLMs & MCP</span>
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full text-sm font-semibold">☁️ {t('Cloud AWS', 'AWS Cloud')}</span>
                <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 rounded-full text-sm font-semibold">🌍 {t('Remote / Hybride', 'Remote / Hybrid')}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-lg mb-4">
                    KA
                  </div>
                  <h3 className="text-xl font-bold">Koffi AZOUGO</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-1">
                    {t('Ingénieur Systèmes IA & Agentique', 'AI Systems & Agentic Engineer')}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">📍 Lomé, Togo · {t('Remote / Hybride', 'Remote / Hybrid')}</p>
                </div>

                {skillsHighlight.map((group, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{group.group}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span key={item} className="text-xs bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
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
              <span className="gradient-text">{t('Valeurs', 'Values')}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{t(value.titleFr, value.titleEn)}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {t(value.descFr, value.descEn)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
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
              {t('Mon', 'My')}{' '}
              <span className="gradient-text">{t('Parcours', 'Journey')}</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex gap-6 mb-10 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-xs text-center leading-tight shadow-lg flex-shrink-0">
                    {item.year}
                  </div>
                  {index < journey.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-blue-400 to-purple-400 mt-2 min-h-8"></div>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex-1 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-bold mb-2">{t(item.titleFr, item.titleEn)}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {t(item.descFr, item.descEn)}
                  </p>
                </div>
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
              {t('Prêt à collaborer ?', 'Ready to collaborate?')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              {t(
                "Discutons de vos projets et voyons comment nous pouvons créer quelque chose d'extraordinaire ensemble.",
                "Let's discuss your projects and see how we can build something extraordinary together."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 inline-flex items-center justify-center">
                {t('Démarrer un projet', 'Start a project')}
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
