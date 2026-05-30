// ==========================================
// 어디루 마이페이지 JS
// ==========================================

let places = JSON.parse(localStorage.getItem('odiru_places') || '[]');

let kakaoMap = null;
let markers = [];
const geoCache = {};

let currentPos = null;
let currentMarker = null;
let activeInfoWindow = null;

const KOREA_BOUNDS = {
  sw: { lat: 33.0, lng: 124.5 },
  ne: { lat: 38.9, lng: 131.9 }
};


// ── 유틸 ──────────────────────────────
function getRegion(name) {
  const regions = [
    '서울', '부산', '제주', '대구', '인천', '광주', '대전',
    '속초', '춘천', '강릉', '전주', '여수', '통영', '경주',
    '수원', '목포', '안동', '양양', '울산', '청주', '창원'
  ];
  for (const r of regions) {
    if (name.includes(r)) return r;
  }
  return name.slice(0, 2);
}

function save() {
  localStorage.setItem('odiru_places', JSON.stringify(places));
}

function formatTime(seconds) {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : `${m}분`;
}

function getFlightInfo(startCoords, endCoords) {
  const R = 6371;
  const dLat = (endCoords.getLat() - startCoords.getLat()) * Math.PI / 180;
  const dLng = (endCoords.getLng() - startCoords.getLng()) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(startCoords.getLat() * Math.PI / 180) *
    Math.cos(endCoords.getLat() * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2;
  const straightKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const flightKm = straightKm * 1.3;
  const flightMin = Math.round(flightKm / 800 * 60 + 40);
  return { flightKm, flightMin };
}


// ── AI 카테고리 분류 ──────────────────────────────
let categoryCache = JSON.parse(localStorage.getItem('odiru_categories') || '{}');

async function classifyPlaces(names) {
  if (names.length === 0) return {};
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `다음 한국 여행지들을 각각 자연, 도시, 역사, 음식 중 하나로 분류해줘.
반드시 JSON 객체만 반환해. 설명 없이 JSON만:
{"여행지명": "카테고리"}
여행지: ${names.join(', ')}`
        }]
      })
    });
    const data = await res.json();
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error('AI 분류 실패:', e);
    return {};
  }
}


// ── 통계 & 성향 업데이트 ──────────────────────────────
async function updateStats() {
  const total = places.length;
  const regions = new Set(places.map(p => getRegion(p.name)));
  const now = new Date();
  const thisMonth = places.filter(p => {
    if (!p.date) return false;
    const d = new Date(p.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-region').textContent = regions.size;
  document.getElementById('stat-month').textContent = thisMonth;

  if (total === 0) {
    ['nature', 'city', 'hist', 'food'].forEach(k => {
      document.getElementById('bar-' + k).style.width = '0%';
      document.getElementById('pct-' + k).textContent = '0%';
    });
    document.getElementById('tendency-msg').textContent = '여행지를 추가하면 성향이 분석됩니다.';
    return;
  }

  // 캐시에 없는 장소만 AI 분류
  const uncached = places.map(p => p.name).filter(n => !categoryCache[n]);
  if (uncached.length > 0) {
    const result = await classifyPlaces(uncached);
    Object.assign(categoryCache, result);
    localStorage.setItem('odiru_categories', JSON.stringify(categoryCache));
  }

  const cats = { '자연': 0, '도시': 0, '역사': 0, '음식': 0 };
  places.forEach(p => {
    const c = categoryCache[p.name] || '도시';
    if (cats[c] !== undefined) cats[c]++;
  });

  const ids = { '자연': 'nature', '도시': 'city', '역사': 'hist', '음식': 'food' };
  for (const [cat, key] of Object.entries(ids)) {
    const pct = Math.round(cats[cat] / total * 100);
    setTimeout(() => {
      document.getElementById('bar-' + key).style.width = pct + '%';
    }, 100);
    document.getElementById('pct-' + key).textContent = pct + '%';
  }

  const top = Object.entries(cats).sort((a, b) => b[1] - a[1])[0][0];
  document.getElementById('tendency-msg').textContent = `주로 ${top} 스타일 여행을 즐기시는군요! 🎒`;
}


// ── 여행지 목록 렌더링 ──────────────────────────────
function renderList() {
  const list = document.getElementById('place-list');
  if (places.length === 0) {
    list.innerHTML = '<div class="empty-msg">아직 기록된 여행지가 없어요<br>위에서 추가해보세요 ✈️</div>';
    return;
  }
  list.innerHTML = [...places].reverse().map((p, i) => {
    const realIdx = places.length - 1 - i;
    return `
      <div class="place-item">
        <div class="pdot"></div>
        <span class="pname">${p.name}</span>
        <span class="pdate">${p.date || '날짜 미입력'}</span>
        <button class="pdel" onclick="delPlace(${realIdx})" aria-label="삭제">×</button>
      </div>
    `;
  }).join('');
}


// ── 여행지 추가 / 삭제 ──────────────────────────────
async function addPlace() {
  const ni = document.getElementById('place-input');
  const di = document.getElementById('date-input');
  const name = ni.value.trim();
  if (!name) { ni.focus(); return; }

  places.push({ name, date: di.value || '' });
  save();
  ni.value = '';

  renderList();
  await updateStats();
  updateMap();
}

async function delPlace(idx) {
  places.splice(idx, 1);
  save();
  renderList();
  await updateStats();
  updateMap();
}


// ── 카카오맵 ──────────────────────────────
function initMap() {
  try {
    if (typeof kakao === 'undefined' || !kakao.maps) return;
    const container = document.getElementById('kakao-map');
    kakaoMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(36.5, 127.5),
      level: 13
    });
    kakaoMap.setMaxLevel(13);
    kakaoMap.setBounds(new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(KOREA_BOUNDS.sw.lat, KOREA_BOUNDS.sw.lng),
      new kakao.maps.LatLng(KOREA_BOUNDS.ne.lat, KOREA_BOUNDS.ne.lng)
    ));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          addCurrentLocationMarker(currentPos);
        },
        (err) => console.warn('현재 위치 조회 실패:', err.message),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }

    updateMap();
  } catch (e) {
    console.warn('카카오맵 초기화 실패:', e);
  }
}

function addCurrentLocationMarker(pos) {
  if (currentMarker) currentMarker.setMap(null);
  const content = `
    <div style="width:16px;height:16px;border-radius:50%;
      background:#2979ff;border:3px solid white;
      box-shadow:0 2px 8px rgba(41,121,255,0.5);position:relative;">
      <div style="width:32px;height:32px;border-radius:50%;
        background:rgba(41,121,255,0.15);
        position:absolute;top:-8px;left:-8px;
        animation:pulse 2s ease-out infinite;"></div>
    </div>
    <style>
      @keyframes pulse {
        0%   { transform:scale(1);   opacity:0.8; }
        100% { transform:scale(2.2); opacity:0;   }
      }
    </style>`;
  currentMarker = new kakao.maps.CustomOverlay({ map: kakaoMap, position: pos, content, zIndex: 10 });
}

function updateMap() {
  if (!kakaoMap) return;
  markers.forEach(m => m.setMap(null));
  markers = [];
  if (activeInfoWindow) { activeInfoWindow.close(); activeInfoWindow = null; }

  if (places.length === 0) {
    document.getElementById('kakao-map').style.display = 'none';
    document.getElementById('map-placeholder').style.display = 'flex';
    return;
  }

  document.getElementById('kakao-map').style.display = 'block';
  document.getElementById('map-placeholder').style.display = 'none';
  kakaoMap.relayout();

  const ps = new kakao.maps.services.Places();
  let done = 0;
  const total = places.length;

  places.forEach(p => {
    const onFound = (pos) => {
      addPlaceMarker(pos, p.name);
      done++;
      if (done === total) {
        kakaoMap.setMaxLevel(13);
        kakaoMap.setBounds(new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(KOREA_BOUNDS.sw.lat, KOREA_BOUNDS.sw.lng),
          new kakao.maps.LatLng(KOREA_BOUNDS.ne.lat, KOREA_BOUNDS.ne.lng)
        ));
      }
    };

    if (geoCache[p.name]) { onFound(geoCache[p.name]); return; }

    ps.keywordSearch(p.name + ' 한국', (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const pos = new kakao.maps.LatLng(result[0].y, result[0].x);
        geoCache[p.name] = pos;
        onFound(pos);
      } else {
        done++;
      }
    });
  });
}

function addPlaceMarker(pos, name) {
  const marker = new kakao.maps.Marker({ map: kakaoMap, position: pos });

  kakao.maps.event.addListener(marker, 'click', async () => {
    if (activeInfoWindow) activeInfoWindow.close();

    const iw = new kakao.maps.InfoWindow({
      content: `<div style="padding:10px 14px;font-size:13px;font-weight:700;color:#2979ff;white-space:nowrap;">🔄 이동시간 계산 중...</div>`
    });
    iw.open(kakaoMap, marker);
    activeInfoWindow = iw;

    if (!currentPos) {
      iw.setContent(`
        <div style="padding:10px 14px;min-width:160px;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:4px;">📍 ${name}</div>
          <div style="font-size:12px;color:#aaa;">현재 위치를 허용하면<br>이동시간을 알 수 있어요</div>
        </div>`);
      return;
    }

    try {
      const url = `https://router.project-osrm.org/route/v1/driving/` +
        `${currentPos.getLng()},${currentPos.getLat()};${pos.getLng()},${pos.getLat()}?overview=false`;
      const res = await fetch(url);
      const data = await res.json();

      let driveText = '계산 불가', distText = '';
      if (data.code === 'Ok') {
        distText = `${(data.routes[0].distance / 1000).toFixed(1)} km`;
        driveText = formatTime(data.routes[0].duration);
      }

      const { flightKm, flightMin } = getFlightInfo(currentPos, pos);
      iw.setContent(`
        <div style="padding:12px 16px;min-width:200px;font-family:Pretendard,sans-serif;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:10px;">📍 ${name}</div>
          <div style="font-size:13px;color:#444;margin-bottom:5px;">🚗 <strong>자동차</strong> &nbsp; ${distText} &nbsp;|&nbsp; 약 ${driveText}</div>
          <div style="font-size:13px;color:#444;">✈️ <strong>비행기</strong> &nbsp; ${flightKm.toFixed(1)} km &nbsp;|&nbsp; 약 ${formatTime(flightMin * 60)}</div>
          <div style="font-size:11px;color:#bbb;margin-top:8px;">* 현재 위치 기준</div>
        </div>`);
    } catch (e) {
      iw.setContent(`
        <div style="padding:10px 14px;min-width:160px;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:4px;">📍 ${name}</div>
          <div style="font-size:12px;color:#aaa;">경로 계산에 실패했어요</div>
        </div>`);
    }
  });

  kakao.maps.event.addListener(kakaoMap, 'click', () => {
    if (activeInfoWindow) { activeInfoWindow.close(); activeInfoWindow = null; }
  });

  markers.push(marker);
}


// ── AI 여행지 추천 ──────────────────────────────
async function getAIRec() {
  const area = document.getElementById('ai-result-area');
  const btn = document.getElementById('ai-rec-btn');

  if (places.length === 0) {
    area.innerHTML = '<div class="ai-loading">먼저 방문한 여행지를 추가해주세요!</div>';
    return;
  }

  btn.disabled = true;
  btn.textContent = '분석 중...';
  area.innerHTML = '<div class="ai-loading"><span class="spin">✦</span> AI가 여행 기록을 분석하고 있어요...</div>';

  const placeList = places.map(p => p.name).join(', ');

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        messages: [{
          role: 'user',
          content: `사용자가 방문한 국내 여행지: ${placeList}

위 여행지들을 바탕으로 사용자의 여행 성향을 파악하고,
이 목록에 없는 국내 여행지 3곳을 추천해줘.
반드시 JSON 배열만 반환해. 설명 없이 JSON만:
[
  {"name": "여행지명", "reason": "방문 기록과 연결된 추천 이유 (20자 이내)", "emoji": "관련 이모지"},
  {"name": "여행지명", "reason": "방문 기록과 연결된 추천 이유 (20자 이내)", "emoji": "관련 이모지"},
  {"name": "여행지명", "reason": "방문 기록과 연결된 추천 이유 (20자 이내)", "emoji": "관련 이모지"}
]`
        }]
      })
    });

    const data = await res.json();
    const text = data.content.map(c => c.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const recs = JSON.parse(clean);

    area.innerHTML = recs.map(r => `
      <div class="ai-chip" onclick="handleChipClick('${r.name}')">
        <span class="chip-emoji">${r.emoji}</span>
        <div>
          <div class="chip-name">${r.name}</div>
          <div class="chip-reason">${r.reason}</div>
        </div>
        <span class="chip-arrow">→</span>
      </div>
    `).join('');

  } catch (e) {
    area.innerHTML = '<div class="ai-loading">추천을 불러오지 못했어요. 다시 시도해주세요.</div>';
    console.error('AI 추천 오류:', e);
  } finally {
    btn.disabled = false;
    btn.textContent = '✦ 내 여행 기록 기반 AI 추천 받기';
  }
}

function handleChipClick(name) {
  window.location.href = `/?dest=${encodeURIComponent(name)}`;
}


// ── 로그아웃 ──────────────────────────────
function doLogout() {
  if (confirm('로그아웃 하시겠습니까?')) {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('loginUser');
    window.location.href = '/logout';
  }
}


// ── 로그인 유저 정보 로드 ──────────────────────────────
async function loadUser() {
  try {
    const res = await fetch('/api/user');
    const user = await res.json();

    if (!user) {
      alert('로그인이 필요합니다.');
      window.location.href = '/';
      return;
    }

    document.getElementById('user-name').textContent = `${user.nickname}님`;

    // 헤더 버튼 — index.html 로그인 후 상태와 동일
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginBtn) {
      loginBtn.textContent = `${user.nickname}님`;
      loginBtn.style.background = '#f1f3f5';
      loginBtn.style.color = '#333';
    }
    if (logoutBtn) {
      logoutBtn.style.display = 'inline-block';
      logoutBtn.onclick = doLogout;
    }

    const avatarBox = document.getElementById('avatar-box');
    if (user.profileImage) {
      avatarBox.innerHTML = `<img src="${user.profileImage}" alt="프로필" />`;
    } else {
      avatarBox.textContent = user.nickname.charAt(0);
    }

  } catch (e) {
    console.error('유저 정보 로드 실패:', e);
    document.getElementById('user-name').textContent = '정보를 불러올 수 없습니다.';
  }
}


// ── 초기화 ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date-input').value = new Date().toISOString().split('T')[0];

  document.getElementById('place-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addPlace();
  });

  loadUser();
  renderList();
  updateStats();

  if (typeof kakao !== 'undefined' && kakao.maps) {
    initMap();
  } else {
    const script = document.querySelector('script[src*="dapi.kakao"]');
    if (script) script.addEventListener('load', initMap);
    else setTimeout(initMap, 2000);
  }
});