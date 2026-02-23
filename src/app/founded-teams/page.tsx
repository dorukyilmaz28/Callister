'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const IMAGE_PLACEHOLDERS = [
  '/images/projects/kurulan-takim1.png',
  '/images/projects/kurulan-takim2.png',
  '/images/projects/kurulan-takim3.png',
  '/images/projects/kurulan-takim4.png',
  '/images/projects/kurulan-takim5.png',
]

export default function FoundedTeamsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/30 to-pink-600/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {t('foundedTeams.title') as string}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium">
                {t('foundedTeams.subtitle') as string}
              </p>
            </div>

            {/* 5 görsel alanı */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {IMAGE_PLACEHOLDERS.map((src, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden flex items-center justify-center relative"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover absolute inset-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const placeholder = target.parentElement?.querySelector('.img-placeholder')
                      placeholder?.classList.remove('hidden')
                    }}
                  />
                  <span className="img-placeholder hidden text-gray-400 text-sm p-2 text-center">
                    Görsel {index + 1}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph1') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph2') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph3') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph4') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph5') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph6') as string}
              </p>
              <p className="text-gray-200 leading-relaxed">
                {t('foundedTeams.paragraph7') as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
