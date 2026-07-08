// ============================================
// AHSAN TA'LIM — Yangi Dizayn Javascript
// ============================================
// --- DEFAULT COURSES ---
const DEFAULT_COURSES = [
  {
    category: "Arab tili",
    badge: "Boshlang'ich",
    iconText: "العَرَبِيَّة",
    title: "Noldan o'rganuvchilar uchun Arab tili",
    desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.",
    duration: "3 oy davomiyligida",
    freq: "Haftada 3 marta dars"
  },
  {
    category: "Arab tili",
    badge: "O'rta",
    iconText: "النَّحْو وَالصَّرْف",
    title: "Grammatika (Sarf va Nahv asoslari)",
    desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.",
    duration: "4 oy davomiyligida",
    freq: "Haftada 3 marta dars"
  },
  {
    category: "Bolalar",
    badge: "Bolalar",
    iconText: "الصغار",
    title: "Bolalar uchun interaktiv Arab tili",
    desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv darslari.",
    duration: "3 oy davomiyligida",
    freq: "Haftada 2 marta dars"
  },
  {
    category: "Tarix",
    badge: "Abituriyent",
    iconText: "TARIX",
    title: "Tarix fanidan chuqurlashtirilgan darslar",
    desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun tarix fanidan chuqurlashtirilgan tayyorgarlik kursi.",
    duration: "Imtihongacha tayyorgarlik",
    freq: "Haftada 3 marta dars"
  },
  {
    category: "Ingliz tili",
    badge: "IELTS",
    iconText: "IELTS",
    title: "Ingliz tili (IELTS)",
    desc: "IELTS imtihoniga to'liq tayyorlov. Maqsad 6.0 dan 8.0 gacha. Intensiv amaliyot va Mock testlar.",
    duration: "6 oy davomiyligida",
    freq: "Haftada 3 marta dars"
  }
];
// --- RENDER COURSES & FILTERS ---
function getCourses() {
  const saved = localStorage.getItem('courses');
  return saved ? JSON.parse(saved) : DEFAULT_COURSES;
}
function renderCourses(filter = 'all') {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  let courses = getCourses();
  
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
      </div>
      <button class="btn-gold open-modal" data-course="${c.title}">Yozilish</button>
    </div>
  `).join('');
}
// Filter click events
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderCourses(e.target.getAttribute('data-filter'));
  });
});
// --- MODAL LOGIC ---
const modal = document.getElementById('reg-modal');
const closeBtn = document.getElementById('modal-close-btn');
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-modal')) {
    const course = e.target.getAttribute('data-course');
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
// --- TELEGRAM LOGIC ---
function getTgSettings() {
  return {
    token: localStorage.getItem('tg_token') || '',
    chatId: localStorage.getItem('tg_chat_id') || ''
  };
}
function saveApplication(data) {
  const apps = JSON.parse(localStorage.getItem('applications') || '[]');
  apps.unshift({ id: Date.now(), ...data, status: 'new', date: new Date().toISOString() });
  localStorage.setItem('applications', JSON.stringify(apps));
}
async function sendToTelegram(data) {
  const { token, chatId } = getTgSettings();
  if (!token || !chatId) return;
  
  const text = `📚 <b>YANGI ARIZA</b>\n\n👤 <b>Ism:</b> ${data.name}\n📞 <b>Telefon:</b> ${data.phone}\n🎓 <b>Kurs:</b> ${data.course}`;
  
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
  } catch(e) { console.error(e); }
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
  saveApplication(data);
  await sendToTelegram(data);
  
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success-view').style.display = 'block';
  document.getElementById('modal-form').reset();
  
  btn.textContent = 'Yuborish';
  btn.disabled = false;
});
// Init
document.addEventListener('DOMContentLoaded', () => {
  renderCourses('all');
});
