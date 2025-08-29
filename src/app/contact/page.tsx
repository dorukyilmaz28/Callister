'use client'

import { useState } from 'react'
import { Mail, Instagram, Linkedin, MapPin, MessageCircle, Send, Youtube } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { t } = useLanguage()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // EmailJS template parametreleri
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'fizikdoruk@gmail.com'
      }

      // EmailJS ile e-posta gönderimi
      await emailjs.send(
        'service_cydl61d', // EmailJS service ID - kullanıcı tarafından doldurulacak
        'template_d66exsf', // EmailJS template ID - kullanıcı tarafından doldurulacak
        templateParams,
        '9K4sfHHb_FSpqZUAQ' 
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // 3 saniye sonra success mesajını kaldır
      setTimeout(() => setSubmitStatus('idle'), 3000)
      
    } catch (error: any) {
      console.error('E-posta gönderimi başarısız:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      console.error('Error type:', typeof error)
      console.error('Error message:', error?.message)
      setSubmitStatus('error')
      
      // 5 saniye sonra error mesajını kaldır
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {t('contact.title') as string}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            {t('contact.subtitle') as string}
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl mr-4">
                <Mail className="text-purple-300" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('contact.info.email') as string}</h3>
                <p className="text-gray-300 text-sm">{t('contact.directMessage') as string}</p>
              </div>
            </div>
            <a 
              href="mailto:callisterfrc@gmail.com" 
              className="text-purple-200 hover:text-purple-100 transition-colors duration-200 break-all"
            >
              callisterfrc@gmail.com
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                <MapPin className="text-blue-300" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('contact.info.address') as string}</h3>
                <p className="text-gray-300 text-sm">{t('contact.visitLocation') as string}</p>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-blue-200 font-medium">
                Gebze Bahçeşehir Fen ve Teknoloji Lisesi
              </span>
              <span className="text-blue-200 block">
                Kocaeli, Gebze
              </span>
            </div>
          </div>

          {/* Social Media Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-pink-500/20 p-3 rounded-xl mr-4">
                <MessageCircle className="text-pink-300" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('contact.info.social') as string}</h3>
                <p className="text-gray-300 text-sm">{t('contact.followUs') as string}</p>
              </div>
            </div>
            <div className="space-y-3">
              <a 
                href="https://www.instagram.com/callisterfrc?igsh=MTMwNWdmZGJ1OWcwMg==" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-pink-200 hover:text-pink-100 transition-colors duration-200"
              >
                <Instagram size={18} className="mr-2" />
                @callisterfrc
              </a>
              <a 
                href="https://www.linkedin.com/company/callisterfrc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-200 hover:text-blue-100 transition-colors duration-200"
              >
                <Linkedin size={18} className="mr-2" />
                Callister FRC
              </a>
              <a 
                href="https://youtube.com/@callisterfrc?feature=shared" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-red-200 hover:text-red-100 transition-colors duration-200"
              >
                <Youtube size={18} className="mr-2" />
                Callister FRC
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl mr-4">
                <Send className="text-green-300" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{t('contact.quickContact') as string}</h3>
                <p className="text-gray-300 text-sm">{t('contact.quickContactDesc') as string}</p>
              </div>
            </div>
            <p className="text-green-200 text-sm">
              Aşağıdaki formu kullanarak bize mesaj gönderebilirsiniz
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">{t('contact.quickContact') as string}</h2>
            <p className="text-gray-300">{t('contact.quickContactDesc') as string}</p>
          </div>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                              <p className="text-green-200 text-center">
                  ✅ {t('contact.form.sent') as string}
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                <p className="text-red-200 text-center">
                  ❌ {t('contact.form.error') as string}
                </p>
              </div>
            )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                  {t('contact.form.name') as string} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                  {t('contact.form.email') as string} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-200 mb-2">
                {t('contact.form.subject') as string} *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Mesajınızın konusu"
              />
          </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-2">
                {t('contact.form.message') as string} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Mesajınızı buraya yazın..."
              ></textarea>
          </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary inline-flex items-center px-8 py-3 text-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {t('contact.form.sending') as string}
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    {t('contact.form.send') as string}
                  </>
                )}
              </button>
          </div>
          </form>
          </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-semibold text-white mb-2">{t('contact.quickContact') as string}</h3>
                <p className="text-gray-300">
                  {t('contact.quickContactDesc') as string}
                </p>
          </div>
        </div>
      </div>
    </div>
  )
} 