'use client'

import { FormEvent, useMemo, useState } from 'react'

type ProductItem = {
  id: string
  name: string
  description: string
  price: number
  requiresSize: boolean
}

type DeliveryOption = 'Okuldan teslim' | 'Etkinlik günü teslim'

type OrderForm = {
  fullName: string
  email: string
  phone: string
  selectedItemId: string
  size: string
  quantity: number
  deliveryPreference: DeliveryOption
  note: string
}

type OrderRecord = OrderForm & {
  createdAt: string
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
    id: 'callister-sweatshirt',
    name: 'Callister Sweatshirt',
    description: 'Callister temalı özel sweatshirt. Etkinlik gününe özel stok.',
    price: 900,
    requiresSize: true,
  },
  {
    id: 'archers-tshirt',
    name: 'Archers T-Shirt',
    description: 'Archers iş birliği koleksiyonundan sınırlı sayıda t-shirt.',
    price: 500,
    requiresSize: true,
  },
  {
    id: 'ozel-urun',
    name: 'Callister x Archers Özel Ürün',
    description: 'İki takımın ortak tasarımını taşıyan koleksiyon ürünü.',
    price: 750,
    requiresSize: true,
  },
]

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL']
const DELIVERY_OPTIONS: DeliveryOption[] = ['Okuldan teslim', 'Etkinlik günü teslim']

const targetAmount = 50000
const currentAmount = 0
const progressPercentage = Math.min((currentAmount / targetAmount) * 100, 100)

const initialFormState: OrderForm = {
  fullName: '',
  email: '',
  phone: '',
  selectedItemId: '',
  size: 'M',
  quantity: 1,
  deliveryPreference: 'Okuldan teslim',
  note: '',
}

export default function LosevCallisterPage() {
  const [formData, setFormData] = useState<OrderForm>(initialFormState)
  const [orders, setOrders] = useState<OrderRecord[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const selectedItem = useMemo(
    () => PRODUCT_ITEMS.find((item) => item.id === formData.selectedItemId),
    [formData.selectedItemId],
  )

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSelectItem = (itemId: string) => {
    setFormData((prev) => ({ ...prev, selectedItemId: itemId }))
    setSuccessMessage('')
    setErrorMessage('')
    scrollToSection('on-kayit-formu')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) return 'Ad Soyad zorunludur.'
    if (!formData.email.trim()) return 'E-posta zorunludur.'
    if (!formData.phone.trim()) return 'Telefon zorunludur.'
    if (!formData.selectedItemId) return 'Ürün/Bilet seçimi zorunludur.'
    if (formData.quantity < 1) return 'Adet en az 1 olmalıdır.'
    return ''
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setErrorMessage(validationError)
      setSuccessMessage('')
      return
    }

    const nextOrder: OrderRecord = {
      ...formData,
      createdAt: new Date().toISOString(),
    }

    setOrders((prev) => [nextOrder, ...prev])
    console.log('Ön kayıt/sipariş alındı:', nextOrder)

    // TODO: Sipariş bilgileri API route'a gönderilecek.
    // TODO: Siparişler veritabanına kaydedilecek.
    // TODO: Admin panelden sipariş takibi yapılacak.

    setFormData(initialFormState)
    setErrorMessage('')
    setSuccessMessage('Ön kaydınız alınmıştır. Ödeme ve teslimat detayları daha sonra paylaşılacaktır.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A006F] via-[#5A008F] to-[#8A00FF] text-white">
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="inline-flex px-4 py-1 rounded-full bg-white/15 border border-white/25 text-sm mb-4">
            Sosyal Sorumluluk Etkinliği
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">LÖSEV Bağış Gecesi</h1>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Etkinlik Açıklaması</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold">Ürün ve Bilet Seçenekleri</h2>
            <p className="text-white/80 mt-2">Fiyatlar örnek olarak tanımlanmıştır. TODO: Gerçek fiyatlar güncellenecek.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {PRODUCT_ITEMS.map((item) => (
              <article key={item.id} className="card p-5 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-white/85 text-sm leading-relaxed mb-4">{item.description}</p>
                <p className="text-lg font-bold mb-2">Tahmini Fiyat: {item.price.toLocaleString('tr-TR')} TL</p>
                {item.requiresSize ? (
                  <p className="text-sm text-white/80 mb-4">Beden seçenekleri: {SIZE_OPTIONS.join(', ')}</p>
                ) : (
                  <p className="text-sm text-white/80 mb-4">Beden seçimi gerektirmez.</p>
                )}
                <button
                  onClick={() => handleSelectItem(item.id)}
                  className="mt-auto btn-primary py-2.5"
                >
                  Seç
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="on-kayit-formu" className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Website İçi Ön Kayıt / Sipariş Formu</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Ad Soyad *</span>
                <input
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">E-posta *</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Telefon *</span>
                <input
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Ürün/Bilet seçimi *</span>
                <select
                  value={formData.selectedItemId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, selectedItemId: e.target.value }))}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                >
                  <option value="">Seçiniz</option>
                  {PRODUCT_ITEMS.map((item) => (
                    <option key={item.id} value={item.id} className="text-black">
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Beden</span>
                <select
                  value={formData.size}
                  onChange={(e) => setFormData((prev) => ({ ...prev, size: e.target.value }))}
                  disabled={!selectedItem?.requiresSize}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none disabled:opacity-50"
                >
                  {SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size} className="text-black">
                      {size}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Adet *</span>
                <input
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, quantity: Number(e.target.value) || 0 }))
                  }
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                />
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">Teslimat tercihi</span>
                <select
                  value={formData.deliveryPreference}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      deliveryPreference: e.target.value as DeliveryOption,
                    }))
                  }
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none"
                >
                  {DELIVERY_OPTIONS.map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 md:col-span-2">
                <span className="text-sm font-medium">Not</span>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData((prev) => ({ ...prev, note: e.target.value }))}
                  rows={4}
                  className="rounded-lg px-3 py-2 bg-white/10 border border-white/25 outline-none resize-none"
                />
              </label>

              {errorMessage && (
                <p className="md:col-span-2 rounded-lg bg-red-500/20 border border-red-300/40 p-3 text-red-100">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="md:col-span-2 rounded-lg bg-green-500/20 border border-green-300/40 p-3 text-green-100">
                  {successMessage}
                </p>
              )}

              <div className="md:col-span-2">
                <button type="submit" className="btn-primary px-6 py-3">
                  Ön Kaydı Tamamla
                </button>
              </div>
            </form>

            {orders.length > 0 && (
              <p className="mt-4 text-sm text-white/80">Alınan ön kayıt sayısı: {orders.length}</p>
            )}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Şeffaflık Taahhüdü</h2>
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Bağış Hedefi</h2>
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

