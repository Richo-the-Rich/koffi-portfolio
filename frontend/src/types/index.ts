// User types
export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'user'
  profileImage?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

// Project types
export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  technologies: string[]
  category: string
  featuredImage?: {
    url: string
    alt: string
  }
  gallery?: Array<{
    url: string
    alt: string
  }>
  demoUrl?: string
  githubUrl?: string
  isFeatured: boolean
  isVisible: boolean
  likes: number
  viewCount: number
  startDate?: string
  endDate?: string
  teamSize?: number
  myRole?: string
  challenges?: string[]
  learnings?: string[]
  createdAt: string
  updatedAt: string
}

// Skill types
export interface Skill {
  _id: string
  name: string
  category: string
  proficiency: number
  description?: string
  icon?: string
  yearsOfExperience?: number
  isFeatured: boolean
  isVisible: boolean
  relatedProjects?: string[]
  createdAt: string
  updatedAt: string
}

// Experience types
export interface Experience {
  _id: string
  jobTitle: string
  company: string
  companyUrl?: string
  location: string
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship' | 'Volunteer'
  startDate: string
  endDate?: string
  isCurrent: boolean
  description: string
  responsibilities: string[]
  achievements?: string[]
  technologies: string[]
  skills?: string[]
  projects?: string[]
  teamSize?: number
  industry?: string
  isVisible: boolean
  createdAt: string
  updatedAt: string
}

// Blog Post types
export interface BlogPost {
  _id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  author: string | User
  featuredImage?: {
    url: string
    alt: string
  }
  isFeatured: boolean
  likes: number
  views: number
  readingTime?: number
  seoMeta?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
  relatedPosts?: string[]
  relatedProjects?: string[]
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

// Contact types
export interface Contact {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
  status: 'unread' | 'read' | 'replied' | 'archived'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  tags?: string[]
  responses?: Array<{
    message: string
    timestamp: string
    author: string
  }>
  createdAt: string
  updatedAt: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  errors?: Array<{
    field: string
    message: string
  }>
}

export interface PaginatedResponse<T = any> {
  success: boolean
  data: {
    items: T[]
    pagination: {
      currentPage: number
      totalPages: number
      totalItems: number
      hasNext: boolean
      hasPrev: boolean
    }
  }
  message?: string
}

// Form types
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
}

export interface NewsletterFormData {
  email: string
}

// Component props types
export interface SectionProps {
  className?: string
  children?: React.ReactNode
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

// Navigation types
export interface NavItem {
  name: string
  href: string
  external?: boolean
}

// SEO types
export interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
}

// Filter and search types
export interface ProjectFilters {
  category?: string
  technologies?: string[]
  featured?: boolean
  search?: string
}

export interface SkillFilters {
  category?: string
  featured?: boolean
  minProficiency?: number
  search?: string
}

export interface BlogFilters {
  category?: string
  tags?: string[]
  featured?: boolean
  search?: string
}

// Chart data types
export interface ChartData {
  labels: string[]
  datasets: Array<{
    label: string
    data: number[]
    backgroundColor?: string | string[]
    borderColor?: string | string[]
    borderWidth?: number
  }>
} 