'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import teamData from '@/data/team.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const { t } = useLanguage()

  // Rol çevirileri
  const roleTranslations: { [key: string]: string } = {
    'Mentor': t('team.roles.mentor') as string,
    'Yazılım Geliştirici': t('team.roles.softwareDeveloper') as string,
    'Takım Kaptanı': t('team.roles.teamCaptain') as string,
    'Mekanik': t('team.roles.mechanical') as string,
    'Sosyal Medya Sorumlusu': t('team.roles.socialMediaManager') as string,
    'Tasarımcı': t('team.roles.designer') as string,
    'Yazılım Geliştirici ve Takım Kaptanı': t('team.roles.softwareDeveloperAndTeamCaptain') as string,
    'Takım Kaptanı ve Mekanik': t('team.roles.teamCaptainAndMechanical') as string,
    'Tasarım ve Yazılım Geliştirici': t('team.roles.designAndSoftwareDeveloper') as string
  }

  // Departman çevirileri
  const departmentTranslations: { [key: string]: string } = {
    'Mentor': t('team.departments.mentor') as string,
    'Mekanik': t('team.departments.mechanical') as string,
    'Yazılım': t('team.departments.software') as string,
    'Tasarım': t('team.departments.design') as string,
    'Medya': t('team.departments.media') as string
  }

  // Açıklama çevirileri
  const descriptionTranslations: { [key: string]: string } = {
    'Takım mentoru ve teknik danışman.': t('team.descriptions.mentor') as string,
    'Robot kontrol sistemleri ve yazılım geliştirme.': t('team.descriptions.softwareDeveloper') as string,
    'Takım kaptanı ve yazılım geliştirmede sorumlu.': t('team.descriptions.teamCaptain') as string,
    'Robot mekanik tasarımı ve üretim süreçlerinden sorumlu.': t('team.descriptions.mechanical') as string,
    'Sosyal medya yönetimi ve içerik üretimi.': t('team.descriptions.socialMediaManager') as string,
    'Robot ve grafik tasarımı.': t('team.descriptions.designer') as string,
    'Robot tasarımı ve yazılım geliştirme.': t('team.descriptions.designAndSoftwareDeveloper') as string,
    'Robot montajı ve mekanik sistemler.': t('team.descriptions.robotAssembly') as string
  }

  const openModal = (member: any) => {
    setSelectedMember(member)
  }

  const closeModal = () => {
    setSelectedMember(null)
  }

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
                {t('team.title') as string}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                {t('team.subtitle') as string}
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamData.members.map((member) => (
                <div 
                  key={member.name} 
                  className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => openModal(member)}
                >
                  <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                    {/* Department color indicator */}
                    <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${member.department === 'Mentor' ? 'bg-red-400' : 
                      member.department === 'Mekanik' ? 'bg-blue-400' : 
                      member.department === 'Yazılım' ? 'bg-green-400' : 
                      member.department === 'Tasarım' ? 'bg-purple-400' : 'bg-yellow-400'}`}></div>
                    
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar placeholder */}
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center text-4xl font-bold text-white mb-4 border-2 border-white/20">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      {/* Name */}
                      <div className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                        {member.name}
                      </div>
                      
                      {/* Role */}
                      <div className="text-sm text-purple-200 mb-3 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                        {roleTranslations[member.role] || member.role}
                      </div>
                      
                      {/* Department */}
                      <div className="text-xs text-gray-300 mb-4">
                        {departmentTranslations[member.department] || member.department}
                      </div>
                      
                      {/* Description */}
                      <div className="text-sm text-gray-200 leading-relaxed">
                        {descriptionTranslations[member.description] || member.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedMember.name}</h3>
              <button 
                onClick={closeModal}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
                             <div>
                 <span className="text-purple-200 font-semibold">{t('team.modal.role') as string}</span>
                 <span className="text-white ml-2">{roleTranslations[selectedMember.role] || selectedMember.role}</span>
               </div>
               <div>
                 <span className="text-purple-200 font-semibold">{t('team.modal.department') as string}</span>
                 <span className="text-white ml-2">{departmentTranslations[selectedMember.department] || selectedMember.department}</span>
               </div>
               <div>
                 <span className="text-purple-200 font-semibold">{t('team.modal.description') as string}</span>
                 <p className="text-gray-200 mt-2 leading-relaxed">{descriptionTranslations[selectedMember.description] || selectedMember.description}</p>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 