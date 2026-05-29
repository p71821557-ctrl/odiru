/* ============================================================
   어디루 - 국내여행 페이지 JS
   서버 /api/ai-recommend 엔드포인트 연동
   ============================================================ */

let selRegion = null;
let selCats   = new Set();
let currentUser = null;

/* ── DOM ── */
const paths        = document.querySelectorAll('.region-path');
const selRegionEl  = document.getElementById('selRegion');
const selRegionTxt = document.getElementById('selRegionText');
const btnGo        = document.getElementById('btnGo');
const resultPanel  = document.getElementById('resultPanel');
const btnBack      = document.getElementById('btnBack');
const cardsBox     = document.getElementById('cardsContainer');
const mapHint      = document.getElementById('mapHint');

/* ============================================================
   1. 유저 정보 로드 (헤더 처리)
   ============================================================ */
async function loadUser() {
  try {
    const res  = await fetch('/api/user');
    const user = await res.json();
    currentUser = user;
    renderHeader(user);
  } catch {
    renderHeader(null);
  }
}

function renderHeader(user) {
  const right = document.getElementById('headerRight');

  if (user) {
    const avatarEl = user.profileImage
      ? `<img class="user-avatar" src="${user.profileImage}" alt="프로필"/>`
      : `<div class="user-avatar-placeholder">${user.nickname.charAt(0)}</div>`;

    right.innerHTML = `
      <span class="user-nickname">
        ${avatarEl}
        ${user.nickname}님
      </span>
      <button class="hbtn" onclick="location.href='/mypage'">마이페이지</button>
      <button class="hbtn logout-btn" onclick="location.href='/logout'">로그아웃</button>
    `;
  } else {
    right.innerHTML = `
      <button class="hbtn" onclick="location.href='/mypage'">마이페이지</button>
      <button class="hbtn" onclick="location.href='/login'">로그인</button>
    `;
  }
}

/* ============================================================
   2. 지도 - 지역 클릭
   ============================================================ */
paths.forEach(p => {
  p.addEventListener('click', () => {
    paths.forEach(x => x.classList.remove('active'));
    p.classList.add('active');
    selRegion = p.dataset.region;
    selRegionEl.classList.remove('empty');
    selRegionTxt.textContent = selRegion;
    mapHint.textContent = selRegion + ' 선택됨 ✓';
    updateBtn();
  });

  p.addEventListener('mouseenter', () => {
    mapHint.textContent = p.dataset.region;
  });
  p.addEventListener('mouseleave', () => {
    mapHint.textContent = selRegion
      ? selRegion + ' 선택됨 ✓'
      : '지역을 클릭하여 선택하세요';
  });
});

/* ============================================================
   3. 카테고리 토글
   ============================================================ */
document.querySelectorAll('.cat-tag').forEach(t => {
  t.addEventListener('click', () => {
    t.classList.toggle('on');
    if (t.classList.contains('on')) selCats.add(t.dataset.cat);
    else selCats.delete(t.dataset.cat);
    updateBtn();
  });
});

function updateBtn() {
  btnGo.disabled = !selRegion || selCats.size === 0;
}

/* ============================================================
   4. AI 추천 요청
   ============================================================ */
btnGo.addEventListener('click', () => {
  // 비로그인 유저도 추천 가능 (저장만 안 됨)
  fetchRecommendations();
});

btnBack.addEventListener('click', () => {
  resultPanel.classList.remove('open');
});

async function fetchRecommendations() {
  resultPanel.classList.add('open');
  document.getElementById('resultTitle').textContent = selRegion + ' 추천 여행지';
  document.getElementById('resultCats').textContent  = [...selCats].join(' · ');

  cardsBox.innerHTML = `
    <div class="loading-box">
      <div class="spinner"></div>
      <strong>AI가 최적의 여행지를 찾고 있어요</strong>
      <p>${selRegion}의 ${[...selCats].join(', ')} 정보를 분석 중입니다...</p>
    </div>`;

  try {
    const res = await fetch('/api/ai-recommend', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        region:     selRegion,
        categories: [...selCats],
      }),
    });

    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.message || `서버 오류 (${res.status})`);
    }

    renderCards(json.data);

    // 비로그인 유저 안내 (상단에 살짝 표시)
    if (!currentUser) {
      const notice = document.createElement('div');
      notice.style.cssText = `
        background:#fff8e1;border-left:4px solid #ffc107;
        padding:12px 20px;margin:0 28px 0;border-radius:8px;
        font-size:13px;color:#666;display:flex;align-items:center;gap:10px;`;
      notice.innerHTML = `
        <span>🔖</span>
        <span>로그인하면 여행 기록이 저장돼요!
          <a href="/login" style="color:#00a2ed;font-weight:700;margin-left:6px;">카카오 로그인 →</a>
        </span>`;
      cardsBox.insertBefore(notice, cardsBox.firstChild);
    }

  } catch (err) {
    console.error('AI 추천 오류:', err);
    cardsBox.innerHTML = `
      <div class="error-box">
        <div class="icon">⚠️</div>
        <p>
          <strong>추천 정보를 불러오지 못했어요.</strong><br>
          ${err.message}<br>
          <small style="color:#bbb;font-size:11px;">잠시 후 다시 시도해주세요.</small>
        </p>
      </div>`;
  }
}

/* ============================================================
   5. 카드 렌더링
   ============================================================ */
const CAT_COLORS = {
  '맛집':       '#e74c3c', '카페':     '#a0522d', '야시장':   '#e67e22', '전통음식': '#c0392b',
  '관광명소':   '#2980b9', '문화':     '#8e44ad', '박물관':   '#16a085', '역사':     '#2c3e50', '전통시장': '#d35400',
  '자연':       '#27ae60', '바다':     '#00a2ed', '산·등산':  '#229954', '힐링':     '#76b852', '캠핑':     '#5d6d7e', '온천': '#e74c3c',
  '놀이공원':   '#f39c12', '체험':     '#1abc9c', '레저스포츠':'#3498db','드라이브': '#95a5a6',
  '커플':       '#e91e63', '가족':     '#ff9800', '혼행':     '#607d8b', '포토스팟': '#9c27b0', '야경': '#3f51b5',
};

function renderCards(places) {
  if (!places || places.length === 0) {
    cardsBox.innerHTML = `<div class="error-box"><div class="icon">🔍</div><p>추천 결과가 없습니다.</p></div>`;
    return;
  }

  const grid = document.createElement('div');
  grid.className = 'cards-grid';

  grid.innerHTML = places.map(p => {
    const col    = CAT_COLORS[p.category] || '#00a2ed';
    const bg     = col + '18';
    const rating = parseFloat(p.rating) || 4.0;
    const full   = Math.floor(rating);
    const half   = rating % 1 >= 0.5 ? 1 : 0;
    const empty  = 5 - full - half;
    const stars  = '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);

    return `
      <div class="place-card">
        <div class="card-thumb" style="background:${bg};">${p.emoji || '📍'}</div>
        <div class="card-body">
          <div class="card-cat" style="color:${col};">${p.category}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-desc">${p.description}</div>
          <div class="card-rating">${stars} ${rating.toFixed(1)}</div>
          ${p.address ? `<div class="card-address">📍 ${p.address}</div>` : ''}
          ${p.tip     ? `<div class="card-tip">💡 ${p.tip}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  cardsBox.innerHTML = '';
  cardsBox.appendChild(grid);
}

/* ============================================================
   6. 초기화
   ============================================================ */
loadUser();