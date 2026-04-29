// =============================================================
//  IziTurkish Cabinet — app.js
// =============================================================

// ─── CONFIG ──────────────────────────────────────────────────
const LEMON_MONTHLY = 'MONTHLY_PRODUCT_ID';  // заменить
const LEMON_YEARLY  = 'YEARLY_PRODUCT_ID';   // заменить
const LEMON_STORE   = 'iziturkish';

const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyDfACbJmeQPwVl7g9QpMM9DSs8O1GksNW8",
  authDomain:        "izi-turkish.firebaseapp.com",
  projectId:         "izi-turkish",
  storageBucket:     "izi-turkish.firebasestorage.app",
  messagingSenderId: "390656518022",
  appId:             "1:390656518022:web:4e64f7f6577c85f049ae07",
};

const XP_PER_CORRECT       = 10;
const XP_PER_SCENARIO_STEP = 15;
const EXERCISES_PER_LESSON = 10;
const SPEECH_LANG_CHAIN    = ['tr-TR', 'tr', 'ru-RU'];

// ─── STATE ───────────────────────────────────────────────────
const DEFAULT_STATE = {
  streak: 0,
  lastPlayed: null,
  totalXp: 0,
  dailyXp: 0,
  dailyGoal: 50,
  level: 1,
  lessonsCompleted: 0,
  scenariosCompleted: [],
  errorLog: {},
  achievements: [],
  srs: {},
  onboardingDone: false,
  subscription: null,
};

let state = { ...DEFAULT_STATE };
let currentUser = null;
let db = null, auth = null;

// ─── FIREBASE INIT ────────────────────────────────────────────
async function initFirebase() {
  try {
    firebase.initializeApp(FIREBASE_CONFIG);
    auth = firebase.auth();
    db   = firebase.firestore();

    // iOS Safari: ловим redirect до onAuthStateChanged
    try {
      await Promise.race([
        auth.getRedirectResult(),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 8000))
      ]);
    } catch (_) {}

    auth.onAuthStateChanged(async user => {
      if (user) {
        currentUser = user;
        await loadUserState();
        checkStreak();
        if (!state.onboardingDone) {
          showScreen('screen-onboarding');
        } else {
          showHome();
        }
      } else {
        showScreen('screen-login');
      }
    });
  } catch (e) {
    console.error('Firebase init error:', e);
    showScreen('screen-login');
  }
}

// ─── SCREENS ─────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(id);
  if (screen) screen.classList.add('active');
  window.scrollTo(0, 0);

  // Скрываем/показываем нижний nav
  const noNav = ['screen-login', 'screen-onboarding', 'screen-lesson',
                  'screen-scenario', 'screen-scenario-complete', 'screen-lesson-complete',
                  'screen-speech', 'screen-speech-complete', 'screen-paywall'];
  document.getElementById('bottom-nav').style.display = noNav.includes(id) ? 'none' : 'flex';
}

// ─── HOME ─────────────────────────────────────────────────────
function showHome() {
  showScreen('screen-home');
  updateNavActive('nav-home');

  // Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'Merhaba' : 'İyi akşamlar';
  const name = currentUser?.displayName?.split(' ')[0] || 'друг';
  document.getElementById('home-greeting').textContent = `${greeting}, ${name}! 🇹🇷`;

  // Stats
  document.getElementById('home-streak').textContent  = state.streak;
  document.getElementById('home-xp').textContent      = state.totalXp;
  document.getElementById('home-level').textContent   = state.level;

  // Daily progress
  const pct = Math.min(100, Math.round(state.dailyXp / state.dailyGoal * 100));
  document.getElementById('daily-progress-fill').style.width  = pct + '%';
  document.getElementById('daily-progress-text').textContent  =
    `${state.dailyXp} / ${state.dailyGoal} XP сегодня`;

  // Subscription banner
  renderSubBanner();
}

function renderSubBanner() {
  const banner = document.getElementById('sub-banner');
  if (!banner) return;
  const sub = state.subscription;
  if (!sub || sub.status === 'active' || sub.status === 'trialing') {
    banner.style.display = 'none';
    return;
  }
  banner.style.display = 'flex';
}

// ─── LESSONS ─────────────────────────────────────────────────
const LESSON_GROUPS = [
  { title: '📘 Группа 1: Базовые глаголы',  range: [1,  30] },
  { title: '📙 Группа 2: Глаголы действий', range: [31, 60] },
  { title: '📗 Группа 3: Существительные',   range: [61, 90] },
  { title: '📕 Группа 4: Прилагательные',    range: [91, 120] },
  { title: '📓 Группа 5: Наречия и время',   range: [121, 150] },
];

function showLessons() {
  showScreen('screen-lessons');
  updateNavActive('nav-lessons');
  const list = document.getElementById('lessons-list');
  list.innerHTML = '';

  LESSON_GROUPS.forEach((group, i) => {
    const unlocked = i === 0 || state.lessonsCompleted >= i * 3;
    const div = document.createElement('div');
    div.className = 'lesson-card' + (unlocked ? '' : ' locked');
    div.innerHTML = `
      <span class="lesson-icon">${['📘','📙','📗','📕','📓'][i]}</span>
      <div class="lesson-info">
        <div class="lesson-title">${group.title.replace(/📘|📙|📗|📕|📓\s*/,'')}</div>
        <div class="lesson-meta">Слова ${group.range[0]}–${group.range[1]} · 10 вопросов</div>
      </div>
      <span class="lesson-status">${unlocked ? '▶️' : '🔒'}</span>`;
    if (unlocked) div.onclick = () => startLesson(group.range);
    list.appendChild(div);
  });

  // Weak lesson button
  const errCount = Object.keys(state.errorLog).length;
  if (errCount > 0) {
    const div = document.createElement('div');
    div.className = 'lesson-card';
    div.innerHTML = `
      <span class="lesson-icon">💪</span>
      <div class="lesson-info">
        <div class="lesson-title">Слабые места</div>
        <div class="lesson-meta">${errCount} слов с ошибками</div>
      </div>
      <span class="lesson-status">▶️</span>`;
    div.onclick = () => startWeakLesson();
    list.appendChild(div);
  }

  // SRS lesson
  const srsWords = getSrsPool();
  if (srsWords.length > 0) {
    const div = document.createElement('div');
    div.className = 'lesson-card';
    div.innerHTML = `
      <span class="lesson-icon">🔁</span>
      <div class="lesson-info">
        <div class="lesson-title">Интервальное повторение</div>
        <div class="lesson-meta">${srsWords.length} слов к повторению</div>
      </div>
      <span class="lesson-status">▶️</span>`;
    div.onclick = () => startSrsLesson();
    list.appendChild(div);
  }
}

// ─── LESSON ENGINE ────────────────────────────────────────────
let lessonState = {};

function startLesson(range) {
  const pool = WORDS.filter(w => w.id >= range[0] && w.id <= range[1]);
  _startLesson(pool, false);
}

function startWeakLesson() {
  const pool = WORDS.filter(w => state.errorLog[w.id]);
  if (pool.length === 0) { showToast('Нет слов с ошибками!'); return; }
  _startLesson(pool, true);
}

function startSrsLesson() {
  const pool = getSrsPool();
  if (pool.length === 0) { showToast('Нет слов для повторения!'); return; }
  _startLesson(pool, false, true);
}

function _startLesson(pool, isWeak = false, isSrs = false) {
  // Проверка подписки
  if (!hasAccess() && state.lessonsCompleted >= 3) { showPaywall(); return; }

  const exercises = generateExercises(pool, EXERCISES_PER_LESSON);
  lessonState = {
    exercises,
    current: 0,
    hearts: 3,
    correct: 0,
    xpEarned: 0,
    isWeak,
    isSrs,
    answered: false,
  };
  showScreen('screen-lesson');
  renderExercise();
}

function generateExercises(pool, count) {
  const result = [];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    const word = shuffled[i % shuffled.length];
    const type = i % 3 === 2 ? 'typing' : (i % 2 === 0 ? 'word_meaning' : 'translate_to_lang');
    result.push({ word, type });
  }
  return result;
}

function renderExercise() {
  const { exercises, current, hearts } = lessonState;
  const ex = exercises[current];

  // Progress bar
  const pct = Math.round(current / exercises.length * 100);
  document.getElementById('quiz-progress-fill').style.width = pct + '%';
  document.getElementById('quiz-counter').textContent = `${current + 1} / ${exercises.length}`;

  // Hearts
  document.getElementById('quiz-hearts').textContent = '❤️'.repeat(hearts) + '🖤'.repeat(3 - hearts);

  // Question
  const { word, type } = ex;
  let prompt, wordDisplay, transcriptionDisplay;

  if (type === 'word_meaning') {
    prompt = 'Что означает это слово?';
    wordDisplay = word.tr;
    transcriptionDisplay = word.transcription;
  } else if (type === 'translate_to_lang') {
    prompt = 'Как это будет по-турецки?';
    wordDisplay = word.translation;
    transcriptionDisplay = '';
  } else {
    prompt = 'Напишите по-турецки:';
    wordDisplay = word.translation;
    transcriptionDisplay = '';
  }

  document.getElementById('quiz-prompt').textContent = prompt;
  document.getElementById('quiz-word').textContent   = wordDisplay;
  document.getElementById('quiz-transcription').textContent = transcriptionDisplay;

  // Show speak button for Turkish words
  const speakBtn = document.getElementById('quiz-speak-btn');
  speakBtn.style.display = (type === 'word_meaning') ? 'inline-block' : 'none';
  speakBtn.onclick = () => speakTr(word.tr);

  // Options or typing
  const optionsContainer = document.getElementById('options-container');
  const typingContainer  = document.getElementById('typing-container');
  const feedbackBar      = document.getElementById('feedback-bar');
  feedbackBar.className  = 'feedback-bar';

  if (type === 'typing') {
    optionsContainer.style.display = 'none';
    typingContainer.style.display  = 'block';
    const input = document.getElementById('typing-input');
    input.value = '';
    input.className = 'typing-input';
    input.focus();
  } else {
    optionsContainer.style.display = 'flex';
    typingContainer.style.display  = 'none';
    renderOptions(word, type);
  }

  lessonState.answered = false;
  document.getElementById('next-btn').style.display = 'none';
}

function renderOptions(word, type) {
  const isToLang = type === 'translate_to_lang';
  const correct = isToLang ? word.tr : word.translation;

  // 3 случайных неверных
  const others = WORDS.filter(w => w.id !== word.id)
    .sort(() => Math.random() - 0.5).slice(0, 3)
    .map(w => isToLang ? w.tr : w.translation);

  const options = [correct, ...others].sort(() => Math.random() - 0.5);

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt;
    btn.onclick = () => selectOption(btn, opt, correct, word);
    container.appendChild(btn);
  });
}

function selectOption(btn, selected, correct, word) {
  if (lessonState.answered) return;
  lessonState.answered = true;

  const isCorrect = selected === correct;
  handleAnswer(isCorrect, word);

  // Highlight
  document.querySelectorAll('.option-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.textContent === correct) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');

  showFeedback(isCorrect, word);
  document.getElementById('next-btn').style.display = 'block';
}

function submitTyping() {
  if (lessonState.answered) return;
  const input = document.getElementById('typing-input');
  const ex    = lessonState.exercises[lessonState.current];
  const typed = input.value.trim().toLowerCase();
  const correct = ex.word.tr.toLowerCase();
  const isCorrect = typed === correct;

  lessonState.answered = true;
  handleAnswer(isCorrect, ex.word);

  input.classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) input.value = ex.word.tr;  // показываем правильный ответ

  showFeedback(isCorrect, ex.word);
  document.getElementById('next-btn').style.display = 'block';
}

function handleAnswer(isCorrect, word) {
  if (isCorrect) {
    lessonState.correct++;
    lessonState.xpEarned += XP_PER_CORRECT;
    playSound('correct');
    srsRate(word.id, true);
    if (state.errorLog[word.id]) state.errorLog[word.id]--;
    if (state.errorLog[word.id] <= 0) delete state.errorLog[word.id];
  } else {
    lessonState.hearts--;
    playSound('wrong');
    srsRate(word.id, false);
    state.errorLog[word.id] = (state.errorLog[word.id] || 0) + 1;
  }
}

function showFeedback(isCorrect, word) {
  const bar = document.getElementById('feedback-bar');
  bar.className = 'feedback-bar ' + (isCorrect ? 'correct' : 'wrong');

  const phrase = isCorrect
    ? CORRECT_PHRASES[Math.floor(Math.random() * CORRECT_PHRASES.length)]
    : `❌ Правильно: ${word.tr}`;

  bar.innerHTML = `<span>${phrase}</span>`;
  if (word.note) bar.innerHTML += `<div class="feedback-explanation">${word.note}</div>`;
}

function nextExercise() {
  lessonState.current++;
  if (lessonState.current >= lessonState.exercises.length) {
    finishLesson();
  } else {
    renderExercise();
  }
}

function finishLesson() {
  // Update state
  state.totalXp += lessonState.xpEarned;
  state.dailyXp += lessonState.xpEarned;
  state.lessonsCompleted++;
  state.level = Math.floor(state.totalXp / 500) + 1;

  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastPlayed === yesterday.toDateString() ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }

  saveState();
  checkAchievements({
    perfectLesson: lessonState.correct === lessonState.exercises.length,
    weakMode: lessonState.isWeak,
  });

  // Show complete screen
  showScreen('screen-lesson-complete');
  document.getElementById('complete-correct').textContent = lessonState.correct;
  document.getElementById('complete-total').textContent   = lessonState.exercises.length;
  document.getElementById('complete-xp').textContent     = '+' + lessonState.xpEarned;
  document.getElementById('complete-streak').textContent = state.streak + '🔥';
}

// ─── SCENARIOS ────────────────────────────────────────────────
let scenarioState = {};

function showScenarios() {
  showScreen('screen-lessons');
  updateNavActive('nav-lessons');
  const list = document.getElementById('lessons-list');
  list.innerHTML = '<div class="section-title">🎭 Сценарии из жизни</div>';

  const grid = document.createElement('div');
  grid.className = 'scenarios-list';

  SCENARIOS.forEach(sc => {
    const done = state.scenariosCompleted.includes(sc.id);
    const card = document.createElement('div');
    card.className = 'scenario-card' + (done ? ' done' : '');
    card.innerHTML = `
      <div class="scenario-icon">${sc.icon}</div>
      <div class="scenario-title">${sc.title}</div>
      <div class="scenario-desc">${sc.description}</div>
      ${done ? '<div class="scenario-stars">⭐⭐⭐</div>' : ''}`;
    card.onclick = () => startScenario(sc.id);
    grid.appendChild(card);
  });

  list.appendChild(grid);
}

function startScenario(id) {
  if (!hasAccess() && state.lessonsCompleted < 1) { showPaywall(); return; }

  const sc = SCENARIOS.find(s => s.id === id);
  if (!sc) return;

  scenarioState = { sc, current: 0, score: 0, total: 0 };
  showScreen('screen-scenario');
  document.getElementById('scenario-name').textContent = sc.title;
  renderScenarioStep();
}

function renderScenarioStep() {
  const { sc, current } = scenarioState;
  const step = sc.steps[current];
  const pct  = Math.round(current / sc.steps.length * 100);

  document.getElementById('scenario-step-fill').style.width = pct + '%';

  const content = document.getElementById('step-content');
  content.innerHTML = '';

  if (step.type === 'info') {
    content.innerHTML = `
      <div class="step-info-box">${step.text}</div>
      <div style="margin-top:auto">
        <button class="btn-primary" onclick="nextScenarioStep()">Понятно →</button>
      </div>`;
  }

  else if (step.type === 'dialog') {
    content.innerHTML = `
      <div class="step-dialog-speaker">${step.speaker}</div>
      <div class="step-dialog-text">${step.text}</div>
      <div class="step-dialog-translation">${step.translation}</div>
      <div class="options-grid" id="sc-options"></div>
      <div class="step-explanation" id="sc-explanation">${step.explanation || ''}</div>
      <div style="margin-top:auto;padding-top:16px">
        <button class="btn-primary" id="sc-next-btn" onclick="nextScenarioStep()" style="display:none">Далее →</button>
      </div>`;

    step.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = opt;
      btn.onclick = () => selectScenarioOption(btn, i, step);
      document.getElementById('sc-options').appendChild(btn);
    });
    scenarioState.total++;
  }

  else if (step.type === 'phrase') {
    content.innerHTML = `
      <div class="step-phrase-box">
        <div class="step-phrase-tr">${step.tr}</div>
        <div class="step-phrase-ru">${step.ru}</div>
        <div class="step-phrase-transcription">${step.transcription}</div>
        <button class="step-speak-btn" onclick="speakTr('${step.tr.replace(/'/g,"\\'")}')">🔊 Послушать</button>
      </div>
      <div style="margin-top:auto">
        <button class="btn-primary" onclick="nextScenarioStep()">Далее →</button>
      </div>`;
  }
}

function selectScenarioOption(btn, idx, step) {
  document.querySelectorAll('#sc-options .option-btn').forEach(b => {
    b.classList.add('disabled');
    if (b.textContent === step.options[step.correct]) b.classList.add('correct');
  });

  const isCorrect = idx === step.correct;
  if (!isCorrect) { btn.classList.add('wrong'); playSound('wrong'); }
  else { playSound('correct'); scenarioState.score++; }

  const expl = document.getElementById('sc-explanation');
  if (expl) expl.classList.add('visible');

  const nextBtn = document.getElementById('sc-next-btn');
  if (nextBtn) nextBtn.style.display = 'block';
}

function nextScenarioStep() {
  scenarioState.current++;
  if (scenarioState.current >= scenarioState.sc.steps.length) {
    finishScenario();
  } else {
    renderScenarioStep();
  }
}

function finishScenario() {
  const { sc, score, total } = scenarioState;
  const pct   = total > 0 ? score / total : 1;
  const stars = pct === 1 ? '⭐⭐⭐' : pct >= 0.67 ? '⭐⭐' : '⭐';
  const xp    = Math.round(total * XP_PER_SCENARIO_STEP * pct);

  state.totalXp += xp;
  state.dailyXp += xp;
  state.level    = Math.floor(state.totalXp / 500) + 1;
  if (!state.scenariosCompleted.includes(sc.id)) state.scenariosCompleted.push(sc.id);

  const today = new Date().toDateString();
  if (state.lastPlayed !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    state.streak = state.lastPlayed === yesterday.toDateString() ? state.streak + 1 : 1;
    state.lastPlayed = today;
  }

  saveState();
  checkAchievements({ scenarioId: sc.id });

  showScreen('screen-scenario-complete');
  document.getElementById('sc-stars').textContent = stars;
  document.getElementById('sc-score').textContent = `${score} / ${total}`;
  document.getElementById('sc-xp').textContent = '+' + xp + ' XP';
}

// ─── SRS — SM-2 ───────────────────────────────────────────────
function srsRate(wordId, isCorrect) {
  const card = state.srs[wordId] || { interval: 0, ef: 2.5 };
  if (isCorrect) {
    if (card.interval === 0)      card.interval = 1;
    else if (card.interval === 1) card.interval = 4;
    else card.interval = Math.round(card.interval * card.ef);
    card.ef = Math.min(3.0, card.ef + 0.1);
  } else {
    card.interval = 1;
    card.ef = Math.max(1.3, card.ef - 0.2);
  }
  const due = new Date();
  due.setDate(due.getDate() + card.interval);
  card.due = due.toISOString().split('T')[0];
  state.srs[wordId] = card;
}

function getSrsPool() {
  const today = new Date().toISOString().split('T')[0];
  return WORDS.filter(w => {
    const card = state.srs[w.id];
    return card && card.due <= today;
  });
}

// ─── WORD TABLE ────────────────────────────────────────────────
function showWordTable() {
  showScreen('screen-word-table');
  updateNavActive('nav-words');
  renderWordTable('');
  const input = document.getElementById('word-search');
  input.value = '';
  input.oninput = () => renderWordTable(input.value.trim().toLowerCase());
}

function renderWordTable(query) {
  const container = document.getElementById('word-list');
  container.innerHTML = '';

  const groups = [
    { title: 'Группа 1: Базовые глаголы',    range: [1,  30] },
    { title: 'Группа 2: Глаголы действий',   range: [31, 60] },
    { title: 'Группа 3: Существительные',     range: [61, 90] },
    { title: 'Группа 4: Прилагательные',      range: [91, 120] },
    { title: 'Группа 5: Наречия и время',     range: [121, 150] },
  ];

  groups.forEach(g => {
    const words = WORDS.filter(w =>
      w.id >= g.range[0] && w.id <= g.range[1] &&
      (!query ||
        w.tr.toLowerCase().includes(query) ||
        w.translation.toLowerCase().includes(query) ||
        (w.transcription || '').toLowerCase().includes(query)
      )
    );
    if (words.length === 0) return;

    if (!query) {
      const title = document.createElement('div');
      title.className = 'word-group-title';
      title.textContent = g.title;
      container.appendChild(title);
    }

    words.forEach(w => {
      const row = document.createElement('div');
      row.className = 'word-row';
      row.innerHTML = `
        <span class="word-tr">${w.tr}</span>
        <span class="word-ru">${w.translation}</span>
        <span class="word-transcription">${w.transcription || ''}</span>
        <button class="word-speak" onclick="event.stopPropagation();speakTr('${w.tr.replace(/'/g,"\\'")}')">🔊</button>`;
      row.onclick = () => showWordModal(w);
      container.appendChild(row);
    });
  });

  if (container.innerHTML === '') {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><div class="empty-state-text">Ничего не найдено</div></div>';
  }
}

// ─── WORD MODAL ────────────────────────────────────────────────
function showWordModal(w) {
  document.getElementById('modal-tr').textContent           = w.tr;
  document.getElementById('modal-transcription').textContent = w.transcription || '';
  document.getElementById('modal-ru').textContent            = w.translation;
  document.getElementById('modal-example').innerHTML =
    w.example ? `<b>${w.example.tr}</b><br><span style="color:var(--gray-400)">${w.example.ru}</span>` : '';
  const noteEl = document.getElementById('modal-note');
  noteEl.textContent = w.note || '';
  noteEl.style.display = w.note ? 'block' : 'none';
  document.getElementById('modal-overlay').classList.add('open');
}
function closeWordModal() { document.getElementById('modal-overlay').classList.remove('open'); }

// ─── PHRASES ──────────────────────────────────────────────────
function showPhrases() {
  showScreen('screen-phrases');
  updateNavActive('nav-phrases');
  const cats = document.getElementById('phrases-cats');
  cats.innerHTML = '';
  PHRASES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'phrase-cat-card';
    card.innerHTML = `<div class="phrase-cat-icon">${cat.icon}</div><div class="phrase-cat-name">${cat.category}</div>`;
    card.onclick = () => showPhraseList(cat);
    cats.appendChild(card);
  });
}

function showPhraseList(cat) {
  showScreen('screen-phrase-list');
  document.getElementById('phrase-list-title').textContent = `${cat.icon} ${cat.category}`;
  const list = document.getElementById('phrase-items');
  list.innerHTML = '';
  cat.phrases.forEach(p => {
    const item = document.createElement('div');
    item.className = 'phrase-item';
    item.innerHTML = `
      <div class="phrase-content">
        <div class="phrase-tr">${p.tr}</div>
        <div class="phrase-ru">${p.ru}</div>
        <div class="phrase-transcription">${p.transcription || ''}</div>
        ${p.note ? `<div style="font-size:.75rem;color:var(--gray-400);margin-top:2px">${p.note}</div>` : ''}
      </div>
      <button class="phrase-speak" onclick="speakTr('${p.tr.replace(/'/g,"\\'")}')">🔊</button>`;
    list.appendChild(item);
  });
}

// ─── SPEECH TRAINING ──────────────────────────────────────────
let speechState = {};

function showSpeechCategories() {
  showScreen('screen-speech-categories');
  updateNavActive('nav-speech');
  const list = document.getElementById('speech-cats');
  list.innerHTML = '';
  PHRASES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'phrase-cat-card';
    card.innerHTML = `<div class="phrase-cat-icon">${cat.icon}</div><div class="phrase-cat-name">${cat.category}</div>`;
    card.onclick = () => startSpeech(cat);
    list.appendChild(card);
  });
}

function startSpeech(cat) {
  const phrases = cat.phrases.sort(() => Math.random() - 0.5);
  speechState = { phrases, current: 0, correct: 0 };
  showScreen('screen-speech');
  document.getElementById('speech-cat-name').textContent = `${cat.icon} ${cat.category}`;
  renderSpeechPhrase();
}

function renderSpeechPhrase() {
  const { phrases, current } = speechState;
  const p = phrases[current];
  document.getElementById('speech-phrase-tr').textContent = p.tr;
  document.getElementById('speech-phrase-ru').textContent = p.ru;
  document.getElementById('speech-counter').textContent   = `${current + 1} / ${phrases.length}`;
  document.getElementById('speech-result').innerHTML = '';
  document.getElementById('mic-btn').className = 'mic-btn';
}

function startListening() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    showToast('Микрофон не поддерживается в вашем браузере');
    return;
  }
  document.getElementById('mic-btn').className = 'mic-btn listening';
  runSpeechRecognition(SR, 0);
}

function runSpeechRecognition(SR, langIdx) {
  const lang = SPEECH_LANG_CHAIN[langIdx] || SPEECH_LANG_CHAIN[0];
  const r = new SR();
  r.lang = lang;
  r.continuous = false;
  r.interimResults = false;

  r.onerror = e => {
    if (e.error === 'language-not-supported' && langIdx < SPEECH_LANG_CHAIN.length - 1) {
      setTimeout(() => runSpeechRecognition(SR, langIdx + 1), 150);
      return;
    }
    document.getElementById('mic-btn').className = 'mic-btn';
    showToast('Не удалось распознать речь');
  };

  r.onresult = e => {
    document.getElementById('mic-btn').className = 'mic-btn';
    const heard = e.results[0][0].transcript.trim();
    const target = speechState.phrases[speechState.current].tr.toLowerCase();
    const similarity = calcSimilarity(heard.toLowerCase(), target);

    const resultEl = document.getElementById('speech-result');
    let cls, label;
    if (similarity >= 0.8)       { cls = 'good'; label = '✅ Отлично!'; speechState.correct++; }
    else if (similarity >= 0.5)  { cls = 'ok';   label = '😊 Неплохо'; }
    else                          { cls = 'bad';  label = '❌ Попробуй ещё'; }

    resultEl.innerHTML = `
      <div class="heard">Услышал: "${heard}"</div>
      <div class="speech-score ${cls}">${label}</div>
      <button class="btn-primary" style="margin-top:16px;max-width:200px" onclick="nextSpeechPhrase()">Далее →</button>`;
  };

  try { r.start(); } catch (_) {}
}

function nextSpeechPhrase() {
  speechState.current++;
  if (speechState.current >= speechState.phrases.length) {
    showScreen('screen-speech-complete');
    const pct = Math.round(speechState.correct / speechState.phrases.length * 100);
    document.getElementById('speech-score-val').textContent = pct + '%';
    document.getElementById('speech-correct-val').textContent = speechState.correct + ' / ' + speechState.phrases.length;
  } else {
    renderSpeechPhrase();
  }
}

function calcSimilarity(a, b) {
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1;
  const dist = levenshtein(longer, shorter);
  return (longer.length - dist) / longer.length;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m+1}, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
    dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
  return dp[m][n];
}

// ─── 30-DAY PLAN ──────────────────────────────────────────────
function showPlan() {
  showScreen('screen-plan');
  updateNavActive('nav-plan');
  const container = document.getElementById('plan-weeks');
  container.innerHTML = '';

  PLAN_30.forEach(week => {
    const weekEl = document.createElement('div');
    weekEl.className = 'plan-week';
    weekEl.innerHTML = `
      <div class="plan-week-header" style="background:${week.color}">
        Неделя ${week.week}: ${week.theme}
      </div>
      <div class="plan-week-days" id="week-days-${week.week}"></div>`;
    container.appendChild(weekEl);

    const daysEl = weekEl.querySelector(`#week-days-${week.week}`);
    week.days.forEach(day => {
      const isToday = day.day === getCurrentPlanDay();
      const isDone  = day.day < getCurrentPlanDay();
      const dayEl = document.createElement('div');
      dayEl.className = 'plan-day' + (isDone ? ' done' : '') + (isToday ? ' today' : '');
      dayEl.innerHTML = `
        <div class="day-num">${isDone ? '✓' : day.day}</div>
        <div class="day-info">
          <div class="day-topic">${day.topic}</div>
          <div class="day-focus">${day.focus}</div>
        </div>
        <span class="day-type-badge">${{ vocab:'📚', grammar:'📖', scenario:'🎭', review:'🔁', audit:'📊' }[day.type] || '📚'}</span>`;
      daysEl.appendChild(dayEl);
    });
  });
}

function getCurrentPlanDay() {
  // Считаем день по lessonsCompleted (приблизительно)
  return Math.min(30, state.lessonsCompleted + 1);
}

// ─── AUDIT ────────────────────────────────────────────────────
function showAudit() {
  showScreen('screen-audit');
  updateNavActive('nav-audit');

  const xpInLevel = state.totalXp % 500;
  document.getElementById('audit-level').textContent     = state.level;
  document.getElementById('audit-xp-fill').style.width   = Math.round(xpInLevel / 500 * 100) + '%';
  document.getElementById('audit-xp-label').textContent  = `${xpInLevel} / 500 XP до следующего уровня`;

  document.getElementById('audit-streak').textContent    = state.streak;
  document.getElementById('audit-lessons').textContent   = state.lessonsCompleted;
  document.getElementById('audit-xp-total').textContent  = state.totalXp;
  document.getElementById('audit-scenarios').textContent = state.scenariosCompleted.length;
  document.getElementById('audit-words').textContent     = Object.keys(state.srs).length;
  document.getElementById('audit-errors').textContent    = Object.keys(state.errorLog).length;
}

// ─── ACHIEVEMENTS ─────────────────────────────────────────────
function showAchievements() {
  showScreen('screen-achievements');
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = state.achievements.includes(a.id);
    const card = document.createElement('div');
    card.className = 'achievement-card' + (unlocked ? ' unlocked' : '');
    card.innerHTML = `
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-title">${a.title}</div>
      <div class="achievement-desc">${a.desc}</div>`;
    grid.appendChild(card);
  });
}

function checkAchievements({ perfectLesson = false, weakMode = false, scenarioId = null } = {}) {
  const unlock = id => {
    if (!state.achievements.includes(id)) {
      state.achievements.push(id);
      showToast(`🏆 Достижение: ${ACHIEVEMENTS.find(a=>a.id===id)?.title}`);
      playSound('correct');
    }
  };

  if (state.lessonsCompleted >= 1)  unlock('first_lesson');
  if (perfectLesson)                unlock('perfect_lesson');
  if (state.lessonsCompleted >= 5)  unlock('lessons_5');
  if (state.lessonsCompleted >= 10) unlock('lessons_10');
  if (state.lessonsCompleted >= 30) unlock('lessons_30');
  if (state.streak >= 3)            unlock('streak_3');
  if (state.streak >= 7)            unlock('streak_7');
  if (state.streak >= 30)           unlock('streak_30');
  if (state.scenariosCompleted.length >= 1) unlock('scenario_first');
  if (state.scenariosCompleted.length >= SCENARIOS.length) unlock('scenarios_all');
  if (scenarioId === 'vnj')         unlock('vnj_done');
  if (weakMode)                     unlock('weak_conquered');
  if (state.totalXp >= 500)         unlock('xp_500');
  if (state.totalXp >= 2000)        unlock('xp_2000');
  if (state.level >= 5)             unlock('level_5');

  saveState();
}

// ─── BLOG ─────────────────────────────────────────────────────
const BLOG_ARTICLES = [
  { slug: 'turetskiy-alfavit',       title: 'Турецкий алфавит за 1 вечер',        icon: '🔤', time: '5 мин' },
  { slug: 'kak-govorit-po-turetski', title: 'Как научиться говорить с нуля',       icon: '🗣️', time: '6 мин' },
  { slug: 'slozhno-li-uchit-turetskiy', title: 'Сложно ли учить турецкий?',       icon: '🧠', time: '5 мин' },
  { slug: 'turetskaya-grammatika',   title: 'Грамматика для начинающих',           icon: '📖', time: '7 мин' },
  { slug: 'turetskiy-frazy-dlya-turtsii', title: '50 фраз для жизни в Турции',    icon: '💬', time: '8 мин' },
  { slug: 'turetskiy-dlya-vnzh',     title: 'Турецкий для ВНЖ',                   icon: '📋', time: '6 мин' },
  { slug: 'turetskiy-v-apteke',      title: 'В аптеке и у врача',                 icon: '💊', time: '5 мин' },
  { slug: 'kak-snyat-kvartiru-v-turtsii', title: 'Как снять квартиру в Турции',  icon: '🏠', time: '6 мин' },
  { slug: 'turetskiy-na-rynke',      title: 'Турецкий на рынке',                  icon: '🛒', time: '4 мин' },
  { slug: 'turetskiy-v-banke',       title: 'Открываем счёт в турецком банке',     icon: '🏦', time: '6 мин' },
  { slug: 'turetskiy-dlya-raboty',   title: 'Турецкий для работы',                icon: '💼', time: '5 мин' },
  { slug: 'otkryt-biznes-v-turtsii', title: 'Как открыть бизнес в Турции',        icon: '🏢', time: '7 мин' },
  { slug: 'turetskiy-v-restoran',    title: 'В турецком ресторане',               icon: '🍽️', time: '4 мин' },
  { slug: 'turetskiy-v-transporte',  title: 'Транспорт в Турции',                 icon: '🚌', time: '5 мин' },
  { slug: 'turetskiy-v-shkole',      title: 'Турецкий для родителей: школа',       icon: '🏫', time: '5 мин' },
  { slug: 'turetskie-prazdniki',     title: 'Турецкие праздники и традиции',       icon: '🎉', time: '6 мин' },
  { slug: 'kak-podruzhitsya-s-turkom', title: 'Как подружиться с турком',         icon: '🤝', time: '5 мин' },
  { slug: 'turetskiy-yazyk-po-serialam', title: 'Учим турецкий по сериалам',     icon: '📺', time: '6 мин' },
  { slug: 'turetskie-vyrazheniya',   title: '30 выражений не из словаря',          icon: '✨', time: '7 мин' },
  { slug: 'turetskiy-za-30-dney',    title: 'Турецкий за 30 дней: план',          icon: '📅', time: '5 мин' },
];

function showBlog() {
  showScreen('screen-blog');
  updateNavActive('nav-blog');
  const list = document.getElementById('blog-list');
  list.innerHTML = '';
  BLOG_ARTICLES.forEach(a => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
      <span class="blog-card-icon">${a.icon}</span>
      <div class="blog-card-info">
        <div class="blog-card-title">${a.title}</div>
        <div class="blog-card-time">⏱ ${a.time} чтения</div>
      </div>`;
    card.onclick = () => openBlogArticle(a.slug, a.title);
    list.appendChild(card);
  });
}

function openBlogArticle(slug, title) {
  const frame = document.getElementById('blog-article-frame');
  if (frame) frame.src = `https://iziturkish.com/blog/${slug}.html?ref=cabinet`;
  document.getElementById('blog-article-title').textContent = title;
  showScreen('screen-blog-article');
}

// ─── NEWS ─────────────────────────────────────────────────────
const NEWS_FEEDS = [
  { id: 'main',    label: '🇹🇷 Турция',   url: 'https://www.hurriyet.com.tr/rss/anasayfa' },
  { id: 'economy', label: '💰 Экономика', url: 'https://www.hurriyet.com.tr/rss/ekonomi' },
  { id: 'sport',   label: '⚽ Спорт',     url: 'https://www.hurriyet.com.tr/rss/spor' },
];

let currentFeed = 'main';

function showNews() {
  showScreen('screen-news');
  updateNavActive('nav-news');
  renderNewsTabs();
  loadNews('main');
}

function renderNewsTabs() {
  const tabs = document.getElementById('news-topics');
  tabs.innerHTML = '';
  NEWS_FEEDS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'news-topic-btn' + (f.id === currentFeed ? ' active' : '');
    btn.textContent = f.label;
    btn.onclick = () => { currentFeed = f.id; renderNewsTabs(); loadNews(f.id); };
    tabs.appendChild(btn);
  });
}

async function loadNews(feedId) {
  const list = document.getElementById('news-list');
  list.innerHTML = '<div class="news-loading"><div class="spinner"></div>Загружаем новости...</div>';

  const feed = NEWS_FEEDS.find(f => f.id === feedId);
  if (!feed) return;

  try {
    const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=15`;
    const res  = await fetch(url);
    const data = await res.json();

    list.innerHTML = '';
    if (!data.items || data.items.length === 0) {
      list.innerHTML = '<div class="news-loading">Новостей не найдено</div>';
      return;
    }

    for (const item of data.items.slice(0, 10)) {
      const card = document.createElement('div');
      card.className = 'news-card';
      const date = new Date(item.pubDate).toLocaleDateString('ru-RU', { day:'numeric', month:'short' });
      card.innerHTML = `
        <div class="news-title">${item.title}</div>
        <div class="news-title-ru">⏳ Перевод загружается...</div>
        <div class="news-meta">${date}</div>`;
      card.onclick = () => window.open(item.link, '_blank');
      list.appendChild(card);

      // Перевод заголовка
      translateText(item.title).then(ru => {
        const el = card.querySelector('.news-title-ru');
        if (el) el.textContent = ru;
      }).catch(() => {});
    }
  } catch (e) {
    list.innerHTML = '<div class="news-loading">Не удалось загрузить новости</div>';
  }
}

async function translateText(text) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0,400))}&langpair=tr|ru`;
  const res  = await fetch(url);
  const data = await res.json();
  return data.responseData?.translatedText || text;
}

// ─── SETTINGS ─────────────────────────────────────────────────
function showSettings() {
  showScreen('screen-settings');
  updateNavActive('nav-settings');

  // User card
  const user = currentUser;
  const avatarEl = document.getElementById('settings-avatar');
  if (user?.photoURL) {
    avatarEl.innerHTML = `<img src="${user.photoURL}" alt="avatar">`;
  } else {
    avatarEl.textContent = (user?.displayName || 'U')[0].toUpperCase();
  }
  document.getElementById('settings-name').textContent  = user?.displayName || 'Пользователь';
  document.getElementById('settings-email').textContent = user?.email || '';

  // Sub status
  const sub = state.subscription;
  document.getElementById('settings-sub-status').textContent =
    sub?.status === 'active'   ? 'Подписка активна ✅' :
    sub?.status === 'trialing' ? 'Пробный период 🎁'  :
                                 'Бесплатный план';

  // Daily goal buttons
  document.querySelectorAll('.goal-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.xp) === state.dailyGoal);
  });
}

function setDailyGoal(xp) {
  state.dailyGoal = xp;
  saveState();
  document.querySelectorAll('.goal-btn').forEach(btn => {
    btn.classList.toggle('selected', parseInt(btn.dataset.xp) === xp);
  });
  showToast(`Цель: ${xp} XP в день`);
}

async function signOut() {
  try {
    await auth.signOut();
    state = { ...DEFAULT_STATE };
    localStorage.removeItem('iziturk_state');
    showScreen('screen-login');
  } catch (e) {
    showToast('Ошибка выхода');
  }
}

// ─── PAYWALL ──────────────────────────────────────────────────
function showPaywall() {
  showScreen('screen-paywall');
  document.getElementById('paywall-monthly-price').textContent = '€8.99 / месяц';
  document.getElementById('paywall-yearly-price').textContent  = '€4.99 / месяц';
}

function selectPlan(type) {
  document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('plan-' + type).classList.add('selected');
}

function buyPlan(type) {
  const productId = type === 'yearly' ? LEMON_YEARLY : LEMON_MONTHLY;
  const uid = currentUser?.uid || '';
  const url = `https://${LEMON_STORE}.lemonsqueezy.com/checkout/buy/${productId}?checkout[custom][user_id]=${uid}`;
  window.open(url, '_blank');
}

function hasAccess() {
  const sub = state.subscription;
  return sub && (sub.status === 'active' || sub.status === 'trialing');
}

// ─── STATE SAVE / LOAD ────────────────────────────────────────
async function loadUserState() {
  // 1. localStorage (быстро)
  const local = localStorage.getItem('iziturk_state');
  if (local) {
    try { state = { ...DEFAULT_STATE, ...JSON.parse(local) }; } catch (_) {}
  }

  // 2. Firestore (актуально)
  if (db && currentUser) {
    try {
      const doc = await db.collection('users').doc(currentUser.uid).get();
      if (doc.exists) {
        state = { ...DEFAULT_STATE, ...doc.data() };
        localStorage.setItem('iziturk_state', JSON.stringify(state));
      }
    } catch (_) {}
  }
}

async function saveState() {
  localStorage.setItem('iziturk_state', JSON.stringify(state));
  if (db && currentUser) {
    try {
      await db.collection('users').doc(currentUser.uid).set(state, { merge: true });
    } catch (_) {}
  }
}

// ─── STREAK CHECK ─────────────────────────────────────────────
function checkStreak() {
  const today = new Date().toDateString();
  if (state.lastPlayed === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (state.lastPlayed && state.lastPlayed !== yesterday.toDateString()) {
    state.streak = 0;
  }
  state.dailyXp = 0;
  saveState();
}

// ─── TTS ─────────────────────────────────────────────────────
function speakTr(text, event) {
  if (event) event.stopPropagation();
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang  = 'tr-TR';
  utt.rate  = 0.85;
  utt.pitch = 1;
  speechSynthesis.speak(utt);
}

// ─── SOUND ───────────────────────────────────────────────────
function playSound(type) {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (type === 'correct') {
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (_) {}
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── PUSH NOTIFICATIONS ──────────────────────────────────────
async function togglePush() {
  const btn = document.getElementById('push-toggle');
  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    showToast('Push-уведомления не поддерживаются');
    return;
  }
  const perm = await Notification.requestPermission();
  if (perm === 'granted') {
    btn.textContent = 'Уведомления включены ✅';
    showToast('Уведомления включены!');
  } else {
    showToast('Разрешите уведомления в настройках браузера');
  }
}

// ─── NAVIGATION HELPER ────────────────────────────────────────
function updateNavActive(id) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById(id);
  if (btn) btn.classList.add('active');
}

// ─── ONBOARDING ───────────────────────────────────────────────
let obGoal = 50;

function selectObGoal(xp) {
  obGoal = xp;
  document.querySelectorAll('.goal-btn').forEach(b => b.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

function finishOnboarding() {
  state.dailyGoal    = obGoal;
  state.onboardingDone = true;
  saveState();
  showHome();
}

// ─── AUTH ────────────────────────────────────────────────────
async function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    await auth.signInWithPopup(provider);
  } catch (err) {
    if (err.code === 'auth/popup-blocked') {
      await auth.signInWithRedirect(provider);
    } else {
      showToast('Ошибка входа: ' + err.message);
    }
  }
}

// ─── SERVICE WORKER ──────────────────────────────────────────
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ─── INIT ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initFirebase();
});
