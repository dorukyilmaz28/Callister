'use client'

import Hero from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Users, Lightbulb, Heart } from 'lucide-react'
import sponsorsData from '@/data/sponsors.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <Hero />
      {/* About FRC Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] drop-shadow-lg mb-4">{t('frc.title')}</h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#F5F5F5]/90 font-medium px-4">
              {t('frc.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="px-2 sm:px-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 drop-shadow-md">
                {t('frc.whatIs')}
              </h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#F5F5F5]/95 font-medium leading-relaxed font-['Poppins']">
                <p>
                  {t('frc.description1')}
                </p>
                <p>
                  {t('frc.description2')}
                </p>
                <p>
                  {t('frc.description3')}
                </p>
              </div>
            </div>
            <div className="relative px-2 sm:px-4">
              <div className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-white/30 to-white/10 rounded-lg overflow-hidden border border-white/20">
                  <Image
                    src="/images/frc-match.png"
                    alt={t('frc.matchImage')}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">{t('values.title')}</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              {t('values.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                titleKey: 'values.graciousProfessionalism.title',
                descriptionKey: 'values.graciousProfessionalism.description'
              },
              {
                icon: Users,
                titleKey: 'values.coopertition.title',
                descriptionKey: 'values.coopertition.description'
              },
              {
                icon: Lightbulb,
                titleKey: 'values.innovation.title',
                descriptionKey: 'values.innovation.description'
              },
              {
                icon: Award,
                titleKey: 'values.excellence.title',
                descriptionKey: 'values.excellence.description'
              }
            ].map((value, index) => (
              <div key={value.titleKey} className="card text-center">
                <value.icon size={40} className="text-accent mx-auto mb-3 sm:mb-4" />
                <h3 className="card-title text-lg sm:text-xl">
                  {t(value.titleKey)}
                </h3>
                <p className="card-description text-sm sm:text-base">
                  {t(value.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest News Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">{t('news.title')}</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              {t('news.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8 max-w-2xl mx-auto">
            {[
              {
                titleKey: 'news.latest.title',
                dateKey: 'news.latest.date',
                excerptKey: 'news.latest.excerpt',
                image: '/images/news/news1.jpg'
              }
            ].map((news, index) => (
              <div key={t(news.titleKey)} className="card">
                <div className="aspect-video bg-gradient-to-br from-white/30 to-white/10 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-2">📰</div>
                    <p className="text-[#F5F5F5] font-medium text-xs sm:text-sm">{t('news.newsImage')}</p>
                  </div>
                </div>
                <h3 className="card-title text-lg sm:text-xl">
                  {t(news.titleKey)}
                </h3>
                <p className="card-tag mb-3 text-sm">
                  {t(news.dateKey)}
                </p>
                <p className="card-description text-sm sm:text-base">
                  {t(news.excerptKey)}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link href="/events">
              <button className="btn-primary">
                {t('news.viewAllNews')}
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Sponsor Carousel */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">{t('sponsors.title')}</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              {t('sponsors.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {/* ARM Sponsor (Gerçek) */}
            {sponsorsData.sponsors.map((sponsor) => (
              <div key={sponsor.id} className="card text-center p-3 sm:p-4">
                <div className="aspect-square bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center border border-white/20 overflow-hidden">
                  {sponsor.logo ? (
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} Logo`}
                      className="w-full h-full object-contain p-2 sm:p-3"
                    />
                  ) : null}
                  <div className={`text-center ${sponsor.logo ? 'hidden' : ''}`}>
                    <div className="text-xl sm:text-2xl mb-2">🏢</div>
                    <p className="text-[#F5F5F5] font-medium text-xs">{t('sponsors.sponsorLogo')}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F5F5F5] mb-1">{sponsor.name}</h4>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
                    {sponsor.category}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Placeholder Sponsor Kartları (9 adet) */}
            {Array.from({ length: 9 }, (_, i) => (
              <div key={`placeholder-${i}`} className="card text-center p-3 sm:p-4">
                <div className="aspect-square bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl mb-2">🏢</div>
                    <p className="text-[#F5F5F5] font-medium text-xs">{t('sponsors.sponsorLogo')}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F5F5F5] mb-1">Sponsor</h4>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
                    {t('sponsors.waiting')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 