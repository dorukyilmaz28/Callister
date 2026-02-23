import Fuse from "fuse.js";

export function createMatcher(responsesObj) {
  // responsesObj: { "frc_responses": { "responses": { "frc nedir": { "tr": "...", "en": "..." }, ... } } }
  // Extract the actual responses from the nested structure
  const actualResponses = responsesObj.frc_responses?.responses || responsesObj;
  
  const entries = Object.entries(actualResponses).map(([k, v]) => ({ key: k, value: v }));
  
  const fuse = new Fuse(entries, {
    keys: ["key"],
    includeScore: true,
    threshold: 0.4, // hassasiyet, 0.0 çok sıkı, 1.0 gevşek
    distance: 100,
    minMatchCharLength: 2
  });

  function getResponse(text, language = 'tr') {
    const t = text.trim().toLowerCase();
    if (!t) return language === 'tr' ? "Lütfen bir soru yazın." : "Please write a question.";
    
    // Direkt eşleşme
    if (actualResponses[t]) {
      // Check if response has language support
      if (typeof actualResponses[t] === 'object' && actualResponses[t][language]) {
        return actualResponses[t][language];
      }
      // Fallback to string response (for backward compatibility)
      return actualResponses[t];
    }

    // Fuse arama
    const result = fuse.search(t);
    if (result.length > 0) {
      const best = result[0];
      if (best.score < 0.45) { // güven eşiği
        const value = best.item.value;
        // Check if response has language support
        if (typeof value === 'object' && value[language]) {
          return value[language];
        }
        // Fallback to string response (for backward compatibility)
        return value;
      }
    }

    // Keyword fallback (genişletilmiş regex kuralları)
    if (/merhaba|selam|naber|nasılsın|iyiyim|teşekkürler|görüşürüz|bye/.test(t)) {
      return actualResponses["merhaba"] || "Merhaba! Size nasıl yardımcı olabilirim?";
    }
    
    if (/yardım|help|ne yapabilir|destek/.test(t)) {
      return actualResponses["yardım"] || "Hangi konuda yardım istersin?";
    }
    
    if (/yazılım|software|kod|program|algorithm/.test(t)) {
      return actualResponses["yazılım nedir"] || "Yazılım bilgisi bulunamadı.";
    }
    
    if (/mekanik|mechanical|şasi|aktüatör|dişli|makara|bağlantı/.test(t)) {
      return actualResponses["mekanik nedir"] || "Mekanik bilgisi bulunamadı.";
    }
    
    if (/elektrik|electrical|güç|power|motor controller|sensör|kablo/.test(t)) {
      return actualResponses["elektrik nedir"] || "Elektrik bilgisi bulunamadı.";
    }
    
    if (/kayıt|ücret|başvuru|nasıl|katılmak|registration|fee/.test(t)) {
      return actualResponses["nasıl kayıt olunur"] || "Kayıt bilgisi bulunamadı.";
    }
    
    if (/kickoff|sezon|yeni sezon|başlangıç|season|start/.test(t)) {
      return actualResponses["kickoff nedir"] || "Kickoff bilgisi bulunamadı.";
    }
    
    if (/frc|robotik|first|robot|yarışma|robotics|competition/.test(t)) {
      return actualResponses["frc nedir"] || "FRC bilgisi bulunamadı.";
    }
    
    if (/wpilib|java|programlama|kod|programming|code/.test(t)) {
      return actualResponses["wpilib nedir"] || "WPILib bilgisi bulunamadı.";
    }
    
    if (/motor|hız|kontrol|encoder|speed|control/.test(t)) {
      return actualResponses["motor kontrolü"] || "Motor kontrolü bilgisi bulunamadı.";
    }
    
    if (/pid|hassasiyet|kontrol algoritması|proportional|integral|derivative/.test(t)) {
      return actualResponses["pid nedir"] || "PID bilgisi bulunamadı.";
    }
    
    if (/gyro|açı|dönüş|yönelim|angle|rotation|orientation/.test(t)) {
      return actualResponses["gyro nedir"] || "Gyro bilgisi bulunamadı.";
    }
    
    if (/vision|kamera|görüntü|hedef|camera|image|target/.test(t)) {
      return actualResponses["vision nedir"] || "Vision bilgisi bulunamadı.";
    }
    
    if (/pneumatics|hava|silindir|valf|air|cylinder|valve/.test(t)) {
      return actualResponses["pneumatik nedir"] || "Pneumatik bilgisi bulunamadı.";
    }
    
    if (/can|network|iletişim|protokol|bus|communication/.test(t)) {
      return actualResponses["can nedir"] || "CAN bilgisi bulunamadı.";
    }
    
    if (/inspection|kontrol|güvenlik|kural|check|safety|rule/.test(t)) {
      return actualResponses["inspection nedir"] || "Inspection bilgisi bulunamadı.";
    }
    
    if (/pit|bakım|onarım|alan|maintenance|repair|area/.test(t)) {
      return actualResponses["pit nedir"] || "Pit bilgisi bulunamadı.";
    }
    
    if (/alliance|işbirliği|takım|3 takım|cooperation|team/.test(t)) {
      return actualResponses["alliance nedir"] || "Alliance bilgisi bulunamadı.";
    }
    
    if (/autonomous|otomatik|program|15 saniye|automatic|auto/.test(t)) {
      return actualResponses["autonomous nedir"] || "Autonomous bilgisi bulunamadı.";
    }
    
    if (/teleop|teleoperated|sürücü|joystick|driver|control/.test(t)) {
      return actualResponses["teleop nedir"] || "Teleop bilgisi bulunamadı.";
    }
    
    if (/endgame|son 30 saniye|ekstra puan|final|extra|point/.test(t)) {
      return actualResponses["endgame nedir"] || "Endgame bilgisi bulunamadı.";
    }
    
    if (/scouting|analiz|veri|strateji|analysis|data|strategy/.test(t)) {
      return actualResponses["scouting nedir"] || "Scouting bilgisi bulunamadı.";
    }
    
    if (/gracious|professionalism|değer|ilkeler|value|principle/.test(t)) {
      return actualResponses["gracious professionalism nedir"] || "Gracious Professionalism bilgisi bulunamadı.";
    }
    
    if (/coopertition|işbirliği|rekabet|yardım|cooperation|competition|help/.test(t)) {
      return actualResponses["coopertition"] || "Coopertition bilgisi bulunamadı.";
    }
    
    if (/steam|bilim|teknoloji|mühendislik|sanat|matematik|science|technology|engineering|arts|math/.test(t)) {
      return actualResponses["steam nedir"] || "STEAM bilgisi bulunamadı.";
    }
    
    if (/mentor|danışman|rehber|yetişkin|advisor|guide|adult/.test(t)) {
      return actualResponses["mentor nedir"] || "Mentor bilgisi bulunamadı.";
    }
    
    if (/build season|6 hafta|yapım|inşa|construction|build/.test(t)) {
      return actualResponses["build season"] || "Build Season bilgisi bulunamadı.";
    }
    
    if (/competition season|yarışma sezonu|şubat|nisan|february|april/.test(t)) {
      return actualResponses["competition season"] || "Competition Season bilgisi bulunamadı.";
    }
    
    if (/off season|sezon dışı|eğitim|hazırlık|training|preparation/.test(t)) {
      return actualResponses["off season"] || "Off Season bilgisi bulunamadı.";
    }
    
    if (/rookie|ilk kez|yeni takım|ilk yıl|first time|new team|first year/.test(t)) {
      return actualResponses["rookie team"] || "Rookie Team bilgisi bulunamadı.";
    }
    
    if (/veteran|deneyimli|birden fazla|gelişmiş|experienced|multiple|advanced/.test(t)) {
      return actualResponses["veteran team"] || "Veteran Team bilgisi bulunamadı.";
    }
    
    // Yeni eklenen yanıtlar için keyword fallback'ler
    if (/kop|kit of parts|malzeme|paket|material|package/.test(t)) {
      return actualResponses["kop nedir"] || "KoP bilgisi bulunamadı.";
    }
    
    if (/drivebase|drive|hareket|movement|tank|mecanum|swerve/.test(t)) {
      return actualResponses["drivebase nedir"] || "Drivebase bilgisi bulunamadı.";
    }
    
    if (/mecanum|tekerlek|wheel|herhangi yön|any direction/.test(t)) {
      return actualResponses["mecanum nedir"] || "Mecanum bilgisi bulunamadı.";
    }
    
    if (/swerve|yönlendirme|steering|çevik|agile/.test(t)) {
      return actualResponses["swerve nedir"] || "Swerve bilgisi bulunamadı.";
    }
    
    if (/cim|dc motor|güçlü|powerful/.test(t)) {
      return actualResponses["cim nedir"] || "CIM motor bilgisi bulunamadı.";
    }
    
    if (/neo|brushless|entegre|integrated/.test(t)) {
      return actualResponses["neo nedir"] || "NEO motor bilgisi bulunamadı.";
    }
    
    if (/falcon|500|entegre kontrolcü|integrated controller/.test(t)) {
      return actualResponses["falcon 500 nedir"] || "Falcon 500 bilgisi bulunamadı.";
    }
    
    if (/pneumatik güvenliği|regülatör|relief valve|tank|basınç|pressure/.test(t)) {
      return actualResponses["pneumatik güvenliği"] || "Pneumatik güvenlik bilgisi bulunamadı.";
    }
    
    if (/bumpers|koruyucu|dolgu|protective|padding/.test(t)) {
      return actualResponses["bumpers nedir"] || "Bumpers bilgisi bulunamadı.";
    }
    
    if (/ağırlık|weight|limit|boyut|size|dimension/.test(t)) {
      return actualResponses["robot ağırlığı ne kadar"] || "Robot ağırlık/boyut bilgisi bulunamadı.";
    }
    
    if (/odometry|pozisyon|position|kinematik|kinematics/.test(t)) {
      return actualResponses["odometry nedir"] || "Odometry bilgisi bulunamadı.";
    }
    
    if (/networktables|veri paylaşımı|data sharing|communication/.test(t)) {
      return actualResponses["networktables nedir"] || "NetworkTables bilgisi bulunamadı.";
    }
    
    if (/limelight|vision processing|kamera cihazı|camera device/.test(t)) {
      return actualResponses["limelight nedir"] || "Limelight bilgisi bulunamadı.";
    }
    
    if (/alliance pick|seçim|selection|elemeler|eliminations/.test(t)) {
      return actualResponses["alliance pick nedir"] || "Alliance pick bilgisi bulunamadı.";
    }
    
    if (/chairman|award|toplumsal|sosyal|social|impact/.test(t)) {
      return actualResponses["chairman's award nedir"] || "Chairman's Award bilgisi bulunamadı.";
    }
    
    if (/engineering inspiration|stem|topluluk|community/.test(t)) {
      return actualResponses["engineering inspiration nedir"] || "Engineering Inspiration bilgisi bulunamadı.";
    }
    
    if (/sponsor|finansman|funding|destek|support/.test(t)) {
      return actualResponses["sponsor nasıl bulunur"] || "Sponsor bulma bilgisi bulunamadı.";
    }
    
    if (/fundraising|para|money|workshop|bilet|crowdfunding/.test(t)) {
      return actualResponses["fundraising fikirleri"] || "Fundraising bilgisi bulunamadı.";
    }
    
    if (/pit checklist|yedek|backup|multimetre|tool kit|banner|forma/.test(t)) {
      return actualResponses["pit checklist nedir"] || "Pit checklist bilgisi bulunamadı.";
    }
    
    if (/batarya|battery|şarj|charge|koruma|protection/.test(t)) {
      return actualResponses["batarya nasıl korunur"] || "Batarya koruma bilgisi bulunamadı.";
    }
    
    if (/breaker|devre kesici|circuit breaker|aşırı akım|overcurrent/.test(t)) {
      return actualResponses["breaker ne demek"] || "Breaker bilgisi bulunamadı.";
    }
    
    if (/pwm|pulse|modülasyon|modulation|hız kontrolü|speed control/.test(t)) {
      return actualResponses["pwm nedir"] || "PWM bilgisi bulunamadı.";
    }
    
    if (/motor controller|talon|sparkmax|victor|electronic unit/.test(t)) {
      return actualResponses["motor controller nedir"] || "Motor controller bilgisi bulunamadı.";
    }
    
    if (/talon|ctre|motor controller ailesi|family/.test(t)) {
      return actualResponses["talon nedir"] || "Talon bilgisi bulunamadı.";
    }
    
    if (/sparkmax|rev robotics|brushless|uyumlu|compatible/.test(t)) {
      return actualResponses["sparkmax nedir"] || "SparkMax bilgisi bulunamadı.";
    }
    
    if (/fuse|sigorta|overcurrent|devreyi keser|circuit protection/.test(t)) {
      return actualResponses["fuse nedir"] || "Fuse bilgisi bulunamadı.";
    }
    
    if (/kablo yönetimi|cable management|etiketli|labeled|zip-tie|düzenli|organized/.test(t)) {
      return actualResponses["kablo yönetimi nasıl olmalı"] || "Kablo yönetimi bilgisi bulunamadı.";
    }
    
    if (/etiketleme|labeling|hızlı arıza|quick troubleshooting/.test(t)) {
      return actualResponses["etiketleme neden önemli"] || "Etiketleme bilgisi bulunamadı.";
    }
    
    if (/multimetre|multimeter|gerilim|voltage|akım|current|direnç|resistance/.test(t)) {
      return actualResponses["multimetre nasıl kullanılır"] || "Multimetre kullanım bilgisi bulunamadı.";
    }
    
    if (/safety glasses|koruyucu gözlük|protective glasses|atölye|workshop/.test(t)) {
      return actualResponses["safety glasses gerekli mi"] || "Safety glasses bilgisi bulunamadı.";
    }
    
    if (/ppe|kişisel koruyucu|personal protective|gözlük|glasses|eldiven|gloves/.test(t)) {
      return actualResponses["ppe nedir"] || "PPE bilgisi bulunamadı.";
    }
    
    if (/takım rolleri|team roles|lead mentor|drive team|programmer|mechanical lead|electrical lead/.test(t)) {
      return actualResponses["takım rolleri nelerdir"] || "Takım rolleri bilgisi bulunamadı.";
    }
    
    if (/mentor bulma|finding mentor|öğretmen|teacher|mezun|graduate|mühendis|engineer/.test(t)) {
      return actualResponses["mentor nasıl bulunur"] || "Mentor bulma bilgisi bulunamadı.";
    }
    
    if (/git|sürüm kontrolü|version control|kod izleme|code tracking/.test(t)) {
      return actualResponses["git nedir"] || "Git bilgisi bulunamadı.";
    }
    
    if (/commit|mesaj|message|açıklayıcı|descriptive|eylem|action/.test(t)) {
      return actualResponses["commit mesajı nasıl olmalı"] || "Commit mesajı bilgisi bulunamadı.";
    }
    
    if (/branching|feature branch|pr|pull request|review|merge/.test(t)) {
      return actualResponses["branching nasıl yapılır"] || "Branching bilgisi bulunamadı.";
    }
    
    if (/ci|continuous integration|otomatik test|automatic test|build/.test(t)) {
      return actualResponses["ci nedir"] || "CI bilgisi bulunamadı.";
    }
    
    if (/unit test|hata|error|regresyon|regression|önleme|prevention/.test(t)) {
      return actualResponses["unit test neden önemli"] || "Unit test bilgisi bulunamadı.";
    }
    
    if (/sürüş pratiği|driving practice|saha|field|görev|task|senaryo|scenario/.test(t)) {
      return actualResponses["sürüş pratiği nasıl yapılır"] || "Sürüş pratiği bilgisi bulunamadı.";
    }
    
    if (/driver|sürücü|soğukkanlılık|calmness|koordinasyon|coordination|iletişim|communication/.test(t)) {
      return actualResponses["driver nasıl seçilir"] || "Driver seçimi bilgisi bulunamadı.";
    }
    
    if (/match strategy|maç stratejisi|görev puanları|task points|risk|öncelik|priority/.test(t)) {
      return actualResponses["match strategy nasıl hazırlanır"] || "Match strategy bilgisi bulunamadı.";
    }
    
    if (/risk management|risk yönetimi|hedef|target|risk dengesi|risk balance/.test(t)) {
      return actualResponses["risk management ne demek"] || "Risk management bilgisi bulunamadı.";
    }
    
    if (/backup plan|yedek plan|yedek parçalar|backup parts|stabil|stable/.test(t)) {
      return actualResponses["backup plan ne olmalı"] || "Backup plan bilgisi bulunamadı.";
    }
    
    if (/yedek parçalar|backup parts|motor|dişli|gear|kayış|belt|sensör|sensor|batarya|battery/.test(t)) {
      return actualResponses["yedek parçalar hangi sıklıkta"] || "Yedek parçalar bilgisi bulunamadı.";
    }
    
    if (/sık hata|common error|compile|dependency|mismatch|can id|port|log/.test(t)) {
      return actualResponses["sık karşılaşılan hata mesajları"] || "Sık hatalar bilgisi bulunamadı.";
    }
    
    if (/motor ısınma|motor heating|aşırı yük|overload|bindirme|binding|dişli oranı|gear ratio/.test(t)) {
      return actualResponses["motor ısınma"] || "Motor ısınma bilgisi bulunamadı.";
    }
    
    if (/encoder yanlış|encoder wrong|bağlantı|connection|kablolama|wiring|invert|distancePerPulse/.test(t)) {
      return actualResponses["encoder yanlış okuyor"] || "Encoder sorunları bilgisi bulunamadı.";
    }
    
    if (/gyro sorun|gyro problem|kalibrasyon|calibration|offset|reset/.test(t)) {
      return actualResponses["gyroyla ilgili sorunlar"] || "Gyro sorunları bilgisi bulunamadı.";
    }
    
    if (/networktables bağlanmıyor|networktables not connecting|team number|network config|firewall/.test(t)) {
      return actualResponses["networktables neden bağlanmıyor"] || "NetworkTables bağlantı bilgisi bulunamadı.";
    }
    
    if (/limelight target|limelight not finding|pipeline|görüş|view|ışıklandırma|lighting/.test(t)) {
      return actualResponses["limelight neden target bulmuyor"] || "Limelight sorunları bilgisi bulunamadı.";
    }
    
    if (/auton başarısız|auton failed|sensör|sensor|başlangıç|start|zemin|ground/.test(t)) {
      return actualResponses["auton neden başarısız"] || "Autonomous sorunları bilgisi bulunamadı.";
    }
    
    if (/kod deploy|code deploy|wpilib deploy|driver station|enable test/.test(t)) {
      return actualResponses["kod deploy nasıl yapılır"] || "Kod deploy bilgisi bulunamadı.";
    }
    
    if (/simülasyon|simulation|robot sim|saha test|field test/.test(t)) {
      return actualResponses["simülasyon nasıl yapılır"] || "Simülasyon bilgisi bulunamadı.";
    }
    
    if (/odometry drift|encoder slippage|gyro drift|kinematik|kinematic/.test(t)) {
      return actualResponses["odometry neden drift yapar"] || "Odometry drift bilgisi bulunamadı.";
    }
    
    if (/gear ratio|dişli oranı|çıktı hızı|output speed|tork|torque|verim|efficiency/.test(t)) {
      return actualResponses["gear ratio nasıl hesaplanır"] || "Gear ratio bilgisi bulunamadı.";
    }
    
    if (/rpm to m\/s|rpm çevirme|linear speed|tekerlek çapı|wheel diameter/.test(t)) {
      return actualResponses["rpm to m/s nasıl çevrilir"] || "RPM çevirme bilgisi bulunamadı.";
    }
    
    if (/wheel diameter|tekerlek çapı|dış çap|outer diameter|lastik|tire/.test(t)) {
      return actualResponses["wheel diameter nereden ölçülür"] || "Wheel diameter ölçüm bilgisi bulunamadı.";
    }
    
    if (/dişli seçim|gear selection|hız|speed|tork|torque|test|optimize/.test(t)) {
      return actualResponses["dişli seçim ipuçları"] || "Dişli seçim bilgisi bulunamadı.";
    }
    
    if (/belt vs chain|belt|chain|sessiz|quiet|hafif|light|dayanıklı|durable/.test(t)) {
      return actualResponses["belt vs chain hangisi iyi"] || "Belt vs chain bilgisi bulunamadı.";
    }
    
    if (/threadlocker|titreşim|vibration|risk|bağlantı|connection|medium strength/.test(t)) {
      return actualResponses["threadlocker hangi durumda"] || "Threadlocker bilgisi bulunamadı.";
    }
    
    if (/3d printing|3d baskı|structural|structural|güçlü|strong|dolgu|fill|kritik|critical/.test(t)) {
      return actualResponses["3d printing ipuçları"] || "3D printing bilgisi bulunamadı.";
    }
    
    if (/onshape|fusion|cloud|collaborative|cam|özellik|feature/.test(t)) {
      return actualResponses["onshape vs fusion"] || "CAD programları bilgisi bulunamadı.";
    }
    
    if (/waterjet|cnc|2d|3d|plate|kesim|cutting|hassas|precise|işleme|processing/.test(t)) {
      return actualResponses["waterjet vs cnc"] || "Kesim yöntemleri bilgisi bulunamadı.";
    }
    
    if (/safety meeting|güvenlik toplantısı|risk|ppe|acil durum|emergency|plan/.test(t)) {
      return actualResponses["safety meeting nasıl yapılır"] || "Safety meeting bilgisi bulunamadı.";
    }
    
    if (/how to ask mentor|mentora nasıl sorulur|kısa|short|net|clear|denediğiniz|tried|log/.test(t)) {
      return actualResponses["how to ask mentor"] || "Mentora sorma bilgisi bulunamadı.";
    }
    
    if (/code review|kod review|pr|pull request|test|linter|reviewer|not|note/.test(t)) {
      return actualResponses["code review nasıl yapılır"] || "Code review bilgisi bulunamadı.";
    }
    
    if (/hangi diller|which languages|java|c\+\+|python|wpilib/.test(t)) {
      return actualResponses["hangi diller kullanılır"] || "Programlama dilleri bilgisi bulunamadı.";
    }
    
    if (/json admin|admin panel|key|value|preview|prod|onay|approval/.test(t)) {
      return actualResponses["json admin nasıl kullanılır"] || "JSON admin bilgisi bulunamadı.";
    }
    
    if (/fuse\.js|fuzzy string|matching|kütüphane|library/.test(t)) {
      return actualResponses["fuse.js nedir"] || "Fuse.js bilgisi bulunamadı.";
    }
    
    if (/string match|normalize|lowercase|trim|punctuation|removal|scoring/.test(t)) {
      return actualResponses["string match nasıl iyileştirilir"] || "String matching bilgisi bulunamadı.";
    }
    
    if (/kısa komutlar|short commands|örnek|example|doğrudan|direct|eşleşir|match/.test(t)) {
      return actualResponses["kısa komutlar"] || "Kısa komutlar bilgisi bulunamadı.";
    }
    
    if (/kaynak|source|wpilib docs|chiefdelphi|first|resmi|official|mentor/.test(t)) {
      return actualResponses["kaynak önerisi"] || "Kaynak önerisi bilgisi bulunamadı.";
    }
    
    if (/nasıl etkinlik|how to find event|dashboard|takvim|calendar|yerel|local|topluluk|community/.test(t)) {
      return actualResponses["nasıl etkinlik bulunur"] || "Etkinlik bulma bilgisi bulunamadı.";
    }
    
    if (/nasıl gönüllü|how to volunteer|regional|organizatör|organizer|volunteer sign-up/.test(t)) {
      return actualResponses["nasıl gönüllü olunur"] || "Gönüllü olma bilgisi bulunamadı.";
    }
    
    if (/nasıl staj|how to find internship|sponsor|üniversite|university|networking|portfolyo|portfolio/.test(t)) {
      return actualResponses["nasıl staj bulunur"] || "Staj bulma bilgisi bulunamadı.";
    }
    
    if (/cv projeler|cv projects|alt-sistem|subsystem|kod modülleri|code modules|liderlik|leadership/.test(t)) {
      return actualResponses["cv için hangi projeler"] || "CV projeleri bilgisi bulunamadı.";
    }
    
    if (/sunum|presentation|amaç|purpose|metod|method|sonuç|result|görsel|visual/.test(t)) {
      return actualResponses["sunum nasıl hazırlanır"] || "Sunum hazırlama bilgisi bulunamadı.";
    }
    
    if (/medya içerik|media content|pit turu|pit tour|time-lapse|sponsor teşekkür|thank you|eğitim|education/.test(t)) {
      return actualResponses["medya içerik fikirleri"] || "Medya içerik bilgisi bulunamadı.";
    }
    
    if (/social media|sosyal medya|paylaşım|share|sponsor etiketleme|tagging|fotoğraf|photo/.test(t)) {
      return actualResponses["social media ipuçları"] || "Social media bilgisi bulunamadı.";
    }
    
    if (/etkinlige ne götürmeli|what to bring to event|tool kit|yedek parça|backup parts|batarya|battery|laptop|banner|forma|uniform/.test(t)) {
      return actualResponses["etkinlige ne götürmeli"] || "Etkinlik eşyaları bilgisi bulunamadı.";
    }
    
    if (/saha içinde kurallar|field rules|erişim|access|yetkilendirme|authorization|ppe|referee|karar|decision/.test(t)) {
      return actualResponses["saha içinde kurallar"] || "Saha kuralları bilgisi bulunamadı.";
    }
    
    if (/nasıl pratik|how to practice|görev|task|izole|isolate|tekrar|repeat|sürüş|driving|hedef|target/.test(t)) {
      return actualResponses["nasıl pratik yaparım"] || "Pratik yapma bilgisi bulunamadı.";
    }
    
    if (/zor soru|difficult question|mentora|mentor|denediğiniz|tried|log|hatayı aldım|got error/.test(t)) {
      return actualResponses["zor bir soru ne zaman mentora sorulur"] || "Zor soru sorma bilgisi bulunamadı.";
    }
    
    if (/nasıl not|how to take notes|daily build log|bom|test sonuçları|test results|revision/.test(t)) {
      return actualResponses["nasıl not tutulur"] || "Not tutma bilgisi bulunamadı.";
    }
    
    if (/öncelikli güvenlik|priority safety|e-stop|batarya güvenliği|battery safety/.test(t)) {
      return actualResponses["öncelikli güvenlik maddesi"] || "Güvenlik öncelikleri bilgisi bulunamadı.";
    }
    
    if (/sık yapılan hatalar|common mistakes|kablolama|wiring|can id|library version|test/.test(t)) {
      return actualResponses["sık yapılan hatalar"] || "Sık yapılan hatalar bilgisi bulunamadı.";
    }
    
    if (/nasıl daha iyi takım|how to be better team|iletişim|communication|görev paylaşımı|task sharing|feedback|dokümantasyon|documentation/.test(t)) {
      return actualResponses["nasıl daha iyi takım olunur"] || "Takım geliştirme bilgisi bulunamadı.";
    }
    
    if (/teknik doküman|technical document|amaç|purpose|gereksinim|requirement|çözüm|solution|test|sonuç|result/.test(t)) {
      return actualResponses["teknik doküman nasıl yazılır"] || "Teknik doküman yazma bilgisi bulunamadı.";
    }
    
    if (/hangi veriler loglanmalı|which data to log|sensor|hata mesajı|error message|match|autonomous/.test(t)) {
      return actualResponses["hangi veriler loglanmalı"] || "Log verileri bilgisi bulunamadı.";
    }
    
    if (/nasıl hata ayıklarım|how to debug|hata mesajı|error message|adım|step|izole|isolate|log|swap test/.test(t)) {
      return actualResponses["nasıl hata ayıklarım"] || "Hata ayıklama bilgisi bulunamadı.";
    }
    
    if (/çok küçük ipucu|very small tip|günlük|daily|küçük ilerleme|small progress|büyük ilerleme|big progress/.test(t)) {
      return actualResponses["çok küçük bir ipucu"] || "Küçük ipuçları bilgisi bulunamadı.";
    }
    
    if (/daha fazla yardım|more help|spesifik|specific|mekanik parça|mechanical part|kod snippet|wiring şeması|wiring diagram/.test(t)) {
      return actualResponses["daha fazla yardım"] || "Daha fazla yardım bilgisi bulunamadı.";
    }

    // Hiçbir eşleşme yoksa fallback
    const fallbackResponse = actualResponses["bilinmeyen"];
    if (fallbackResponse && typeof fallbackResponse === 'object' && fallbackResponse[language]) {
      return fallbackResponse[language];
    }
    return language === 'tr' 
      ? "Bunu şu an cevaplayamıyorum. Lütfen Game Manual veya Team Q&A'ya başvurun."
      : "I cannot answer this right now. Please refer to Game Manual or Team Q&A.";
  }

  return { getResponse, fuse, entries };
}
