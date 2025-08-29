'use client'

import { useState } from 'react'
import eventsData from '@/data/events.json'
import { Calendar, MapPin, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function EventsPage() {
  const [modalEvent, setModalEvent] = useState<any>(null)
  const { t } = useLanguage()

  // Etkinlik çevirileri
  const getEventTranslation = (eventId: number) => {
    const translations: { [key: number]: any } = {
      1: {
        title: t('events.eventDetails.frc2026.title'),
        description: t('events.eventDetails.frc2026.description'),
        details: t('events.eventDetails.frc2026.details')
      },
      2: {
        title: t('events.eventDetails.teamFoundation.title'),
        description: t('events.eventDetails.teamFoundation.description'),
        result: t('events.eventDetails.teamFoundation.result')
      }
    }

    return translations[eventId] || {}
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('events.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            {t('events.subtitle')}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...eventsData.upcoming, ...eventsData.past].map((event) => {
            const translation = getEventTranslation(event.id)
            return (
              <div 
                key={event.title} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer" 
                onClick={() => setModalEvent(event)}
              >
                <div className="text-xl font-bold text-white mb-3">{translation.title || event.title}</div>
                <div className="text-gray-200 mb-4 leading-relaxed">{translation.description || event.description}</div>
                <div className="flex items-center text-sm text-purple-200 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center text-sm text-purple-200">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full relative border border-white/20 shadow-2xl">
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors" 
              onClick={() => setModalEvent(null)}
            >
              <X size={28} />
            </button>
            {(() => {
              const translation = getEventTranslation(modalEvent.id)
              return (
                <>
                  <h2 className="text-3xl font-bold text-white mb-6">{translation.title || modalEvent.title}</h2>
                  <p className="text-gray-200 mb-6 leading-relaxed">{translation.description || modalEvent.description}</p>
                  
                  {translation.details && (
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{t('events.details')}</h3>
                      <p className="text-gray-200 leading-relaxed">{translation.details}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-purple-200">
                      <Calendar className="w-4 h-4 mr-2" />
                      {modalEvent.date}
                    </div>
                    <div className="flex items-center text-sm text-purple-200">
                      <MapPin className="w-4 h-4 mr-2" />
                      {modalEvent.location}
                    </div>
                  </div>
                  
                  {translation.result && (
                    <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                      <span className="text-green-300 font-semibold">{t('events.result')} {translation.result}</span>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
} 