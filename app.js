// ============================================
// AHSAN TA'LIM — Main JavaScript
// Telegram: To'g'ridan-to'g'ri API
// ============================================

// ---- TELEGRAM SOZLAMALARI ----
// Admin panel orqali o'rnatiladi (localStorage)
function getTgSettings() {
  return {
    token: localStorage.getItem('tg_token') || '',
    chatId: localStorage.getItem('tg_chat_id') || ''
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
  
  // LocalStorage'dan ham kurslarni olish (admin qo'shishi uchun)
  const savedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
  const allCourses = [...COURSES, ...savedCourses];
  
  grid.innerHTML = allCourses.map(c => `
    <div class="course-card fade-in">
      <div class="cc-icon">${c.icon}</div>
      <div class="cc-tag">${c.tag}</div>
      <div class="cc-title">${c.title}</div>
      <div class="cc-desc">${c.desc}</div>
      <ul class="cc-features">
        ${c.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <div class="cc-footer">
        <div class="cc-price">${c.price}</div>
        <button class="cc-btn open-modal" data-course="${c.course}">Yozilish →</button>
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
  const { token, chatId } = getTgSettings();
  
  if (!token || !chatId) {
    // Token yo'q bo'lsa, faqat localStorage'ga saqlaydi
    return { ok: true, offline: true };
  }
  
  const time = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });
  const text = `📚 <b>YANGI ARIZA — Ahsan Ta'lim</b>

👤 <b>Ism:</b> ${data.name}
📞 <b>Telefon:</b> ${data.phone}
🎓 <b>Kurs:</b> ${data.course}
💬 <b>Izoh:</b> ${data.msg || '—'}
🕐 <b>Vaqt:</b> ${time}`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
    });
    return await res.json();
  } catch {
    return { ok: false };
  }
}

function saveApplication(data) {
  const apps = JSON.parse(localStorage.getItem('applications') || '[]');
  apps.unshift({
    id: Date.now(),
    ...data,
    status: 'new',
    date: new Date().toISOString()
  });
  localStorage.setItem('applications', JSON.stringify(apps));
}

// ---- MODAL FORM ----
document.getElementById('modal-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('modal-form-btn');
  const name = document.getElementById('m-name').value.trim();
  const phone = document.getElementById('m-phone').value.trim();
  const course = document.getElementById('modal-course-selected').value;
  
  if (!name || !phone) return;
  
  btn.textContent = '⏳ Yuborilmoqda...';
  btn.disabled = true;
  
  const data = { name, phone, course: course || 'Ko\'rsatilmagan', msg: '' };
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

// ---- FAQ ----
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

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  initFadeIn();
  animateCounters();
});
