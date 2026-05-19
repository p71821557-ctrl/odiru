// ==========================================
// 1. HERO TEXT & SLIDE (기존 기능 유지)
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
  heroIndex++;
  if (heroIndex >= heroTexts.length) {
    heroIndex = 0;
  }
  if (heroTitle) heroTitle.innerText = heroTexts[heroIndex];
}, 3000);

const slides = document.querySelectorAll(".slide");
let slideIndex = 0;

setInterval(() => {
  if (slides.length === 0) return;
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  slides[slideIndex].classList.add("active");
}, 4000);


// ==========================================
// 2. KAKAO MAP & PLANNER (새로운 카카오맵 기능)
// ==========================================
let map = null;
let geocoder = null;
let startMarker = null;
let endMarker = null;
let clickLine = null;

const routeBtn = document.getElementById("route-btn");
const startPlace = document.getElementById("start-place");
const endPlace = document.getElementById("end-place");
const routeInfo = document.getElementById('route-info');

// 💡 핵심: HTML 문서가 완전히 로드되어 지도 박스(#map)가 확실히 존재할 때 지도를 그립니다.
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('map');
  if (!container) return; // 지도 박스가 없으면 실행 안 함 (에러 방지)

  const options = {
    center: new kakao.maps.LatLng(36.3504, 127.3845), // 대한민국 중심(대전)
    level: 12
  };

  // 이제 안전하게 지도를 생성합니다.
  map = new kakao.maps.Map(container, options);
  geocoder = new kakao.maps.services.Geocoder();
});

routeBtn?.addEventListener("click", () => {
  const start = startPlace.value;
  const end = endPlace.value;

  if (!start || !end) {
    alert("출발지와 도착지를 모두 입력해주세요.");
    return;
  }

  if (!map) return;
  routeInfo.innerHTML = "경로를 계산 중입니다... 🔄";

  // 기존 마커 및 선 초기화
  if (startMarker) startMarker.setMap(null);
  if (endMarker) endMarker.setMap(null);
  if (clickLine) clickLine.setMap(null);

  // 출발지 검색
  geocoder.addressSearch(start, function (startResult, startStatus) {
    if (startStatus === kakao.maps.services.Status.OK) {
      const startCoords = new kakao.maps.LatLng(startResult[0].y, startResult[0].x);

      // 도착지 검색
      geocoder.addressSearch(end, function (endResult, endStatus) {
        if (endStatus === kakao.maps.services.Status.OK) {
          const endCoords = new kakao.maps.LatLng(endResult[0].y, endResult[0].x);

          // 마커 표시
          startMarker = new kakao.maps.Marker({ map: map, position: startCoords });
          endMarker = new kakao.maps.Marker({ map: map, position: endCoords });

          // 선 그리기
          clickLine = new kakao.maps.Polyline({
            map: map,
            path: [startCoords, endCoords],
            strokeWeight: 5,
            strokeColor: '#FF385C', // 어디루 시그니처 핑크
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
          });

          // 거리 및 소요 시간 계산 (시속 60km 기준)
          const distance = Math.round(clickLine.getLength());
          const distanceKm = (distance / 1000).toFixed(1);
          const totalMinutes = Math.round((distance / 1000) / 60 * 60);

          let timeString = "";
          if (totalMinutes >= 60) {
            const hours = Math.floor(totalMinutes / 60);
            const mins = totalMinutes % 60;
            timeString = `${hours}시간 ${mins}분`;
          } else {
            timeString = `${totalMinutes}분`;
          }

          // 패널에 결과 출력
          routeInfo.innerHTML = `
                        <div style="background:#f8f9fa; padding:15px; border-radius:8px; border:1px solid #dee2e6; margin-top:15px; text-align:left;">
                            <p style="margin:5px 0;">📍 <strong>총 거리:</strong> ${distanceKm} km</p>
                            <p style="margin:5px 0; color:#FF385C;">⏱️ <strong>예상 소요 시간:</strong> 약 ${timeString}</p>
                            <span style="font-size:11px; color:#868e96;">* 시속 60km 기준 직선거리 계산 결과입니다.</span>
                        </div>
                    `;

          // 두 마커가 모두 보이도록 지도 화면 조정
          const bounds = new kakao.maps.LatLngBounds();
          bounds.extend(startCoords);
          bounds.extend(endCoords);
          map.setBounds(bounds);

        } else {
          routeInfo.innerHTML = "";
          alert('도착지 주소를 찾을 수 없습니다. 정확한 주소를 입력해주세요.');
        }
      });
    } else {
      routeInfo.innerHTML = "";
      alert('출발지 주소를 찾을 수 없습니다. 정확한 주소를 입력해주세요.');
    }
  });
});


// ==========================================
// 3. AUTH & USER SESSION (백엔드 세션 로그인 연동)
// ==========================================
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const mypageBtn = document.getElementById("mypage-btn");
const heroLoginBtn = document.getElementById("hero-login-btn");
const heroSignupBtn = document.getElementById("hero-signup-btn");

// 페이지가 켜지자마자 서버에 "로그인 되어있는 유저가 있는지" 물어봅니다.
async function checkLoginStatus() {
  try {
    const response = await fetch("/api/user");
    const user = await response.json();

    if (user) {
      // [로그인 상태] 헤더 버튼 교체 및 내 정보 표시
      if (loginBtn) {
        loginBtn.innerText = `${user.nickname}님`;
        loginBtn.onclick = () => { window.location.href = "/pages/mypage/mypage.html"; };
      }
      if (signupBtn) signupBtn.style.display = "none";
      if (logoutBtn) logoutBtn.style.display = "inline-block";

      // 로그인 상태 변수 세션 저장 (이전 페이지 호환용)
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginUser", user.nickname);
    } else {
      // [비로그인 상태] 클릭 시 카카오 로그인 창으로 강제 이동
      localStorage.setItem("isLogin", "false");
      localStorage.removeItem("loginUser");

      const moveToKakao = () => { window.location.href = "/auth/kakao"; };

      if (loginBtn) loginBtn.onclick = moveToKakao;
      if (heroLoginBtn) heroLoginBtn.onclick = moveToKakao;
    }
  } catch (err) {
    console.error("로그인 상태 확인 실패:", err);
  }
}

// 초기화 실행
checkLoginStatus();

// 회원가입 버튼 클릭 시 카카오 로그인으로 통합 처리
const moveSignup = () => { window.location.href = "/auth/kakao"; };
signupBtn?.addEventListener("click", moveSignup);
heroSignupBtn?.addEventListener("click", moveSignup);

// 마이페이지 버튼 제한 규칙
mypageBtn?.addEventListener("click", () => {
  const isLogin = localStorage.getItem("isLogin");
  if (isLogin !== "true") {
    alert("로그인이 필요합니다.");
    window.location.href = "/auth/kakao";
    return;
  }
  window.location.href = "/pages/mypage/mypage.html";
});

// 로그아웃 버튼 작동 규칙
logoutBtn?.addEventListener("click", async () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다.");
  window.location.href = "/logout"; // 백엔드 로그아웃 라우터 호출
});