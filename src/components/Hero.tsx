'use client';

import React from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import sponsorsData from '@/data/sponsors.json';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Team Logo */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 sm:mb-12 flex justify-center items-center"
        >
          {/* Animated Logo Video */}
          <div className="relative flex justify-center items-center">
            {/* Static logo (always visible) */}
            <Image 
              src="/logo.png" 
              alt="Callister Logo" 
              width={280} 
              height={280} 
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-soft bg-white shadow-2xl" 
              priority
            />
            
            {/* Video overlay (when loaded) */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full border-4 border-soft bg-white shadow-2xl object-cover"
              style={{ objectFit: 'cover' }}
              onError={(e) => {
                console.error('Video yüklenemedi:', e);
                const videoElement = e.target as HTMLVideoElement;
                if (videoElement) {
                  videoElement.style.display = 'none';
                }
              }}
              onLoadStart={() => console.log('Video yüklenmeye başladı')}
              onLoadedData={() => console.log('Video yüklendi')}
            >
              <source src="/videos/logo.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#F5F5F5] mb-4 sm:mb-6 drop-shadow-2xl font-['Poppins'] px-2"
        >
          {t('hero.title') as string} <span className="text-gradient">#9024</span>
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#F5F5F5] font-semibold mb-4 sm:mb-6 drop-shadow-lg font-['Poppins'] px-4"
        >
          {t('hero.subtitle') as string}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-base sm:text-lg text-[#F5F5F5]/95 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium leading-relaxed font-['Poppins'] px-4"
        >
          {t('hero.description') as string}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <Link href="/about" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center justify-center space-x-2 shadow-2xl text-[#F5F5F5] w-full sm:w-auto"
            >
              <span>{t('hero.aboutTeam') as string}</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
          <Link href="/projects" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center justify-center space-x-2 shadow-2xl text-[#F5F5F5] w-full sm:w-auto"
            >
              <span>{t('hero.viewProjects') as string}</span>
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-4xl mx-auto px-4"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-1 sm:mb-2 drop-shadow-lg font-['Poppins']">22</div>
            <div className="text-sm sm:text-base text-[#F5F5F5]/90 font-medium font-['Poppins']">{t('hero.stats.teamMembers') as string}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-1 sm:mb-2 drop-shadow-lg font-['Poppins']">11</div>
            <div className="text-sm sm:text-base text-[#F5F5F5]/90 font-medium font-['Poppins']">{t('hero.stats.projects') as string}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-[#F5F5F5] mb-1 sm:mb-2 drop-shadow-lg font-['Poppins']">5</div>
            <div className="text-sm sm:text-base text-[#F5F5F5]/90 font-medium font-['Poppins']">{t('hero.stats.awards') as string}</div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-[#F5F5F5]/30 rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-0.5 h-2 sm:h-3 bg-[#F5F5F5] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
