import HeroSection from '@/components/sections/HeroSection'
import AboutPreview from '@/components/sections/AboutPreview'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import FeaturedSkills from '@/components/sections/FeaturedSkills'
import ExperiencePreview from '@/components/sections/ExperiencePreview'
import LatestBlogPosts from '@/components/sections/LatestBlogPosts'
import ContactCTA from '@/components/sections/ContactCTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Preview */}
      <AboutPreview />
      
      {/* Featured Skills */}
      <FeaturedSkills />
      
      {/* Featured Projects */}
      <FeaturedProjects />
      
      {/* Experience Preview */}
      <ExperiencePreview />
      
      {/* Latest Blog Posts */}
      <LatestBlogPosts />
      
      {/* Contact CTA */}
      <ContactCTA />
    </div>
  )
} 