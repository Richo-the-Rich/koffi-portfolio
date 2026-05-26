'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EnvelopeIcon, MapPinIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import { useLanguage } from '@/contexts/LanguageContext'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  projectType: string
}

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', subject: '', message: '', projectType: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const projectTypes = t('fr', 'en') === 'fr'
    ? ['IA Agentique / LLMs', 'Développement Backend (Django/Flask)', 'MLOps & Déploiement AWS', 'Consultation technique', 'Formation', 'Autre']
    : ['Agentic AI / LLMs', 'Backend Development (Django/Flask)', 'MLOps & AWS Deployment', 'Technical Consulting', 'Training', 'Other']

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      titleFr: 'Email',
      titleEn: 'Email',
      details: 'azougo.ulrich@gmail.com',
      descFr: 'Réponse garantie sous 24h',
      descEn: 'Response guaranteed within 24h',
      action: 'mailto:azougo.ulrich@gmail.com',
    },
    {
      icon: MapPinIcon,
      titleFr: 'Localisation',
      titleEn: 'Location',
      details: 'Lomé, Togo',
      descFr: 'Remote / Hybride',
      descEn: 'Remote / Hybrid',
      action: '#',
    },
    {
      icon: ClockIcon,
      titleFr: 'Consultation',
      titleEn: 'Consultation',
      details: t('Gratuite 30 min', 'Free 30 min'),
      descFr: 'Première discussion offerte',
      descEn: 'First session on me',
      action: '#',
    },
  ]

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!formData.firstName.trim()) errs.firstName = t('Prénom requis', 'First name required')
    if (!formData.lastName.trim()) errs.lastName = t('Nom requis', 'Last name required')
    if (!formData.email.trim()) errs.email = t('Email requis', 'Email required')
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = t('Email invalide', 'Invalid email')
    if (!formData.subject.trim()) errs.subject = t('Sujet requis', 'Subject required')
    if (!formData.message.trim()) errs.message = t('Message requis', 'Message required')
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      setSubmitStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', subject: '', message: '', projectType: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputCls = (field: keyof FormData) =>
    `w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors ${
      errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
    }`

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
              {t('Entrons en', 'Get in')}{' '}
              <span className="gradient-text">{t('Contact', 'Touch')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t(
                "Un projet d'IA Agentique, de LLMs, ou de développement Full-Stack ? Discutons ensemble de vos besoins.",
                "An Agentic AI, LLM, or Full-Stack development project? Let's discuss your needs."
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-full font-medium">
                ⚡ {t('Réponse sous 24h', 'Response within 24h')}
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                🎯 {t('Consultation gratuite 30 min', 'Free 30-min consultation')}
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-full font-medium">
                🌍 {t('Remote / Hybride', 'Remote / Hybrid')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info cards */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.a
                  key={index}
                  href={info.action}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl text-center card-hover block border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{t(info.titleFr, info.titleEn)}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-1 text-sm">{info.details}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs">{t(info.descFr, info.descEn)}</p>
                </motion.a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form & sidebar */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6">{t('Démarrons votre projet', "Let's start your project")}</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-xl flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-800 dark:text-green-200 text-sm">
                    {t('Message envoyé ! Je vous réponds sous 24h. 🚀', 'Message sent! I'll reply within 24h. 🚀')}
                  </span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl flex items-center gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <span className="text-red-800 dark:text-red-200 text-sm">
                    {t("Erreur d'envoi. Réessayez ou écrivez directement.", 'Send error. Retry or write directly.')}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('Prénom', 'First name')} *</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={inputCls('firstName')} />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('Nom', 'Last name')} *</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={inputCls('lastName')} />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputCls('email')} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('Téléphone', 'Phone')}</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('Entreprise', 'Company')}</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">{t('Type de projet', 'Project type')}</label>
                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="">{t('Sélectionner...', 'Select...')}</option>
                      {projectTypes.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('Sujet', 'Subject')} *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} className={inputCls('subject')} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">{t('Message', 'Message')} *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder={t("Décrivez votre projet, vos besoins en IA Agentique, LLMs, backend...", "Describe your project, your Agentic AI, LLM, backend needs...")}
                    className={`${inputCls('message')} resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      {t('Envoi...', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <EnvelopeIcon className="w-5 h-5" />
                      {t('Envoyer le message', 'Send message')}
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">{t('Pourquoi travailler avec moi ?', 'Why work with me?')}</h2>
                <div className="space-y-4">
                  {[
                    {
                      titleFr: 'Expert IA Agentique & LLMs',
                      titleEn: 'Agentic AI & LLMs Expert',
                      descFr: 'LangGraph, CrewAI, MCP, RAG – je maîtrise les frameworks de pointe pour construire des agents autonomes en production.',
                      descEn: 'LangGraph, CrewAI, MCP, RAG – I master cutting-edge frameworks to build autonomous agents in production.',
                    },
                    {
                      titleFr: 'Lead Backend & Full-Stack',
                      titleEn: 'Backend Lead & Full-Stack',
                      descFr: "Django, AWS, Docker – 3 ans d'expérience à diriger des équipes backend et à déployer des APIs scalables.",
                      descEn: 'Django, AWS, Docker – 3 years leading backend teams and deploying scalable APIs.',
                    },
                    {
                      titleFr: 'Expérience internationale',
                      titleEn: 'International Experience',
                      descFr: 'USA (Kirusa), Inde (VIT, Digital Fortress), Togo – trilingue et habitué aux équipes distribuées.',
                      descEn: 'USA (Kirusa), India (VIT, Digital Fortress), Togo – trilingual and accustomed to distributed teams.',
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-green-600 text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{t(item.titleFr, item.titleEn)}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-xs mt-0.5">{t(item.descFr, item.descEn)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="text-xl font-bold mb-4">{t('Retrouvez-moi', 'Find me on')}</h3>
                <div className="flex gap-4">
                  {[
                    { icon: FaGithub, url: 'https://github.com/Richo-the-Rich', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
                    { icon: FaLinkedin, url: 'https://linkedin.com/in/koffi-azougo', label: 'LinkedIn', color: 'hover:text-blue-600' },
                  ].map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 shadow`}
                        title={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Info box */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h3 className="font-bold text-lg mb-2">💡 {t('Consultation gratuite', 'Free consultation')}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {t(
                    '30 minutes d'échange pour comprendre vos besoins et proposer une approche personnalisée en IA Agentique ou Full-Stack.',
                    '30 minutes to understand your needs and propose a personalized approach in Agentic AI or Full-Stack.'
                  )}
                </p>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <li>• {t('Analyse de votre projet', 'Project analysis')}</li>
                  <li>• {t('Recommandations techniques', 'Technical recommendations')}</li>
                  <li>• {t('Estimation de faisabilité', 'Feasibility estimation')}</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
