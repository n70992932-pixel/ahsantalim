// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  if (window.loadDataFromFirebase) {
    await window.loadDataFromFirebase();
  }
  initDefaultData();
  renderDashboard();
  bindEvents();
});

// --- DATA LAYER ---
const defaultData = {
  admin_pwd: 'admin',
  site_hero: {
    badge: "O'quv Markazi #1 Toshkentda",
    title: "Kelajagingizga Ahsan Ta'lim bilan investitsiya qiling",
    desc: "Arab tili, Ingliz tili (IELTS) va Tarix fanlaridan professional ta'lim oling. 500+ muvaffaqiyatli bitiruvchi!",
    stats: [
      {num: 500, label: "Bitiruvchi"},
      {num: 5, label: "Yil tajriba"},
      {num: 95, label: "% muvaffaqiyat"}
    ]
  },
  site_about: {
    title: "Nima uchun Ahsan Ta'lim?",
    desc: "Biz har bir o'quvchining muvaffaqiyatini o'z muvaffaqiyatimiz deb bilamiz.",
    years: "5+",
    features: [
      {icon: "👨‍🏫", title: "Tajribali O'qituvchilar", desc: "10+ yillik tajribaga ega"},
      {icon: "📊", title: "Natijaga Kafolat", desc: "3 oy ichida natija"},
      {icon: "🕐", title: "Qulay Jadval", desc: "Ertalab, tushdan keyin va kechki"},
      {icon: "👥", title: "Kichik Guruhlar", desc: "8-12 kishilik guruhlar"}
    ]
  },
  site_teachers: [
    {
      id: 1,
      name: "Ustoz Abdulloh",
      subject: "Arab tili",
      exp: "Madina universiteti bitiruvchisi • 8 yil tajriba",
      tags: ["Sarf", "Nahv", "Muloqot"],
      image: "",
      emoji: "👨‍🏫"
    }
  ],
  site_testimonials: [
    {
      id: 1,
      name: "Muhammadumar",
      course: "IELTS 7.5",
      text: "Ahsan Ta'limda 6 oy o'qib, IELTSdan 7.5 oldim. O'qituvchilarning yondashuvi juda professional.",
      stars: 5,
      emoji: "👦"
    },
    {
      id: 2,
      name: "Oysha",
      course: "Arab tili",
      text: "Arab tilida o'qish va yozishni atigi 2 oyda to'liq o'zlashtirdim. Katta rahmat!",
      stars: 5,
      emoji: "🧕"
    },
    {
      id: 3,
      name: "Javohir",
      course: "Tarix (DTM)",
      text: "Tarix fanidan tayyorlanish shunchalik qiziqarli bo'ladi deb o'ylamagandim. Imtihondan 100% natija qildim.",
      stars: 5,
      emoji: "👨‍🎓"
    }
  ],
  site_faq: [
    {
      id: 1,
      question: "Kurslar qaysi darajadan boshlanadi?",
      answer: "Bizda boshlang'ich (Beginner) darajadan tortib, yuqori darajagacha bo'lgan guruhlar mavjud. Har bir o'quvchi daraja aniqlash testidan o'tadi."
    },
    {
      id: 2,
      question: "Darslar haftada necha kun bo'ladi?",
      answer: "Darslar haftada 3 marta, har bir dars 1.5 soatdan davom etadi. Bundan tashqari yakshanba kungi qo'shimcha 'Speaking club' va amaliyot darslari ham mavjud."
    },
    {
      id: 3,
      question: "Oflayn darslar qayerda o'tiladi?",
      answer: "Oflayn darslarimiz Toshkent shahridagi zamonaviy va barcha sharoitlarga ega shinam o'quv xonalarimizda bo'lib o'tadi."
    }
  ],
  site_contact: {
    address: "Toshkent shahar, Mirzo Ulug'bek tumani",
    phone: "+998 90 123 45 67",
    hours: "Du-Shan: 08:00 — 21:00",
    telegram: "@ahsantalim",
    telegram_link: "https://t.me/ahsantalim"
  },
  courses: [],
  applications: [],
  tg_token: '',
  tg_chat_id: ''
};

function initDefaultData() {
  if (!window.siteDataCache) window.siteDataCache = {};
  for (let key in defaultData) {
    if (window.siteDataCache[key] === undefined) {
      window.siteDataCache[key] = defaultData[key];
      // We don't necessarily need to push defaults to Firebase immediately, 
      // they will be saved when the admin edits something.
    }
  }
}

function getData(key, isJson = true) {
  if (window.siteDataCache && window.siteDataCache[key] !== undefined) {
    return window.siteDataCache[key];
  }
  return null;
}

function setData(key, val, isJson = true) {
  if (window.saveDataToFirebase) {
    window.saveDataToFirebase(key, val);
  } else if (window.siteDataCache) {
    window.siteDataCache[key] = val;
  }
}

// --- AUTH ---
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    if (!document.querySelector('.nav-item.active')) {
      loadPage('dashboard');
    }
  } else {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('admin-app').style.display = 'none';
  }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const pwd = document.getElementById('login-pwd').value;
  const btn = document.getElementById('login-btn');
  const errorDiv = document.getElementById('login-error');
  
  errorDiv.style.display = 'none';
  btn.innerText = 'Kirilmoqda...';
  btn.disabled = true;
  
  try {
    await firebase.auth().signInWithEmailAndPassword(email, pwd);
  } catch (err) {
    console.error(err);
    errorDiv.innerText = "Email yoki parol xato!";
    errorDiv.style.display = 'block';
  } finally {
    btn.innerText = 'Tizimga kirish';
    btn.disabled = false;
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  firebase.auth().signOut();
});

// --- NAVIGATION ---
const sidebar = document.getElementById('sidebar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
mobileMenuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      if (window.innerWidth <= 992) sidebar.classList.remove('show');
      loadPage(item.dataset.page);
    });
  });

  document.getElementById('app-search').addEventListener('input', renderApplications);
  document.getElementById('app-filter').addEventListener('change', renderApplications);
  
  // Forms
  document.getElementById('hero-form').addEventListener('submit', saveHero);
  document.getElementById('about-form').addEventListener('submit', saveAbout);
  document.getElementById('contact-form').addEventListener('submit', saveContact);
  // document.getElementById('pwd-settings-form').addEventListener('submit', savePassword);
}

function loadPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + pageId).classList.add('active');
  
  const titles = {
    dashboard: {t: 'Dashboard', s: "Umumiy statistika va ma'lumotlar"},
    applications: {t: 'Arizalar', s: "Kelib tushgan barcha arizalar"},
    hero: {t: 'Hero Bo\'limi', s: "Asosiy sahifa yuqori qismini tahrirlash"},
    about: {t: 'Biz haqimizda', s: "Markaz haqida ma'lumotlar"},
    teachers: {t: 'Ustozlar', s: "O'qituvchilar jamoasini boshqarish"},
    courses: {t: 'Kurslar', s: "O'quv kurslarini boshqarish"},
    testimonials: {t: 'Fikrlar', s: "O'quvchilar izohlari"},
    faq: {t: 'FAQ', s: "Ko'p beriladigan savollar"},
    contact: {t: 'Aloqa', s: "Bog'lanish ma'lumotlari"},
    settings: {t: 'Sozlamalar', s: "Tizim sozlamalari"}
  };
  
  if (titles[pageId]) {
    document.getElementById('page-title').textContent = titles[pageId].t;
    document.getElementById('page-subtitle').textContent = titles[pageId].s;
  }
  
  updateNavBadge();

  if (pageId === 'dashboard') renderDashboard();
  if (pageId === 'applications') renderApplications();
  if (pageId === 'hero') renderHeroForm();
  if (pageId === 'about') renderAboutForm();
  if (pageId === 'teachers') renderTeachers();
  if (pageId === 'courses') renderCourses();
  if (pageId === 'testimonials') renderTestimonials();
  if (pageId === 'faq') renderFaq();
  if (pageId === 'contact') renderContactForm();
  if (pageId === 'settings') renderSettings();
}

function updateNavBadge() {
  const apps = getData('applications') || [];
  const newCount = apps.filter(a => a.status === 'new').length;
  const badge = document.getElementById('nav-new-count');
  badge.textContent = newCount;
  badge.style.display = newCount > 0 ? 'inline-block' : 'none';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// --- UTILS ---
function generateId() {
  return Date.now();
}

function formatDate(ds) {
  const d = new Date(ds);
  return d.toLocaleDateString('uz-UZ') + ' ' + d.toLocaleTimeString('uz-UZ', {hour: '2-digit', minute:'2-digit'});
}

function getStatusBadge(status) {
  const map = {
    'new': '<span class="badge badge-new">Yangi</span>',
    'called': '<span class="badge badge-called">Bog\'lanildi</span>',
    'enrolled': '<span class="badge badge-enrolled">Qabul qilindi</span>',
    'cancelled': '<span class="badge badge-cancelled">Bekor qilindi</span>'
  };
  return map[status] || map['new'];
}

// --- MODALS ---
const genericModal = document.getElementById('generic-modal');
const modalBody = document.getElementById('modal-body');
const modalTitle = document.getElementById('modal-title');

function openModal(title, htmlContent) {
  modalTitle.textContent = title;
  modalBody.innerHTML = htmlContent;
  genericModal.classList.add('active');
}

function closeModal() {
  genericModal.classList.remove('active');
}

// --- DASHBOARD ---
function renderDashboard() {
  const apps = getData('applications') || [];
  const courses = getData('courses') || [];
  const teachers = getData('site_teachers') || [];
  
  document.getElementById('stat-new').textContent = apps.filter(a => a.status === 'new').length;
  document.getElementById('stat-called').textContent = apps.filter(a => a.status === 'called').length;
  document.getElementById('stat-enrolled').textContent = apps.filter(a => a.status === 'enrolled').length;
  document.getElementById('stat-courses').textContent = courses.length;
  document.getElementById('stat-teachers').textContent = teachers.length;
  
  const recent = apps.sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const tbody = document.getElementById('dashboard-recent-table');
  tbody.innerHTML = '';
  
  if (recent.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">Arizalar yo\'q</td></tr>';
    return;
  }
  
  recent.forEach(app => {
    tbody.innerHTML += `
      <tr>
        <td>${app.name}</td>
        <td>${app.phone}</td>
        <td>${app.course || 'Boshqa'}</td>
        <td>${getStatusBadge(app.status)}</td>
        <td style="font-size:13px; color:var(--text-secondary)">${formatDate(app.date)}</td>
      </tr>
    `;
  });
}

// --- APPLICATIONS ---
function renderApplications() {
  const apps = getData('applications') || [];
  const search = document.getElementById('app-search').value.toLowerCase();
  const filter = document.getElementById('app-filter').value;
  
  let filtered = apps.sort((a,b) => new Date(b.date) - new Date(a.date));
  
  if (filter !== 'all') {
    filtered = filtered.filter(a => a.status === filter);
  }
  if (search) {
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(search) || 
      a.phone.toLowerCase().includes(search)
    );
  }
  
  const tbody = document.getElementById('app-table-body');
  tbody.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px 0;">Arizalar topilmadi</td></tr>';
    return;
  }
  
  filtered.forEach(app => {
    tbody.innerHTML += `
      <tr>
        <td>
          <div style="font-weight:600">${app.name}</div>
          <div style="font-size:13px; color:var(--text-secondary)">${app.phone}</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:5px;">${app.age ? 'Yosh: ' + app.age : ''} ${app.gender ? ' | Jins: ' + app.gender : ''}</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:5px;">${formatDate(app.date)}</div>
        </td>
        <td>
          <div>${app.course || 'Boshqa'}</div>
          ${app.message ? `<div style="font-size:13px; color:var(--text-secondary); margin-top:5px;">"${app.message}"</div>` : ''}
        </td>
        <td>${getStatusBadge(app.status)}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="openStatusModal('${app.id}', '${app.status}')">Holatni o'zgartirish</button>
          <button class="btn btn-danger btn-sm" onclick="deleteApp('${app.id}')">🗑</button>
        </td>
      </tr>
    `;
  });
}

const statusModal = document.getElementById('status-modal');
function openStatusModal(id, currentStatus) {
  document.getElementById('status-modal-id').value = id;
  document.getElementById('status-modal-select').value = currentStatus;
  statusModal.classList.add('active');
}
function closeStatusModal() {
  statusModal.classList.remove('active');
}
function saveStatus() {
  const id = document.getElementById('status-modal-id').value;
  const newStatus = document.getElementById('status-modal-select').value;
  const apps = getData('applications');
  const idx = apps.findIndex(a => a.id == id);
  if (idx !== -1) {
    apps[idx].status = newStatus;
    setData('applications', apps);
    renderApplications();
    updateNavBadge();
    showToast('Holat o\'zgartirildi');
  }
  closeStatusModal();
}
function deleteApp(id) {
  if (confirm("Ushbu arizani o'chirishni xohlaysizmi?")) {
    let apps = getData('applications');
    apps = apps.filter(a => a.id != id);
    setData('applications', apps);
    renderApplications();
    updateNavBadge();
    showToast('Ariza o\'chirildi');
  }
}

// --- HERO FORM ---
function renderHeroForm() {
  const hero = getData('site_hero');
  if (!hero) return;
  document.getElementById('hero-badge').value = hero.badge || '';
  document.getElementById('hero-title').value = hero.title || '';
  document.getElementById('hero-desc').value = hero.desc || '';
  
  if (hero.stats && hero.stats.length >= 3) {
    document.getElementById('hero-stat1-num').value = hero.stats[0].num;
    document.getElementById('hero-stat1-label').value = hero.stats[0].label;
    document.getElementById('hero-stat2-num').value = hero.stats[1].num;
    document.getElementById('hero-stat2-label').value = hero.stats[1].label;
    document.getElementById('hero-stat3-num').value = hero.stats[2].num;
    document.getElementById('hero-stat3-label').value = hero.stats[2].label;
  }
}

function saveHero(e) {
  e.preventDefault();
  const hero = {
    badge: document.getElementById('hero-badge').value,
    title: document.getElementById('hero-title').value,
    desc: document.getElementById('hero-desc').value,
    stats: [
      {num: document.getElementById('hero-stat1-num').value, label: document.getElementById('hero-stat1-label').value},
      {num: document.getElementById('hero-stat2-num').value, label: document.getElementById('hero-stat2-label').value},
      {num: document.getElementById('hero-stat3-num').value, label: document.getElementById('hero-stat3-label').value}
    ]
  };
  setData('site_hero', hero);
  showToast('Saqlandi');
}

// --- ABOUT FORM ---
function renderAboutForm() {
  const about = getData('site_about');
  if (!about) return;
  document.getElementById('about-title').value = about.title || '';
  document.getElementById('about-desc').value = about.desc || '';
  document.getElementById('about-years').value = about.years || '';
  
  const container = document.getElementById('about-features-container');
  container.innerHTML = '';
  
  const features = about.features || [];
  for (let i = 0; i < 4; i++) {
    const f = features[i] || {icon: '', title: '', desc: ''};
    container.innerHTML += `
      <div class="form-card">
        <label>Afzallik ${i+1}</label>
        <div class="grid-2 mb-2">
          <input type="text" class="form-control" id="about-f-icon-${i}" placeholder="Emoji/Icon" value="${f.icon}" required>
          <input type="text" class="form-control" id="about-f-title-${i}" placeholder="Sarlavha" value="${f.title}" required>
        </div>
        <input type="text" class="form-control" id="about-f-desc-${i}" placeholder="Qisqacha ta'rif" value="${f.desc}" required>
      </div>
    `;
  }
}

function saveAbout(e) {
  e.preventDefault();
  const features = [];
  for (let i = 0; i < 4; i++) {
    features.push({
      icon: document.getElementById(`about-f-icon-${i}`).value,
      title: document.getElementById(`about-f-title-${i}`).value,
      desc: document.getElementById(`about-f-desc-${i}`).value
    });
  }
  
  const about = {
    title: document.getElementById('about-title').value,
    desc: document.getElementById('about-desc').value,
    years: document.getElementById('about-years').value,
    features: features
  };
  setData('site_about', about);
  showToast('Saqlandi');
}

// --- TEACHERS ---
function renderTeachers() {
  const teachers = getData('site_teachers') || [];
  const list = document.getElementById('teachers-list');
  list.innerHTML = '';
  
  teachers.forEach(t => {
    list.innerHTML += `
      <div class="card-item">
        <div class="card-item-header">
          ${t.image ? `<img src="${t.image}" class="card-img" alt="${t.name}">` : `<div class="card-img">${t.emoji || '👨‍🏫'}</div>`}
          <div>
            <div class="card-title">${t.name}</div>
            <div class="card-subtitle">${t.subject}</div>
          </div>
        </div>
        <div style="font-size:13px; color:var(--text-secondary); margin-bottom:10px;">${t.exp}</div>
        <div style="display:flex; flex-wrap:wrap; gap:5px;">
          ${(t.tags || []).map(tag => `<span class="badge badge-new">${tag.trim()}</span>`).join('')}
        </div>
        <div class="card-actions flex-end">
          <button class="btn btn-secondary btn-sm" onclick="editTeacher(${t.id})">Tahrirlash</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTeacher(${t.id})">O'chirish</button>
        </div>
      </div>
    `;
  });
}

function openTeacherModal(id = null) {
  let t = { id: '', name: '', subject: '', exp: '', tags: [], image: '', emoji: '👨‍🏫' };
  if (id) {
    const teachers = getData('site_teachers') || [];
    t = teachers.find(x => x.id == id) || t;
  }
  
  const html = `
    <form id="teacher-form" onsubmit="saveTeacher(event, ${id ? id : 'null'})">
      <div class="form-group">
        <label>Ism</label>
        <input type="text" class="form-control" id="t-name" value="${t.name}" required>
      </div>
      <div class="form-group">
        <label>Fan</label>
        <input type="text" class="form-control" id="t-subject" value="${t.subject}" required>
      </div>
      <div class="form-group">
        <label>Tajriba va ma'lumot</label>
        <input type="text" class="form-control" id="t-exp" value="${t.exp}" required>
      </div>
      <div class="form-group">
        <label>Teglar (vergul bilan ajrating)</label>
        <input type="text" class="form-control" id="t-tags" value="${(t.tags||[]).join(', ')}">
      </div>
      
      <div class="form-card">
        <label>Ustoz rasmi</label>
        <div class="flex-gap mb-2">
          <label><input type="radio" name="t-img-type" value="file" checked onchange="toggleTImgType()"> Fayl yuklash</label>
          <label><input type="radio" name="t-img-type" value="url" onchange="toggleTImgType()"> URL kiritish</label>
          <label><input type="radio" name="t-img-type" value="emoji" onchange="toggleTImgType()"> Faqat Emoji</label>
        </div>
        
        <div id="t-img-file-box">
          <input type="file" class="form-control" id="t-file" accept="image/*" onchange="handleTeacherFileUpload(this)">
        </div>
        
        <div id="t-img-url-box" style="display:none;">
          <input type="url" class="form-control" id="t-url" placeholder="https://..." value="${t.image && t.image.startsWith('http') ? t.image : ''}">
        </div>
        
        <div id="t-img-emoji-box" style="display:none;">
          <input type="text" class="form-control" id="t-emoji" placeholder="Masalan: 👨‍🏫" value="${t.emoji || '👨‍🏫'}">
        </div>
        
        <input type="hidden" id="t-base64" value="${t.image && t.image.startsWith('data:') ? t.image : ''}">
        
        <div class="mt-4">
          <p style="font-size:12px; color:var(--text-secondary); margin-bottom:5px;">Preview:</p>
          <img id="t-preview-img" src="${t.image}" style="width:100px; height:100px; object-fit:cover; border-radius:50%; display:${t.image ? 'block' : 'none'};">
        </div>
      </div>
      
      <button type="submit" class="btn btn-primary w-full mt-4">Saqlash</button>
    </form>
  `;
  openModal(id ? 'Ustozni tahrirlash' : 'Yangi ustoz', html);
  
  // Set initial radio state if it has an image
  if (t.image) {
    if (t.image.startsWith('http')) {
      document.querySelector('input[value="url"]').checked = true;
    } else {
      document.querySelector('input[value="file"]').checked = true;
    }
  } else {
    document.querySelector('input[value="emoji"]').checked = true;
  }
  toggleTImgType();
}

function toggleTImgType() {
  const type = document.querySelector('input[name="t-img-type"]:checked').value;
  document.getElementById('t-img-file-box').style.display = type === 'file' ? 'block' : 'none';
  document.getElementById('t-img-url-box').style.display = type === 'url' ? 'block' : 'none';
  document.getElementById('t-img-emoji-box').style.display = type === 'emoji' ? 'block' : 'none';
}

function handleTeacherFileUpload(input) {
  const preview = document.getElementById('t-preview-img');
  const base64Input = document.getElementById('t-base64');
  
  const file = input.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const maxSize = 300;
      let w = img.width, h = img.height;
      if (w > h) { if (w > maxSize) { h *= maxSize/w; w = maxSize; } }
      else { if (h > maxSize) { w *= maxSize/h; h = maxSize; } }
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const base64 = canvas.toDataURL('image/jpeg', 0.8);
      preview.src = base64;
      preview.style.display = 'block';
      base64Input.value = base64;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function saveTeacher(e, id) {
  e.preventDefault();
  let teachers = getData('site_teachers') || [];
  
  const type = document.querySelector('input[name="t-img-type"]:checked').value;
  let finalImage = '';
  if (type === 'file') finalImage = document.getElementById('t-base64').value;
  if (type === 'url') finalImage = document.getElementById('t-url').value;
  
  const tagsRaw = document.getElementById('t-tags').value;
  const tags = tagsRaw ? tagsRaw.split(',').map(x => x.trim()).filter(x => x) : [];
  
  const newData = {
    id: id || generateId(),
    name: document.getElementById('t-name').value,
    subject: document.getElementById('t-subject').value,
    exp: document.getElementById('t-exp').value,
    tags: tags,
    image: finalImage,
    emoji: document.getElementById('t-emoji').value || '👨‍🏫'
  };
  
  if (id) {
    const idx = teachers.findIndex(x => x.id == id);
    if (idx !== -1) teachers[idx] = newData;
  } else {
    teachers.push(newData);
  }
  
  setData('site_teachers', teachers);
  closeModal();
  renderTeachers();
  showToast('Saqlandi');
}

function editTeacher(id) { openTeacherModal(id); }
function deleteTeacher(id) {
  if (confirm("O'chirishni tasdiqlaysizmi?")) {
    let t = getData('site_teachers') || [];
    t = t.filter(x => x.id != id);
    setData('site_teachers', t);
    renderTeachers();
    showToast("O'chirildi");
  }
}


// --- COURSES ---
const DEFAULT_COURSES = [
  { id: 1, icon: '🕌', tag: 'Boshlang\'ich', title: 'Arab tili — Boshlang\'ich', desc: 'Arabcha alifbo, asosiy grammatika (Sarf va Nahv), kundalik muloqot va qur\'on imlo qoidalari.', features: ['Arabcha alifbo va harflar', 'Asosiy Sarf va Nahv', 'Kundalik muloqot', 'Qur\'on o\'qish asoslari'], price: '350,000 so\'m/oy', course: 'Arab tili (boshlang\'ich)' },
  { id: 2, icon: '📖', tag: 'O\'rta daraja', title: 'Arab tili — O\'rta daraja', desc: 'Murakkab grammatika, matn tahlili, yozma va og\'zaki muloqotni kuchaytirish.', features: ['Murakkab Nahv qoidalari', 'Matn tahlili', 'Essе yozish', 'Og\'zaki suhbat'], price: '400,000 so\'m/oy', course: 'Arab tili (o\'rta daraja)' },
  { id: 3, icon: '🇬🇧', tag: 'IELTS', title: 'Ingliz tili — IELTS', desc: 'IELTS imtihoniga to\'liq tayyorlov. Maqsad 6.0 dan 8.0 gacha. Intensiv amaliyot.', features: ['Listening & Reading', 'Writing Task 1 & 2', 'Speaking tayyorlov', 'Mock test sinovlari'], price: '500,000 so\'m/oy', course: 'Ingliz tili — IELTS tayyorlov' },
  { id: 4, icon: '💬', tag: 'General', title: 'Ingliz tili — Umumiy', desc: 'Kundalik muloqot, biznes ingliz tili, grammatika va talaffuz ustida ishlash.', features: ['Grammar & Vocabulary', 'Speaking skills', 'Listening practice', 'Business English'], price: '400,000 so\'m/oy', course: 'Ingliz tili (umumiy)' },
  { id: 5, icon: '📜', tag: 'DTM', title: 'Tarix — DTM Tayyorlov', desc: 'O\'zbekiston tarixi va Jahon tarixi bo\'yicha DTM imtihoniga intensiv tayyorlov kursi.', features: ['O\'zbekiston tarixi', 'Jahon tarixi', 'Test ishlash metodikasi', 'Arxiv hujjatlar tahlili'], price: '350,000 so\'m/oy', course: 'Tarix — DTM tayyorlov' },
  { id: 6, icon: '🎁', tag: 'Bepul', title: 'Bepul Konsultatsiya', desc: 'Qaysi kurs sizga mos ekanligini bilib oling. Tajribali mutaxassis bilan yuzma-yuz suhbat.', features: ['Daraja aniqlash testi', 'Shaxsiy yo\'l xaritasi', 'Kurs tavsiyasi', '30 daqiqa bepul'], price: 'BEPUL', course: 'Bepul konsultatsiya' }
];

function getCoursesList() {
  const c = getData('courses');
  if (!c || c.length === 0) return JSON.parse(JSON.stringify(DEFAULT_COURSES));
  return c;
}

function renderCourses() {
  const courses = getCoursesList();
  const list = document.getElementById('courses-list');
  list.innerHTML = '';
  
  courses.forEach(c => {
    list.innerHTML += `
      <div class="card-item">
        <div class="card-title mb-2">${c.title}</div>
        <div style="font-size:14px; color:var(--text-secondary); margin-bottom:15px;">${c.desc}</div>
        <div class="grid-2" style="font-size:13px;">
          <div><span class="ni">💰</span> ${c.price || ''}</div>
          <div><span class="ni">🏷️</span> ${c.tag || ''}</div>
        </div>
        <div class="card-actions flex-end mt-4">
          <button class="btn btn-secondary btn-sm" onclick="editCourse(${c.id})">Tahrirlash</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCourse(${c.id})">O'chirish</button>
        </div>
      </div>
    `;
  });
}

function openCourseModal(id = null) {
  let c = { id: '', title: '', desc: '', price: '', tag: '', icon: '📚', features: [], course: '' };
  if (id) {
    const courses = getCoursesList();
    c = courses.find(x => x.id == id) || c;
  }
  
  const html = `
    <form onsubmit="saveCourse(event, ${id ? id : 'null'})">
      <div class="form-group">
        <label>Sarlavha</label>
        <input type="text" class="form-control" id="c-title" value="${c.title}" required>
      </div>
      <div class="form-group">
        <label>Ta'rif</label>
        <textarea class="form-control" id="c-desc" required>${c.desc}</textarea>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Narxi</label>
          <input type="text" class="form-control" id="c-price" value="${c.price}">
        </div>
        <div class="form-group">
          <label>Yorliq (Tag)</label>
          <input type="text" class="form-control" id="c-tag" value="${c.tag}">
        </div>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Icon / Emoji</label>
          <input type="text" class="form-control" id="c-icon" value="${c.icon}">
        </div>
        <div class="form-group">
          <label>Forma uchun nom</label>
          <input type="text" class="form-control" id="c-course" value="${c.course}" placeholder="Arab tili (boshlang'ich)">
        </div>
      </div>
      <div class="form-group">
        <label>Xususiyatlar (vergul bilan ajrating)</label>
        <input type="text" class="form-control" id="c-features" value="${(c.features || []).join(', ')}">
      </div>
      <button type="submit" class="btn btn-primary w-full mt-4">Saqlash</button>
    </form>
  `;
  openModal(id ? 'Kursni tahrirlash' : 'Yangi kurs', html);
}

function saveCourse(e, id) {
  e.preventDefault();
  let items = getData('courses') || [];
  
  const newData = {
    id: id || generateId(),
    title: document.getElementById('c-title').value,
    desc: document.getElementById('c-desc').value,
    price: document.getElementById('c-price').value,
    tag: document.getElementById('c-tag').value,
    icon: document.getElementById('c-icon').value || '📚',
    course: document.getElementById('c-course').value,
    features: document.getElementById('c-features').value.split(',').map(s => s.trim()).filter(Boolean)
  };
  
  if (id) {
    const idx = items.findIndex(x => x.id == id);
    if (idx !== -1) items[idx] = newData;
  } else {
    items.push(newData);
  }
  setData('courses', items);
  closeModal();
  renderCourses();
  showToast('Saqlandi');
}

function editCourse(id) { openCourseModal(id); }
function deleteCourse(id) {
  if (confirm('Rostdan ham bu kursni o\'chirmoqchimisiz?')) {
    let arr = getCoursesList();
    arr = arr.filter(x => x.id != id);
    setData('courses', arr);
    renderCourses();
    showToast('O\'chirildi', 'error');
  }
}

// --- TESTIMONIALS ---
function renderTestimonials() {
  const items = getData('site_testimonials') || [];
  const list = document.getElementById('testimonials-list');
  list.innerHTML = '';
  
  items.forEach(t => {
    list.innerHTML += `
      <div class="card-item">
        <div class="flex-between mb-2">
          <div class="flex-gap">
            <div class="card-img" style="width:40px; height:40px; font-size:20px;">${t.emoji || '👦'}</div>
            <div>
              <div style="font-weight:600; font-size:14px;">${t.name}</div>
              <div style="font-size:12px; color:var(--text-secondary);">${t.course}</div>
            </div>
          </div>
          <div style="color:var(--gold)">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
        </div>
        <p style="font-size:14px; color:var(--text-secondary); line-height:1.5;">"${t.text}"</p>
        <div class="card-actions flex-end mt-4">
          <button class="btn btn-secondary btn-sm" onclick="editTestimonial(${t.id})">Tahrirlash</button>
          <button class="btn btn-danger btn-sm" onclick="deleteTestimonial(${t.id})">O'chirish</button>
        </div>
      </div>
    `;
  });
}

function openTestimonialModal(id = null) {
  let t = { id: '', name: '', course: '', text: '', stars: 5, emoji: '👦' };
  if (id) {
    const items = getData('site_testimonials') || [];
    t = items.find(x => x.id == id) || t;
  }
  
  const html = `
    <form onsubmit="saveTestimonial(event, ${id ? id : 'null'})">
      <div class="grid-2">
        <div class="form-group">
          <label>Ism va yosh</label>
          <input type="text" class="form-control" id="ts-name" value="${t.name}" required>
        </div>
        <div class="form-group">
          <label>Kurs nomi</label>
          <input type="text" class="form-control" id="ts-course" value="${t.course}" required>
        </div>
      </div>
      <div class="form-group">
        <label>Fikr matni</label>
        <textarea class="form-control" id="ts-text" required>${t.text}</textarea>
      </div>
      <div class="grid-2">
        <div class="form-group">
          <label>Baho (1-5)</label>
          <input type="number" min="1" max="5" class="form-control" id="ts-stars" value="${t.stars}" required>
        </div>
        <div class="form-group">
          <label>Emoji (Avatar o'rniga)</label>
          <input type="text" class="form-control" id="ts-emoji" value="${t.emoji}">
        </div>
      </div>
      <button type="submit" class="btn btn-primary w-full mt-4">Saqlash</button>
    </form>
  `;
  openModal(id ? 'Fikrni tahrirlash' : 'Yangi fikr', html);
}

function saveTestimonial(e, id) {
  e.preventDefault();
  let items = getData('site_testimonials') || [];
  
  const newData = {
    id: id || generateId(),
    name: document.getElementById('ts-name').value,
    course: document.getElementById('ts-course').value,
    text: document.getElementById('ts-text').value,
    stars: parseInt(document.getElementById('ts-stars').value),
    emoji: document.getElementById('ts-emoji').value || '👦'
  };
  
  if (id) {
    const idx = items.findIndex(x => x.id == id);
    if (idx !== -1) items[idx] = newData;
  } else {
    items.push(newData);
  }
  setData('site_testimonials', items);
  closeModal();
  renderTestimonials();
  showToast('Saqlandi');
}

function editTestimonial(id) { openTestimonialModal(id); }
function deleteTestimonial(id) {
  if (confirm("O'chirishni tasdiqlaysizmi?")) {
    let arr = getData('site_testimonials') || [];
    arr = arr.filter(x => x.id != id);
    setData('site_testimonials', arr);
    renderTestimonials();
    showToast("O'chirildi");
  }
}

// --- FAQ ---
function renderFaq() {
  const items = getData('site_faq') || [];
  const list = document.getElementById('faq-list');
  list.innerHTML = '';
  
  items.forEach(f => {
    list.innerHTML += `
      <div class="faq-item">
        <div class="faq-q">${f.question}</div>
        <div class="faq-a">${f.answer}</div>
        <div class="flex-end gap-2">
          <button class="btn btn-secondary btn-sm" onclick="editFaq(${f.id})">Tahrirlash</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFaq(${f.id})">O'chirish</button>
        </div>
      </div>
    `;
  });
}

function openFaqModal(id = null) {
  let f = { id: '', question: '', answer: '' };
  if (id) {
    const items = getData('site_faq') || [];
    f = items.find(x => x.id == id) || f;
  }
  
  const html = `
    <form onsubmit="saveFaq(event, ${id ? id : 'null'})">
      <div class="form-group">
        <label>Savol</label>
        <input type="text" class="form-control" id="f-q" value="${f.question}" required>
      </div>
      <div class="form-group">
        <label>Javob</label>
        <textarea class="form-control" id="f-a" required>${f.answer}</textarea>
      </div>
      <button type="submit" class="btn btn-primary w-full mt-4">Saqlash</button>
    </form>
  `;
  openModal(id ? 'Savolni tahrirlash' : 'Yangi savol', html);
}

function saveFaq(e, id) {
  e.preventDefault();
  let items = getData('site_faq') || [];
  
  const newData = {
    id: id || generateId(),
    question: document.getElementById('f-q').value,
    answer: document.getElementById('f-a').value
  };
  
  if (id) {
    const idx = items.findIndex(x => x.id == id);
    if (idx !== -1) items[idx] = newData;
  } else {
    items.push(newData);
  }
  setData('site_faq', items);
  closeModal();
  renderFaq();
  showToast('Saqlandi');
}

function editFaq(id) { openFaqModal(id); }
function deleteFaq(id) {
  if (confirm("O'chirishni tasdiqlaysizmi?")) {
    let arr = getData('site_faq') || [];
    arr = arr.filter(x => x.id != id);
    setData('site_faq', arr);
    renderFaq();
    showToast("O'chirildi");
  }
}

// --- CONTACT ---
function renderContactForm() {
  const c = getData('site_contact');
  if (!c) return;
  document.getElementById('contact-address').value = c.address || '';
  document.getElementById('contact-phone').value = c.phone || '';
  document.getElementById('contact-hours').value = c.hours || '';
  document.getElementById('contact-tg').value = c.telegram || '';
  document.getElementById('contact-link').value = c.telegram_link || '';
}
function saveContact(e) {
  e.preventDefault();
  const c = {
    address: document.getElementById('contact-address').value,
    phone: document.getElementById('contact-phone').value,
    hours: document.getElementById('contact-hours').value,
    telegram: document.getElementById('contact-tg').value,
    telegram_link: document.getElementById('contact-link').value
  };
  setData('site_contact', c);
  showToast('Saqlandi');
}

// --- SETTINGS ---
function renderSettings() {
  document.getElementById('set-pwd-old').value = '';
  document.getElementById('set-pwd-new').value = '';
}


async function sendToGroup() {
  const chat_id = document.getElementById('group-chat-id').value.trim();
  const text = document.getElementById('group-message').value.trim();
  

  if (!chat_id) {
    showToast('Guruh ID yoki Username ni kiriting', true);
    return;
  }
  
  const siteUrl = window.location.origin;
  
  const payload = {
    chat_id: chat_id,
    text: text,
    reply_markup: {
      inline_keyboard: [[
        {
          text: "📝 Saytga kirish va Ro'yxatdan o'tish",
          web_app: { url: siteUrl }
        }
      ]]
    }
  };
  
  const btn = document.querySelector('button[onclick="sendToGroup()"]');
  const oldText = btn.innerText;
  btn.innerText = 'Yuborilmoqda...';
  btn.disabled = true;
  
  try {
    const res = await fetch('/api/admin-send', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    if (data.ok) {
      showToast('Xabar guruhga muvaffaqiyatli yuborildi!');
      document.getElementById('group-chat-id').value = '';
    } else {
      showToast('Xatolik: ' + data.description, true);
    }
  } catch (err) {
    showToast('Xatolik yuz berdi: ' + err.message, true);
  } finally {
    btn.innerText = oldText;
    btn.disabled = false;
  }
}
