<div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" /> </div>
🩺 MiyelomMobil

MiyelomMobil, Multipl Miyelom hastalarının tedavi süreçlerini düzenli ve kontrollü bir şekilde takip edebilmeleri için geliştirilmiş bir mobil uygulamadır. Uzun süreli ve dikkat gerektiren tedavi sürecinde hastaların randevularını, ilaç takibini ve kişisel sağlık notlarını yönetmesini kolaylaştırmayı amaçlar.

📌 Proje Amacı

Multipl Miyelom hastaları düzenli ilaç kullanımı, sık doktor kontrolü ve sürekli sağlık takibi gerektiren bir süreçten geçmektedir. Bu proje, hastaların tedavi sürecini dijital ortamda organize edebilmesini sağlayarak takip zorluklarını azaltmayı hedefler.

🎯 Hedef Kullanıcı Kitlesi

Multipl Miyelom hastaları

Uzun süreli tedavi gören bireyler

Hasta yakınları ve bakım verenler

🛠 Kullanılan Teknolojiler

React Native

Expo

EAS Build

Node.js

Git & GitHub

🚀 Uygulamayı Yerel Olarak Çalıştırma
Gereksinimler

Node.js (Önerilen sürüm: 18 veya 20)

Kurulum

Repoyu klonlayın:

git clone https://github.com/GizemTangel/MiyelomMobil.git

Proje klasörüne girin:

cd MiyelomMobil

Bağımlılıkları yükleyin:

npm install

Uygulamayı başlatın:

npx expo start

Uygulama, Expo Go ile QR kod okutularak mobil cihazda çalıştırılabilir.

📱 Android APK Build

Android için APK dosyası EAS Build kullanılarak oluşturulmuştur.

Build almak için:

npx eas build -p android --profile preview

Android Application ID:

com.gizemtangel.MiyelomMobil

📂 Proje Yapısı

components/ → Tekrar kullanılabilir UI bileşenleri

screens/ → Uygulama ekranları

navigation/ → Navigasyon yapısı

assets/ → Görseller ve statik dosyalar

App.js → Ana uygulama dosyası

eas.json → Build konfigürasyonu

🎨 Tasarım Yaklaşımı

Uygulama sade, erişilebilir ve kullanıcı dostu bir tasarım anlayışıyla geliştirilmiştir. Uzun süreli tedavi gören kullanıcıların yaş aralığı ve kullanım kolaylığı ihtiyacı göz önünde bulundurulmuştur. Karmaşık arayüzlerden kaçınılmış, anlaşılır ve net bir kullanıcı deneyimi hedeflenmiştir.

Mevcut build’i buradan takip edebilir ve .apk çıktısını görebilirsiniz:
https://expo.dev/accounts/gizemtangel/projects/MiyelomMobil/builds/61017c58-3234-417f-b380-6a76bd0bd3dc
