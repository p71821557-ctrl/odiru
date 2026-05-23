// ==========================================
// 1. HERO TEXT & SLIDE
// ==========================================
const heroTitle = document.getElementById("hero-title");
const heroTexts = [
  "국내 어디든 떠나보세요",
  "감성 여행 코스",
  "국내 인기 여행지",
  "호텔 · 여행지 한번에"
];
let heroIndex = 0;

setInterval(() => {
  heroIndex = (heroIndex + 1) % heroTexts.length;
  if (heroTitle) heroTitle.innerText = heroTexts[heroIndex];
}, 3000);

const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

setInterval(() => {
  if (slides.length === 0) return;
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 4000);


// ==========================================
// 2. KAKAO MAP & PLANNER
// ==========================================
let map = null;
let ps = null;
let startMarker = null;
let endMarker = null;
let clickLine = null;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('map');
  if (!container) return;

  map = new kakao.maps.Map(container, {
    center: new kakao.maps.LatLng(36.3504, 127.3845),
    level: 13
  });

  // 한국 범위로 제한
  const koreaBounds = new kakao.maps.LatLngBounds(
    new kakao.maps.LatLng(33.0, 124.5),
    new kakao.maps.LatLng(38.9, 131.9)
  );
  map.setMaxLevel(13);
  map.setBounds(koreaBounds);

  ps = new kakao.maps.services.Places();
});

// 키워드 → 좌표 변환
function searchPlace(keyword) {
  return new Promise((resolve, reject) => {
    ps.keywordSearch(keyword, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(new kakao.maps.LatLng(result[0].y, result[0].x));
      } else {
        reject(keyword);
      }
    });
  });
}

// OSRM 실제 도로 거리/시간 계산
async function getDrivingRoute(startCoords, endCoords) {
  const url = `https://router.project-osrm.org/route/v1/driving/` +
    `${startCoords.getLng()},${startCoords.getLat()};` +
    `${endCoords.getLng()},${endCoords.getLat()}` +
    `?overview=full&geometries=geojson`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.code !== 'Ok') throw new Error('경로 없음');

  return {
    distanceM: data.routes[0].distance,
    durationSec: data.routes[0].duration,
    geometry: data.routes[0].geometry.coordinates
  };
}

// 비행 거리/시간 계산 (하버사인 공식 + 항공 우회율 1.3)
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
  const flightMin = Math.round(flightKm / 800 * 60 + 40); // 시속 800km + 이착륙 40분
  return { flightKm, flightMin };
}

// 초 → "X시간 Y분" 변환
function formatTime(seconds) {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}시간 ${m % 60}분` : `${m}분`;
}

const routeBtn = document.getElementById("route-btn");
const startPlace = document.getElementById("start-place");
const endPlace = document.getElementById("end-place");
const routeInfo = document.getElementById('route-info');

routeBtn?.addEventListener("click", async () => {
  const start = startPlace.value.trim();
  const end = endPlace.value.trim();

  if (!start || !end) {
    alert("출발지와 도착지를 모두 입력해주세요.");
    return;
  }
  if (!map) return;

  routeInfo.innerHTML = "경로를 계산 중입니다... 🔄";

  if (startMarker) startMarker.setMap(null);
  if (endMarker) endMarker.setMap(null);
  if (clickLine) clickLine.setMap(null);

  try {
    const [startCoords, endCoords] = await Promise.all([
      searchPlace(start),
      searchPlace(end)
    ]);

    // 마커 표시
    startMarker = new kakao.maps.Marker({ map, position: startCoords });
    endMarker = new kakao.maps.Marker({ map, position: endCoords });

    // OSRM 실제 도로 경로
    const route = await getDrivingRoute(startCoords, endCoords);

    // 실제 도로 따라가는 폴리라인
    const path = route.geometry.map(([lng, lat]) => new kakao.maps.LatLng(lat, lng));
    clickLine = new kakao.maps.Polyline({
      map,
      path,
      strokeWeight: 5,
      strokeColor: '#2979ff',
      strokeOpacity: 0.8,
      strokeStyle: 'solid'
    });

    // 자동차 정보
    const driveKm = (route.distanceM / 1000).toFixed(1);
    const driveTime = formatTime(route.durationSec);

    // 비행기 정보
    const { flightKm, flightMin } = getFlightInfo(startCoords, endCoords);
    const flightTime = formatTime(flightMin * 60);

    routeInfo.innerHTML = `
      <div style="background:#f8f9fa;padding:15px;border-radius:12px;
                  border:1px solid #dee2e6;margin-top:15px;text-align:left;">
        <p style="font-weight:700;margin-bottom:10px;">📍 ${start} → ${end}</p>
        <p style="margin:6px 0;">🚗 <strong>자동차</strong>&nbsp; ${driveKm} km &nbsp;|&nbsp; 약 ${driveTime}</p>
        <p style="margin:6px 0;">✈️ <strong>비행기</strong>&nbsp; ${flightKm.toFixed(1)} km &nbsp;|&nbsp; 약 ${flightTime}</p>
        <span style="font-size:11px;color:#868e96;margin-top:8px;display:block;">
          * 자동차: 실제 도로 기준 / 비행기: 항공 우회거리 기준
        </span>
      </div>`;

    // 지도 범위 자동 조정
    const bounds = new kakao.maps.LatLngBounds();
    path.forEach(p => bounds.extend(p));
    map.setBounds(bounds);

  } catch (err) {
    routeInfo.innerHTML = "";
    alert(`장소를 찾을 수 없습니다. 더 구체적으로 입력해보세요.`);
  }
});


// ==========================================
// 3. AUTH & USER SESSION
// ==========================================
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const mypageBtn = document.getElementById("mypage-btn");
const heroLoginBtn = document.getElementById("hero-login-btn");
const heroSignupBtn = document.getElementById("hero-signup-btn");

async function checkLoginStatus() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();

    if (user) {
      if (loginBtn) {
        loginBtn.innerText = `${user.nickname}님`;
        loginBtn.onclick = () => { window.location.href = "/pages/mypage/mypage.html"; };
      }
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginUser", user.nickname);
    } else {
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("loginUser");

      const moveToLogin = () => {
        window.location.href =
          "/pages/login/login.html";
      };
      if (loginBtn) loginBtn.onclick = moveToLogin;
      if (heroLoginBtn) heroLoginBtn.onclick = moveToLogin;
    }
  } catch (err) {
    console.error("로그인 상태 확인 실패:", err);
  }
}

checkLoginStatus();

const moveSignup = () => {
  window.location.href =
  "/pages/login/signup.html";
};
signupBtn?.addEventListener("click", moveSignup);
heroSignupBtn?.addEventListener("click", moveSignup);

mypageBtn?.addEventListener("click", () => {
  if (localStorage.getItem("isLogin") !== "true") {
    alert("로그인이 필요합니다.");
    window.location.href = "/pages/login/login.html";
    return;
  }
  window.location.href = "/pages/mypage/mypage.html";
});

logoutBtn?.addEventListener("click", async () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다.");
  window.location.href = "/logout";
});