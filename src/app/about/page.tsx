import { Calendar, Users, Award, Target } from 'lucide-react';

export default function AboutPage() {
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
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Biz Kimiz?</h1>
              <p className="text-xl md:text-2xl text-gray-200 font-medium">
                Callister #9024 FRC Takımı'nın hikayesi, vizyonu ve toplumsal etkisi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              {[
                { icon: Calendar, value: '19 Mayıs 2022', label: 'Kuruluş Tarihi' },
                { icon: Users, value: '22', label: 'Takım Üyesi' },
                { icon: Award, value: '5+', label: 'Ödül' },
                { icon: Target, value: '11+', label: 'Proje' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 text-center">
                  <stat.icon size={48} className="text-purple-300 mx-auto mb-4" />
                  <div className="text-2xl font-bold text-white mb-2 font-['Poppins']">{stat.value}</div>
                  <div className="text-gray-200 font-medium font-['Poppins']">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl max-w-4xl mx-auto space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4 font-['Poppins']">Biz Kimiz?</h2>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  19 Mayıs 2022 tarihinde kurulan Callister #9024 FRC takımı olarak; bilim, teknoloji, mühendislik, sanat ve matematik (STEAM) alanlarında geleceğin liderlerini yetiştirme hedefiyle yola çıktık. 22 öğrenci ve 1 mentörden oluşan güçlü takımımızla yalnızca robot üretmekle kalmayıp, sosyal sorumluluk ve farkındalık odaklı projelerle de topluma katkı sağlamayı misyon edindik. Takımımızın her bir üyesi, yalnızca teknik yetkinlikleriyle değil, aynı zamanda duyarlılığı, takım ruhu, girişimciliği ve vizyoner yaklaşımıyla ön plana çıkmaktadır.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Misyonumuz, FIRST ilkelerini içselleştirmiş bireyler olarak toplumun her kesimine ilham vermek, STEAM kültürünü yaygınlaştırmak ve bu yolda başkalarına da öncülük etmektir. Vizyonumuz ise, ulusal ve uluslararası platformlarda ülkemizi en iyi şekilde temsil ederek hem bireysel hem de toplumsal gelişime katkıda bulunmak, fark yaratan projelerle sürdürülebilir bir dünya için çalışmaktır. Bu doğrultuda takım olarak yürüttüğümüz her çalışma yalnızca yarışma odaklı değil, daha geniş bir etki alanı yaratmayı hedefleyen stratejik adımlardır.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Bugüne kadar gerçekleştirdiğimiz projelerle hem çocuklara hem de yetişkinlere ilham verdik. Örneğin, "Pencere" projemiz kapsamında köy okullarına giderek EV3 eğitimi verdik. Çocukların teknik becerilerinin yanı sıra yaratıcılıklarını da ortaya koymalarını sağladık.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  "Sanatın Kadın Ruhu" webinar serisiyle sanat dünyasında kadınların rolünü vurgularken; ek olarak bu yıl kız çocuklarına ilham vermek amacıyla bir proje başlattık. KEV ile iş birliği kapsamında hayata geçirdiğimiz "Güçlü Kadınlar, Güçlü Yarınlar" projemizle 13 Mayıs'ta bir seminer gerçekleştirdik; genç kızları iş dünyasında başarılı kadınlarla bir araya getirdik. Bu etkinlik sayesinde genç kızlar farklı kariyer alanlarını tanıma fırsatı buldular ve kendilerini geliştirme, motivasyon duygusunu artırma fırsatı yakaladılar.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  "Kaplumbağa Müzesi" projemizle çevresel farkındalığı artırmayı amaçladık; ayrıca çeşitli okullarda yaptığımız kaplumbağa ve diğer deniz canlılarının habitatlarında karşılaştıkları sorunlara farkındalık yaratmak için geri dönüşüm malzemelerinden eserler oluşturduğumuz bir sergi açtık. Sergimizin amacı, denizlerimizde ne türlü atıklar olduğunu göstermek, küresel ısınmaya karşı bilinç oluşturmak ve insanları bilinçlendirmekti.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Callister olarak "Save The Blue" projemizle hayalet ağların deniz yaşamına verdiği zararı azaltmak amacıyla İzmit Körfezi'nde ekibimiz, denizden bir hayalet ağı çıkardı ve su altı atıklarını toplama çalışmaları gerçekleştirdi. Hayalet ağlar, deniz canlılarının dolanarak yaralanmasına veya ölümüne neden olurken, mercan resifleri gibi su altı yapılarına zarar vermekte ve mikroplastik kirliliğine sebep olmaktadır. Çalışmamızla deniz yaşamını koruma yolunda bir adım attık ve çevre bilinci oluşturmayı hedefledik. Bu proje ile birlikte Tarım ve Orman Bakanlığı ve Kocaeli Büyükşehir Belediyesinin düzenlediği "Hayalet Ağlar" projesine katkıda bulunmuş olduk.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  "Eco Footprint" adlı projemizle karbon ayak izine dikkat çektik, sahil temizliği etkinlikleriyle hem çevre bilincini hem de toplumsal katılımı güçlendirdik. Ayrıca "Mini Brick Symphony" yarışması, "İklim Müzesi" projesi, "Yeni Erişim Simgesi" gibi projelerle sosyal adalet, eşitlik, çevre ve sürdürülebilirlik gibi evrensel konuları ele alarak aktif birer dünya vatandaşı olduğumuzu gösterdik. Deprem bilinci oluşturmak amacıyla başlattığımız "Ecoquake" projemiz de toplumda farkındalık yaratmak adına attığımız önemli adımlardan biridir.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Bizler her zaman, yaratabileceğimiz en büyük etkinin bildiklerimizi ve deneyimlerimizi başkalarına doğru ve kuvvetli şekilde aktarmak olduğuna inandık. Callister olarak genç mühendis ve yazılım geliştiricilerini desteklemek amacıyla yenilikçi bir web sitesi projesi oluşturduk. İşte bu düşünceyle ortaya çıkan projemiz "FRC Academy", aslında ekibimizin 19 Mayıs 2022'den bu yana edindiği tüm bilgi ve deneyimlerinin bir araya geldiği platformdur. Bu proje kapsamında FRC dünyasına yeni adım atan takımlar ve öğrenciler için tasarım, yazılım, mekanik ve elektronik alanlarında becerilerini geliştirme fırsatı tanıdık. Callister olarak hedefimiz, deneyimlerimizi aktarmak ve bizden sonrakilere en doğru yolu çizebilmektir.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Kazandığımız birçok ödül:
                  <ul className="list-disc list-inside mt-2 text-gray-200 font-['Poppins']">
                    <li>Highest Rookie Seed Award</li>
                    <li>Judges' Award</li>
                    <li>Rookie Inspiration Award</li>
                    <li>Rookie All-Star Award</li>
                    <li>Gracious Professionalism Award</li>
                  </ul>
                  Bu ödüller, bizim yalnızca rekabetçi bir takım değil; öğrenen, öğreten ve paylaşan bir ekosistem olduğumuzu göstermektedir. Callister olarak, rekabetin ötesinde dayanışmayı, öğrenmenin ötesinde öğretmeyi, başarının ötesinde etki yaratmayı hedefliyoruz.
                </p>
                <p className="text-gray-200 font-['Poppins'] leading-relaxed">
                  Bu mektubu yazarken arzumuz, yalnızca bir yarışma takımı olmadığımızı, aynı zamanda bir dönüşüm hareketi olduğumuzu anlatabilmekti. Şirketinizin desteğiyle, daha büyük hayallere birlikte ulaşabiliriz. Çünkü biz, geleceği tasarlamak isteyen, sınırları sorgulayan ve değiştirmek için çalışan bir ekibiz.
                </p>
                <p className="mt-8 text-right font-bold text-purple-300 font-['Poppins']">Saygılarımızla,<br/>Callister #9024 FRC Takımı</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 