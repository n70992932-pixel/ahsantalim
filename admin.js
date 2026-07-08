// ============================================
// AHSAN ADMIN PANEL JAVASCRIPT
// ============================================
// --- DEFAULT DATA FOR RESET ---
const DEFAULT_SITE_DATA = {
  hero: { badge: "Zamonaviy va Tizimli Ta'lim", title: "Kelajagingiz uchun <span class=\"text-gold\">eng yaxshi</span> ta'lim markazi", desc: "Biz bilan Arab tili, Ingliz tili (IELTS) hamda Tarix fanlarini tajribali ustozlar yordamida chuqurlashtirilgan innovatsion dasturlar asosida o'rganing." },
  contact: { phones: "+998 (77) 300-90-90\n+998 (90) 123-45-67", address: "Dang'ara tumani, Qiyali qo'rg'oncha qishlog'i.\nMo'ljal: Maktab yonida.", hours: "Dushanba - Shanba: 09:00 - 20:00\nYakshanba: Dam olish kuni" },
  social: { tg: "https://t.me/ahsantalim0571", ig: "https://instagram.com/ahsan.talim" },
  footerDesc: "Bizning maqsadimiz — har bir o'quvchiga sifatli va zamonaviy bilim berib, ularning yorqin kelajagini qurishiga ko'maklashish."
};
const DEFAULT_ADVANTAGES = [
  { iconSvg: '<path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>', title: "Tizimli Dastur", desc: "Darslarimiz boshlang'ich tushunchalardan boshlab, imtihonlarga tayyorgarlik va ravon nutqqacha bo'lgan bosqichlarni qamrab oladi." },
  { iconSvg: '<path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>', title: "Malakali Ustozlar", desc: "Ko'p yillik tajribaga ega, o'z mutaxassisligi bo'yicha kuchli natijalarga erishgan ustozlar sizga ta'lim berishadi." },
  { iconSvg: '<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>', title: "Qulay Dars Jadvallari", desc: "Ertamgi, tushlikdan keyingi va kechki guruhlar mavjudligi tufayli o'qish yoki ish bilan birga olib borish juda qulay." }
];
let siteData = JSON.parse(localStorage.getItem('siteData')) || DEFAULT_SITE_DATA;
let advData = JSON.parse(localStorage.getItem('advantages')) || DEFAULT_ADVANTAGES;
let courses = JSON.parse(localStorage.getItem('courses')) || [];
let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
// --- LOGIN LOGIC ---
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
// Replace <br> with \n for textareas
function brToNl(str) { return str ? str.replace(/<br\s*\/?>/gi, '\n') : ''; }
function nlToBr(str) { return str ? str.replace(/\n/g, '<br>') : ''; }
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
// --- LOAD TAB 1: SETTINGS ---
function loadSettings() {
  document.getElementById('s-hero-badge').value = siteData.hero.badge;
  document.getElementById('s-hero-title').value = siteData.hero.title;
  document.getElementById('s-hero-desc').value = siteData.hero.desc;
  
  document.getElementById('s-contact-phones').value = brToNl(siteData.contact.phones);
  document.getElementById('s-contact-address').value = brToNl(siteData.contact.address);
  document.getElementById('s-contact-hours').value = brToNl(siteData.contact.hours);
  
  document.getElementById('s-social-tg').value = siteData.social.tg;
  document.getElementById('s-social-ig').value = siteData.social.ig;
  document.getElementById('s-footer-desc').value = siteData.footerDesc;
  
  document.getElementById('s-tg-token').value = localStorage.getItem('tg_token') || '';
  document.getElementById('s-tg-chat').value = localStorage.getItem('tg_chat_id') || '';
}
document.getElementById('btn-save-settings').addEventListener('click', () => {
  siteData.hero.badge = document.getElementById('s-hero-badge').value;
  siteData.hero.title = document.getElementById('s-hero-title').value;
  siteData.hero.desc = document.getElementById('s-hero-desc').value;
  
  siteData.contact.phones = nlToBr(document.getElementById('s-contact-phones').value);
  siteData.contact.address = nlToBr(document.getElementById('s-contact-address').value);
  siteData.contact.hours = nlToBr(document.getElementById('s-contact-hours').value);
  
  siteData.social.tg = document.getElementById('s-social-tg').value;
  siteData.social.ig = document.getElementById('s-social-ig').value;
  siteData.footerDesc = document.getElementById('s-footer-desc').value;
  
  localStorage.setItem('siteData', JSON.stringify(siteData));
  
  localStorage.setItem('tg_token', document.getElementById('s-tg-token').value);
  localStorage.setItem('tg_chat_id', document.getElementById('s-tg-chat').value);
  
  showToast();
});
// --- LOAD TAB 2: ADVANTAGES ---
function renderAdvForm() {
  const container = document.getElementById('adv-container');
  container.innerHTML = advData.map((adv, i) => `
    <div class="card" style="margin-bottom: 20px;">
      <h3>${i+1} - Afzallik</h3>
      <div class="form-group">
        <label>Sarlavha</label>
        <input type="text" id="adv-title-${i}" value="${adv.title}">
      </div>
      <div class="form-group">
        <label>Ta'rif</label>
        <textarea id="adv-desc-${i}" rows="2">${adv.desc}</textarea>
      </div>
      <div class="form-group">
        <label>Ikonka (SVG path - O'zgartirish shart emas)</label>
        <input type="text" id="adv-svg-${i}" value='${adv.iconSvg}' style="font-family: monospace; font-size: 0.8rem; opacity: 0.7;">
      </div>
    </div>
  `).join('');
}
document.getElementById('btn-save-adv').addEventListener('click', () => {
  advData = advData.map((adv, i) => ({
    title: document.getElementById(`adv-title-${i}`).value,
    desc: document.getElementById(`adv-desc-${i}`).value,
    iconSvg: document.getElementById(`adv-svg-${i}`).value,
  }));
  localStorage.setItem('advantages', JSON.stringify(advData));
  showToast();
});
// --- LOAD TAB 3: COURSES ---
function renderCoursesList() {
  const list = document.getElementById('courses-list');
  if(!courses.length) {
    // If empty, load defaults (this handles first time admin visit if app.js didn't save yet)
    courses = [
      { category: "Arab tili", badge: "Boshlang'ich", iconText: "العَرَبِيَّة", title: "Noldan o'rganuvchilar uchun Arab tili", desc: "Harflar va tovushlar talaffuzidan boshlab, boshlang'ich so'zlashuv va o'qish qoidalarini mustahkam o'rganasiz.", duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm" },
      { category: "Arab tili", badge: "O'rta daraja", iconText: "النَّحْو", title: "Grammatika (Sarf va Nahv asoslari)", desc: "Matnlarni mustaqil tushunish, so'z o'zgarishlari va gap tuzish qoidalarini chuqurroq o'rganishni istaganlar uchun.", duration: "4 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 350,000 so'm" },
      { category: "Bolalar", badge: "6-12 yosh", iconText: "الصغار", title: "Bolalar uchun interaktiv Arab tili", desc: "Qiziqarli o'yinlar, ko'rgazmali qurollar va sodda metodlar orqali bolalarga arab alifbosi va asosiy so'zlashuv.", duration: "6 oy davomiyligida", freq: "Haftada 2 marta dars", price: "Oyiga 250,000 so'm" },
      { category: "Tarix", badge: "Abituriyent", iconText: "TARIX", title: "Tarix fanidan chuqurlashtirilgan tayyorgarlik", desc: "Milliy OTMlar va xalqaro universitetlarga kiruvchi abituriyentlar uchun maxsus intensiv darslar.", duration: "Imtihongacha", freq: "Haftada 3-4 marta dars", price: "Oyiga 350,000 so'm" },
      { category: "Ingliz tili", badge: "Pre-IELTS", iconText: "ENG", title: "General English (Umumiy Ingliz tili)", desc: "Grammatika, tinglab tushunish va so'zlashuv qobiliyatini A1 dan B2 darajasigacha ko'tarish.", duration: "6-8 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 300,000 so'm" },
      { category: "Ingliz tili", badge: "IELTS 7.0+", iconText: "IELTS", title: "IELTS Intensive Kurslari", desc: "IELTS imtihoniga to'liq tayyorlov. Mock testlar, shaxsiy tekshiruvlar va yuqori ball olish strategiyalari.", duration: "3 oy davomiyligida", freq: "Haftada 3 marta dars", price: "Oyiga 400,000 so'm" }
    ];
    localStorage.setItem('courses', JSON.stringify(courses));
  }
  
  list.innerHTML = courses.map((c, i) => `
    <div class="list-card">
      <div>
        <h4 style="color:var(--gold); font-size:0.8rem; margin-bottom:5px; text-transform:uppercase;">${c.category}</h4>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <p style="font-size:0.8rem; color:var(--text-main);">💸 ${c.price}</p>
      </div>
      <div class="actions">
        <button class="btn-edit" onclick="editCourse(${i})">Tahrirlash</button>
        <button class="btn-danger" onclick="deleteCourse(${i})">O'chirish</button>
      </div>
    </div>
  `).join('');
}
function openCourseModal(index = -1) {
  const form = document.getElementById('course-form');
  form.reset();
  document.getElementById('c-index').value = index;
  document.getElementById('course-modal-title').textContent = index >= 0 ? "Kursni tahrirlash" : "Yangi kurs qo'shish";
  
  if (index >= 0) {
    const c = courses[index];
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
function deleteCourse(i) {
  if(confirm("Ushbu kursni o'chirmoqchimisiz?")) {
    courses.splice(i, 1);
    localStorage.setItem('courses', JSON.stringify(courses));
    renderCoursesList();
  }
}
document.getElementById('course-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const index = document.getElementById('c-index').value;
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
  
  if (index >= 0 && index !== "") { courses[index] = newData; }
  else { courses.push(newData); }
  
  localStorage.setItem('courses', JSON.stringify(courses));
  renderCoursesList();
  closeModals();
  showToast();
});
// --- LOAD TAB 4: TEACHERS ---
function renderTeachersList() {
  const list = document.getElementById('teachers-list');
  if(!teachers.length) {
    teachers = [
      { name: "Abdurahmon ustoz", subject: "Arab tili", exp: "5 yillik tajriba" },
      { name: "Sardor ustoz", subject: "Ingliz tili (IELTS 8.0)", exp: "4 yillik tajriba" },
      { name: "Zuhiddin ustoz", subject: "Tarix", exp: "7 yillik tajriba" },
      { name: "Ahmad ustoz", subject: "Arab tili (Bolalar uchun)", exp: "3 yillik tajriba" }
    ];
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }
  
  list.innerHTML = teachers.map((t, i) => `
    <div class="list-card">
      <div>
        <h4>${t.name}</h4>
        <p style="color:var(--gold); font-weight:600; margin-bottom:5px;">${t.subject}</p>
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
  const form = document.getElementById('teacher-form');
  form.reset();
  document.getElementById('t-index').value = index;
  document.getElementById('teacher-modal-title').textContent = index >= 0 ? "Ustozni tahrirlash" : "Yangi ustoz qo'shish";
  
  if (index >= 0) {
    const t = teachers[index];
    document.getElementById('t-name').value = t.name;
    document.getElementById('t-subject').value = t.subject;
    document.getElementById('t-exp').value = t.exp;
  }
  
  document.getElementById('teacher-modal').classList.add('active');
}
function editTeacher(i) { openTeacherModal(i); }
function deleteTeacher(i) {
  if(confirm("Ushbu ustozni o'chirmoqchimisiz?")) {
    teachers.splice(i, 1);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    renderTeachersList();
  }
}
document.getElementById('teacher-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const index = document.getElementById('t-index').value;
  const newData = {
    name: document.getElementById('t-name').value,
    subject: document.getElementById('t-subject').value,
    exp: document.getElementById('t-exp').value
  };
  
  if (index >= 0 && index !== "") { teachers[index] = newData; }
  else { teachers.push(newData); }
  
  localStorage.setItem('teachers', JSON.stringify(teachers));
  renderTeachersList();
  closeModals();
  showToast();
});
// --- UTILS ---
function closeModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
// INIT
window.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  renderAdvForm();
  renderCoursesList();
  renderTeachersList();
});
