document.addEventListener('DOMContentLoaded', () => {

  // =====================================================
  // 1. 여행지 단일 선택
  // =====================================================
  const placeCards = document.querySelectorAll('.place-card');
  placeCards.forEach(card => {
    card.addEventListener('click', () => {
      placeCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // =====================================================
  // 2. 카테고리 복수 선택 (토글)
  // =====================================================
  const categoryBtns = document.querySelectorAll('.cat-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
    });
  });

  // =====================================================
  // 3. 추천 관광지 데이터
  //    coords: 카카오맵 핀용 [lat, lng]
  // =====================================================
  const mockData = [
    // ===== 부산 =====
    {
      location: "부산", categories: ["자연", "커플"],
      title: "미포철길",
      desc: "푸른 바다를 바로 곁에 두고 걸을 수 있는 낭만적인 해안 산책로.",
      img: "https://thumb.tripinfo.co.kr/thumb.php?url=http://tong.visitkorea.or.kr/cms/resource/32/2800432_image2_1.jpg?OPT=proxy",
      coords: [35.1731, 129.1993]
    },
    {
      location: "부산", categories: ["자연", "커플", "체험"],
      title: "광안리 해수욕장",
      desc: "광안리의 바다를 보며 시원하게 즐길 수 있는 곳.",
      img: "https://traveli.net/data/tmp/2306/20230625111646_ngwabcyc.jpg",
      coords: [35.1531, 129.1185]
    },
    {
      location: "부산", categories: ["가족", "문화", "관광"],
      title: "감천문화마을",
      desc: "설치 미술 작품들이 독특한 경관을 이루는 곳.",
      img: "images/busan/gan.jpg",
      coords: [35.0975, 129.0100]
    },
    {
      location: "부산", categories: ["가족", "문화", "관광"],
      title: "흰여울문화마을",
      desc: "바로 옆으로 푸른 부산 바다가 펼쳐지는 바다 전망의 문화 공간.",
      img: "images/busan/흰여울.jpg",
      coords: [35.0760, 129.0197]
    },
    {
      location: "부산", categories: ["가족", "문화", "힐링"],
      title: "보수동 책방골목",
      desc: "한국전쟁 시절 피난민들이 생계를 위해 책을 사고팔기 시작하면서 형성된 역사적인 골목.",
      img: "images/busan/책방골목.jpg",
      coords: [35.1040, 129.0274]
    },
    {
      location: "부산", categories: ["자연", "문화", "체험"],
      title: "범어사",
      desc: "호젓한 대나무 숲길을 걸으며 고즈넉한 한국의 전통 불교문화를 체험하기에 좋은 곳.",
      img: "images/busan/범어사.jpg",
      coords: [35.2960, 129.0820]
    },
    {
      location: "부산", categories: ["자연", "커플", "가족"],
      title: "오륙도 스카이워크",
      desc: "투명한 유리 바닥 아래로 아찔한 바다와 부산의 상징인 오륙도를 가장 가까이서 감상.",
      img: "images/busan/스카이워크.jpg",
      coords: [35.0698, 129.1136]
    },

    // ===== 광주 =====
    {
      location: "광주", categories: ["관광", "힐링"],
      title: "무등산 양떼목장",
      desc: "푸른 초원에서 귀여운 양들과 교감하며 도심 속 힐링을 즐길 수 있는 곳입니다.",
      img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=600",
      coords: [35.1350, 126.9880]
    },
    {
      location: "광주", categories: ["문화", "관광", "가족"],
      title: "국립광주박물관",
      desc: "광주·전남 지역의 역사와 문화유산을 한눈에 볼 수 있는 대표 국립박물관.",
      img: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=600",
      coords: [35.1595, 126.9178]
    },
    {
      location: "광주", categories: ["문화", "힐링", "관광"],
      title: "5·18 민주화운동 기록관",
      desc: "광주의 역사적 민주화 운동을 기리는 공간으로 역사적 의미가 깊은 곳.",
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600",
      coords: [35.1468, 126.9154]
    },
    {
      location: "광주", categories: ["자연", "힐링", "가족"],
      title: "무등산 국립공원",
      desc: "광주 시민의 안방산으로 사계절 아름다운 경관과 함께 트레킹을 즐길 수 있는 곳.",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600",
      coords: [35.1220, 126.9990]
    },
    {
      location: "광주", categories: ["문화", "체험", "커플"],
      title: "양림동 역사문화마을",
      desc: "근대 역사가 살아 숨 쉬는 골목길과 다양한 카페·갤러리가 어우러진 감성 마을.",
      img: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?q=80&w=600",
      coords: [35.1383, 126.9050]
    },

    // ===== 서울 =====
    {
      location: "서울", categories: ["문화", "관광", "가족"],
      title: "경복궁",
      desc: "조선왕조의 법궁으로 수려한 전통 건축미와 넓은 궁궐 정원을 함께 즐길 수 있는 곳.",
      img: "https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=600",
      coords: [37.5796, 126.9770]
    },
    {
      location: "서울", categories: ["문화", "커플", "힐링"],
      title: "북촌 한옥마을",
      desc: "600년 역사의 한옥들이 빼곡히 들어선 골목을 거닐며 전통 서울의 정취를 느낄 수 있는 곳.",
      img: "https://images.unsplash.com/photo-1563592946-9b9e4afa1ca2?q=80&w=600",
      coords: [37.5826, 126.9830]
    },
    {
      location: "서울", categories: ["자연", "힐링", "가족"],
      title: "남산서울타워",
      desc: "서울 한복판에서 360도 파노라마 야경을 감상할 수 있는 서울의 대표 랜드마크.",
      img: "https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?q=80&w=600",
      coords: [37.5512, 126.9882]
    },
    {
      location: "서울", categories: ["쇼핑", "문화", "체험"],
      title: "홍대 거리",
      desc: "개성 넘치는 indie 문화와 맛집, 쇼핑이 공존하는 젊음의 거리.",
      img: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=600",
      coords: [37.5563, 126.9236]
    },
    {
      location: "서울", categories: ["자연", "힐링", "커플"],
      title: "한강공원",
      desc: "탁 트인 한강변에서 자전거, 피크닉, 야경을 동시에 즐길 수 있는 서울의 도심 휴식처.",
      img: "https://images.unsplash.com/photo-1574701148212-8518165aa9f4?q=80&w=600",
      coords: [37.5285, 126.9400]
    },

    // ===== 전주 =====
    {
      location: "전주", categories: ["문화", "관광", "커플"],
      title: "전주 한옥마을",
      desc: "700여 채의 한옥이 모여 있는 국내 최대 한옥 밀집 지역으로 전통문화 체험의 성지.",
      img: "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?q=80&w=600",
      coords: [35.8150, 127.1530]
    },
    {
      location: "전주", categories: ["체험", "문화", "가족"],
      title: "경기전",
      desc: "조선 태조 이성계의 어진을 모신 곳으로 고즈넉한 역사 공간과 정원이 인상적인 명소.",
      img: "https://images.unsplash.com/photo-1583425921686-c5daf5f49e4a?q=80&w=600",
      coords: [35.8146, 127.1524]
    },
    {
      location: "전주", categories: ["관광", "힐링", "가족"],
      title: "덕진공원",
      desc: "연꽃이 피는 연못을 중심으로 산책로와 벚꽃길이 이어지는 전주 시민의 쉼터.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600",
      coords: [35.8420, 127.1390]
    },
    {
      location: "전주", categories: ["체험", "문화", "커플"],
      title: "전주 남부시장",
      desc: "전통 시장의 활기와 함께 야시장에서 다양한 전주 먹거리를 한자리에서 즐길 수 있는 곳.",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600",
      coords: [35.8074, 127.1478]
    },
  ];

  // =====================================================
  // 4. 완료 버튼 → 추천 카드 렌더링
  // =====================================================
  document.getElementById('submitBtn').addEventListener('click', () => {
    const place = document.querySelector('.place-card.selected .place-name')?.innerText;
    const cats = [];
    document.querySelectorAll('.cat-btn.selected').forEach(b => cats.push(b.innerText));

    if (!place || cats.length === 0) {
      alert("여행지와 카테고리를 모두 선택해주세요!");
      return;
    }

    const resultSection = document.getElementById('recommend-result');
    const recommendGrid = document.getElementById('recommendGrid');
    recommendGrid.innerHTML = '';

    const filteredPlaces = mockData.filter(item => {
      return item.location === place &&
             cats.some(cat => item.categories.includes(cat));
    });

    if (filteredPlaces.length > 0) {
      filteredPlaces.forEach(item => {
        const tagsHtml = item.categories.map(c =>
          `<span class="tag" data-location="${item.location}" data-category="${c}">#${c}</span>`
        ).join('');

        const cardHtml = `
          <div class="recommend-card">
            <img src="${item.img}" alt="${item.title}">
            <div class="recommend-info">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
              <div class="recommend-tags">
                <span class="tag" data-location="${item.location}" data-category="${item.location}">#${item.location}</span>
                ${tagsHtml}
              </div>
            </div>
          </div>
        `;
        recommendGrid.insertAdjacentHTML('beforeend', cardHtml);
      });

      resultSection.style.display = 'block';
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // 태그 클릭 이벤트 바인딩
      bindTagEvents(mockData);

    } else {
      alert(`[${place}] 지역에서 선택하신 카테고리에 맞는 여행지가 아직 등록되어 있지 않습니다.`);
      resultSection.style.display = 'none';
    }
  });

  // =====================================================
  // 5. 태그 클릭 → 코스 지도 패널 열기
  // =====================================================
  function bindTagEvents(allData) {
    document.querySelectorAll('.recommend-tags .tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const location = tag.dataset.location;
        const category = tag.dataset.category;

        // 같은 location + 해당 category 포함인 장소 필터
        let coursePlaces;
        if (category === location) {
          // 지역 태그 클릭 시 → 해당 지역 전체
          coursePlaces = allData.filter(d => d.location === location);
        } else {
          coursePlaces = allData.filter(d =>
            d.location === location && d.categories.includes(category)
          );
        }

        openCoursePanel(coursePlaces, `${location} · #${category} 추천 코스`);
      });
    });
  }

  // =====================================================
  // 6. 코스 패널 열기 + 카카오맵 렌더링
  // =====================================================
  let kakaoMap = null;
  let mapMarkers = [];
  let mapPolylines = [];
  let mapOverlays = [];

  function openCoursePanel(places, title) {
    if (places.length === 0) return;

    const panel = document.getElementById('course-panel');
    panel.style.display = 'flex';
    // 살짝 딜레이 후 애니메이션
    requestAnimationFrame(() => panel.classList.add('open'));

    // 코스 사이드바 렌더링
    renderCourseList(places, title);

    // 지도 초기화 (카카오맵)
    initKakaoMap(places);

    // 패널이 열리면 스크롤
    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderCourseList(places, title) {
    const sidebar = document.getElementById('course-sidebar');
    const courseTitleEl = document.getElementById('course-title');
    courseTitleEl.innerText = title;

    sidebar.innerHTML = '';
    places.forEach((place, idx) => {
      // 다음 장소까지의 직선 거리 계산
      let distanceHtml = '';
      if (idx < places.length - 1) {
        const next = places[idx + 1];
        const dist = getDistanceKm(place.coords, next.coords);
        const time = Math.round(dist / 40 * 60); // 평균 시속 40km 기준 분
        distanceHtml = `
          <div class="course-route-info">
            <span>🚗 다음 장소까지</span>
            <span><b>${dist.toFixed(1)}km</b> · 약 <b>${time}분</b></span>
          </div>
        `;
      }

      sidebar.innerHTML += `
        <div class="course-item" data-idx="${idx}">
          <div class="course-step">
            <div class="course-num">${idx + 1}</div>
            <div class="course-line" ${idx === places.length - 1 ? 'style="visibility:hidden"' : ''}></div>
          </div>
          <div class="course-detail">
            <div class="course-place-name">${place.title}</div>
            <div class="course-place-cat">${place.categories.map(c => '#' + c).join(' ')}</div>
            ${distanceHtml}
          </div>
        </div>
      `;
    });
  }

  function initKakaoMap(places) {
    const mapEl = document.getElementById('course-map');

    // 기존 마커·폴리라인 제거
    mapMarkers.forEach(m => m.setMap(null));
    mapPolylines.forEach(p => p.setMap(null));
    mapOverlays.forEach(o => o.setMap(null));
    mapMarkers = []; mapPolylines = []; mapOverlays = [];

    const center = new kakao.maps.LatLng(places[0].coords[0], places[0].coords[1]);

    if (!kakaoMap) {
      kakaoMap = new kakao.maps.Map(mapEl, { center, level: 8 });
    } else {
      kakaoMap.setCenter(center);
      kakaoMap.setLevel(8);
    }

    const latlngs = [];

    places.forEach((place, idx) => {
      const pos = new kakao.maps.LatLng(place.coords[0], place.coords[1]);
      latlngs.push(pos);

      // 번호 마커 (커스텀 오버레이)
      const markerContent = `
        <div class="map-pin">
          <div class="map-pin-num">${idx + 1}</div>
          <div class="map-pin-label">${place.title}</div>
        </div>
      `;
      const overlay = new kakao.maps.CustomOverlay({
        position: pos,
        content: markerContent,
        yAnchor: 1.1,
        zIndex: 3
      });
      overlay.setMap(kakaoMap);
      mapOverlays.push(overlay);
    });

    // 폴리라인 (경로 연결선)
    if (latlngs.length > 1) {
      const polyline = new kakao.maps.Polyline({
        path: latlngs,
        strokeWeight: 4,
        strokeColor: '#00a2ed',
        strokeOpacity: 0.85,
        strokeStyle: 'solid'
      });
      polyline.setMap(kakaoMap);
      mapPolylines.push(polyline);

      // 구간마다 거리·시간 오버레이
      for (let i = 0; i < latlngs.length - 1; i++) {
        const midLat = (places[i].coords[0] + places[i + 1].coords[0]) / 2;
        const midLng = (places[i].coords[1] + places[i + 1].coords[1]) / 2;
        const dist   = getDistanceKm(places[i].coords, places[i + 1].coords);
        const time   = Math.round(dist / 40 * 60);

        const labelContent = `
          <div class="map-route-label">
            ${dist.toFixed(1)}km · ${time}분
          </div>
        `;
        const labelOverlay = new kakao.maps.CustomOverlay({
          position: new kakao.maps.LatLng(midLat, midLng),
          content: labelContent,
          zIndex: 2
        });
        labelOverlay.setMap(kakaoMap);
        mapOverlays.push(labelOverlay);
      }
    }

    // 지도 범위를 모든 핀에 맞게 조정
    const bounds = new kakao.maps.LatLngBounds();
    latlngs.forEach(ll => bounds.extend(ll));
    kakaoMap.setBounds(bounds);
  }

  // 직선 거리 계산 (Haversine)
  function getDistanceKm([lat1, lng1], [lat2, lng2]) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  // =====================================================
  // 7. 패널 닫기
  // =====================================================
  document.getElementById('close-course-panel').addEventListener('click', () => {
    const panel = document.getElementById('course-panel');
    panel.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 400);
  });

}); // DOMContentLoaded 끝


// =====================================================
// 로그인 / 회원인증
// =====================================================
const loginBtn  = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const mypageBtn = document.getElementById("mypage-btn");
const heroLoginBtn  = document.getElementById("hero-login-btn");
const heroSignupBtn = document.getElementById("hero-signup-btn");

const loginState = localStorage.getItem("isLogin");
const loginUser  = localStorage.getItem("loginUser");

if (loginState === "true") {
  if (loginBtn)  loginBtn.innerText = `${loginUser}님`;
  if (signupBtn) signupBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";
}

function moveLogin()  { window.location.href = "../login/login.html"; }
function moveSignup() { window.location.href = "../login/signup.html"; }

loginBtn?.addEventListener("click", moveLogin);
signupBtn?.addEventListener("click", moveSignup);
heroLoginBtn?.addEventListener("click", moveLogin);
heroSignupBtn?.addEventListener("click", moveSignup);

mypageBtn?.addEventListener("click", () => {
  if (localStorage.getItem("isLogin") !== "true") {
    alert("로그인이 필요합니다.");
    window.location.href = "../login/login.html";
    return;
  }
  window.location.href = "../mypage/mypage.html";
});

logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다.");
  location.reload();
});