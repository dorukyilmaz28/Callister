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
                  {awardsData.events.map((yearData) => 
                    yearData.events.map((event, eventIndex) => (
                      <tr key={`${yearData.year}-${eventIndex}`} className="border-b border-white/10">
                        <td className="px-6 py-4 text-gray-200">{yearData.year}</td>
                        <td className="px-6 py-4 text-gray-200">{event.name}</td>
                        <td className="px-6 py-4 text-gray-200">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {awardsData.awards.map((award) => (
            <div key={award.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">{award.icon}</span>
                <div>
                  <span className="text-xl font-bold text-white">{award.name}</span>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-purple-200 bg-purple-500/20 px-2 py-1 rounded-full mr-2">
                      {award.year}
                    </span>
                    <span className="text-sm text-gray-300">{award.competition}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-200 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
} 