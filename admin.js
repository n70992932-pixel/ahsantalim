// ============================================
// AHSAN TA'LIM — Admin JavaScript
// ============================================
// ---- AUTHENTICATION ----
const DEFAULT_PWD = 'admin'; // Dastlabki parol
function checkAuth() {
  return sessionStorage.getItem('admin_auth') === 'true';
}
function getPassword() {
  return localStorage.getItem('admin_pwd') || DEFAULT_PWD;
}
// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  if (checkAuth()) {
    showAdmin();
  } else {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('admin-app').style.display = 'none';
  }
});
// ---- LOGIN LOGIC ----
document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const pwd = document.getElementById('admin-pwd').value;
  if (pwd === getPassword()) {
    sessionStorage.setItem('admin_auth', 'true');
    showAdmin();
  } else {
    const err = document.getElementById('login-error');
    err.style.display = 'block';
    setTimeout(() => err.style.display = 'none', 3000);
  }
});
function showAdmin() {
  document.getElementById('login-page').style.display = 'none';
  document.getElementById('admin-app').style.display = 'block';
  loadData();
  switchPage('dashboard');
  loadSettings();
}
// ---- LOGOUT ----
document.getElementById('logout-btn')?.addEventListener('click', () => {
  sessionStorage.removeItem('admin_auth');
  window.location.reload();
});
// ---- NAVIGATION ----
const pages = {
  dashboard: { title: 'Dashboard', sub: 'Umumiy statistika va ma\'lumotlar' },
  applications: { title: 'Arizalar', sub: 'Barcha kelib tushgan arizalar ro\'yxati' },
  courses: { title: 'Kurslar', sub: 'O\'quv markazi kurslarini boshqarish' },
  settings: { title: 'Sozlamalar', sub: 'Tizim va xavfsizlik sozlamalari' }
};
function switchPage(pageId) {
  // Update Nav
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-page="${pageId}"]`)?.classList.add('active');
  
  // Update Title
  document.getElementById('page-title').textContent = pages[pageId].title;
  document.getElementById('page-subtitle').textContent = pages[pageId].sub;
  
  // Show Page
  document.querySelectorAll('.admin-page').forEach(el => el.classList.remove('active'));
  document.getElementById(`page-${pageId}`).classList.add('active');
  
  if (pageId === 'courses') renderCoursesAdmin();
}
document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', () => switchPage(el.dataset.page));
});
// ---- DATA MANAGEMENT ----
function getApplications() {
  return JSON.parse(localStorage.getItem('applications') || '[]');
}
function saveApplications(data) {
  localStorage.setItem('applications', JSON.stringify(data));
  loadData(); // Re-render
}
function loadData() {
  const apps = getApplications();
  
  // Dashboard Stats
  const newApps = apps.filter(a => a.status === 'new').length;
  document.getElementById('stat-new').textContent = newApps;
  document.getElementById('nav-new-count').textContent = newApps;
  if(newApps === 0) document.getElementById('nav-new-count').style.display = 'none';
  else document.getElementById('nav-new-count').style.display = 'block';
  
  document.getElementById('stat-called').textContent = apps.filter(a => a.status === 'called').length;
  document.getElementById('stat-enrolled').textContent = apps.filter(a => a.status === 'enrolled').length;
  
  // Dashboard Table (Recent 5)
  renderTable(apps.slice(0, 5), 'dashboard-recent-table', true);
  
  // Applications Table
  filterAndRenderApps();
}
const statusLabels = {
  new: '<span class="status-badge new">Yangi</span>',
  called: '<span class="status-badge called">Bog\'lanildi</span>',
  enrolled: '<span class="status-badge enrolled">Qabul</span>',
  cancelled: '<span class="status-badge cancelled">Bekor</span>'
};
function renderTable(data, tbodyId, isCompact = false) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  
  if (data.length === 0) {
    if(!isCompact) document.getElementById('app-empty').style.display = 'block';
    tbody.innerHTML = '';
    return;
  }
  
  if(!isCompact) document.getElementById('app-empty').style.display = 'none';
  
  tbody.innerHTML = data.map(app => {
    const date = new Date(app.date).toLocaleString('uz-UZ', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit' 
    });
    
    if (isCompact) {
      return `
        <tr>
          <td style="font-weight: 600;">${app.name}</td>
          <td>${app.phone}</td>
          <td><span style="font-size: 0.75rem; background: var(--bg); padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border-l);">${app.course}</span></td>
          <td>${statusLabels[app.status]}</td>
          <td style="color: var(--text2);">${date}</td>
        </tr>
      `;
    }
    
    return `
      <tr>
        <td style="color: var(--text2); font-size: 0.75rem;">#${app.id.toString().slice(-6)}</td>
        <td>
          <div style="font-weight: 600; margin-bottom: 4px;">${app.name}</div>
          <a href="tel:${app.phone}" style="color: var(--gold); font-size: 0.8rem; font-weight: 500;">📞 ${app.phone}</a>
        </td>
        <td>
          <div style="font-size: 0.85rem; font-weight: 600; margin-bottom: 4px;">${app.course}</div>
          <div style="color: var(--text3); font-size: 0.8rem; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${app.msg || 'Xabar yo\'q'}">
            ${app.msg || '—'}
          </div>
        </td>
        <td>${statusLabels[app.status]}</td>
        <td>
          <div class="action-btns">
            <button class="act-btn" onclick="openStatusModal(${app.id}, '${app.status}')" title="Holatni o'zgartirish">✏️</button>
            <button class="act-btn delete" onclick="deleteApp(${app.id})" title="O'chirish">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}
// ---- APPLICATIONS FILTER & SEARCH ----
function filterAndRenderApps() {
  const apps = getApplications();
  const search = document.getElementById('app-search')?.value.toLowerCase();
  const filter = document.getElementById('app-filter')?.value;
  
  let filtered = apps;
  
  if (filter && filter !== 'all') {
    filtered = filtered.filter(a => a.status === filter);
  }
  
  if (search) {
    filtered = filtered.filter(a => 
      a.name.toLowerCase().includes(search) || 
      a.phone.includes(search)
    );
  }
  
  renderTable(filtered, 'app-table-body', false);
}
document.getElementById('app-search')?.addEventListener('input', filterAndRenderApps);
document.getElementById('app-filter')?.addEventListener('change', filterAndRenderApps);
// ---- ACTIONS ----
function deleteApp(id) {
  if(confirm('Rostdan ham bu arizani o\'chirmoqchimisiz?')) {
    let apps = getApplications();
    apps = apps.filter(a => a.id !== id);
    saveApplications(apps);
    showNotify('success', 'O\'chirildi!');
  }
}
function clearAllData() {
  if(confirm('DIQQAT! Barcha arizalar o\'chib ketadi. Ishonchingiz komilmi?')) {
    localStorage.removeItem('applications');
    loadData();
    showNotify('success', 'Barcha ma\'lumotlar tozalandi!');
  }
}
// ---- STATUS MODAL ----
function openStatusModal(id, currentStatus) {
  document.getElementById('status-modal-id').value = id;
  document.getElementById('status-modal-select').value = currentStatus;
  document.getElementById('status-modal').classList.add('active');
}
function closeStatusModal() {
  document.getElementById('status-modal').classList.remove('active');
}
function saveStatus() {
  const id = parseInt(document.getElementById('status-modal-id').value);
  const newStatus = document.getElementById('status-modal-select').value;
  
  let apps = getApplications();
  const index = apps.findIndex(a => a.id === id);
  if (index !== -1) {
    apps[index].status = newStatus;
    saveApplications(apps);
    showNotify('success', 'Holat yangilandi!');
  }
  closeStatusModal();
}
// ---- COURSES ADMIN RENDER ----
const DEFAULT_COURSES = [
  { icon: '🕌', title: 'Arab tili (boshlang\'ich)', price: '350,000' },
  { icon: '📖', title: 'Arab tili (o\'rta daraja)', price: '400,000' },
  { icon: '🇬🇧', title: 'Ingliz tili (IELTS)', price: '500,000' },
  { icon: '💬', title: 'Ingliz tili (umumiy)', price: '400,000' },
  { icon: '📜', title: 'Tarix (DTM)', price: '350,000' },
  { icon: '🎁', title: 'Bepul konsultatsiya', price: '0' }
];
function renderCoursesAdmin() {
  const wrap = document.getElementById('courses-admin-list');
  if(!wrap) return;
  
  wrap.innerHTML = DEFAULT_COURSES.map(c => `
    <div class="course-admin-card">
      <div class="cac-head">
        <div class="cac-icon">${c.icon}</div>
        <div class="cac-actions">
          <button class="act-btn" title="Tahrirlash" onclick="alert('Saytning kodidan o\'zgartirish mumkin')">✏️</button>
        </div>
      </div>
      <div class="cac-title">${c.title}</div>
      <div class="cac-price">${c.price} so'm</div>
    </div>
  `).join('');
}
// ---- SETTINGS ----
function loadSettings() {
  document.getElementById('set-tg-token').value = localStorage.getItem('tg_token') || '';
  document.getElementById('set-tg-chat').value = localStorage.getItem('tg_chat_id') || '';
}
document.getElementById('tg-settings-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('tg_token', document.getElementById('set-tg-token').value.trim());
  localStorage.setItem('tg_chat_id', document.getElementById('set-tg-chat').value.trim());
  showNotify('success', 'Telegram sozlamalari saqlandi!');
});
document.getElementById('pwd-settings-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldP = document.getElementById('set-pwd-old').value;
  const newP = document.getElementById('set-pwd-new').value;
  
  if (oldP === getPassword()) {
    if (newP.length < 4) {
      showNotify('error', 'Parol kamida 4 ta belgidan iborat bo\'lishi kerak!');
      return;
    }
    localStorage.setItem('admin_pwd', newP);
    showNotify('success', 'Parol muvaffaqiyatli o\'zgartirildi!');
    document.getElementById('pwd-settings-form').reset();
  } else {
    showNotify('error', 'Joriy parol xato!');
  }
});
// ---- NOTIFY UTILS ----
function showNotify(type, text) {
  const el = document.getElementById('a-notify');
  el.className = `a-notify ${type} show`;
  document.getElementById('a-notify-msg').innerHTML = `${type === 'success' ? '✅' : '❌'} &nbsp; ${text}`;
  setTimeout(() => el.classList.remove('show'), 3000);
}
