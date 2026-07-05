document.addEventListener('DOMContentLoaded', () => {

  const CONTENT_ENDPOINT = '/.netlify/functions/get-content';
  const SAVE_ENDPOINT = '/.netlify/functions/save-content';
  const LOGIN_ENDPOINT = '/.netlify/functions/admin-login';
  const SESSION_KEY = 'ahsan_admin_password';

  const loginWrapper = document.getElementById('admin-login-wrapper');
  const adminApp = document.getElementById('admin-app');
  const loginForm = document.getElementById('admin-login-form');
  const passwordInput = document.getElementById('admin-password-input');
  const loginError = document.getElementById('admin-login-error');
  const logoutBtn = document.getElementById('admin-logout-btn');
  const saveBtn = document.getElementById('admin-save-btn');
  const saveStatus = document.getElementById('admin-save-status');

  let currentPassword = null;

  // ==========================================
  // Kichik yordamchi funksiyalar
  // ==========================================
  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function escapeAttr(str) {
    return (str || '').toString().replace(/"/g, '&quot;');
  }

  function field(container, name) {
    return container.querySelector(`[data-field="${name}"]`);
  }

  // ==========================================
  // LOGIN
  // ==========================================
  function tryLogin(password) {
    loginError.textContent = '';
    return fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200 && data.ok) {
          currentPassword = password;
          sessionStorage.setItem(SESSION_KEY, password);
          loginWrapper.style.display = 'none';
          adminApp.style.display = 'block';
          loadContent();
          return true;
        } else {
          loginError.textContent = data.error || 'Parol noto\'g\'ri.';
          return false;
        }
      })
      .catch(() => {
        loginError.textContent = 'Serverga ulanishda xatolik. Internetni tekshiring.';
        return false;
      });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      tryLogin(passwordInput.value);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem(SESSION_KEY);
      currentPassword = null;
      adminApp.style.display = 'none';
      loginWrapper.style.display = 'flex';
      passwordInput.value = '';
    });
  }

  // Sahifa qayta yuklanganda, agar shu brauzer sessiyasida avval parol
  // kiritilgan bo'lsa, qayta so'ramaymiz - avtomatik kirib boradi.
  const savedPassword = sessionStorage.getItem(SESSION_KEY);
  if (savedPassword) {
    tryLogin(savedPassword);
  }

  // ==========================================
  // TAB NAVIGATSIYA
  // ==========================================
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.admin-tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  // ==========================================
  // KONTENTNI YUKLASH VA FORMALARGA TO'LDIRISH
  // ==========================================
  function loadContent() {
    saveStatus.textContent = 'Kontent yuklanmoqda...';
    saveStatus.className = 'admin-save-status';
    fetch(CONTENT_ENDPOINT)
      .then(res => res.json())
      .then(content => {
        fillHero(content.hero || {});
        renderCourses(content.courses || []);
        renderNews(content.news || []);
        renderQuiz(content.quiz || []);
        saveStatus.textContent = '';
      })
      .catch(() => {
        saveStatus.textContent = 'Kontentni yuklashda xatolik yuz berdi.';
        saveStatus.className = 'admin-save-status error';
      });
  }

  function fillHero(hero) {
    document.getElementById('hero-tag-input').value = hero.tag || '';
    document.getElementById('hero-titleBefore-input').value = hero.titleBefore || '';
    document.getElementById('hero-titleGold-input').value = hero.titleGold || '';
    document.getElementById('hero-titleAfter-input').value = hero.titleAfter || '';
    document.getElementById('hero-desc-input').value = hero.desc || '';
  }

  // ==========================================
  // KURSLAR
  // ==========================================
  const coursesList = document.getElementById('courses-list');
  const CATEGORY_OPTIONS = [
    { value: 'arab', label: 'Arab tili' },
    { value: 'english', label: 'Ingliz tili' },
    { value: 'history', label: 'Tarix' },
    { value: 'bolalar', label: "Bolalar uchun" }
  ];

  function courseCardHTML(course) {
    const id = uid();
    const categoryOptionsHtml = CATEGORY_OPTIONS.map(opt =>
      `<option value="${opt.value}" ${course.category === opt.value ? 'selected' : ''}>${opt.label}</option>`
    ).join('');

    return `
      <div class="admin-item-card glass-card" data-uid="${id}">
        <button type="button" class="admin-item-remove" title="O'chirish">&times;</button>
        <div class="admin-field-row">
          <div class="admin-field-group">
            <label>Kategoriya (filter uchun)</label>
            <select class="form-control" data-field="category">${categoryOptionsHtml}</select>
          </div>
          <div class="admin-field-group">
            <label>Belgi (badge) — masalan "Boshlang'ich"</label>
            <input type="text" class="form-control" data-field="badge" value="${escapeAttr(course.badge)}">
          </div>
        </div>
        <div class="admin-field-row">
          <div class="admin-field-group">
            <label>Arabcha/qisqa sarlavha (ixtiyoriy)</label>
            <input type="text" class="form-control" data-field="titleArabic" value="${escapeAttr(course.titleArabic)}">
          </div>
          <div class="admin-field-group">
            <label>Kurs nomi</label>
            <input type="text" class="form-control" data-field="title" value="${escapeAttr(course.title)}">
          </div>
        </div>
        <div class="admin-field-group">
          <label>Tavsif</label>
          <textarea class="form-control" rows="2" data-field="desc">${course.desc || ''}</textarea>
        </div>
        <div class="admin-field-row">
          <div class="admin-field-group">
            <label>Davomiyligi — masalan "3 oy davomiyligida"</label>
            <input type="text" class="form-control" data-field="duration" value="${escapeAttr(course.duration)}">
          </div>
          <div class="admin-field-group">
            <label>Dars jadvali — masalan "Haftada 3 marta dars"</label>
            <input type="text" class="form-control" data-field="schedule" value="${escapeAttr(course.schedule)}">
          </div>
        </div>
        <div class="admin-field-group">
          <label>Narxi — masalan "450 000 so'm / oy"</label>
          <input type="text" class="form-control" data-field="price" value="${escapeAttr(course.price)}">
        </div>
        <div class="admin-field-group">
          <label>Ariza uchun kurs kaliti (Telegramga shu nom bilan yuboriladi)</label>
          <input type="text" class="form-control" data-field="courseKey" value="${escapeAttr(course.courseKey)}">
        </div>
      </div>
    `;
  }

  function renderCourses(courses) {
    coursesList.innerHTML = courses.map(courseCardHTML).join('');
  }

  document.getElementById('add-course-btn').addEventListener('click', () => {
    coursesList.insertAdjacentHTML('beforeend', courseCardHTML({}));
  });

  coursesList.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-item-remove')) {
      e.target.closest('.admin-item-card').remove();
    }
  });

  function collectCourses() {
    return Array.from(coursesList.querySelectorAll('.admin-item-card')).map(card => {
      const title = field(card, 'title').value.trim();
      const courseKeyRaw = field(card, 'courseKey').value.trim();
      return {
        id: card.getAttribute('data-uid'),
        category: field(card, 'category').value,
        badge: field(card, 'badge').value.trim(),
        titleArabic: field(card, 'titleArabic').value.trim(),
        title: title,
        desc: field(card, 'desc').value.trim(),
        duration: field(card, 'duration').value.trim(),
        schedule: field(card, 'schedule').value.trim(),
        price: field(card, 'price').value.trim(),
        courseKey: courseKeyRaw || title
      };
    });
  }

  // ==========================================
  // YANGILIKLAR
  // ==========================================
  const newsList = document.getElementById('news-list');

  function newsCardHTML(item) {
    const id = uid();
    return `
      <div class="admin-item-card glass-card" data-uid="${id}">
        <button type="button" class="admin-item-remove" title="O'chirish">&times;</button>
        <div class="admin-field-row">
          <div class="admin-field-group">
            <label>Sarlavha</label>
            <input type="text" class="form-control" data-field="title" value="${escapeAttr(item.title)}">
          </div>
          <div class="admin-field-group">
            <label>Sana (ixtiyoriy) — masalan "2026-yil, 5-iyul"</label>
            <input type="text" class="form-control" data-field="date" value="${escapeAttr(item.date)}">
          </div>
        </div>
        <div class="admin-field-group">
          <label>Xabar matni</label>
          <textarea class="form-control" rows="3" data-field="content">${item.content || ''}</textarea>
        </div>
      </div>
    `;
  }

  function renderNews(news) {
    newsList.innerHTML = news.map(newsCardHTML).join('');
  }

  document.getElementById('add-news-btn').addEventListener('click', () => {
    newsList.insertAdjacentHTML('beforeend', newsCardHTML({}));
  });

  newsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-item-remove')) {
      e.target.closest('.admin-item-card').remove();
    }
  });

  function collectNews() {
    return Array.from(newsList.querySelectorAll('.admin-item-card')).map(card => ({
      id: card.getAttribute('data-uid'),
      title: field(card, 'title').value.trim(),
      date: field(card, 'date').value.trim(),
      content: field(card, 'content').value.trim()
    })).filter(item => item.title || item.content);
  }

  // ==========================================
  // TEST SAVOLLARI
  // ==========================================
  const quizList = document.getElementById('quiz-list');

  function quizCardHTML(item) {
    const id = uid();
    const options = (item.options && item.options.length === 3) ? item.options : ['', '', ''];
    const correct = typeof item.correct === 'number' ? item.correct : 0;

    const optionRows = options.map((opt, i) => `
      <div class="admin-quiz-option-row">
        <input type="radio" name="correct-${id}" data-field="correct-radio" value="${i}" ${correct === i ? 'checked' : ''} title="To'g'ri javob">
        <input type="text" class="form-control" data-field="option-${i}" placeholder="${i + 1}-variant" value="${escapeAttr(opt)}">
      </div>
    `).join('');

    return `
      <div class="admin-item-card glass-card" data-uid="${id}">
        <button type="button" class="admin-item-remove" title="O'chirish">&times;</button>
        <div class="admin-field-group">
          <label>Savol matni</label>
          <input type="text" class="form-control" data-field="question" value="${escapeAttr(item.question)}">
        </div>
        <div class="admin-field-group">
          <label>Javob variantlari (to'g'ri javobning yonidagi doirachani belgilang)</label>
          ${optionRows}
        </div>
      </div>
    `;
  }

  function renderQuiz(quiz) {
    quizList.innerHTML = quiz.map(quizCardHTML).join('');
  }

  document.getElementById('add-quiz-btn').addEventListener('click', () => {
    quizList.insertAdjacentHTML('beforeend', quizCardHTML({}));
  });

  quizList.addEventListener('click', (e) => {
    if (e.target.classList.contains('admin-item-remove')) {
      e.target.closest('.admin-item-card').remove();
    }
  });

  function collectQuiz() {
    return Array.from(quizList.querySelectorAll('.admin-item-card')).map(card => {
      const question = field(card, 'question').value.trim();
      const options = [0, 1, 2].map(i => field(card, `option-${i}`).value.trim());
      const checkedRadio = card.querySelector('[data-field="correct-radio"]:checked');
      const correct = checkedRadio ? parseInt(checkedRadio.value, 10) : 0;
      return { question, options, correct };
    }).filter(q => q.question);
  }

  // ==========================================
  // SAQLASH
  // ==========================================
  saveBtn.addEventListener('click', () => {
    if (!currentPassword) {
      saveStatus.textContent = 'Avval tizimga kiring.';
      saveStatus.className = 'admin-save-status error';
      return;
    }

    const content = {
      hero: {
        tag: document.getElementById('hero-tag-input').value.trim(),
        titleBefore: document.getElementById('hero-titleBefore-input').value.trim(),
        titleGold: document.getElementById('hero-titleGold-input').value.trim(),
        titleAfter: document.getElementById('hero-titleAfter-input').value.trim(),
        desc: document.getElementById('hero-desc-input').value.trim()
      },
      courses: collectCourses(),
      news: collectNews(),
      quiz: collectQuiz()
    };

    saveBtn.disabled = true;
    saveStatus.textContent = 'Saqlanmoqda...';
    saveStatus.className = 'admin-save-status';

    fetch(SAVE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: currentPassword, content })
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status === 200 && data.ok) {
          saveStatus.textContent = 'Muvaffaqiyatli saqlandi! Sayt yangilandi.';
          saveStatus.className = 'admin-save-status success';
        } else {
          saveStatus.textContent = data.error || 'Saqlashda xatolik yuz berdi.';
          saveStatus.className = 'admin-save-status error';
        }
      })
      .catch(() => {
        saveStatus.textContent = 'Serverga ulanishda xatolik. Internetni tekshiring.';
        saveStatus.className = 'admin-save-status error';
      })
      .finally(() => {
        saveBtn.disabled = false;
      });
  });

});
