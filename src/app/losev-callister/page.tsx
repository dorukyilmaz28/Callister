'use client'

type ProductItem = {
  id: string
  name: string
  description: string
  price: number
}

const PRODUCT_ITEMS: ProductItem[] = [
  {
    id: 'callister-sweat',
    name: 'Callister #9024 Sweatshirt',
    description: 'Callister #9024 temalı özel sweatshirt. Etkinlik gününe özel stok.',
    price: 900,
  },
  {
    id: 'archers-sweat',
    name: 'Archers #9523 Sweatshirt',
    description: 'Archers #9523 temalı özel sweatshirt. Sınırlı üretim.',
    price: 900,
  },
  {
    id: 'callister-tshirt',
    name: 'Callister #9024 Tişört',
    description: 'Callister #9024 günlük kullanım tişört.',
    price: 550,
  },
  {
    id: 'archers-tshirt',
    name: 'Archers #9523 Tişört',
    description: 'Archers #9523 günlük kullanım tişört.',
    price: 550,
  },
]

const SHOPIER_LINKS: Record<string, string> = {
  'callister-sweat': 'https://www.shopier.com/47142515',
  'archers-sweat': 'https://www.shopier.com/47142756',
  'callister-tshirt': 'https://www.shopier.com/47141940',
  'archers-tshirt': 'https://www.shopier.com/47142347',
}

const targetAmount = 50000
const currentAmount = 0
const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100)

export default function LosevCallisterPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] text-white">
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex px-4 py-1 rounded-full bg-white/15 border border-white/25 text-sm mb-4">
            Sosyal Sorumluluk Etkinliği
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Lösemili Çocuklar İçin Bağış Gecesi
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90 mb-10">
            Callister #9024 ve Archers iş birliğiyle sosyal sorumluluk odaklı etkinlik.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('urunler')}
              className="btn-primary px-6 py-3 text-base"
            >
              Ürünleri İncele
            </button>
            <button
              onClick={() => scrollToSection('bagis-hedefi')}
              className="px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
            >
              Bağış Hedefi
            </button>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Etkinlik Açıklaması</h2>
            <p className="text-white/90 leading-relaxed">
              Bu etkinlik kapsamında özel tasarım ürün satışlarından elde edilen gelir, etkinlik sonunda
              lösemili çocuklar için bağışlanacaktır. Etkinlik sonrası bağış süreci ve dekont bilgileri toplulukla şeffaf şekilde
              paylaşılacaktır.
            </p>
          </div>
        </div>
      </section>

      <section id="urunler" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Ürün Seçenekleri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRODUCT_ITEMS.map((item) => (
              <article key={item.id} className="card p-5 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-white">{item.name}</h3>
                <p className="text-white/85 text-sm leading-relaxed mb-4">{item.description}</p>
                <p className="text-lg font-bold mb-4 text-white">{item.price.toLocaleString('tr-TR')} TL</p>
                <a
                  href={SHOPIER_LINKS[item.id]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto btn-primary py-2.5 text-center"
                >
                  Seç
                </a>
              </article>
            ))}
          </div>
          <p className="text-center text-white/85 mt-6">
            Ödemeler güvenli şekilde Shopier üzerinden alınacaktır.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">Şeffaflık Taahhüdü</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Gelir etkinlik sonunda lösemili çocuklar için bağışlanacaktır.',
              'Bağış dekontu etkinlik sonrası paylaşılacaktır.',
              'Süreç danışman öğretmen/mentor kontrolünde yürütülecektir.',
              'Bu sayfa ürün bilgilendirmesi amacıyla hazırlanmıştır.',
            ].map((item) => (
              <div key={item} className="card p-5 text-white/90">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="bagis-hedefi" className="py-10 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Bağış Hedefi</h2>
            <p className="text-white/90 mb-1">Toplanan: {currentAmount.toLocaleString('tr-TR')} TL</p>
            <p className="text-white/90 mb-4">Hedef: {targetAmount.toLocaleString('tr-TR')} TL</p>

            <div className="h-4 rounded-full bg-white/15 overflow-hidden border border-white/25">
              <div
                className="h-full bg-gradient-to-r from-purple-300 to-pink-300 transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

