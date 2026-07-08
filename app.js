// ============================================
// AHSAN TA'LIM — PREMIUM JAVASCRIPT
// ============================================
// --- DEFAULT DATA ---
const DEFAULT_COURSES = [
  {
    category: "Arab tili",
    badge: "Boshlang'ich",
    iconText: "العَرَبِيَّة",
    title: "Noldan o'rganuvchilar uchun Arab tili",
    desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.",
    duration: "3 oy davomiyligida",
    freq: "Haftada 3 marta dars",
    price: "Oyiga 300,000 so'm"
  },
  {
    category: "Arab tili",
    badge: "O'rta daraja",
    iconText: "النَّحْو",
    title: "Grammatika (Sarf va Nahv asoslari)",
    desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.",
    duration: "4 oy davomiyligida",
    freq: "Haftada 3 marta dars",
    price: "Oyiga 350,000 so'm"
  },
  {
    category: "Bolalar",
    badge: "6-12 yosh",
    iconText: "الصغار",
    title: "Bolalar uchun interaktiv Arab tili",
    desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv.",
    duration: "6 oy davomiyligida",
    freq: "Haftada 2 marta dars",
    price: "Oyiga 250,000 so'm"
  },
  {
    category: "Tarix",
    badge: "Abituriyent",
    iconText: "TARIX",
    title: "Tarix fanidan chuqurlashtirilgan tayyorgarlik",
    desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun maxsus intensiv darslar.",
    duration: "Imtihongacha",
    freq: "Haftada 3-4 marta dars",
    price: "Oyiga 350,000 so'm"
  },
  {
    category: "Ingliz tili",
    badge: "Pre-IELTS",
    iconText: "ENG",
    title: "General English (Umumiy Ingliz tili)",
    desc: "Grammatika, tinglab tushunish va so'zlashuv qobiliyatini A1 dan B2 darajasigacha ko'tarish.",
    duration: "6-8 oy davomiyligida",
    freq: "Haftada 3 marta dars",
    price: "Oyiga 300,000 so'm"
  },
  {
    category: "Ingliz tili",
    badge: "IELTS 7.0+",
    iconText: "IELTS",
    title: "IELTS Intensive Kurslari",
    desc: "IELTS imtihoniga to'liq tayyorlov. Mock testlar, shaxsiy tekshiruvlar va yuqori ball olish strategiyalari.",
    duration: "3 oy davomiyligida",
    freq: "Haftada 3 marta dars",
    price: "Oyiga 400,000 so'm"
  }
];
const TEACHERS = [
  { name: "Abdurahmon ustoz", subject: "Arab tili", exp: "5 yillik tajriba" },
  { name: "Sardor ustoz", subject: "Ingliz tili (IELTS 8.0)", exp: "4 yillik tajriba" },
  { name: "Zuhiddin ustoz", subject: "Tarix", exp: "7 yillik tajriba" },
  { name: "Ahmad ustoz", subject: "Arab tili (Bolalar uchun)", exp: "3 yillik tajriba" }
];
// --- RENDER FUNCTIONS ---
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
  grid.innerHTML = TEACHERS.map(t => `
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
function getTgSettings() {
  return {
    token: localStorage.getItem('tg_token') || '',
    chatId: localStorage.getItem('tg_chat_id') || ''
  };
}
async function sendToTelegram(data) {
  const { token, chatId } = getTgSettings();
  if (!token || !chatId) return; 
  
  const text = `🌟 <b>YANGI ARIZA</b>\n\n👤 <b>Ism:</b> ${data.name}\n📞 <b>Telefon:</b> ${data.phone}\n🎓 <b>Kurs:</b> ${data.course}`;
  
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
  } catch(e) { console.error("Telegram API xatosi:", e); }
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
  
  // Save to Admin panel
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
