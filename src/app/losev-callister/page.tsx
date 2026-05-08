'use client'

import { useState } from 'react'

type ProductItem = {
  id: string
  name: string
  description: string
  price: number
  requiresSize: boolean
}

const PRODUCT_ITEMS: ProductItem[] = [
  {
    id: 'bilet',
    name: 'Bağış Gecesi Bileti',
    description: 'Etkinliğe katılım bileti. Kontenjan durumuna göre önceliklendirme yapılır.',
    price: 350,
    requiresSize: false,
  },
  {
    id: 'callister-sweat',
    name: 'Callister Sweat',
    description: 'Callister temalı özel sweatshirt. Etkinlik gününe özel stok.',
    price: 900,
    requiresSize: true,
  },
  {
    id: 'archers-sweat',
    name: 'Archers Sweat',
    description: 'Archers temalı özel sweatshirt. Sınırlı üretim.',
    price: 900,
    requiresSize: true,
  },
  {
    id: 'callister-tshirt',
    name: 'Callister T-Shirt',
    description: 'Callister günlük kullanım t-shirt ürünü.',
    price: 500,
    requiresSize: true,
  },
  {
    id: 'archers-tshirt',
    name: 'Archers T-Shirt',
    description: 'Archers günlük kullanım t-shirt ürünü.',
    price: 500,
    requiresSize: true,
  },
]

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL']
const SHOPIER_LINKS: Record<string, string> = {
  bilet: 'https://www.shopier.com/',
  'callister-sweat': 'https://www.shopier.com/',
  'archers-sweat': 'https://www.shopier.com/',
  'callister-tshirt': 'https://www.shopier.com/',
  'archers-tshirt': 'https://www.shopier.com/',
}

const targetAmount = 50000
const currentAmount = 0
const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100)

export default function LosevCallisterPage() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    PRODUCT_ITEMS.reduce((acc, item) => {
      if (item.requiresSize) acc[item.id] = 'M'
      return acc
    }, {} as Record<string, string>),
  )

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
            LÖSEV Bağış Gecesi
          </h1>
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-white/90 mb-10">
            Callister #9024 ve Archers iş birliğiyle sosyal sorumluluk odaklı etkinlik.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('urunler-biletler')}
              className="btn-primary px-6 py-3 text-base"
            >
              Biletleri İncele
            </button>
            <button
              onClick={() => scrollToSection('urunler-biletler')}
              className="px-6 py-3 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
            >
              Ürünleri İncele
            </button>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">Etkinlik Açıklaması</h2>
            <p className="text-white/90 leading-relaxed">
              Bu etkinlik kapsamında bilet ve özel tasarım ürün satışlarından elde edilen gelir, etkinlik sonunda
              LÖSEV’e bağışlanacaktır. Etkinlik sonrası bağış süreci ve dekont bilgileri toplulukla şeffaf şekilde
              paylaşılacaktır.
            </p>
          </div>
        </div>
      </section>

      <section id="urunler-biletler" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Ürün ve Bilet Seçenekleri</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
            {PRODUCT_ITEMS.map((item) => (
              <article key={item.id} className="card p-5 flex flex-col">
                <h3 className="text-xl font-semibold mb-2 text-white">{item.name}</h3>
                <p className="text-white/85 text-sm leading-relaxed mb-4">{item.description}</p>
                <p className="text-lg font-bold mb-2 text-white">{item.price.toLocaleString('tr-TR')} TL</p>
                {item.requiresSize ? (
                  <div className="mb-4">
                    <p className="text-sm text-white/80 mb-2">Beden seçimi:</p>
                    <select
                      value={selectedSizes[item.id]}
                      onChange={(e) =>
                        setSelectedSizes((prev) => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                    >
                      {SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size} className="text-black">
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-sm text-white/80 mb-4">Beden seçimi gerektirmez.</p>
                )}
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
              'Gelir etkinlik sonunda LÖSEV’e bağışlanacaktır.',
              'Bağış dekontu etkinlik sonrası paylaşılacaktır.',
              'Süreç danışman öğretmen/mentor kontrolünde yürütülecektir.',
              'Bu sayfa şu an ön kayıt ve talep toplama amacıyla hazırlanmıştır.',
            ].map((item) => (
              <div key={item} className="card p-5 text-white/90">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 pb-16">
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
            <p className="text-sm text-white/75 mt-3">
              TODO: Toplanan tutar daha sonra gerçek verilerle güncellenecek.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

