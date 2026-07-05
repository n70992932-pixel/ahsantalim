# Ahsan Ta'lim sayti — qo'llanma

## 1. Yangi qo'shilgan: Admin Panel (CMS)

Endi saytda **`/admin.html`** manzili orqali kirish mumkin bo'lgan alohida boshqaruv
paneli bor. Masalan: `https://ahsantalim.netlify.app/admin.html`

Bu panel orqali kod bilan ishlamasdan turib quyidagilarni tahrirlash mumkin:

- **Umumiy matnlar** — Bosh sahifadagi katta sarlavha va tasvir matni
- **Kurslar** — har bir kursning nomi, tavsifi, davomiyligi, jadvali va **narxi**;
  yangi kurs qo'shish yoki mavjudini o'chirish
- **Yangiliklar** — markazdagi yangiliklarni qo'shish/o'chirish (sayt bosh
  sahifasida "Yangiliklar" bo'limida avtomatik chiqadi)
- **Test savollari** — "Darajani aniqlash" testidagi savollar, variantlar va
  to'g'ri javoblar

O'zgarishlar **"Barcha o'zgarishlarni saqlash"** tugmasi bosilgach, darhol
saytda ko'rinadi — qayta deploy qilish shart emas.

## 2. ADMIN_PASSWORD sozlash (MUHIM — birinchi marta qilish kerak)

Admin panelga kirish uchun parol Netlify Environment Variables orqali
sozlanadi (xuddi TG_BOT_TOKEN kabi):

1. Netlify saytingizga kiring -> loyihangiz -> **Project configuration** ->
   **Environment variables**
2. **"Add a variable"** tugmasini bosing
3. Key: `ADMIN_PASSWORD`
4. Value: o'zingiz xohlagan kuchli parol (masalan: harflar + raqamlar
   aralashmasi)
5. "Contains secret values" katakchasini belgilang
6. **"Create variable"** ni bosing
7. **Deploys** bo'limiga o'ting va saytni qayta deploy qiling (chunki
   funksiyalar yangi environment variable'ni "ko'rishi" uchun qayta ishga
   tushirilishi kerak)

Shu parolni markaz xodimlariga/rahbariyatiga bering — ular shu parol bilan
`/admin.html` orqali kirib, kontentni tahrirlaydi.

**Eslatma:** Agar parolni keyinchalik almashtirish kerak bo'lsa, xuddi shu
joydan `ADMIN_PASSWORD` qiymatini yangilab, qayta deploy qilish kifoya.

## 3. Qanday ishlaydi (texnik tushuntirish)

- Barcha kontent (matnlar, kurslar, yangiliklar, test savollari) Netlify
  Blobs deb ataladigan, saytga tegishli xavfsiz "ombor"da JSON formatda
  saqlanadi.
- `get-content` funksiyasi — bu ma'lumotni **hammaga ochiq** tarzda qaytaradi,
  sayt shu orqali sahifani to'ldiradi.
- `save-content` funksiyasi — faqat **to'g'ri parol** bilan kelgan so'rovlarda
  ma'lumotni yangilaydi.
- `admin-login` funksiyasi — admin panel kirish ekrani uchun parolni
  tekshiradi.

## 4. Xavfsizlik haqida eslatma

- `/admin.html` sahifasi hech qanday havola orqali saytda ko'rsatilmagan —
  faqat to'g'ridan-to'g'ri manzilini bilganlar kira oladi, lekin bu yetarli
  himoya emas, shuning uchun **kuchli parol** qo'yish muhim.
- Parolni faqat ishonchli xodimlarga bering.
- Agar parol oshkor bo'lib qolgan deb gumon qilsangiz, yuqoridagi 2-bo'limdagi
  qadamlar orqali darhol yangi parol o'rnating.

## 5. Eski xavfsizlik tuzatishlari (avvalgi tuzatishlardan eslatma)

- Telegram bot tokeni (`TG_BOT_TOKEN`) va Chat ID (`TG_CHAT_ID`) frontend
  kodida emas, faqat serverda (`netlify/functions/send-telegram.js`) saqlanadi.
- Bularni sozlash bo'yicha ko'rsatma avvalgi suhbatlarimizda berilgan —
  Netlify Environment Variables bo'limida `TG_BOT_TOKEN` va `TG_CHAT_ID`
  allaqachon sozlangan bo'lishi kerak.

## 6. Fayllar tuzilishi

```
ahsan-talim/
├── index.html              (asosiy sayt - endi kontentni serverdan oladi)
├── admin.html               (yangi - admin panel)
├── admin.js                 (yangi - admin panel logikasi)
├── admin.css                (yangi - admin panel uslubi)
├── styles.css
├── app.js                   (yangilangan - dinamik kontent bilan ishlaydi)
├── logo.jpg
├── netlify.toml
├── package.json             (yangi - @netlify/blobs kutubxonasi uchun)
├── node_modules/            (yangi - o'rnatilgan kutubxona, o'chirmang)
└── netlify/
    └── functions/
        ├── send-telegram.js   (arizalarni Telegramga yuborish)
        ├── get-content.js     (yangi - kontentni o'qish, ochiq)
        ├── save-content.js    (yangi - kontentni saqlash, parol bilan)
        └── admin-login.js     (yangi - admin panel kirish tekshiruvi)
```

Butun papkani shu tuzilishi bilan Netlify'ga joylang (drag & drop yoki
"choose a folder" orqali, avvalgidek).
