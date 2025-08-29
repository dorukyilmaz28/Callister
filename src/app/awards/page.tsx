'use client'

import { Trophy, Calendar, Award as AwardIcon } from 'lucide-react'
import awardsData from '@/data/awards.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AwardsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 px-2">
            {t('awards.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-200 px-4">
            {t('awards.subtitle')}
          </p>
        </div>

        {/* Competition List Table */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 px-2">{t('awards.competitionList')}</h2>
          <div className="overflow-x-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">{t('awards.table.year')}</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">{t('awards.table.event')}</th>
                    <th className="text-left px-3 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-base">{t('awards.table.awards')}</th>
                  </tr>
                </thead>
                <tbody>
                  {awardsData.events.map((yearData) => 
                    yearData.events.map((event, eventIndex) => (
                      <tr key={`${yearData.year}-${eventIndex}`} className="border-b border-white/10">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{yearData.year}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">{event.name}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-gray-200 text-sm sm:text-base">
                          {event.awards.length > 0 ? (
                            event.awards.map((award, awardIndex) => (
                              <span key={awardIndex}>
                                {awardIndex > 0 && <br />}
                                {award}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Awards Grid - Dynamic Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {awardsData.awards.map((award) => (
            <div key={award.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              <div className="flex items-center mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl mr-3">{award.icon}</span>
                <div>
                  <span className="text-lg sm:text-xl font-bold text-white">{award.name}</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs sm:text-sm text-purple-200 bg-purple-500/20 px-2 py-1 rounded-full mr-2">
                      {award.year}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-300">{award.competition}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 