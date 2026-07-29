// ============================================
// AHSAN TA'LIM — Main JavaScript
// Telegram: To'g'ridan-to'g'ri API
// ============================================

// ---- TELEGRAM SOZLAMALARI ----
// Admin panel orqali o'rnatiladi (localStorage)
function getTgSettings() {
  return {
    token: window.siteDataCache?.tg_token || '',
    chatId: window.siteDataCache?.tg_chat_id || ''
  };
}

// ---- KURSLAR MA'LUMOTLARI ----
const COURSES = [
  {
    id: 1,
    icon: '🕌',
    tag: 'Boshlang\'ich',
    title: 'Arab tili — Boshlang\'ich',
    desc: 'Arabcha alifbo, asosiy grammatika (Sarf va Nahv), kundalik muloqot va qur\'on imlo qoidalari.',
    features: ['Arabcha alifbo va harflar', 'Asosiy Sarf va Nahv', 'Kundalik muloqot', 'Qur\'on o\'qish asoslari'],
    price: '350,000 so\'m/oy',
    course: 'Arab tili (boshlang\'ich)'
  },
  {
    id: 2,
    icon: '📖',
    tag: 'O\'rta daraja',
    title: 'Arab tili — O\'rta daraja',
    desc: 'Murakkab grammatika, matn tahlili, yozma va og\'zaki muloqotni kuchaytirish.',
    features: ['Murakkab Nahv qoidalari', 'Matn tahlili', 'Essе yozish', 'Og\'zaki suhbat'],
    price: '400,000 so\'m/oy',
    course: 'Arab tili (o\'rta daraja)'
  },
  {
    id: 3,
    icon: '🇬🇧',
    tag: 'IELTS',
    title: 'Ingliz tili — IELTS',
    desc: 'IELTS imtihoniga to\'liq tayyorlov. Maqsad 6.0 dan 8.0 gacha. Intensiv amaliyot.',
    features: ['Listening & Reading', 'Writing Task 1 & 2', 'Speaking tayyorlov', 'Mock test sinovlari'],
    price: '500,000 so\'m/oy',
    course: 'Ingliz tili — IELTS tayyorlov'
  },
  {
    id: 4,
    icon: '💬',
    tag: 'General',
    title: 'Ingliz tili — Umumiy',
    desc: 'Kundalik muloqot, biznes ingliz tili, grammatika va talaffuz ustida ishlash.',
    features: ['Grammar & Vocabulary', 'Speaking skills', 'Listening practice', 'Business English'],
    price: '400,000 so\'m/oy',
    course: 'Ingliz tili (umumiy)'
  },
  {
    id: 5,
    icon: '📜',
    tag: 'DTM',
    title: 'Tarix — DTM Tayyorlov',
    desc: 'O\'zbekiston tarixi va Jahon tarixi bo\'yicha DTM imtihoniga intensiv tayyorlov kursi.',
    features: ['O\'zbekiston tarixi', 'Jahon tarixi', 'Test ishlash metodikasi', 'Arxiv hujjatlar tahlili'],
    price: '350,000 so\'m/oy',
    course: 'Tarix — DTM tayyorlov'
  },
  {
    id: 6,
    icon: '🎁',
    tag: 'Bepul',
    title: 'Bepul Konsultatsiya',
    desc: 'Qaysi kurs sizga mos ekanligini bilib oling. Tajribali mutaxassis bilan yuzma-yuz suhbat.',
    features: ['Daraja aniqlash testi', 'Shaxsiy yo\'l xaritasi', 'Kurs tavsiyasi', '30 daqiqa bepul'],
    price: 'BEPUL',
    course: 'Bepul konsultatsiya'
  }
];

// ---- DEFAULT DATA & RENDER FUNCTIONS ----
const DEFAULT_HERO = {
  "badge": "O'quv Markazi #1 Toshkentda",
  "title": "Kelajagingizga<br><span>Ahsan Ta'lim</span><br>bilan investitsiya qiling",
  "desc": "Arab tili, Ingliz tili (IELTS) va Tarix fanlaridan professional ta'lim oling. 500+ muvaffaqiyatli bitiruvchi!",
  "stats": [
    {"num": 500, "label": "Bitiruvchi"},
    {"num": 5, "label": "Yil tajriba"},
    {"num": 95, "label": "% muvaffaqiyat"}
  ]
};

const DEFAULT_ABOUT = {
  "title": "Nima uchun <span>Ahsan Ta'lim?</span>",
  "desc": "Biz har bir o'quvchining muvaffaqiyatini o'z muvaffaqiyatimiz deb bilamiz. Zamonaviy metodlar va tajribali ustoz-o'qituvchilar bilan sizni maqsadingizga yetkazamiz.",
  "years": "5+",
  "features": [
    {"icon": "👨‍🏫", "title": "Tajribali O'qituvchilar", "desc": "10+ yillik tajribaga ega, soha mutaxassislaridan ta'lim oling"},
    {"icon": "📊", "title": "Natijaga Kafolat", "desc": "3 oy ichida natija ko'rsata olmasak, pul qaytariladi"},
    {"icon": "🕐", "title": "Qulay Jadval", "desc": "Ertalab, tushdan keyin va kechki guruhlar mavjud"},
    {"icon": "👥", "title": "Kichik Guruhlar", "desc": "8-12 kishilik guruhlarda individual e'tibor kafolatlanadi"}
  ]
};

const DEFAULT_TEACHERS = [
  {
    "id": 1,
    "name": "Ustoz Abdulloh",
    "subject": "Arab tili",
    "exp": "Madina universiteti bitiruvchisi • 8 yil tajriba",
    "tags": ["Sarf", "Nahv", "Muloqot"],
    "image": "",
    "emoji": "🧑‍🏫"
  },
  {
    "id": 2,
    "name": "Muallima Nilufar",
    "subject": "Ingliz tili (IELTS)",
    "exp": "IELTS 8.5 ball • Cambridge sertifikati • 6 yil",
    "tags": ["Speaking", "Writing", "IELTS"],
    "image": "",
    "emoji": "👩‍🏫"
  },
  {
    "id": 3,
    "name": "Ustoz Sherzod",
    "subject": "Tarix (DTM)",
    "exp": "Tarix fanlari nomzodi • 10 yil tajriba",
    "tags": ["O'zbekiston", "Jahon", "DTM"],
    "image": "",
    "emoji": "👨‍🎓"
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    "id": 1,
    "name": "Muhammadumar, 22 yosh",
    "course": "Arab tili kursi",
    "text": "Ahsan Ta'limda arab tilini o'rganib, hozir Madina universitetida tahsil olmoqdaman. Ustoz Abdullohning dars usuli juda samarali!",
    "stars": 5,
    "emoji": "👦"
  },
  {
    "id": 2,
    "name": "Zulfiya, 19 yosh",
    "course": "IELTS kursi",
    "text": "IELTS 7.5 oldim! Muallima Nilufarning metodikasi juda zo'r. 4 oyda shunday natijaga erishganimga o'zim ham ishonmadim.",
    "stars": 5,
    "emoji": "👧"
  },
  {
    "id": 3,
    "name": "Jasur, 18 yosh",
    "course": "Tarix kursi",
    "text": "DTM da tarixdan 82 ball oldim va universitetga kirdim! Ustoz Sherzodga juda minnatdorman. Kichik guruh sharofati bor.",
    "stars": 5,
    "emoji": "👦"
  }
];

const DEFAULT_FAQ = [
  {"id": 1, "question": "Kurslar qaysi darajadan boshlanadi?", "answer": "Bizda boshlang'ich, o'rta va yuqori daraja guruhlari mavjud. Siz kelib test topshirasiz va sizga mos guruhga joylashtirilasiz."},
  {"id": 2, "question": "Dars jadvali qanday?", "answer": "Haftada 3 marta, har bir dars 1.5 soat. Ertalab (9:00-10:30), tushdan keyin (14:00-15:30) va kechki (18:00-19:30) guruhlar mavjud."},
  {"id": 3, "question": "Narxlar qancha?", "answer": "Kurs narxi oyiga 350,000 so'mdan boshlanadi. Birinchi hafta bepul sinov darsi mavjud."},
  {"id": 4, "question": "Sertifikat beriladimi?", "answer": "Ha! Har bir kursni muvaffaqiyatli tugatgandan so'ng rasmiy sertifikat beriladi."},
  {"id": 5, "question": "Onlayn dars mavjudmi?", "answer": "Ha, Zoom orqali onlayn formatda ham dars o'tkaziladi."}
];

const DEFAULT_CONTACT = {
  "address": "Toshkent shahar, Mirzo Ulug'bek tumani",
  "phone": "+998 90 123 45 67",
  "hours": "Du-Shan: 08:00 — 21:00",
  "telegram": "@ahsantalim",
  "telegram_link": "https://t.me/ahsantalim"
};

function getStoredData(key, defaultValue) {
  if (window.siteDataCache && window.siteDataCache[key]) {
    return window.siteDataCache[key];
  }
  return defaultValue;
}

function renderHero() {
  const data = getStoredData('site_hero', DEFAULT_HERO);
  const badge = document.getElementById('hero-badge');
  const title = document.getElementById('hero-title');
  const desc = document.getElementById('hero-desc');
  if (badge) badge.textContent = data.badge;
  if (title) title.innerHTML = data.title;
  if (desc) desc.textContent = data.desc;
  
  const statsWrap = document.getElementById('hero-stats-wrap');
  if (statsWrap && data.stats) {
    statsWrap.innerHTML = data.stats.map(s => `
      <div class="hero-stat">
        <span class="num" data-count="${s.num}">0</span>
        <span class="label">${s.label}</span>
      </div>
    `).join('');
  }
}

function renderAbout() {
  const data = getStoredData('site_about', DEFAULT_ABOUT);
  const title = document.getElementById('about-title');
  const desc = document.getElementById('about-desc');
  const years = document.getElementById('about-years');
  const featuresWrap = document.getElementById('about-features');

  if (title) title.innerHTML = data.title;
  if (desc) desc.textContent = data.desc;
  if (years) years.textContent = data.years;

  if (featuresWrap && data.features) {
    featuresWrap.innerHTML = data.features.map(f => `
      <div class="about-feature">
        <div class="af-icon">${f.icon}</div>
        <div class="af-text">
          <h4>${f.title}</h4>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');
  }
}

function renderTeachers() {
  const teachers = getStoredData('site_teachers', DEFAULT_TEACHERS);
  const grid = document.getElementById('teachers-grid');
  if (!grid) return;
  grid.innerHTML = teachers.map(t => {
    const avatarHTML = t.image 
      ? `<img src="${t.image}" alt="${t.name}" class="teacher-photo">` 
      : `<div class="teacher-avatar">${t.emoji || '👨‍🏫'}</div>`;
    return `
      <div class="teacher-card fade-in">
        ${t.image ? `<div class="teacher-photo-wrap">${avatarHTML}</div>` : avatarHTML}
        <div class="teacher-name">${t.name}</div>
        <div class="teacher-subject">${t.subject}</div>
        <div class="teacher-exp">${t.exp}</div>
        <div class="teacher-tags">
          ${(t.tags || []).map(tag => `<span class="teacher-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderTestimonials() {
  const testimonials = getStoredData('site_testimonials', DEFAULT_TESTIMONIALS);
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;
  grid.innerHTML = testimonials.map(t => {
    const stars = '★'.repeat(t.stars || 5) + '☆'.repeat(5 - (t.stars || 5));
    return `
      <div class="testimonial-card fade-in">
        <div class="stars">${stars}</div>
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="ta-avatar">${t.emoji || '👤'}</div>
          <div>
            <div class="ta-name">${t.name}</div>
            <div class="ta-course">${t.course}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderFAQ() {
  const faq = getStoredData('site_faq', DEFAULT_FAQ);
  const list = document.getElementById('faq-list');
  if (!list) return;
  list.innerHTML = faq.map(f => `
    <div class="faq-item fade-in">
      <div class="faq-question">
        ${f.question}
        <div class="faq-arrow">▼</div>
      </div>
      <div class="faq-answer">
        <p>${f.answer}</p>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('active');
        item.querySelector('.faq-answer').style.maxHeight = '400px';
      }
    });
  });
}

function renderContact() {
  const data = getStoredData('site_contact', DEFAULT_CONTACT);
  const contactDynamic = document.getElementById('contact-info-dynamic');
  if (!contactDynamic) return;
  
  contactDynamic.innerHTML = `
    <p>Savollaringiz bormi? Biz doimo yordamga tayyormiz!</p>
    <div class="contact-items">
      <div class="contact-item">
        <div class="ci-icon">📍</div>
        <div class="ci-text">
          <h4>Manzil</h4>
          <p>${data.address}</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="ci-icon">📞</div>
        <div class="ci-text">
          <h4>Telefon</h4>
          <a href="tel:${data.phone.replace(/\s/g, '')}">${data.phone}</a>
        </div>
      </div>
      <div class="contact-item">
        <div class="ci-icon">⏰</div>
        <div class="ci-text">
          <h4>Ish vaqti</h4>
          <p>${data.hours}</p>
        </div>
      </div>
      <div class="contact-item">
        <div class="ci-icon">💬</div>
        <div class="ci-text">
          <h4>Telegram</h4>
          <a href="${data.telegram_link}" target="_blank">${data.telegram}</a>
        </div>
      </div>
    </div>
  `;
}

// ---- PRELOADER ----
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 800);
});

// ---- KURSLARNI RENDER QILISH ----
function renderCourses() {
  const grid = document.getElementById('courses-grid');
  if (!grid) return;
  
  const allCourses = getStoredData('courses', COURSES);
  
  grid.innerHTML = allCourses.map(c => `
    <div class="course-card fade-in">
      <div class="cc-icon">${c.icon || '📚'}</div>
      <div class="cc-tag">${c.tag || ''}</div>
      <div class="cc-title">${c.title || ''}</div>
      <ul class="cc-features">
        ${(c.features || []).map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div class="cc-footer">
        <div class="cc-price">${c.price || ''}</div>
        <button class="cc-btn open-modal" data-course="${c.course || c.title || ''}">Yozilish →</button>
      </div>
    </div>
  `).join('');
  
  initFadeIn();
}

// ---- HEADER SCROLL ----
const header = document.getElementById('main-header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- MOBILE MENU ----
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
menuToggle?.addEventListener('click', () => {
  navbar.classList.toggle('open');
  menuToggle.textContent = navbar.classList.contains('open') ? '✕' : '☰';
});
navbar?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navbar.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

// ---- MODAL ----
const modal = document.getElementById('reg-modal');
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.open-modal');
  if (btn) {
    const course = btn.dataset.course || '';
    openModal(course);
  }
});

function openModal(course) {
  const sel = document.getElementById('modal-course-selected');
  if (sel && course) {
    for (let i = 0; i < sel.options.length; i++) {
      if (sel.options[i].value === course || sel.options[i].text.includes(course)) {
        sel.selectedIndex = i; break;
      }
    }
  }
  document.getElementById('modal-form-view').style.display = 'block';
  document.getElementById('modal-success').style.display = 'none';
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// ---- TELEGRAM YUBORISH ----
async function sendToTelegram(data) {
  try {
    const res = await fetch('/api/send-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentName: data.name,
        studentPhone: data.phone,
        course: data.course,
        age: data.age,
        gender: data.gender,
        msg: data.msg
      })
    });
    const result = await res.json();
    return { ok: result.ok };
  } catch {
    return { ok: false };
  }
}

async function saveApplication(data) {
  try {
    const docData = {
      ...data,
      status: 'new',
      date: new Date().toISOString()
    };
    if (window.firebase && window.firebase.firestore) {
      await window.firebase.firestore().collection('applications').add(docData);
    }
  } catch (e) {
    console.error("Firestore xatosi:", e);
  }
}

// ---- MODAL FORM ----
document.getElementById('modal-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('modal-form-btn');
  const name = document.getElementById('m-name').value.trim();
  const phone = document.getElementById('m-phone').value.trim();
  const age = document.getElementById('m-age') ? document.getElementById('m-age').value : '';
  const gender = document.getElementById('m-gender') ? document.getElementById('m-gender').value : '';
  const course = document.getElementById('modal-course-selected').value;
  
  if (!name || !phone) return;
  
  btn.textContent = '⏳ Yuborilmoqda...';
  btn.disabled = true;
  
  const data = { name, phone, age, gender, course: course || 'Ko\'rsatilmagan', msg: '' };
  saveApplication(data);
  await sendToTelegram(data);
  
  document.getElementById('modal-form-view').style.display = 'none';
  document.getElementById('modal-success').style.display = 'block';
  
  showNotify('success', '🎉 Muvaffaqiyat!', 'Arizangiz qabul qilindi!');
  
  btn.textContent = '📨 Arizani yuborish';
  btn.disabled = false;
});

// ---- MAIN FORM ----
document.getElementById('main-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('main-form-btn');
  const name = document.getElementById('mf-name').value.trim();
  const phone = document.getElementById('mf-phone').value.trim();
  const course = document.getElementById('mf-course').value;
  const msg = document.getElementById('mf-msg').value.trim();
  
  if (!name || !phone) return;
  
  btn.textContent = '⏳ Yuborilmoqda...';
  btn.disabled = true;
  
  const data = { name, phone, course: course || 'Ko\'rsatilmagan', msg };
  saveApplication(data);
  await sendToTelegram(data);
  
  document.getElementById('reg-form-view').style.display = 'none';
  document.getElementById('reg-success').style.display = 'block';
  
  showNotify('success', '🎉 Muvaffaqiyat!', 'Arizangiz qabul qilindi!');
});

window.resetMainForm = function() {
  document.getElementById('reg-form-view').style.display = 'block';
  document.getElementById('reg-success').style.display = 'none';
  document.getElementById('main-form').reset();
};


// ---- COUNTER ANIMATION ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.closest('.hero-stat')?.querySelector('.label')?.textContent.includes('%') || el.closest('.stat-item')?.querySelector('.stat-label')?.textContent.includes('%') ? '' : '+');
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ---- FADE IN ANIMATION ----
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        if (e.target.querySelector('[data-count]')) animateCounters();
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ---- NOTIFY ----
function showNotify(type, title, msg) {
  const el = document.getElementById('notify');
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  document.getElementById('notify-icon').textContent = icons[type] || '📢';
  document.getElementById('notify-title').textContent = title;
  document.getElementById('notify-msg').textContent = msg;
  el.className = `notify ${type} show`;
  setTimeout(() => el.classList.remove('show'), 4000);
}

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  if (window.loadDataFromFirebase) {
    await window.loadDataFromFirebase();
  }
  
  renderCourses();
  renderHero();
  renderAbout();
  renderTeachers();
  renderTestimonials();
  renderFAQ();
  renderContact();
  initFadeIn();
  animateCounters();
  
  // Telegram Web App Init
  if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.ready();
    window.Telegram.WebApp.expand();
  }
});
