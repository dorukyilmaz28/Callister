import { ExternalLink, Star, Crown, Award } from 'lucide-react'
import sponsorsData from '@/data/sponsors.json'

export default function SponsorsPage() {
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
                Sponsorlarımız
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Başarılarımızda büyük katkıları olan değerli sponsorlarımız
              </p>
            </div>

            {/* Sponsor Categories */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Sponsor Kategorileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {sponsorsData.categories.map((cat) => (
                  <div key={cat.name} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-center">
                    <div className="flex justify-center mb-4">
                      {cat.name === 'Platinum' && <Crown className="text-purple-300 w-8 h-8" />}
                      {cat.name === 'Gold' && <Star className="text-purple-300 w-8 h-8" />}
                      {cat.name === 'Silver' && <Award className="text-purple-300 w-8 h-8" />}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{cat.name}</h3>
                    <ul className="space-y-3">
                      {sponsorsData.sponsors.filter(s => s.category === cat.name).map((sponsor) => (
                        <li key={sponsor.name}>
                          <a 
                            href={sponsor.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-purple-200 hover:text-white transition-colors flex items-center justify-center group"
                          >
                            {sponsor.name}
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsor Logos Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Sponsor Logoları
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {sponsorsData.sponsors.map((sponsor) => (
                  <div key={sponsor.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-center group">
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center overflow-hidden">
                        {sponsor.logo ? (
                          <img 
                            src={sponsor.logo} 
                            alt={`${sponsor.name} Logo`}
                            className="w-full h-full object-contain p-2"

                          />
                        ) : null}
                        <div className={`text-center text-sm font-medium text-white ${sponsor.logo ? 'hidden' : ''}`}>
                          {sponsor.name}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{sponsor.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{sponsor.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-200 border border-purple-400/30">
                      {sponsor.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsorship Packages */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Sponsorluk Paketleri
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Platinum Package */}
                <div className="bg-gradient-to-br from-gray-100/20 via-gray-200/15 to-gray-300/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="text-gray-700 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Callister Paket</h3>
                    <div className="text-3xl font-bold text-purple-300 mb-4">$15.000+</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-200 mb-6">
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Üniforma arkasında en büyük boyutta şirket logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Takım adı şirketin isteğine göre belirlenir
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Pit alanında sponsor şirketinin tanıtım materyali sergileme hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Tüm sosyal medya hesaplarımızda sponsor şirketinin adı ve logosu birinci sırada
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Broşür ve sunumlarda en büyük boyutta şirket logosu kullanımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Sponsor şirketinin çalışanlarının çocuklarına 4 hafta tasarım, programlama, mekanik ve STEAM eğitimi
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Takımımızın yürüttüğü tüm sosyal sorumluluk faaliyetlerinde şirketin tanıtımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Etkinlik isimlerini şekillendirme hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Sponsor isterse takım adını kullanarak paylaşım yapma hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-300 mr-2">•</span>
                      Takımımızın düzenlediği etkinliklerde konuşma ve reklam yapma hakkı
                    </li>
                  </ul>
                </div>

                {/* Diamond Package */}
                <div className="bg-gradient-to-br from-blue-100/20 via-blue-200/15 to-blue-300/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="text-blue-700 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Elmas Paket</h3>
                    <div className="text-3xl font-bold text-blue-300 mb-4">$9.000+</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-200 mb-6">
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Üniforma arkasında büyük boyutta şirket logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Tüm sosyal medya hesaplarımızda sponsor şirketinin adı ve logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Broşür ve sunumlarda şirket logosu kullanımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Pit alanında sponsor şirketinin tanıtım materyali sergileme hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Takımımızın yürüttüğü tüm sosyal sorumluluk faaliyetlerinde şirketin temel tanıtımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Sponsor şirketinin çalışanlarının çocuklarına 4 hafta ücretsiz tasarım ve programlama eğitimi
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Sponsor isterse takım adını kullanarak paylaşım yapma hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Sponsor şirketinin sosyal sorumluluk projelerinde gönüllü olarak yer alma hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-300 mr-2">•</span>
                      Takımımızın düzenlediği etkinliklerde konuşma ve reklam yapma hakkı
                    </li>
                  </ul>
                </div>

                {/* Gold Package */}
                <div className="bg-gradient-to-br from-yellow-100/20 via-yellow-200/15 to-yellow-300/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-yellow-700 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Altın Paket</h3>
                    <div className="text-3xl font-bold text-yellow-300 mb-4">$7.000+</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-200 mb-6">
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Üniforma arkasında orta boyutta şirket logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Tüm sosyal medya hesaplarımızda sponsor şirketinin adı ve logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Broşür ve sunumlarda şirket logosu kullanımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Pit alanında sponsor şirketinin tanıtım materyali sergileme hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Takımımızın yürüttüğü tüm sosyal sorumluluk faaliyetlerinde şirketin temel tanıtımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Sponsor isterse takım adını kullanarak paylaşım yapma hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Sponsor şirketinin sosyal sorumluluk projelerinde gönüllü olarak yer alma hakkı
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-300 mr-2">•</span>
                      Takımımızın düzenlediği etkinliklerde konuşma ve reklam yapma hakkı
                    </li>
                  </ul>
                </div>

                {/* Silver Package */}
                <div className="bg-gradient-to-br from-gray-200/20 via-gray-300/15 to-gray-400/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-gray-600 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Gümüş Paket</h3>
                    <div className="text-3xl font-bold text-gray-300 mb-4">$5.000+</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-200 mb-6">
                    <li className="flex items-start">
                      <span className="text-gray-300 mr-2">•</span>
                      Üniforma arkasında küçük boyutta şirket logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-300 mr-2">•</span>
                      Broşür ve sunumlarda şirket logosu kullanımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-300 mr-2">•</span>
                      Sosyal medya ve web sitemizde özel teşekkür
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-300 mr-2">•</span>
                      Sponsor isterse takım adını kullanarak paylaşım yapma hakkı
                    </li>
                  </ul>
                </div>

                {/* Bronze Package */}
                <div className="bg-gradient-to-br from-amber-100/20 via-amber-200/15 to-amber-300/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="text-amber-700 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Bronz Paket</h3>
                    <div className="text-3xl font-bold text-amber-300 mb-4">$3.000+</div>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-200 mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-300 mr-2">•</span>
                      Üniforma arkasında küçük boyutta şirket logosu
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-300 mr-2">•</span>
                      Broşür ve sunumlarda şirket logosu kullanımı
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-300 mr-2">•</span>
                      Sosyal medya ve web sitemizde özel teşekkür
                    </li>
                  </ul>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
} 