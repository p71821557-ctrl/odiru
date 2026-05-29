// ==========================================
// 어디루 마이페이지 JS
// ==========================================

// ── 데이터 ──────────────────────────────
let places = JSON.parse(localStorage.getItem('odiru_places') || '[]');

// 카카오맵 관련
let kakaoMap = null;
let markers = [];
const geoCache = {};  // 검색 결과 캐시 (재검색 방지)

// 장소명 → 카테고리 분류 사전
const regionMap = {
  '서울': '도시', '명동': '도시', '홍대': '도시', '강남': '도시', '이태원': '도시',
  '인사동': '역사', '경복궁': '역사', '광화문': '역사', '창덕궁': '역사',
  '수원': '역사', '전주': '역사', '경주': '역사', '공주': '역사', '안동': '역사', '목포': '역사',
  '한라산': '자연', '제주': '자연', '설악산': '자연', '지리산': '자연',
  '소양강': '자연', '담양': '자연', '남해': '자연', '동해': '자연',
  '해운대': '자연', '속초': '자연', '춘천': '자연', '강릉': '자연',
  '양양': '자연', '광안리': '자연', '통영': '자연', '여수': '자연',
  '부산': '도시', '대구': '도시', '인천': '도시', '대전': '도시', '광주': '도시',
};

const FOOD_KEYWORDS = ['맛집', '시장', '포장마차', '식당', '카페', '마켓', '먹거리'];


// ── 유틸 ──────────────────────────────
function getCategory(name) {
  for (const [k, v] of Object.entries(regionMap)) {
    if (name.includes(k)) return v;
  }
  if (FOOD_KEYWORDS.some(f => name.includes(f))) return '음식';
  return '도시';
}

function getRegion(name) {
  const regions = [
    '서울', '부산', '제주', '대구', '인천', '광주', '대전',
    '속초', '춘천', '강릉', '전주', '여수', '통영', '경주',
    '수원', '목포', '안동', '양양'
  ];
  for (const r of regions) {
    if (name.includes(r)) return r;
  }
  return name.slice(0, 2);
}

function save() {
  localStorage.setItem('odiru_places', JSON.stringify(places));
}


// ── 통계 & 성향 업데이트 ──────────────────────────────
function updateStats() {
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

  // 성향 바
  const cats = { '자연': 0, '도시': 0, '역사': 0, '음식': 0 };
  places.forEach(p => {
    const c = getCategory(p.name);
    if (cats[c] !== undefined) cats[c]++;
  });

  const ids = { '자연': 'nature', '도시': 'city', '역사': 'hist', '음식': 'food' };
  const hasData = total > 0;

  for (const [cat, key] of Object.entries(ids)) {
    const pct = hasData ? Math.round(cats[cat] / total * 100) : 0;
    setTimeout(() => {
      document.getElementById('bar-' + key).style.width = pct + '%';
    }, 100);
    document.getElementById('pct-' + key).textContent = pct + '%';
  }

  const tendMsg = document.getElementById('tendency-msg');
  if (hasData) {
    const top = Object.entries(cats).sort((a, b) => b[1] - a[1])[0][0];
    tendMsg.textContent = `주로 ${top} 스타일 여행을 즐기시는군요! 🎒`;
  } else {
    tendMsg.textContent = '여행지를 추가하면 성향이 분석됩니다.';
  }
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
function addPlace() {
  const ni = document.getElementById('place-input');
  const di = document.getElementById('date-input');
  const name = ni.value.trim();
  if (!name) { ni.focus(); return; }

  places.push({ name, date: di.value || '' });
  save();
  ni.value = '';

  renderList();
  updateStats();
  updateMap();
}

function delPlace(idx) {
  places.splice(idx, 1);
  save();
  renderList();
  updateStats();
  updateMap();
}


// ── 카카오맵 ──────────────────────────────
let currentPos = null;       // 현재 위치 LatLng
let currentMarker = null;    // 현재 위치 마커
let activeInfoWindow = null; // 현재 열린 인포윈도우

// 한국 영역 bounds 상수
const KOREA_BOUNDS = {
  sw: { lat: 33.0, lng: 124.5 },
  ne: { lat: 38.9, lng: 131.9 }
};

function initMap() {
  try {
    if (typeof kakao === 'undefined' || !kakao.maps) return;

    const container = document.getElementById('kakao-map');
    kakaoMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(36.5, 127.5),
      level: 13
    });

    // ── 한국 범위 고정 (index.html 동일) ──
    const koreaBounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(KOREA_BOUNDS.sw.lat, KOREA_BOUNDS.sw.lng),
      new kakao.maps.LatLng(KOREA_BOUNDS.ne.lat, KOREA_BOUNDS.ne.lng)
    );
    kakaoMap.setMaxLevel(13);
    kakaoMap.setBounds(koreaBounds);

    // ── 현재 위치 가져오기 ──
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
          addCurrentLocationMarker(currentPos);
        },
        (err) => {
          console.warn('현재 위치 조회 실패:', err.message);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }

    updateMap();
  } catch (e) {
    console.warn('카카오맵 초기화 실패:', e);
  }
}

// 현재 위치 마커 (파란 점 스타일)
function addCurrentLocationMarker(pos) {
  if (currentMarker) currentMarker.setMap(null);

  const imgSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
  const imgSize = new kakao.maps.Size(24, 35);

  // 커스텀 오버레이로 파란 원형 마커
  const content = `
    <div style="
      width:16px;height:16px;border-radius:50%;
      background:#2979ff;border:3px solid white;
      box-shadow:0 2px 8px rgba(41,121,255,0.5);
      position:relative;
    ">
      <div style="
        width:32px;height:32px;border-radius:50%;
        background:rgba(41,121,255,0.15);
        position:absolute;top:-8px;left:-8px;
        animation:pulse 2s ease-out infinite;
      "></div>
    </div>
    <style>
      @keyframes pulse {
        0%   { transform:scale(1);   opacity:0.8; }
        100% { transform:scale(2.2); opacity:0;   }
      }
    </style>
  `;

  currentMarker = new kakao.maps.CustomOverlay({
    map: kakaoMap,
    position: pos,
    content,
    zIndex: 10
  });

  // 현재위치 클릭 시 라벨 표시
  const iw = new kakao.maps.InfoWindow({
    content: `<div style="padding:7px 12px;font-size:13px;font-weight:700;color:#2979ff;white-space:nowrap;">📍 현재 위치</div>`
  });
  kakao.maps.event.addListener(kakaoMap, 'click', () => iw.close());
}

function updateMap() {
  if (!kakaoMap) return;

  // 기존 여행지 마커 제거
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
  kakaoMap.relayout(); // display:block 전환 후 크기 재계산

  const ps = new kakao.maps.services.Places();
  let done = 0;
  const total = places.length;

  places.forEach(p => {
    const onFound = (pos) => {
      addPlaceMarker(pos, p.name);
      done++;
      // 모든 마커 추가 완료 후 → 한국 전체 범위로 리셋 (index.html 동일)
      if (done === total) {
        const koreaBounds = new kakao.maps.LatLngBounds(
          new kakao.maps.LatLng(KOREA_BOUNDS.sw.lat, KOREA_BOUNDS.sw.lng),
          new kakao.maps.LatLng(KOREA_BOUNDS.ne.lat, KOREA_BOUNDS.ne.lng)
        );
        kakaoMap.setMaxLevel(13);
        kakaoMap.setBounds(koreaBounds);
      }
    };

    if (geoCache[p.name]) {
      onFound(geoCache[p.name]);
      return;
    }

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

// 여행지 마커 — 클릭 시 현재위치 기준 이동시간 계산
function addPlaceMarker(pos, name) {
  const marker = new kakao.maps.Marker({ map: kakaoMap, position: pos });

  kakao.maps.event.addListener(marker, 'click', async () => {
    // 이전 인포윈도우 닫기
    if (activeInfoWindow) activeInfoWindow.close();

    // 로딩 인포윈도우 먼저 표시
    const iw = new kakao.maps.InfoWindow({
      content: `<div style="padding:10px 14px;font-size:13px;font-weight:700;color:#2979ff;white-space:nowrap;">
        🔄 이동시간 계산 중...
      </div>`
    });
    iw.open(kakaoMap, marker);
    activeInfoWindow = iw;

    // 현재위치 없으면 이름만 표시
    if (!currentPos) {
      iw.setContent(`
        <div style="padding:10px 14px;min-width:160px;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:4px;">📍 ${name}</div>
          <div style="font-size:12px;color:#aaa;">현재 위치를 허용하면<br>이동시간을 알 수 있어요</div>
        </div>
      `);
      return;
    }

    try {
      // OSRM 자동차 경로 (index.html 동일 로직)
      const url = `https://router.project-osrm.org/route/v1/driving/` +
        `${currentPos.getLng()},${currentPos.getLat()};` +
        `${pos.getLng()},${pos.getLat()}` +
        `?overview=false`;

      const res = await fetch(url);
      const data = await res.json();

      let driveText = '계산 불가';
      let distText = '';

      if (data.code === 'Ok') {
        const distKm = (data.routes[0].distance / 1000).toFixed(1);
        const driveSec = data.routes[0].duration;
        driveText = formatTime(driveSec);
        distText = `${distKm} km`;
      }

      // 하버사인 직선거리 → 비행시간
      const { flightKm, flightMin } = getFlightInfo(currentPos, pos);
      const flightText = formatTime(flightMin * 60);

      iw.setContent(`
        <div style="padding:12px 16px;min-width:200px;font-family:Pretendard,sans-serif;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:10px;">📍 ${name}</div>
          <div style="font-size:13px;color:#444;margin-bottom:5px;">
            🚗 <strong>자동차</strong> &nbsp; ${distText} &nbsp;|&nbsp; 약 ${driveText}
          </div>
          <div style="font-size:13px;color:#444;">
            ✈️ <strong>비행기</strong> &nbsp; ${flightKm.toFixed(1)} km &nbsp;|&nbsp; 약 ${flightText}
          </div>
          <div style="font-size:11px;color:#bbb;margin-top:8px;">* 현재 위치 기준</div>
        </div>
      `);
    } catch (e) {
      iw.setContent(`
        <div style="padding:10px 14px;min-width:160px;">
          <div style="font-size:14px;font-weight:700;color:#222;margin-bottom:4px;">📍 ${name}</div>
          <div style="font-size:12px;color:#aaa;">경로 계산에 실패했어요</div>
        </div>
      `);
    }
  });

  // 지도 빈 곳 클릭 시 인포윈도우 닫기
  kakao.maps.event.addListener(kakaoMap, 'click', () => {
    if (activeInfoWindow) { activeInfoWindow.close(); activeInfoWindow = null; }
  });

  markers.push(marker);
}

// 초 → "X시간 Y분" 변환 (index.js 동일)
function formatTime(seconds) {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : `${m}분`;
}

// 하버사인 비행 거리/시간 (index.js 동일)
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
          content: `사용자가 방문한 국내 여행지 목록: ${placeList}

이 여행 기록을 분석해서 사용자의 여행 성향에 맞는 국내 여행지 3곳을 추천해줘.
아직 방문하지 않은 새로운 곳으로 추천해줘.
반드시 JSON 배열만 반환해. 설명 없이 JSON만:
[
  {"name": "여행지명", "reason": "추천 이유 (15자 이내)", "emoji": "관련 이모지"},
  {"name": "여행지명", "reason": "추천 이유 (15자 이내)", "emoji": "관련 이모지"},
  {"name": "여행지명", "reason": "추천 이유 (15자 이내)", "emoji": "관련 이모지"}
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
  // 메인 플래너로 이동 (도착지 자동 입력 가능하도록 쿼리스트링 활용)
  window.location.href = `/?dest=${encodeURIComponent(name)}`;
}


// ── 로그아웃 / 페이지 이동 ──────────────────────────────
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

    // 이름 표시
    document.getElementById('user-name').textContent = `${user.nickname}님`;

    // 아바타: 프로필 이미지 있으면 img, 없으면 첫 글자
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

  // 오늘 날짜 기본값
  document.getElementById('date-input').value =
    new Date().toISOString().split('T')[0];

  // 엔터키로 추가
  document.getElementById('place-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addPlace();
  });

  // 유저 로드
  loadUser();

  // 목록 & 통계 렌더링
  renderList();
  updateStats();

  // 카카오맵 초기화
  if (typeof kakao !== 'undefined' && kakao.maps) {
    initMap();
  } else {
    // SDK 로드 완료 후 초기화
    window.kakaoMapInit = initMap;
    const script = document.querySelector('script[src*="dapi.kakao"]');
    if (script) {
      script.addEventListener('load', initMap);
    } else {
      setTimeout(initMap, 2000);
    }
  }

});