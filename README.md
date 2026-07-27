Ahsan Ta'lim CMS
Bu loyiha Ahsan Ta'lim o'quv markazi uchun tayyorlangan rasmiy veb-sayt va boshqaruv panelidir (CMS). Loyiha zamonaviy va tezkor usulda yozilgan bo'lib, server xarajatlarisiz ishlashga mo'ljallangan.

Arxitektura va Texnologiyalar
Frontend: HTML, CSS, JavaScript (Vanilla JS). Hech qanday murakkab freymvorklar ishlatilmagan, bu esa saytning juda tez ochilishini ta'minlaydi.
Ma'lumotlar Bazasi (Backend): Google Firebase (Firestore). Saytdagi barcha ma'lumotlar (kurslar, fikrlar, FAQ) haqiqiy vaqtda (realtime) Firebase'dan o'qiladi.
Xavfsizlik (Avtorizatsiya): Firebase Authentication. Admin panelga faqat tasdiqlangan Email va Parol bilan kirish mumkin. Firebase Security Rules orqali baza qat'iy himoyalangan (faqat admin yoza oladi, ommaviy o'qish mumkin).
Serverless Funksiyalar (API): Vercel / Netlify Functions.
Sayt orqali kelgan arizalarni Telegram guruhga/botga yuborish (Backend orqali, xavfsiz holatda).
Admin paneldan guruhlarga reklama xabarlari (saytga kirish tugmasi bilan) jo'natish.
Fayllar Strukturasi
index.html va app.js — Mijozlar ko'radigan asosiy sayt.
admin.html va admin.js — Sayt egasi uchun boshqaruv paneli (Faqat parolli kirish).
firebase-config.js — Firebase Firestore bazasiga ulanish va kesh (cache) tizimi.
api/ papkasi — Serverless funksiyalar. Telegram Bot Token shular orqali ishlaydi, shuning uchun token hech qachon mijoz brauzeriga ko'rinmaydi.
Ishga tushirish (Deploy)
Bu loyiha Vercel yoki Netlify orqali hostingga qo'yiladi.

Vercel'ga qo'yishda kerakli Environment Variables (Env Vars):
Sayt to'g'ri ishlashi va Telegramga xabar yubora olishi uchun Vercel'ning Sozlamalariga quyidagi parametrlarni kiritish shart:

TG_BOT_TOKEN : Sizning Telegram bot tokeningiz (BotFather'dan olingan).
TG_CHAT_ID : Arizalar borishi kerak bo'lgan guruh yoki kanal (yoki shaxsiy) id raqami (masalan, -100123456789).
Shundan so'ng sayt to'liq xavfsiz va ishonchli holatda xizmat ko'rsatishga tayyor bo'ladi!
