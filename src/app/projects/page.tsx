'use client'

import { useState } from 'react'
import { Calendar, Tag, ArrowRight, X } from 'lucide-react'
import projectsData from '@/data/projects.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tümü')
  const [modalProject, setModalProject] = useState<any>(null)
  const { t } = useLanguage()

  // Kategori çevirileri
  const categoryTranslations: { [key: string]: string } = {
    'Tümü': t('projects.all') as string,
    'Eğitim': t('projects.education') as string,
    'Çevre': t('projects.environment') as string,
    'Sosyal': t('projects.social') as string,
    'Teknoloji': t('projects.technology') as string,
    'Kültür': t('projects.culture') as string
  }

  // Proje çevirileri - basit eşleştirme
  const getProjectTranslation = (projectTitle: string) => {
    const translations: { [key: string]: any } = {
      'Pencere': {
        title: t('projects.projectDetails.pencere.title') as string,
        description: t('projects.projectDetails.pencere.description') as string,
        details: t('projects.projectDetails.pencere.details') as string
      },
      'Sanatın Kadın Ruhu': {
        title: t('projects.projectDetails.sanatKadin.title') as string,
        description: t('projects.projectDetails.sanatKadin.description') as string,
        details: t('projects.projectDetails.sanatKadin.details') as string
      },
      'Güçlü Kadınlar, Güçlü Yarınlar': {
        title: t('projects.projectDetails.gucluKadinlar.title') as string,
        description: t('projects.projectDetails.gucluKadinlar.description') as string,
        details: t('projects.projectDetails.gucluKadinlar.details') as string
      },
      'Kaplumbağa Müzesi': {
        title: t('projects.projectDetails.kaplumbaga.title') as string,
        description: t('projects.projectDetails.kaplumbaga.description') as string,
        details: t('projects.projectDetails.kaplumbaga.details') as string
      },
      'İztuzu Projesi': {
        title: t('projects.projectDetails.iztuzu.title') as string,
        description: t('projects.projectDetails.iztuzu.description') as string,
        details: t('projects.projectDetails.iztuzu.details') as string
      },
      'Eco Footprint': {
        title: t('projects.projectDetails.ecoFootprint.title') as string,
        description: t('projects.projectDetails.ecoFootprint.description') as string,
        details: t('projects.projectDetails.ecoFootprint.details') as string
      },
      'Mini Brick Symphony': {
        title: t('projects.projectDetails.miniBrick.title') as string,
        description: t('projects.projectDetails.miniBrick.description') as string,
        details: t('projects.projectDetails.miniBrick.details') as string
      },
      'İklim Müzesi': {
        title: t('projects.projectDetails.iklimMuzesi.title') as string,
        description: t('projects.projectDetails.iklimMuzesi.description') as string,
        details: t('projects.projectDetails.iklimMuzesi.details') as string
      },
      'Yeni Erişim Simgesi': {
        title: t('projects.projectDetails.erisimSimgesi.title') as string,
        description: t('projects.projectDetails.erisimSimgesi.description') as string,
        details: t('projects.projectDetails.erisimSimgesi.details') as string
      },
      'Ecoquake': {
        title: t('projects.projectDetails.ecoquake.title') as string,
        description: t('projects.projectDetails.ecoquake.description') as string,
        details: t('projects.projectDetails.ecoquake.details') as string
      },
      'Balçık Köy Okulu 19 Mayıs Kütüphanesi': {
        title: t('projects.projectDetails.balcikKutuphane.title') as string,
        description: t('projects.projectDetails.balcikKutuphane.description') as string,
        details: t('projects.projectDetails.balcikKutuphane.details') as string
      },
      'Save The Blue': {
        title: t('projects.projectDetails.saveBlue.title') as string,
        description: t('projects.projectDetails.saveBlue.description') as string,
        details: t('projects.projectDetails.saveBlue.details') as string
      }
    }
    
    return translations[projectTitle] || { title: projectTitle, description: '', details: '' }
  }

  const filteredProjects = selectedCategory === 'Tümü' 
    ? projectsData.projects 
    : projectsData.projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/30 to-pink-600/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {t('projects.title') as string}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                {t('projects.subtitle') as string}
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {['Tümü', ...Array.from(new Set(projectsData.projects.map(p => p.category)))]
                .map(category => (
                  <button
                    key={category}
                    className={`px-6 py-3 rounded-full font-semibold border transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-purple-500 text-white border-purple-500 shadow-lg shadow-purple-500/25' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {categoryTranslations[category] || category}
                  </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => {
                const translation = getProjectTranslation(project.title)
                return (
                  <div 
                    key={project.title} 
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 cursor-pointer transform hover:scale-105" 
                    onClick={() => setModalProject(project)}
                  >
                    <div className="flex items-center mb-4">
                      <Tag className="text-purple-300 mr-2" />
                      <span className="text-xl font-bold text-white">
                        {translation.title}
                      </span>
                    </div>
                    <p className="text-gray-200 mb-4 leading-relaxed">
                      {translation.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full relative border border-white/20 shadow-2xl">
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors" 
              onClick={() => setModalProject(null)}
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-bold text-white mb-6">
              {getProjectTranslation(modalProject.title).title}
            </h2>
            <p className="text-gray-200 mb-6 leading-relaxed">
              {getProjectTranslation(modalProject.title).details}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Fotoğraf alanları */}
              {modalProject.images && modalProject.images.length > 0 ? (
                modalProject.images.slice(0,2).map((img: string, idx: number) => (
                  <div key={idx} className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 overflow-hidden">
                    <img src={img} alt="Proje görseli" className="object-cover w-full h-full rounded" />
                  </div>
                ))
              ) : (
                <>
                  <div className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <span className="text-gray-400">Fotoğraf 1</span>
                  </div>
                  <div className="w-full h-48 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                    <span className="text-gray-400">Fotoğraf 2</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 