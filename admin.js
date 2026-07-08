// ============================================
// AHSAN ADMIN PANEL JAVASCRIPT (API-based)
// ============================================
const ADMIN_PASS = "Ahsan2026!";
// --- DEFAULT DATA ---
const DEFAULTS = {
  siteData: {
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
    social: { tg: "https://t.me/ahsantalim0571", ig: "https://instagram.com/ahsan.talim" },
    footerDesc: "Bizning maqsadimiz — har bir o'quvchiga sifatli va zamonaviy bilim berib, ularning yorqin kelajagini qurishiga ko'maklashish."
  },
  advantages: [
    { iconSvg: '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>', title: "Tizimli Dastur", desc: "Darslarimiz boshlang'ich tushunchalardan boshlab, imtihonlarga tayyorgarlik va ravon nutqqacha bo'lgan bosqichlarni qamrab oladi." },
    { iconSvg: '<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>', title: "Malakali Ustozlar", desc: "Ko'p yillik tajribaga ega, o'z mutaxassisligi bo'yicha kuchli natijalarga erishgan ustozlar sizga ta'lim berishadi." },
    { iconSvg: '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>', title: "Qulay Dars Jadvallari", desc: "Ertamgi, tushlikdan keyingi va kechki guruhlar mavjudligi tufayli o'qish yoki ish bilan birga olib borish juda qulay." }
  ],
  courses: [
    { category: "Arab tili", badge: "Boshlang'ich", iconText: "العَرَبِيَّة", title: "Noldan o'rganuvchilar uchun Arab tili", desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.", duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm" },
    { category: "Arab tili", badge: "O'rta daraja", iconText: "النَّحْو", title: "Grammatika (Sarf va Nahv asoslari)", desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.", duration: "4 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 350,000 so'm" },
    { category: "Bolalar", badge: "6-12 yosh", iconText: "الصغار", title: "Bolalar uchun interaktiv Arab tili", desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv.", duration: "6 oy davomiyligida", freq: "Haftada 2 marta dars", price: "Oyiga 250,000 so'm" },
    { category: "Tarix", badge: "Abituriyent", iconText: "TARIX", title: "Tarix fanidan chuqurlashtirilgan tayyorgarlik", desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun maxsus intensiv darslar.", duration: "Imtihongacha", freq: "Haftada 3-4 marta dars", price: "Oyiga 350,000 so'm" },
    { category: "Ingliz tili", badge: "Pre-IELTS", iconText: "ENG", title: "General English (Umumiy Ingliz tili)", desc: "Grammatika, tinglab tushunish va so'zlashuv qobiliyatini A1 dan B2 darajasigacha ko'tarish.", duration: "6-8 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm" },
    { category: "Ingliz tili", badge: "IELTS 7.0+", iconText: "IELTS", title: "IELTS Intensive Kurslari", desc: "IELTS imtihoniga to'liq tayyorlov. Mock testlar, shaxsiy tekshiruvlar va yuqori ball olish strategiyalari.", duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 400,000 so'm" }
  ],
  teachers: [
    { name: "Abdurahmon ustoz", subject: "Arab tili", exp: "5 yillik tajriba" },
    { name: "Sardor ustoz", subject: "Ingliz tili (IELTS 8.0)", exp: "4 yillik tajriba" },
    { name: "Zuhiddin ustoz", subject: "Tarix", exp: "7 yillik tajriba" },
    { name: "Ahmad ustoz", subject: "Arab tili (Bolalar uchun)", exp: "3 yillik tajriba" }
  ]
};
// In-memory config (loaded from API on start)
let currentConfig = JSON.parse(JSON.stringify(DEFAULTS));
// Helpers
function brToNl(str) { return str ? str.replace(/<br\s*\/?>/gi, '\n') : ''; }
function nlToBr(str) { return str ? str.replace(/\n/g, '<br>') : ''; }
// --- API FUNCTIONS ---
async function loadConfigFromAPI() {
  try {
    const res = await fetch('/api/get-config');
    const { config } = await res.json();
    if (config) {
      currentConfig = config;
    }
  } catch(e) {
    console.log("API ulanmadi, default ma'lumotlar ishlatildi.");
  }
}
async function saveConfigToAPI() {
  try {
    const res = await fetch('/api/save-config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: ADMIN_PASS, config: currentConfig })
    });
    if (res.ok) {
      showToast("✅ Saqlandi! Sayt yangilandi.");
    } else {
      showToast("❌ Xato! Qaytadan urinib ko'ring.", true);
    }
  } catch(e) {
    showToast("❌ Internet yoki Server xatosi!", true);
  }
}
// --- LOGIN ---
const PASS = "Ahsan2026!";
const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';
if (isLoggedIn) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-app').style.display = 'flex';
} else {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('admin-app').style.display = 'none';
}
document.getElementById('btn-login')?.addEventListener('click', () => {
  const pwd = document.getElementById('admin-password').value;
  if (pwd === PASS) {
    sessionStorage.setItem('admin_logged_in', 'true');
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});
document.getElementById('admin-password')?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') document.getElementById('btn-login').click();
});
// --- TAB NAVIGATION ---
document.querySelectorAll('.nav-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    const target = e.currentTarget;
    target.classList.add('active');
    document.getElementById(target.dataset.tab).classList.add('active');
  });
});
// --- TAB 1: SETTINGS ---
function loadSettings() {
  const sd = currentConfig.siteData;
  document.getElementById('s-hero-badge').value = sd.hero.badge || '';
  document.getElementById('s-hero-title').value = sd.hero.title || '';
  document.getElementById('s-hero-desc').value = sd.hero.desc || '';
  document.getElementById('s-contact-phones').value = brToNl(sd.contact.phones);
  document.getElementById('s-contact-address').value = brToNl(sd.contact.address);
  document.getElementById('s-contact-hours').value = brToNl(sd.contact.hours);
  document.getElementById('s-social-tg').value = sd.social.tg || '';
  document.getElementById('s-social-ig').value = sd.social.ig || '';
  document.getElementById('s-footer-desc').value = sd.footerDesc || '';
}
document.getElementById('btn-save-settings')?.addEventListener('click', async () => {
  currentConfig.siteData.hero.badge = document.getElementById('s-hero-badge').value;
  currentConfig.siteData.hero.title = document.getElementById('s-hero-title').value;
  currentConfig.siteData.hero.desc = document.getElementById('s-hero-desc').value;
  currentConfig.siteData.contact.phones = nlToBr(document.getElementById('s-contact-phones').value);
  currentConfig.siteData.contact.address = nlToBr(document.getElementById('s-contact-address').value);
  currentConfig.siteData.contact.hours = nlToBr(document.getElementById('s-contact-hours').value);
  currentConfig.siteData.social.tg = document.getElementById('s-social-tg').value;
  currentConfig.siteData.social.ig = document.getElementById('s-social-ig').value;
  currentConfig.siteData.footerDesc = document.getElementById('s-footer-desc').value;
  await saveConfigToAPI();
});
// --- TAB 2: ADVANTAGES ---
function renderAdvForm() {
  const container = document.getElementById('adv-container');
  container.innerHTML = currentConfig.advantages.map((adv, i) => `
    <div class="card" style="margin-bottom: 20px;">
      <h3>${i+1} - Afzallik</h3>
      <div class="form-group">
        <label>Sarlavha</label>
        <input type="text" id="adv-title-${i}" value="${adv.title}">
      </div>
      <div class="form-group">
        <label>Ta'rif</label>
        <textarea id="adv-desc-${i}" rows="3">${adv.desc}</textarea>
      </div>
    </div>
  `).join('');
}
document.getElementById('btn-save-adv')?.addEventListener('click', async () => {
  currentConfig.advantages = currentConfig.advantages.map((adv, i) => ({
    ...adv,
    title: document.getElementById(`adv-title-${i}`)?.value || adv.title,
    desc: document.getElementById(`adv-desc-${i}`)?.value || adv.desc,
  }));
  await saveConfigToAPI();
});
// --- TAB 3: COURSES ---
function renderCoursesList() {
  const list = document.getElementById('courses-list');
  list.innerHTML = currentConfig.courses.map((c, i) => `
    <div class="list-card">
      <div>
        <h4 style="color:var(--gold);font-size:0.8rem;margin-bottom:5px;text-transform:uppercase;">${c.category}</h4>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <p style="font-size:0.85rem;color:var(--text-main);margin-top:5px;">💸 ${c.price}</p>
      </div>
      <div class="actions">
        <button class="btn-edit" onclick="editCourse(${i})">Tahrirlash</button>
        <button class="btn-danger" onclick="deleteCourse(${i})">O'chirish</button>
      </div>
    </div>
  `).join('');
}
function openCourseModal(index = -1) {
  document.getElementById('course-form').reset();
  document.getElementById('c-index').value = index;
  document.getElementById('course-modal-title').textContent = index >= 0 ? "Kursni tahrirlash" : "Yangi kurs qo'shish";
  if (index >= 0) {
    const c = currentConfig.courses[index];
    document.getElementById('c-title').value = c.title;
    document.getElementById('c-category').value = c.category;
    document.getElementById('c-badge').value = c.badge || '';
    document.getElementById('c-iconText').value = c.iconText || '';
    document.getElementById('c-desc').value = c.desc;
    document.getElementById('c-duration').value = c.duration;
    document.getElementById('c-freq').value = c.freq;
    document.getElementById('c-price').value = c.price;
  }
  document.getElementById('course-modal').classList.add('active');
}
function editCourse(i) { openCourseModal(i); }
async function deleteCourse(i) {
  if(confirm("Ushbu kursni o'chirmoqchimisiz?")) {
    currentConfig.courses.splice(i, 1);
    renderCoursesList();
    await saveConfigToAPI();
  }
}
document.getElementById('course-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const index = parseInt(document.getElementById('c-index').value);
  const newData = {
    title: document.getElementById('c-title').value,
    category: document.getElementById('c-category').value,
    badge: document.getElementById('c-badge').value,
    iconText: document.getElementById('c-iconText').value,
    desc: document.getElementById('c-desc').value,
    duration: document.getElementById('c-duration').value,
    freq: document.getElementById('c-freq').value,
    price: document.getElementById('c-price').value
  };
  if (index >= 0) { currentConfig.courses[index] = newData; }
  else { currentConfig.courses.push(newData); }
  renderCoursesList();
  closeModals();
  await saveConfigToAPI();
});
// --- TAB 4: TEACHERS ---
function renderTeachersList() {
  const list = document.getElementById('teachers-list');
  list.innerHTML = currentConfig.teachers.map((t, i) => `
    <div class="list-card">
      <div>
        <h4>${t.name}</h4>
        <p style="color:var(--gold);font-weight:600;margin-bottom:5px;">${t.subject}</p>
        <p>${t.exp}</p>
      </div>
      <div class="actions">
        <button class="btn-edit" onclick="editTeacher(${i})">Tahrirlash</button>
        <button class="btn-danger" onclick="deleteTeacher(${i})">O'chirish</button>
      </div>
    </div>
  `).join('');
}
function openTeacherModal(index = -1) {
  document.getElementById('teacher-form').reset();
  document.getElementById('t-index').value = index;
  document.getElementById('teacher-modal-title').textContent = index >= 0 ? "Ustozni tahrirlash" : "Yangi ustoz qo'shish";
  if (index >= 0) {
    const t = currentConfig.teachers[index];
    document.getElementById('t-name').value = t.name;
    document.getElementById('t-subject').value = t.subject;
    document.getElementById('t-exp').value = t.exp;
  }
  document.getElementById('teacher-modal').classList.add('active');
}
function editTeacher(i) { openTeacherModal(i); }
async function deleteTeacher(i) {
  if(confirm("Ushbu ustozni o'chirmoqchimisiz?")) {
    currentConfig.teachers.splice(i, 1);
    renderTeachersList();
    await saveConfigToAPI();
  }
}
document.getElementById('teacher-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const index = parseInt(document.getElementById('t-index').value);
  const newData = {
    name: document.getElementById('t-name').value,
    subject: document.getElementById('t-subject').value,
    exp: document.getElementById('t-exp').value
  };
  if (index >= 0) { currentConfig.teachers[index] = newData; }
  else { currentConfig.teachers.push(newData); }
  renderTeachersList();
  closeModals();
  await saveConfigToAPI();
});
// --- UTILS ---
function closeModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}
function showToast(msg = "✅ Saqlandi!", isError = false) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.background = isError ? '#ef4444' : 'var(--gold)';
  t.style.color = isError ? '#fff' : '#000';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}
// --- INIT ---
window.addEventListener('DOMContentLoaded', async () => {
  await loadConfigFromAPI();
  loadSettings();
  renderAdvForm();
  renderCoursesList();
  renderTeachersList();
});
