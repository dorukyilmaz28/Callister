import { Trophy, Calendar, Award as AwardIcon } from 'lucide-react'
import awardsData from '@/data/awards.json'

export default function AwardsPage() {
  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Ödüllerimiz
          </h1>
          <p className="text-xl md:text-2xl text-gray-200">
            Callister #9024 FRC Takımı'nın kazandığı ödüller ve başarıları
          </p>
        </div>

        {/* Competition List Table */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Yarışma Listesi:</h2>
          <div className="overflow-x-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="text-left px-6 py-4 font-semibold text-white">Year</th>
                    <th className="text-left px-6 py-4 font-semibold text-white">Event</th>
                    <th className="text-left px-6 py-4 font-semibold text-white">Awards</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2025</td>
                    <td className="px-6 py-4 text-gray-200">Milstein Division</td>
                    <td className="px-6 py-4 text-gray-200"></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2025</td>
                    <td className="px-6 py-4 text-gray-200">Ankara Regional</td>
                    <td className="px-6 py-4 text-gray-200">
                      Regional Finalists<br/>
                      Innovation in Control Award sponsored by nVent
                    </td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2024</td>
                    <td className="px-6 py-4 text-gray-200">Cezeri Robot Ligi Ümraniye Robotik Yarışları</td>
                    <td className="px-6 py-4 text-gray-200"></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2024</td>
                    <td className="px-6 py-4 text-gray-200">Bosphorus Regional</td>
                    <td className="px-6 py-4 text-gray-200"></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2024</td>
                    <td className="px-6 py-4 text-gray-200">İstanbul Regional</td>
                    <td className="px-6 py-4 text-gray-200">Gracious Professionalism Award</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2023</td>
                    <td className="px-6 py-4 text-gray-200">Halic Regional</td>
                    <td className="px-6 py-4 text-gray-200">Highest Rookie Seed<br/>Judges' Award</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-6 py-4 text-gray-200">2023</td>
                    <td className="px-6 py-4 text-gray-200">Bosphorus Regional</td>
                    <td className="px-6 py-4 text-gray-200"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Awards Grid - Detailed Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Highest Rookie Seed Award */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <AwardIcon className="text-purple-300 mr-3" />
              <span className="text-xl font-bold text-white">Highest Rookie Seed Award</span>
            </div>
            <p className="text-gray-200 mb-3 leading-relaxed">
              <span className="font-semibold text-purple-200">Açıklama:</span> Bu ödül, yarışma sonunda sıralama tablosunda tüm rookie takımlar arasında en yüksek puanla bitiren takıma verilir. Bu, takımın yalnızca maçlarda başarılı olduğunu değil, strateji, sürüş becerisi ve mühendislik açısından da rakip rookie takımlar arasında en iyi performansı gösterdiğini kanıtlar.
            </p>
            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-200">Önemi:</span> Saf performansa dayalı olduğu için, bu ödülü kazanmak takımın teknik yeterliliğini açıkça ortaya koyar.
            </p>
          </div>

          {/* Judges' Award */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <AwardIcon className="text-purple-300 mr-3" />
              <span className="text-xl font-bold text-white">Judges' Award</span>
            </div>
            <p className="text-gray-200 mb-3 leading-relaxed">
              <span className="font-semibold text-purple-200">Açıklama:</span> Yarışmalarda jürinin dikkatini çeken, ancak belirli bir kategoriye sığmayan olağanüstü bir başarı gösteren takımlara verilir. Bu başarı; inovasyon, azim, takım ruhu, topluluk etkisi veya benzersiz bir proje olabilir.
            </p>
            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-200">Önemi:</span> Çok esnek kriterlere sahip olduğu için, bu ödül bazen takımların özgün hikayelerini ve sıra dışı başarılarını onurlandırır.
            </p>
          </div>

          {/* Rookie Inspiration Award */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <AwardIcon className="text-purple-300 mr-3" />
              <span className="text-xl font-bold text-white">Rookie Inspiration Award</span>
            </div>
            <p className="text-gray-200 mb-3 leading-relaxed">
              <span className="font-semibold text-purple-200">Açıklama:</span> Rookie takımlar içinde, STEM alanlarında ilham verici bir etki yaratan takıma verilir. Burada önemli olan yalnızca yarışma performansı değil, aynı zamanda takımın okulu, toplumu ve diğer öğrencilere ilham vermesidir.
            </p>
            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-200">Önemi:</span> Bu ödül, yeni bir takımın kısa sürede nasıl büyük bir etki yaratabileceğinin göstergesidir.
            </p>
          </div>

          {/* Rookie All-Star Award */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <AwardIcon className="text-purple-300 mr-3" />
              <span className="text-xl font-bold text-white">Rookie All-Star Award</span>
            </div>
            <p className="text-gray-200 mb-3 leading-relaxed">
              <span className="font-semibold text-purple-200">Açıklama:</span> Rookie takımlar arasında FIRST değerlerini en iyi şekilde temsil eden, gelecekte güçlü bir takım olma potansiyelini net şekilde gösteren takıma verilir. Genelde bu ödülü alan takımlar dünya şampiyonasına davet edilir.
            </p>
            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-200">Önemi:</span> Rookie kategorisindeki en büyük ödüldür; yalnızca teknik başarı değil, bütünsel olarak örnek bir takım kültürü gerekir.
            </p>
          </div>

          {/* Gracious Professionalism Award */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
            <div className="flex items-center mb-4">
              <AwardIcon className="text-purple-300 mr-3" />
              <span className="text-xl font-bold text-white">Gracious Professionalism Award</span>
            </div>
            <p className="text-gray-200 mb-3 leading-relaxed">
              <span className="font-semibold text-purple-200">Açıklama:</span> Hem rekabetçi hem de yardımsever olmayı başaran, rakiplerine saygı gösteren, yardım eden ve profesyonellikten ödün vermeyen takımlara verilir. Takımlar, sahada rekabet ederken sahne arkasında bilgi, parça veya destek paylaşarak bu ödüle layık görülür.
            </p>
            <p className="text-gray-200 leading-relaxed">
              <span className="font-semibold text-purple-200">Önemi:</span> FIRST'ün temel değerlerinden biridir; teknik başarı kadar, davranış ve etik açısından da yüksek standartlara sahip olunduğunu gösterir.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 