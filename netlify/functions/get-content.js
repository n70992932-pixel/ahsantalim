// Bu funksiya SAYT UCHUN kontentni qaytaradi (matnlar, kurslar, yangiliklar, test savollari).
// Hech qanday parol talab qilmaydi - chunki bu ma'lumot ochiq, sayt tashrifchilariga ko'rsatiladi.

const { getStore } = require('@netlify/blobs');

// Agar Blobs ichida hali hech narsa saqlanmagan bo'lsa (masalan birinchi marta ishga
// tushirilganda), quyidagi "boshlang'ich" (default) kontent qaytariladi - bu aynan
// hozirgi saytdagi matnlar bilan bir xil, shuning uchun admin panel ishga tushirilmagan
// paytda ham sayt avvalgidek ko'rinadi.
const DEFAULT_CONTENT = {
  hero: {
    tag: "Zamonaviy va Tizimli Ta'lim",
    titleBefore: "Kelajagingiz uchun",
    titleGold: "eng yaxshi",
    titleAfter: "ta'lim",
    desc: "Ahsan Ta'lim o'quv markazida mukammal Arab tili, Ingliz tili (IELTS) hamda Tarix fanlarini tajribali ustozlar yordamida chuqurlashtirilgan dasturlar asosida o'rganing."
  },
  courses: [
    {
      id: "arab-boshlangich",
      category: "arab",
      badge: "Boshlang'ich",
      titleArabic: "العَرَبِيَّةُ",
      title: "Noldan o'rganuvchilar uchun Arab tili",
      desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.",
      duration: "3 oy davomiyligida",
      schedule: "Haftada 3 marta dars",
      price: "450 000 so'm / oy",
      courseKey: "Noldan Arab tili"
    },
    {
      id: "arab-grammatika",
      category: "arab",
      badge: "O'rta",
      titleArabic: "النَّحْوُ وَالصَّرْفُ",
      title: "Grammatika (Sarf va Nahv asoslari)",
      desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.",
      duration: "4 oy davomiyligida",
      schedule: "Haftada 3 marta dars",
      price: "500 000 so'm / oy",
      courseKey: "Sarf va Nahv grammatikasi"
    },
    {
      id: "arab-suhbat",
      category: "arab",
      badge: "Mukammal",
      titleArabic: "المُحَادَثَةُ",
      title: "Suhbat va Muhadasa (So'zlashuv)",
      desc: "Arab tilida erkin va ravon gapirish, eshitish orqali tushunish va jonli suhbat qurish ko'nikmalarini rivojlantirish kursi.",
      duration: "3 oy davomiyligida",
      schedule: "Haftada 3 marta dars",
      price: "500 000 so'm / oy",
      courseKey: "Suhbat va Muhadasa (So'zlashuv)"
    },
    {
      id: "english-ielts",
      category: "english",
      badge: "Tillar",
      titleArabic: "ENGLISH",
      title: "General English & IELTS Prep",
      desc: "Ingliz tilini boshlang'ichdan boshlab yuqori darajagacha (IELTS) tizimli o'rganish va imtihonlarga sifatli tayyorlanish.",
      duration: "Darajaga qarab bosqichma-bosqich",
      schedule: "Haftada 3 marta dars",
      price: "550 000 so'm / oy",
      courseKey: "General English & IELTS"
    },
    {
      id: "tarix",
      category: "history",
      badge: "Abituriyent",
      titleArabic: "TARIX",
      title: "Tarix fanidan chuqurlashtirilgan darslar",
      desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun tarix fanidan chuqurlashtirilgan tayyorgarlik kursi.",
      duration: "Imtihongacha tayyorgarlik",
      schedule: "Haftada 3 marta dars",
      price: "500 000 so'm / oy",
      courseKey: "Tarix tayyorgarlik kursi"
    },
    {
      id: "bolalar-arab",
      category: "bolalar",
      badge: "Bolalar",
      titleArabic: "الصِّغَارُ",
      title: "Bolalar uchun interaktiv Arab tili",
      desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv darslari.",
      duration: "3 oy davomiyligida",
      schedule: "Haftada 2 marta dars",
      price: "400 000 so'm / oy",
      courseKey: "Bolalar uchun Arab tili"
    }
  ],
  news: [],
  quiz: [
    {
      question: "1. Arab alifbosida nechta harf bor?",
      options: ["26 ta", "28 ta", "30 ta"],
      correct: 1
    },
    {
      question: "2. Harakatlar (fatha, kasra, damma) nima vazifani bajaradi?",
      options: ["Unli tovushlarni ifodalaydi", "Undosh harflarni cho'zadi", "Gapni tugatadi"],
      correct: 0
    },
    {
      question: "3. 'Sarf' ilmi nimani o'rgatadi?",
      options: ["Gap tuzish qoidalarini", "So'zlarning o'zgarishi va yasalishini", "To'g'ri talaffuzni (Tajvid)"],
      correct: 1
    },
    {
      question: "4. Arab tilida nechta kalima (so'z) turkumi bor?",
      options: ["3 ta (Ism, Fe'l, Harf)", "5 ta", "9 ta"],
      correct: 0
    },
    {
      question: "5. 'Nahv' ilmi nimani o'rganadi?",
      options: ["Lug'at boyligini", "Gapdagi so'zlarning oxirgi holati va bog'lanishini", "Xat turini"],
      correct: 1
    }
  ]
};

exports.handler = async function (event) {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const store = getStore('ahsan-talim-content');
    const stored = await store.get('main', { type: 'json' });

    const content = stored || DEFAULT_CONTENT;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Brauzer eskirgan ma'lumotni ko'rsatmasligi uchun keshlanmasin
        'Cache-Control': 'no-store'
      },
      body: JSON.stringify(content)
    };
  } catch (err) {
    console.error('Kontentni olishda xatolik:', err);
    // Xatolik bo'lsa ham sayt butunlay ishlamay qolmasligi uchun
    // standart (default) kontentni qaytaramiz.
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(DEFAULT_CONTENT)
    };
  }
};
