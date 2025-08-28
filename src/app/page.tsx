import Hero from '@/components/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { Award, Users, Lightbulb, Heart } from 'lucide-react'
import sponsorsData from '@/data/sponsors.json'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      {/* About FRC Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] drop-shadow-lg mb-4">FIRST Robotics Competition</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#F5F5F5]/90 font-medium">
              Lise öğrencileri için düzenlenen uluslararası robotik yarışması
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#F5F5F5] mb-6 drop-shadow-md">
                FRC Nedir?
              </h3>
              <div className="space-y-4 text-[#F5F5F5]/95 font-medium leading-relaxed">
                <p>
                  FIRST Robotics Competition (FRC), lise öğrencileri için düzenlenen uluslararası 
                  bir robotik yarışmasıdır. Öğrenciler, mühendislik, programlama ve takım çalışması 
                  becerilerini geliştirirken gerçek dünya problemlerine çözüm üretirler.
                </p>
                <p>
                  Her sezon, takımlar 6 hafta içinde belirli bir görev için robot tasarlar ve 
                  üretir. Yarışma sırasında takımlar işbirliği yaparak (Coopertition) en iyi 
                  sonucu elde etmeye çalışır.
                </p>
                <p>
                  FRC'nin temel değerleri Gracious Professionalism ve Coopertition'dır. 
                  Bu değerler, yarışma sırasında bile işbirliği ve saygıyı ön planda tutar.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-white/30 to-white/10 rounded-lg overflow-hidden border border-white/20">
                  <Image
                    src="/images/frc-match.png"
                    alt="FRC Maç Görüntüsü"
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
      <section className="py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">Değerlerimiz</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              FRC'nin temel değerleri doğrultusunda çalışıyoruz
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Gracious Professionalism',
                description: 'Saygılı ve profesyonel davranış sergileriz'
              },
              {
                icon: Users,
                title: 'Coopertition',
                description: 'Yarışma sırasında bile işbirliği yaparız'
              },
              {
                icon: Lightbulb,
                title: 'İnovasyon',
                description: 'Yaratıcı çözümler geliştiririz'
              },
              {
                icon: Award,
                title: 'Mükemmellik',
                description: 'En yüksek standartlarda çalışırız'
              }
            ].map((value, index) => (
              <div key={value.title} className="card text-center">
                <value.icon size={48} className="text-accent mx-auto mb-4" />
                <h3 className="card-title">
                  {value.title}
                </h3>
                <p className="card-description">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest News Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">Son Haberler</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              Takımımızdan en güncel gelişmeler
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {[
              {
                title: 'FRC 2026 AGE/REBUILT Sezonu Duyurusu',
                date: '3 Mart 2026',
                excerpt: 'Türkiye\'deki FIRST®️ AGE/REBUILT yarışma sezonu! İstanbul\'da 6, Ankara\'da 2 etkinlik.',
                image: '/images/news/news1.jpg'
              }
            ].map((news, index) => (
              <div key={news.title} className="card">
                <div className="aspect-video bg-gradient-to-br from-white/30 to-white/10 rounded-lg mb-4 flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📰</div>
                    <p className="text-[#F5F5F5] font-medium text-sm">Haber Görseli</p>
                  </div>
                </div>
                <h3 className="card-title">
                  {news.title}
                </h3>
                <p className="card-tag mb-3">
                  {news.date}
                </p>
                <p className="card-description">
                  {news.excerpt}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/events">
              <button className="btn-primary">
                Tüm Haberleri Gör
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Sponsor Carousel */}
      <section className="py-20 bg-gradient-to-br from-primary via-dark to-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title text-[#F5F5F5] drop-shadow-lg">Sponsorlarımız</h2>
            <p className="section-subtitle text-[#F5F5F5]/90 font-medium">
              Başarılarımızda büyük katkıları olan değerli sponsorlarımız
            </p>
          </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* ARM Sponsor (Gerçek) */}
            {sponsorsData.sponsors.map((sponsor) => (
              <div key={sponsor.id} className="card text-center p-4">
                <div className="aspect-square bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center border border-white/20 overflow-hidden">
                  {sponsor.logo ? (
                    <img 
                      src={sponsor.logo} 
                      alt={`${sponsor.name} Logo`}
                      className="w-full h-full object-contain p-3"
                    />
                  ) : null}
                  <div className={`text-center ${sponsor.logo ? 'hidden' : ''}`}>
                    <div className="text-2xl mb-2">🏢</div>
                    <p className="text-[#F5F5F5] font-medium text-xs">Sponsor Logo</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">{sponsor.name}</h4>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
                    {sponsor.category}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Placeholder Sponsor Kartları (9 adet) */}
            {Array.from({ length: 9 }, (_, i) => (
              <div key={`placeholder-${i}`} className="card text-center p-4">
                <div className="aspect-square bg-gradient-to-br from-white/30 to-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏢</div>
                    <p className="text-[#F5F5F5] font-medium text-xs">Sponsor Logo</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">Sponsor</h4>
                  <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
                    Bekliyor
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