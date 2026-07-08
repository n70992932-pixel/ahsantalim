// ============================================
// AHSAN TA'LIM — PREMIUM JAVASCRIPT (DYNAMIC)
// ============================================
// --- DEFAULT SITE DATA ---
const DEFAULT_SITE_DATA = {
  hero: {
    badge: "Zamonaviy va Tizimli Ta'lim",
    title: "Kelajagingiz uchun <span class=\"text-gold\">eng yaxshi</span> ta'lim markazi",
    desc: "Biz bilan Arab tili, Ingliz tili (IELTS) hamda Tarix fanlarini tajribali ustozlar yordamida chuqurlashtirilgan innovatsion dasturlar asosida o'rganing."
  },
  contact: {
    phones: "+998 (77) 300-90-90<br>+998 (90) 123-45-67",
    address: "Dang'ara tumani, Qiyali qo'rg'oncha qishlog'i.<br>Mo'ljal: Maktab yonida.",
    hours: "Dushanba - Shanba: 09:00 - 20:00<br>Yakshanba: Dam olish kuni"
  },
  social: {
    tg: "https://t.me/ahsantalim0571",
    ig: "https://instagram.com/ahsan.talim"
  },
  footerDesc: "Bizning maqsadimiz — har bir o'quvchiga sifatli va zamonaviy bilim berib, ularning yorqin kelajagini qurishiga ko'maklashish."
};
const DEFAULT_ADVANTAGES = [
  {
    iconSvg: '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>',
    title: "Tizimli Dastur",
    desc: "Darslarimiz boshlang'ich tushunchalardan boshlab, imtihonlarga tayyorgarlik va ravon nutqqacha bo'lgan bosqichlarni qamrab oladi."
  },
  {
    iconSvg: '<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>',
    title: "Malakali Ustozlar",
    desc: "Ko'p yillik tajribaga ega, o'z mutaxassisligi bo'yicha kuchli natijalarga erishgan ustozlar sizga ta'lim berishadi."
  },
  {
    iconSvg: '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>',
    title: "Qulay Dars Jadvallari",
    desc: "Ertamgi, tushlikdan keyingi va kechki guruhlar mavjudligi tufayli o'qish yoki ish bilan birga olib borish juda qulay."
  }
];
const DEFAULT_COURSES = [
  {
    category: "Arab tili", badge: "Boshlang'ich", iconText: "العَرَبِيَّة",
    title: "Noldan o'rganuvchilar uchun Arab tili", desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.",
    duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm"
  },
  {
    category: "Arab tili", badge: "O'rta daraja", iconText: "النَّحْو",
    title: "Grammatika (Sarf va Nahv asoslari)", desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.",
    duration: "4 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 350,000 so'm"
  },
  {
    category: "Bolalar", badge: "6-12 yosh", iconText: "الصغار",
    title: "Bolalar uchun interaktiv Arab tili", desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv.",
    duration: "6 oy davomiyligida", freq: "Haftada 2 marta dars", price: "Oyiga 250,000 so'm"
  },
  {
    category: "Tarix", badge: "Abituriyent", iconText: "TARIX",
    title: "Tarix fanidan chuqurlashtirilgan tayyorgarlik", desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun maxsus intensiv darslar.",
    duration: "Imtihongacha", freq: "Haftada 3-4 marta dars", price: "Oyiga 350,000 so'm"
  },
  {
    category: "Ingliz tili", badge: "Pre-IELTS", iconText: "ENG",
    title: "General English (Umumiy Ingliz tili)", desc: "Grammatika, tinglab tushunish va so'zlashuv qobiliyatini A1 dan B2 darajasigacha ko'tarish.",
    duration: "6-8 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm"
  },
  {
    category: "Ingliz tili", badge: "IELTS 7.0+", iconText: "IELTS",
    title: "IELTS Intensive Kurslari", desc: "IELTS imtihoniga to'liq tayyorlov. Mock testlar, shaxsiy tekshiruvlar va yuqori ball olish strategiyalari.",
    duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 400,000 so'm"
  }
];
const DEFAULT_TEACHERS = [
  { name: "Abdurahmon ustoz", subject: "Arab tili", exp: "5 yillik tajriba" },
  { name: "Sardor ustoz", subject: "Ingliz tili (IELTS 8.0)", exp: "4 yillik tajriba" },
  { name: "Zuhiddin ustoz", subject: "Tarix", exp: "7 yillik tajriba" },
  { name: "Ahmad ustoz", subject: "Arab tili (Bolalar uchun)", exp: "3 yillik tajriba" }
];
// --- RENDER FUNCTIONS ---
function loadSiteData() {
  const savedData = localStorage.getItem('siteData');
  const siteData = savedData ? JSON.parse(savedData) : DEFAULT_SITE_DATA;
  
  // Hero
  const elBadge = document.getElementById('dyn-hero-badge');
  const elTitle = document.getElementById('dyn-hero-title');
  const elDesc = document.getElementById('dyn-hero-desc');
  if(elBadge) { elBadge.innerHTML = siteData.hero.badge; elBadge.style.display = siteData.hero.badge ? 'inline-flex' : 'none'; }
  if(elTitle) elTitle.innerHTML = siteData.hero.title;
  if(elDesc) elDesc.innerHTML = siteData.hero.desc;
  
  // Contact
  const cPhone = document.getElementById('dyn-contact-phones');
  const cAddr = document.getElementById('dyn-contact-address');
  const cHours = document.getElementById('dyn-contact-hours');
  if(cPhone) cPhone.innerHTML = siteData.contact.phones;
  if(cAddr) cAddr.innerHTML = siteData.contact.address;
  if(cHours) cHours.innerHTML = siteData.contact.hours;
  
  // Footer
  const fDesc = document.getElementById('dyn-footer-desc');
  const tgLink = document.getElementById('dyn-tg-link');
  const igLink = document.getElementById('dyn-ig-link');
  if(fDesc) fDesc.innerHTML = siteData.footerDesc;
  if(tgLink) tgLink.href = siteData.social.tg;
  if(igLink) igLink.href = siteData.social.ig;
}
function renderAdvantages() {
  const grid = document.getElementById('adv-grid');
  if (!grid) return;
  const saved = localStorage.getItem('advantages');
  let advs = saved ? JSON.parse(saved) : DEFAULT_ADVANTAGES;
  
  grid.innerHTML = advs.map(a => `
    <div class="adv-card">
      <div class="adv-icon">
        <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2">${a.iconSvg}</svg>
      </div>
      <h3 class="adv-title">${a.title}</h3>
      <p class="adv-desc">${a.desc}</p>
    </div>
  `).join('');
}
function renderCourses(filter = 'all') {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  
  const saved = localStorage.getItem('courses');
  let courses = saved ? JSON.parse(saved) : DEFAULT_COURSES;
  
  if (filter !== 'all') {
    courses = courses.filter(c => c.category === filter || c.title.includes(filter));
  }
  
  grid.innerHTML = courses.map(c => `
    <div class="course-card">
      ${c.badge ? `<div class="course-badge">${c.badge}</div>` : ''}
      ${c.iconText ? `<div class="course-icon-text">${c.iconText}</div>` : ''}
      <h3 class="course-title">${c.title}</h3>
      <p class="course-desc">${c.desc}</p>
      <div class="course-meta">
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${c.duration || 'Belgilanmagan'}</span>
        </div>
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <span>${c.freq || 'Belgilanmagan'}</span>
        </div>
        ${c.price ? `
        <div>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span style="color:var(--text-main); font-weight:600;">${c.price}</span>
        </div>` : ''}
      </div>
      <button class="btn-gold open-modal" data-course="${c.title}">Yozilish</button>
    </div>
  `).join('');
}
function renderTeachers() {
  const grid = document.getElementById('teachers-grid');
  if(!grid) return;
  const saved = localStorage.getItem('teachers');
  let teachers = saved ? JSON.parse(saved) : DEFAULT_TEACHERS;
  
  grid.innerHTML = teachers.map(t => `
    <div class="teacher-card">
      <div class="teacher-img-wrapper">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      </div>
      <h3 class="teacher-name">${t.name}</h3>
      <div class="teacher-subject">${t.subject}</div>
      <p class="teacher-exp">${t.exp}</p>
    </div>
  `).join('');
}
// --- INTERACTIVITY ---
document.addEventListener('DOMContentLoaded', () => {
  loadSiteData();
  renderAdvantages();
  renderCourses('all');
  renderTeachers();
  // Navbar scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });
  // Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCourses(e.target.getAttribute('data-filter'));
    });
  });
});
// --- MODAL & TELEGRAM ---
const modal = document.getElementById('reg-modal');
const closeBtn = document.getElementById('modal-close-btn');
document.addEventListener('click', (e) => {
  if (e.target.closest('.open-modal')) {
    const btn = e.target.closest('.open-modal');
    const course = btn.getAttribute('data-course');
    const select = document.getElementById('m-course');
    
    if(select && course) {
      let found = false;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.includes(course) || course.includes(select.options[i].value)) {
          select.selectedIndex = i;
          found = true; break;
        }
      }
      if(!found) {
        const opt = new Option(course, course);
        select.add(opt); select.value = course;
      }
    }
    
    document.getElementById('modal-form-view').style.display = 'block';
    document.getElementById('modal-success-view').style.display = 'none';
    modal.classList.add('active');
  }
});
closeBtn?.addEventListener('click', () => modal.classList.remove('active'));
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
async function sendToTelegram(data) {
  try {
    // Endi so'rovlar to'g'ridan-to'g'ri telegramga emas,
    // o'zimizning xavfsiz Vercel API imizga boradi (/api/submit)
    await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch(e) { console.error("API xatosi:", e); }
}
document.getElementById('modal-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('modal-submit-btn');
  const name = document.getElementById('m-name').value;
  const phone = document.getElementById('m-phone').value;
  const course = document.getElementById('m-course').value;
  
  btn.textContent = 'Yuborilmoqda...';
  btn.disabled = true;
  
  const data = { name, phone, course };
  
  // We no longer save to Admin panel applications since it's removed in the new admin panel,
  // But we can keep saving it silently in localStorage just in case.
  const apps = JSON.parse(localStorage.getItem('applications') || '[]');
  apps.unshift({ id: Date.now(), ...data, status: 'new', date: new Date().toISOString() });
  localStorage.setItem('applications', JSON.stringify(apps));
  
  // Send to TG
  await sendToTelegram(data);
  
  // Show success view
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success-view').style.display = 'block';
  document.getElementById('modal-form').reset();
  
  btn.textContent = 'Arizani yuborish';
  btn.disabled = false;
});
