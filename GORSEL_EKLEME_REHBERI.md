# Görsel Ekleme Rehberi

Tüm görseller proje kökündeki **`public`** klasörüne koyulur. Tarayıcıda `/images/...` olarak aranır, dosya yolu `public` ile başlar.

---

## 1. Projeler sayfası (Projelerimiz)

**Klasör:** `public/images/projects/`

### Kart görseli (her projede 1 tane – listede görünen küçük görsel)
| Dosya adı | Proje |
|-----------|--------|
| `pencere.jpg` | Pencere |
| `sanat-kadin.jpg` | Sanatın Kadın Ruhu |
| `guclu-kadinlar.jpg` | Güçlü Kadınlar, Güçlü Yarınlar |
| `kaplumbaga.jpg` | Kaplumbağa Müzesi |
| `eco-footprint.jpg` | Eco Footprint |
| `mini-brick.jpg` | Mini Brick Symphony |
| `iklim-muzesi.jpg` | İklim Müzesi |
| `erisim-simgesi.jpg` | Yeni Erişim Simgesi |
| `ecoquake.jpg` | Ecoquake |
| `balcik-kutuphane.jpg` | Balçık Köy Okulu 19 Mayıs Kütüphanesi |
| `save-blue.jpg` | Save The Blue |
| `gumushane-stem.jpg` | Gümüşhane STEM Eğitimi |
| `frc-academy.jpg` | FRC Academy |
| `dive-iztuzu.jpg` | DIVE in Iztuzu |
| `towards-underwater.jpg` | Towards Underwater |
| `sanal-kutuphane.jpg` | Sanal Kütüphane |
| `hayati-tasarla.jpg` | Hayatı Tasarla |
| `reefspeech.jpg` | Reefspeech |
| `callister-ai.jpg` | Callister AI |
| `yagsl.jpg` | YAGSL |

### Detay görselleri (projeye tıklanınca açılan pencerede)
Aşağıdaki projelerde **detay görseli yok** (`images: []`). İsterseniz `projects.json` içinde ilgili projeye `"images": ["/images/projects/DOSYA1.jpg", "/images/projects/DOSYA2.jpg"]` ekleyip bu dosyaları da `public/images/projects/` altına koyabilirsiniz.

- Güçlü Kadınlar, Güçlü Yarınlar  
- Save The Blue  
- Gümüşhane STEM Eğitimi  
- FRC Academy  
- DIVE in Iztuzu  
- Towards Underwater  
- Sanal Kütüphane  
- Hayatı Tasarla  
- Reefspeech  
- Callister AI  
- YAGSL  

Aşağıdaki projelerde ise **2’şer detay görseli** tanımlı; bu dosyalar yoksa modalda boş/placeholder görünür:

| Proje | Dosya 1 | Dosya 2 |
|-------|---------|---------|
| Pencere | `pencere1.png` | `pencere2.png` |
| Sanatın Kadın Ruhu | `sanat-kadin1.png` | `sanat-kadin2.png` |
| Kaplumbağa Müzesi | `kaplumbaga1.png` | `kaplumbaga2.png` |
| Eco Footprint | `eco-footprint1.png` | `eco-footprint2.png` |
| Mini Brick Symphony | `mini-brick1.png` | `mini-brick2.png` |
| İklim Müzesi | `iklim-muzesi1.png` | `iklim-muzesi2.png` |
| Yeni Erişim Simgesi | `erisim-simgesi1.png` | `erisim-simgesi2.png` |
| Ecoquake | `ecoquake1.png` | — |
| Balçık Köy Okulu 19 Mayıs Kütüphanesi | `balcik-kutuphane1.png` | `balcik-kutuphane2.png` |

**Özet:** En azından her proje için **kart görseli**ni (`public/images/projects/` içinde yukarıdaki isimlerle) eklemeniz yeterli. Detay görselleri isteğe bağlı; ekledikçe modalda görünür.

---

## 2. Yaptığımız Bağışlar (Projeler sayfasının en altı)

**Klasör:** `public/images/donations/`

**Dosyalar (tam isimle):**
- `1.jpg`
- `2.jpg`
- `3.jpg`

Bu 3 dosyayı `public/images/donations/` klasörüne koyun. Yoksa “Fotoğraf 1”, “Fotoğraf 2”, “Fotoğraf 3” placeholder’ları görünür.

---

## 3. Kurduğumuz Takımlar sayfası

**Klasör:** `public/images/founded-teams/`

**Dosyalar (tam isimle):**
- `1.jpg`
- `2.jpg`
- `3.jpg`
- `4.jpg`
- `5.jpg`

Bu 5 dosyayı `public/images/founded-teams/` klasörüne koyun. Yoksa “Görsel 1” … “Görsel 5” placeholder’ları görünür.

---

## Hızlı adımlar

1. **Projeler**  
   - `public/images/projects/` klasörünü oluşturun (yoksa).  
   - Yukarıdaki tabloya göre kart görsellerini (`.jpg` veya `.png`) bu klasöre atın.  
   - İsterseniz detay görsellerini de aynı klasöre ekleyin.

2. **Yaptığımız Bağışlar**  
   - `public/images/donations/` klasörünü oluşturun.  
   - İçine `1.jpg`, `2.jpg`, `3.jpg` koyun.

3. **Kurduğumuz Takımlar**  
   - `public/images/founded-teams/` klasörünü oluşturun.  
   - İçine `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg` koyun.

Format olarak **JPG** veya **PNG** kullanabilirsiniz. Dosya adları yukarıdakiyle **birebir aynı** olmalı (küçük harf, tire, uzantı dahil). Sunucuyu veya sayfayı yeniledikten sonra görseller sitede görünür.
