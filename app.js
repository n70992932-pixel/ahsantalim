document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // TELEGRAM BOT SOZLAMALARI
  // ==========================================
  // DIQQAT: Bot tokeni va Chat ID endi bu yerda YO'Q.
  // Xavfsizlik uchun ular Netlify Function ichida, serverda saqlanadi.
  const TELEGRAM_ENDPOINT = '/.netlify/functions/send-telegram';
  const CONTENT_ENDPOINT = '/.netlify/functions/get-content';

  // Global o'zgaruvchi - foydalanuvchi tanlagan kurs nomini eslab qolish uchun
  let globalSelectedCourse = "Noma'lum kurs";

  // Serverdan olingan test savollari shu yerda saqlanadi (get-content orqali to'ldiriladi)
  let quizQuestions = [];

  // ==========================================
  // 1. Header Scroll Effect
  // ==========================================
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ==========================================
  // 2. Mobile Navigation Menu
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      if (navbar.classList.contains('open')) {
        menuToggle.innerHTML = '&times;';
      } else {
        menuToggle.innerHTML = '&#9776;';
      }
    });

    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        menuToggle.innerHTML = '&#9776;';
      });
    });
  }

  // ==========================================
  // 3. Registration Modal (Dialog) & Course Selection
  // ==========================================
  const regDialog = document.getElementById('reg-dialog');
  const closeModalBtn = document.getElementById('close-dialog-btn');
  const successCloseBtn = document.getElementById('success-close-btn');

  const modalFormScreen = document.getElementById('modal-form-screen');
  const modalSuccessScreen = document.getElementById('modal-success-screen');
  const enrollmentForm = document.getElementById('enrollment-form');
  const selectedCourseSelect = document.getElementById('selected-course');

  function openRegModal(courseName) {
    globalSelectedCourse = courseName || "Kursga yozilish";

    if (selectedCourseSelect && courseName) {
      for (let i = 0; i < selectedCourseSelect.options.length; i++) {
        if (selectedCourseSelect.options[i].value === courseName || selectedCourseSelect.options[i].text.includes(courseName)) {
          selectedCourseSelect.selectedIndex = i;
          break;
        }
      }
    }

    if (modalFormScreen) modalFormScreen.style.display = 'block';
    if (modalSuccessScreen) modalSuccessScreen.style.display = 'none';
    if (regDialog) regDialog.showModal();
  }

  // DIQQAT: Endi "Darsga yozilish" tugmalarini bosishni ANIQ elementlarga emas,
  // balki BUTUN SAHIFAGA (document) osib qo'yamiz (event delegation). Buning sababi -
  // kurs kartalari endi JavaScript orqali keyinroq (dinamik) yaratiladi, shuning
  // uchun sahifa yuklangan zahoti ularni topib bo'lmaydi.
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-reg-modal');
    if (btn) {
      let courseName = btn.getAttribute('data-course');
      if (!courseName) {
        const card = btn.closest('.course-card');
        if (card) {
          const h3 = card.querySelector('h3');
          if (h3) courseName = h3.innerText.trim();
        }
      }
      openRegModal(courseName);
    }
  });

  if (selectedCourseSelect) {
    selectedCourseSelect.addEventListener('change', () => {
      globalSelectedCourse = selectedCourseSelect.options[selectedCourseSelect.selectedIndex].text;
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (regDialog) regDialog.close();
    });
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      if (regDialog) regDialog.close();
    });
  }

  if (regDialog) {
    regDialog.addEventListener('click', (e) => {
      const dialogDimensions = regDialog.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        regDialog.close();
      }
    });
  }

  // ==========================================
  // 4. ARIZANI TELEGRAMGA YUBORISH MANTIQI
  // ==========================================
  if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const studentName = document.getElementById('student-name').value.trim();
      const studentPhone = document.getElementById('student-phone').value.trim();
      const finalCourse = globalSelectedCourse;

      const currentTime = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        hour12: false
      });

      const submitBtn = enrollmentForm.querySelector('.form-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Yuborilmoqda...';
      }

      fetch(TELEGRAM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentPhone,
          course: finalCourse,
          time: currentTime
        })
      })
      .then(response => {
        if (response.ok) {
          if (modalFormScreen) modalFormScreen.style.display = 'none';
          if (modalSuccessScreen) modalSuccessScreen.style.display = 'block';

          enrollmentForm.reset();
          globalSelectedCourse = "Noma'lum kurs";

          const phoneInput = document.getElementById('student-phone');
          if (phoneInput) phoneInput.value = '+998 ';
        } else {
          throw new Error('Server xatoligi');
        }
      })
      .catch(error => {
        console.error('Xatolik:', error);
        alert('Arizani yuborishda xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = 'Yuborish';
        }
      });
    });
  }

  // ==========================================
  // 5. Courses Filter Logic
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        // Har safar bosilganda kartalarni QAYTA qidiramiz, chunki ular
        // dinamik ravishda yaratilgan bo'lishi mumkin.
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
          if (filterValue === 'all') {
            card.style.display = 'block';
          } else {
            card.style.display = (card.getAttribute('data-category') === filterValue) ? 'block' : 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // 6. Level Test (Quiz) Logic
  // ==========================================
  const startQuizBtn = document.getElementById('start-quiz-btn');
  const quizStartScreen = document.getElementById('quiz-start');
  const quizQuestionsContainer = document.getElementById('quiz-questions-container');
  const quizResultScreen = document.getElementById('quiz-result');
  const quizScoreBadge = document.getElementById('quiz-score-badge');
  const quizResultDescription = document.getElementById('quiz-result-description');
  const recommendedCourseTitle = document.getElementById('recommended-course-title');
  const recommendedCourseDesc = document.getElementById('recommended-course-desc');
  const restartQuizBtn = document.getElementById('restart-quiz-btn');

  let currentQuestionIndex = 0;
  let score = 0;

  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      if (quizQuestions.length === 0) {
        alert('Test savollari hali yuklanmoqda, biroz kutib qaytadan urinib ko\'ring.');
        return;
      }
      if (quizStartScreen) quizStartScreen.classList.remove('active');
      if (quizResultScreen) quizResultScreen.classList.remove('active');
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
    });
  }

  function showQuestion() {
    if (!quizQuestionsContainer) return;
    quizQuestionsContainer.innerHTML = '';

    if (currentQuestionIndex >= quizQuestions.length) {
      showQuizResult();
      return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const stepDiv = document.createElement('div');
    stepDiv.className = 'quiz-step active';

    const qTitle = document.createElement('h3');
    qTitle.style.fontSize = '1.25rem';
    qTitle.style.marginBottom = '20px';
    qTitle.innerText = currentQuestion.question;
    stepDiv.appendChild(qTitle);

    currentQuestion.options.forEach((option, index) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-secondary';
      btn.style.width = '100%';
      btn.style.marginBottom = '12px';
      btn.style.textAlign = 'left';
      btn.innerText = option;

      btn.addEventListener('click', () => {
        if (index === currentQuestion.correct) {
          score++;
        }
        currentQuestionIndex++;
        showQuestion();
      });
      stepDiv.appendChild(btn);
    });

    quizQuestionsContainer.appendChild(stepDiv);
  }

  function showQuizResult() {
    if (quizQuestionsContainer) quizQuestionsContainer.innerHTML = '';
    if (quizResultScreen) quizResultScreen.classList.add('active');
    const totalQuestions = quizQuestions.length || 5;
    if (quizScoreBadge) quizScoreBadge.innerText = `${score} / ${totalQuestions} TO'G'RI`;

    let recommendedCourse = "";
    let description = "";
    let detailDesc = "";

    if (score <= Math.ceil(totalQuestions * 0.4)) {
      recommendedCourse = "Noldan Arab tili";
      description = "Siz arab tilini noldan boshlashingizni tavsiya qilamiz. Harflarni tanish va to'g'ri talaffuz qilish eng muhim poydevordir.";
      detailDesc = "Ushbu kursda arab alifbosi, harflarning so'z boshida, o'rtasida va oxirida yozilishi hamda boshlang'ich o'qish qoidalari (Tajvid asoslari) o'rgatiladi.";
    } else if (score <= Math.ceil(totalQuestions * 0.8)) {
      recommendedCourse = "Sarf va Nahv grammatikasi";
      description = "Sizda arab alifbosi va o'qish qoida haqida yaxshi bilim bor. Endi tizimli ravishda grammatikani o'rganish vaqti keldi.";
      detailDesc = "Arab tilining morfologiyasi (Sarf - so'z yasalishi) va sintaksisi (Nahv - gap tuzilishi) chuqurlashtirilgan tartibda o'qitiladi. Matnlar va gaplarni to'liq tahlil qilish o'rgatiladi.";
    } else {
      recommendedCourse = "Suhbat va Muhadasa (So'zlashuv)";
      description = "Siz arab tilining grammatika asoslarini va o'qishni yaxshi bilasiz! Endi nutqingizni rivojlantirish va erkin so'zlashishni o'rganish vaqti keldi.";
      detailDesc = "Ushbu kursda arab tilida ravon gapirish, eshitish orqali tushunish, erkin mavzularda bahs-munozara olib borish va jonli suhbat ko'nikmalari ustida ishlanadi.";
    }

    if (quizResultDescription) quizResultDescription.innerText = description;

    let displayTitle = recommendedCourse === "Noldan Arab tili" ? "Noldan o'rganuvchilar uchun Arab tili" : (recommendedCourse === "Sarf va Nahv grammatikasi" ? "Grammatika (Sarf va Nahv asoslari)" : "Suhbat va Muhadasa (So'zlashuv)");

    if (recommendedCourseTitle) {
      recommendedCourseTitle.innerText = displayTitle;
    }
    if (recommendedCourseDesc) recommendedCourseDesc.innerText = detailDesc;

    const quizRegBtn = document.getElementById('quiz-reg-btn');
    if (quizRegBtn) {
      quizRegBtn.setAttribute('data-course', displayTitle);
      quizRegBtn.innerText = `Ushbu kursga yozilish: ${displayTitle}`;
    }
  }

  if (restartQuizBtn) {
    restartQuizBtn.addEventListener('click', () => {
      if (quizResultScreen) quizResultScreen.classList.remove('active');
      if (quizStartScreen) quizStartScreen.classList.add('active');
    });
  }

  // ==========================================
  // 7. KONTENTNI SERVERDAN OLIB, SAHIFANI TO'LDIRISH
  // (Admin panel orqali kiritilgan matnlar, kurslar, yangiliklar, test savollari)
  // ==========================================

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str == null ? '' : str;
    return div.innerHTML;
  }

  function renderHero(hero) {
    if (!hero) return;
    const tagEl = document.getElementById('hero-tag');
    const titleEl = document.getElementById('hero-title');
    const descEl = document.getElementById('hero-desc');
    if (tagEl && hero.tag) tagEl.textContent = hero.tag;
    if (titleEl && (hero.titleBefore || hero.titleGold || hero.titleAfter)) {
      titleEl.innerHTML = `${escapeHtml(hero.titleBefore || '')} <span class="text-gold">${escapeHtml(hero.titleGold || '')}</span> ${escapeHtml(hero.titleAfter || '')}`;
    }
    if (descEl && hero.desc) descEl.textContent = hero.desc;
  }

  function renderCourses(courses) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (!courses || courses.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color: var(--text-secondary); grid-column: 1/-1;">Hozircha kurslar qo\'shilmagan.</p>';
      return;
    }

    grid.innerHTML = courses.map(course => `
      <div class="course-card glass-card-gold" data-category="${escapeHtml(course.category || '')}">
        <span class="course-badge">${escapeHtml(course.badge || '')}</span>
        <div class="course-content">
          <div class="course-title-arabic text-arabic">${escapeHtml(course.titleArabic || '')}</div>
          <h3 class="course-title">${escapeHtml(course.title || '')}</h3>
          <p class="course-desc">${escapeHtml(course.desc || '')}</p>
          <div class="course-meta">
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${escapeHtml(course.duration || '')}
            </span>
            <span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              ${escapeHtml(course.schedule || '')}
            </span>
          </div>
          ${course.price ? `<div class="course-price">${escapeHtml(course.price)}</div>` : ''}
          <button class="btn btn-primary course-action open-reg-modal" data-course="${escapeHtml(course.courseKey || course.title || '')}">Yozilish</button>
        </div>
      </div>
    `).join('');
  }

  function renderNews(news) {
    const grid = document.getElementById('news-grid');
    if (!grid) return;

    if (!news || news.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color: var(--text-secondary); grid-column: 1/-1;">Hozircha yangiliklar yo\'q.</p>';
      return;
    }

    grid.innerHTML = news.map(item => `
      <div class="news-card glass-card">
        ${item.date ? `<div class="news-date">${escapeHtml(item.date)}</div>` : ''}
        <h3 class="news-title">${escapeHtml(item.title || '')}</h3>
        <p class="news-content">${escapeHtml(item.content || '')}</p>
      </div>
    `).join('');
  }

  fetch(CONTENT_ENDPOINT)
    .then(res => {
      if (!res.ok) throw new Error('Kontentni olishda xatolik');
      return res.json();
    })
    .then(content => {
      renderHero(content.hero);
      renderCourses(content.courses);
      renderNews(content.news);
      quizQuestions = Array.isArray(content.quiz) ? content.quiz : [];
    })
    .catch(err => {
      console.error('Kontentni yuklashda xatolik:', err);
      // Xatolik bo'lsa, sahifa bo'sh qolmasin - kamida test savollarini
      // ishlatish uchun eski (fallback) savollarni qo'yamiz.
      quizQuestions = [
        { question: "1. Arab alifbosida nechta harf bor?", options: ["26 ta", "28 ta", "30 ta"], correct: 1 },
        { question: "2. Harakatlar (fatha, kasra, damma) nima vazifani bajaradi?", options: ["Unli tovushlarni ifodalaydi", "Undosh harflarni cho'zadi", "Gapni tugatadi"], correct: 0 },
        { question: "3. 'Sarf' ilmi nimani o'rgatadi?", options: ["Gap tuzish qoidalarini", "So'zlarning o'zgarishi va yasalishini", "To'g'ri talaffuzni (Tajvid)"], correct: 1 },
        { question: "4. Arab tilida nechta kalima (so'z) turkumi bor?", options: ["3 ta (Ism, Fe'l, Harf)", "5 ta", "9 ta"], correct: 0 },
        { question: "5. 'Nahv' ilmi nimani o'rganadi?", options: ["Lug'at boyligini", "Gapdagi so'zlarning oxirgi holati va bog'lanishini", "Xat turini"], correct: 1 }
      ];
      const grid = document.getElementById('courses-grid');
      if (grid) grid.innerHTML = '<p style="text-align:center; color: var(--text-secondary); grid-column: 1/-1;">Kurslarni yuklashda xatolik. Sahifani yangilang.</p>';
    });

});
