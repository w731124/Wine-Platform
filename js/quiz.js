/* ════════════════════════════════════
   模擬考 MOCK EXAM
   50題，依 WSET L2 官方 LO 配分比例分層抽樣（不放回），
   選項於作答開始時 runtime 洗牌（不修改 QUIZ_BANK 原始資料），
   狀態僅存於模組層級變數，不使用 localStorage
════════════════════════════════════ */

const QUIZ_LO_ALLOCATION = {1:5, 2:4, 3:19, 4:12, 5:6, 6:4};
const QUIZ_DURATION_SECONDS = 60 * 60;

const QUIZ_GRADE_META = {
  dist:         {cls:'qb-dist',         short:'D', label:'Pass with Distinction(卓越)'},
  merit:        {cls:'qb-merit',        short:'M', label:'Pass with Merit(優異)'},
  pass:         {cls:'qb-pass',         short:'P', label:'Pass(合格)'},
  fail:         {cls:'qb-fail',         short:'F', label:'Fail(不合格)'},
  unclassified: {cls:'qb-unclassified', short:'U', label:'Fail unclassified(未達標)'}
};

let quizQuestions = [];
let quizAnswers = [];
let quizCurrentIndex = 0;
let quizTimeRemaining = QUIZ_DURATION_SECONDS;
let quizTimerId = null;
let quizSubmitted = false;

function quizShuffle(arr){
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showQuizState(state){
  document.querySelectorAll('.quiz-state').forEach(el => el.classList.remove('active'));
  const el = document.getElementById('quiz-state-' + state);
  if (el) el.classList.add('active');
}

function buildQuizQuestionSet(){
  let picked = [];
  Object.keys(QUIZ_LO_ALLOCATION).forEach(loKey => {
    const lo = Number(loKey);
    const n = QUIZ_LO_ALLOCATION[lo];
    const pool = QUIZ_BANK.filter(q => q.lo === lo);
    picked = picked.concat(quizShuffle(pool).slice(0, n));
  });
  picked = quizShuffle(picked);
  return picked.map(q => {
    const order = quizShuffle(q.options.map((opt, idx) => idx));
    return {
      id: q.id,
      lo: q.lo,
      question: q.question,
      explanation: q.explanation,
      options: order.map(origIdx => q.options[origIdx]),
      correctIndex: order.indexOf(q.correctIndex)
    };
  });
}

/* ── 開始測驗 ── */
function startQuiz(){
  if (quizTimerId) { clearInterval(quizTimerId); quizTimerId = null; }
  quizQuestions = buildQuizQuestionSet();
  quizAnswers = new Array(quizQuestions.length).fill(null);
  quizCurrentIndex = 0;
  quizTimeRemaining = QUIZ_DURATION_SECONDS;
  quizSubmitted = false;

  showQuizState('active');
  renderQuizNavGrid();
  renderQuizQuestion();
  updateQuizTimerDisplay();
  quizTimerId = setInterval(quizTick, 1000);
}

function quizTick(){
  quizTimeRemaining--;
  updateQuizTimerDisplay();
  if (quizTimeRemaining <= 0) submitQuiz(true);
}

function updateQuizTimerDisplay(){
  const el = document.getElementById('quiz-timer');
  if (!el) return;
  const m = Math.max(0, Math.floor(quizTimeRemaining / 60));
  const s = Math.max(0, quizTimeRemaining % 60);
  el.textContent = String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

/* ── 題目導覽 / 作答畫面 ── */
function quizNavCellStyle(state){
  const base = 'width:100%;aspect-ratio:1;border-radius:8px;cursor:pointer;font-size:var(--fs-sm);font-family:\'Inter\',sans-serif;';
  if (state === 'current') return base + 'border:2px solid var(--burg);background:var(--burg);color:#fff;font-weight:700;';
  if (state === 'answered') return base + 'border:1px solid var(--em);background:rgba(42,122,88,.12);color:var(--em);font-weight:600;';
  return base + 'border:1px solid var(--border);background:#fff;color:var(--txt3);font-weight:500;';
}

function renderQuizNavGrid(){
  const grid = document.getElementById('quiz-nav-grid');
  if (!grid) return;
  grid.innerHTML = quizQuestions.map((q, i) => {
    const state = i === quizCurrentIndex ? 'current' : (quizAnswers[i] !== null ? 'answered' : 'unanswered');
    return `<button style="${quizNavCellStyle(state)}" onclick="quizGoToQuestion(${i})">${i + 1}</button>`;
  }).join('');
}

function quizGoToQuestion(idx){
  if (idx < 0 || idx >= quizQuestions.length) return;
  quizCurrentIndex = idx;
  renderQuizNavGrid();
  renderQuizQuestion();
}

function quizGoToOffset(delta){
  quizGoToQuestion(quizCurrentIndex + delta);
}

function renderQuizQuestion(){
  const q = quizQuestions[quizCurrentIndex];
  if (!q) return;
  document.getElementById('quiz-question-meta').textContent = `第 ${quizCurrentIndex + 1} / ${quizQuestions.length} 題　LO${q.lo}`;
  document.getElementById('quiz-question-text').textContent = q.question;

  const optsWrap = document.getElementById('quiz-options');
  optsWrap.innerHTML = q.options.map((opt, i) => {
    const selected = quizAnswers[quizCurrentIndex] === i;
    const style = selected
      ? 'display:block;width:100%;text-align:left;padding:10px 14px;border-radius:10px;border:2px solid var(--burg);background:rgba(92,6,28,.06);color:var(--txt);font-size:var(--fs-base);cursor:pointer;font-family:\'Inter\',sans-serif;'
      : 'display:block;width:100%;text-align:left;padding:10px 14px;border-radius:10px;border:1px solid var(--border);background:#fff;color:var(--txt2);font-size:var(--fs-base);cursor:pointer;font-family:\'Inter\',sans-serif;';
    return `<button style="${style}" onclick="quizSelectAnswer(${i})">${opt}</button>`;
  }).join('');

  const prevBtn = document.getElementById('quiz-prev-btn');
  const nextBtn = document.getElementById('quiz-next-btn');
  if (prevBtn) prevBtn.disabled = quizCurrentIndex === 0;
  if (nextBtn) nextBtn.disabled = quizCurrentIndex === quizQuestions.length - 1;
}

function quizSelectAnswer(optIndex){
  quizAnswers[quizCurrentIndex] = optIndex;
  renderQuizNavGrid();
  renderQuizQuestion();
}

/* ── 繳卷 / 計分 ── */
function submitQuiz(isAuto){
  if (quizSubmitted) return;
  if (!isAuto) {
    const unanswered = quizAnswers.filter(a => a === null).length;
    if (unanswered > 0 && !confirm(`還有 ${unanswered} 題尚未作答，確定要繳卷嗎？`)) return;
  }
  quizSubmitted = true;
  if (quizTimerId) { clearInterval(quizTimerId); quizTimerId = null; }
  renderQuizResults();
  showQuizState('result');
}

function calculateQuizResults(){
  let correct = 0, wrong = 0, unanswered = 0;
  const loStats = {};
  quizQuestions.forEach((q, i) => {
    if (!loStats[q.lo]) loStats[q.lo] = {correct: 0, total: 0};
    loStats[q.lo].total++;
    const ans = quizAnswers[i];
    if (ans === null) unanswered++;
    else if (ans === q.correctIndex) { correct++; loStats[q.lo].correct++; }
    else wrong++;
  });
  const scoreRatio = correct / quizQuestions.length;
  let grade;
  if (scoreRatio >= 0.85) grade = 'dist';
  else if (scoreRatio >= 0.70) grade = 'merit';
  else if (scoreRatio >= 0.55) grade = 'pass';
  else if (scoreRatio >= 0.45) grade = 'fail';
  else grade = 'unclassified';
  return {correct, wrong, unanswered, scoreRatio, grade, loStats};
}

function renderQuizResults(){
  const r = calculateQuizResults();
  const meta = QUIZ_GRADE_META[r.grade];

  const badge = document.getElementById('quiz-result-badge');
  badge.className = 'quiz-badge ' + meta.cls;
  badge.textContent = meta.short;
  document.getElementById('quiz-result-grade-text').textContent = meta.label;
  document.getElementById('quiz-result-score-text').textContent = `${r.correct} / ${quizQuestions.length}　（${(r.scoreRatio * 100).toFixed(1)}%）`;

  const loWrap = document.getElementById('quiz-lo-breakdown');
  loWrap.innerHTML = Object.keys(r.loStats).sort((a, b) => a - b).map(lo => {
    const s = r.loStats[lo];
    return `<span class="tg" style="background:rgba(92,6,28,.06);color:var(--burg);">LO${lo}：${s.correct}/${s.total}</span>`;
  }).join('');

  const reviewWrap = document.getElementById('quiz-review-list');
  reviewWrap.innerHTML = quizQuestions.map((q, i) => {
    const ans = quizAnswers[i];
    const isUnanswered = ans === null;
    const isCorrect = ans === q.correctIndex;
    const stateColor = isUnanswered ? 'var(--txt4)' : (isCorrect ? 'var(--em)' : '#C87020');
    const stateLabel = isUnanswered ? '未作答' : (isCorrect ? '答對' : '答錯');

    const optsHtml = q.options.map((opt, oi) => {
      let prefix = '', color = 'var(--txt2)', weight = '400';
      if (oi === q.correctIndex) { prefix = '✓ '; color = 'var(--em)'; weight = '600'; }
      if (oi === ans && ans !== q.correctIndex) { prefix = '✗ '; color = '#C87020'; weight = '600'; }
      return `<div style="font-size:var(--fs-base);color:${color};font-weight:${weight};padding:2px 0;">${prefix}${opt}</div>`;
    }).join('');

    return `<div style="background:var(--bg-card);border:1px solid var(--border-lt);border-left:4px solid ${stateColor};border-radius:12px;padding:14px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
        <p style="font-size:var(--fs-base);font-weight:600;color:var(--txt);">第${i + 1}題（LO${q.lo}）${q.question}</p>
        <span style="font-size:var(--fs-sm);font-weight:600;color:${stateColor};white-space:nowrap;">${stateLabel}</span>
      </div>
      <div style="margin-bottom:8px;">${optsHtml}</div>
      <p style="font-size:var(--fs-sm);color:var(--txt2);">解析：${q.explanation}</p>
    </div>`;
  }).join('');
}

/* ── 初始化：僅顯示起始畫面，不預先抽題 ── */
function initQuizPanel(){
  showQuizState('start');
}
