'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import teamData from '@/data/team.json'

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null)

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
                Takımımız
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Callister #9024 FRC Takımı'nın değerli üyeleri
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
                        {member.role}
                      </div>
                      
                      {/* Department */}
                      <div className="text-xs text-gray-300 mb-4">
                        {member.department}
                      </div>
                      
                      {/* Description */}
                      <div className="text-sm text-gray-200 leading-relaxed">
                        {member.description}
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
                <span className="text-purple-200 font-semibold">Rol:</span>
                <span className="text-white ml-2">{selectedMember.role}</span>
              </div>
              <div>
                <span className="text-purple-200 font-semibold">Departman:</span>
                <span className="text-white ml-2">{selectedMember.department}</span>
              </div>
              <div>
                <span className="text-purple-200 font-semibold">Açıklama:</span>
                <p className="text-gray-200 mt-2 leading-relaxed">{selectedMember.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 