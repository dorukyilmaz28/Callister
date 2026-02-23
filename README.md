# Callister #9024 FRC Takımı Website

## 🚀 **Proje Durumu: AI Entegrasyonu Kaldırıldı**

**Önemli Not:** Bu proje artık AI/LLM entegrasyonu kullanmıyor. Bunun yerine statik JSON tabanlı FRC FAQ sistemi kullanılıyor.

## 📋 **Proje Açıklaması**

Callister #9024 FRC takımının resmi web sitesi. FRC (FIRST Robotics Competition) takımı olarak robotik, teknoloji ve STEAM eğitimi odaklı içerik sunuyoruz.

## ✨ **Özellikler**

### 🤖 **Chatbot Sistemi (Static JSON)**
- **AI Yok:** Tüm AI entegrasyonları kaldırıldı
- **Statik Yanıtlar:** FRC FAQ yanıtları JSON dosyasından geliyor
- **Fuse.js Entegrasyonu:** Akıllı soru eşleştirme
- **Glassmorphism UI:** Modern, şık tasarım
- **Mor Tema:** Callister takım renklerine uygun

### 🎨 **UI/UX**
- **Responsive Design:** Tüm cihazlarda uyumlu
- **Glassmorphism:** Cam efekti ile modern görünüm
- **Poppins Font:** Okunabilir tipografi
- **Purple Gradient:** Mor geçişli tema

### 🔧 **Teknik Özellikler**
- **Next.js 15:** Modern React framework
- **TypeScript:** Tip güvenliği
- **Tailwind CSS:** Utility-first CSS framework
- **Fuse.js:** Fuzzy search algoritması

## 🏗️ **Proje Yapısı**

```
CALLİSTER/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── Chatbot.tsx     # FRC FAQ Chatbot
│   │   ├── Navbar.tsx      # Navigation
│   │   ├── Hero.tsx        # Hero section
│   │   └── Footer.tsx      # Footer
│   ├── utils/
│   │   └── frcMatcher.js   # Fuse.js matcher
│   └── data/               # Static data files
├── public/
│   └── data/
│       └── frc_responses_full.json  # FRC FAQ responses
├── server.js               # Express backend (static responses)
└── package.json
```

## 🚀 **Kurulum ve Çalıştırma**

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Frontend'i başlat
npm run dev

# Backend'i başlat (ayrı terminal)
npm run server
```

### Erişim
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Admin Panel:** http://localhost:3000/admin

## 📚 **FRC FAQ Sistemi**

### Nasıl Çalışır?
1. **Statik JSON:** Tüm yanıtlar `public/data/frc_responses_full.json` dosyasında
2. **Fuse.js Matching:** Kullanıcı sorularını en iyi yanıtlarla eşleştirir
3. **Keyword Fallback:** Regex tabanlı yedek eşleştirme
4. **Fallback Mesajı:** Eşleşme bulunamazsa varsayılan yanıt

### Yanıt Kategorileri
- **FRC Temelleri:** Yarışma, takım, sezon bilgileri
- **Teknik Konular:** WPILib, Java, motor kontrolü, PID
- **Sensörler:** Encoder, Gyro, Vision, Pneumatics
- **Yarışma:** Autonomous, Teleop, Endgame, Scouting
- **Takım Değerleri:** Gracious Professionalism, Coopertition

## 🛠️ **Admin Panel**

### Özellikler
- **JSON Düzenleme:** Yanıt ekleme, güncelleme, silme
- **Preview:** Değişiklikleri önizleme
- **Export:** Güncel JSON'u indirme
- **Validation:** Giriş doğrulama

### Güvenlik
- **Manuel Güncelleme:** Otomatik kaydetme yok
- **JSON Export:** Değişiklikler manuel olarak uygulanır
- **Admin Erişimi:** Sadece yetkili kullanıcılar

## 🧪 **Testler**

### Unit Tests
```bash
# FRC Matcher testleri
npm test src/utils/__tests__/frcMatcher.test.js
```

### Test Kapsamı
- **10+ Unit Test:** getResponse fonksiyonu
- **Fuzzy Matching:** Fuse.js entegrasyonu
- **Keyword Fallback:** Regex eşleştirme
- **Edge Cases:** Boş input, bilinmeyen sorgular

## 🔒 **Güvenlik ve Operasyon**

### AI Anahtarları
- **Kaldırıldı:** Tüm AI API anahtarları projeden çıkarıldı
- **Environment Variables:** .env dosyası güvenli
- **Gitignore:** Hassas bilgiler commit edilmiyor

### Veri Yönetimi
- **Statik JSON:** Dinamik API çağrıları yok
- **Version Control:** JSON değişiklikleri takip ediliyor
- **Backup:** Her güncelleme için yedek

## 📱 **Responsive Design**

### Breakpoints
- **Mobile:** 320px - 768px
- **Tablet:** 768px - 1024px
- **Desktop:** 1024px+

### Özellikler
- **Touch Friendly:** Mobil cihazlarda dokunmatik optimizasyon
- **Keyboard Navigation:** Klavye ile erişilebilirlik
- **Screen Reader:** Erişilebilirlik desteği

## 🚀 **Deploy**

### Build
```bash
npm run build
npm start
```

### CI/CD
- **JSON Validation:** Build sırasında JSON varlığı kontrol edilir
- **Type Checking:** TypeScript derleme kontrolü
- **Linting:** ESLint ile kod kalitesi

## 🤝 **Katkıda Bulunma**

### Geliştirme Süreci
1. **Fork** yapın
2. **Feature branch** oluşturun
3. **Commit** yapın
4. **Push** yapın
5. **Pull Request** açın

### Kod Standartları
- **TypeScript:** Strict mode aktif
- **ESLint:** Airbnb config
- **Prettier:** Otomatik format
- **Conventional Commits:** Standart commit mesajları

## 📞 **İletişim**

- **Takım:** Callister #9024
- **Website:** [callister9024.com](https://callister9024.com)
- **Email:** info@callister9024.com
- **Social Media:** @callister9024

## 📄 **Lisans**

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 🔄 **Changelog**

### v2.0.0 (2024-08-24)
- **AI Entegrasyonu Kaldırıldı**
- **Static JSON FAQ Sistemi Eklendi**
- **Fuse.js Entegrasyonu**
- **Admin Panel Eklendi**
- **Unit Tests Eklendi**

### v1.0.0 (2024-08-20)
- **İlk Sürüm**
- **AI Chatbot Entegrasyonu**
- **OpenRouter API**

---

**Not:** Bu proje artık AI kullanmıyor. Tüm yanıtlar statik JSON dosyasından geliyor ve Fuse.js ile akıllı eşleştirme yapılıyor. 