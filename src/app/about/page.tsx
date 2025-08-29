'use client'

import { Calendar, Users, Award, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/30 to-pink-600/20"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">{t('about.title') as string}</h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium">
                {t('about.subtitle') as string}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Calendar, value: t('about.content.foundedDate') as string, label: t('about.stats.foundedDate') as string },
                { icon: Users, value: '22', label: t('about.stats.teamMembers') as string },
                { icon: Award, value: '5+', label: t('about.stats.awards') as string },
                { icon: Target, value: '11+', label: t('about.stats.projects') as string }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-center">
                  <stat.icon size={48} className="text-purple-300 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2 font-['Poppins']">{stat.value}</div>
                  <div className="text-gray-200 font-medium font-['Poppins']">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-['Poppins']">{t('about.content.whoWeAre') as string}</h2>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph1') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph2') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph3') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph4') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph5') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph6') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph7') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph8') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph9') as string}
                  <ul className="list-disc list-inside mt-2 text-gray-200 font-['Poppins']">
                    <li>Highest Rookie Seed Award</li>
                    <li>Judges' Award</li>
                    <li>Rookie Inspiration Award</li>
                    <li>Rookie All-Star Award</li>
                    <li>Gracious Professionalism Award</li>
                  </ul>
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph10') as string}
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  {t('about.content.paragraph11') as string}
                </p>
                <p className="mt-8 text-right font-bold text-purple-300 font-['Poppins']">{t('about.content.signature') as string}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 