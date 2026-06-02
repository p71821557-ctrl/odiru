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
  // 3. 추천 관광지 데이터 (이미지 경로 + 카카오맵 좌표 포함)
  // =====================================================
  const mockData = [

// ===== 부산 =====
{
  location: "부산", categories: ["자연", "커플", "관광", "힐링"],
  title: "미포철길",
  desc: "푸른 바다를 바로 곁에 두고 걸을 수 있는 낭만적인 해안 산책로.",
  img: "images/busan/미포철길.jpg",
  coords: [35.1731, 129.1993]
},
{
  location: "부산", categories: ["자연", "커플", "체험", "관광"],
  title: "광안리 해수욕장",
  desc: "광안리의 바다를 보며 시원하게 즐길 수 있는 곳.",
  img: "images/busan/광안리.jpg",
  coords: [35.1531, 129.1185]
},
{
  location: "부산", categories: ["가족", "문화"],
  title: "감천문화마을",
  desc: "설치 미술 작품들이 독특한 경관을 이루는 곳.",
  img: "images/busan/gan.jpg",
  coords: [35.0975, 129.0100]
},
{
  location: "부산", categories: ["가족", "문화", "관광", "힐링"],
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
  location: "부산", categories: ["자연", "커플", "가족", "힐링"],
  title: "오륙도 스카이워크",
  desc: "투명한 유리 바닥 아래로 아찔한 바다와 부산의 상징인 오륙도를 가장 가까이서 감상.",
  img: "images/busan/스카이워크.jpg",
  coords: [35.0698, 129.1136]
},
{
  location: "부산", categories: ["문화", "커플", "가족"],
  title: "영화의 전당",
  desc: "세계적인 영화제인 '부산국제영화제(BIFF)'의 전용관이자 부산이 '영화의 도시'임을 상징하는 복합영상문화공간.",
  img: "images/busan/영화의 전당.jpg",
  coords: [35.1689, 129.1305]
},
{
  location: "부산", categories: ["문화", "가족"],
  title: "임시수도기념관",
  desc: "부산의 뼈아픈 역사와 피란민들의 삶을 보존하고 있는 공간.",
  img: "images/busan/임시수도기념관.jpg",
  coords: [35.1010, 129.0178]
},
{
  location: "부산", categories: ["문화"],
  title: "청자빌딩",
  desc: "1918년에 지어진 옛 한성은행 부산지점 건물을 리모델링하여 탄생한 복합문화공간.",
  img: "images/busan/청자빌딩.jpg",
  coords: [35.1019, 129.0325]
},
{
  location: "부산", categories: ["문화", "체험"],
  title: "국립해양박물관",
  desc: "바다와 관련된 모든 문화적 자산을 한눈에 볼 수 있는 곳.",
  img: "images/busan/국립해양박물관.jpg",
  coords: [35.0841, 129.0850]
},
{
  location: "부산", categories: ["관광", "가족", "힐링"],
  title: "해운대 블루라인파크",
  desc: "바다를 바로 옆에 두고 달리는 '해변열차'와 공중 레일에서 프라이빗하게 경치를 즐기는 곳.",
  img: "images/busan/블루라인파크.jpg",
  coords: [35.1589, 129.1603]
},
{
  location: "부산", categories: ["관광", "가족", "자연"],
  title: "태종대유원지",
  desc: "영도 남단에 위치한 부산의 대표적인 자연 명승지.",
  img: "images/busan/태종대유원지.jpg",
  coords: [35.0490, 129.0820]
},
{
  location: "부산", categories: ["관광"],
  title: "해동용궁사",
  desc: "거친 해안 바위 위에 지어진 독특하고 아름다운 수상 법당.",
  img: "images/busan/해동용궁사.jpg",
  coords: [35.1891, 129.2249]
},
{
  location: "부산", categories: ["관광", "체험", "힐링", "커플"],
  title: "송도해상케이블카",
  desc: "동쪽 송림공원에서부터 서쪽 암남공원까지 바다 위를 가로지르는 짜릿한 해상 케이블카.",
  img: "images/busan/송도해상케이블카.jpg",
  coords: [35.0867, 129.0102]
},
{
  location: "부산", categories: ["힐링", "관광", "자연"],
  title: "아홉산숲",
  desc: "한 가문이 400년 동안 가꾸어 온 비밀스러운 숲으로, 웅장한 대나무 평전과 편백나무가 주는 압도적인 청량감을 느낄 수 있는 곳.",
  img: "images/busan/아홉산숲.jpg",
  coords: [35.2630, 129.2060]
},
{
  location: "부산", categories: ["힐링", "관광", "체험", "커플"],
  title: "화명수목원",
  desc: "대천천 계곡을 따라 조성된 숲에서 다양한 식물들을 만나고, 피톤치드를 마시며 도심 속 자연을 만끽하는 휴식 공간.",
  img: "images/busan/화명수목원.jpg",
  coords: [35.2419, 128.9981]
},
{
  location: "부산", categories: ["힐링", "체험", "커플"],
  title: "스파랜드 센텀시티",
  desc: "천연 온천수로 채워진 다채로운 테마의 찜질방과 노천탕에서 여행의 피로를 고급스럽고 편안하게 풀어주는 도심형 휴양 공간.",
  img: "images/busan/스파랜드.jpg",
  coords: [35.1686, 129.1316]
},
{
  location: "부산", categories: ["힐링", "관광"],
  title: "청사포 다릿돌전망대",
  desc: "동해안의 수려한 해안 경관과 일출, 일몰을 감상하며 바다 한가운데 서 있는 듯한 몽환적인 평화로움을 선사하는 전망대.",
  img: "images/busan/다릿돌전망대.jpg",
  coords: [35.1725, 129.2050]
},
{
  location: "부산", categories: ["쇼핑", "관광"],
  title: "신세계백화점 센텀시티점",
  desc: "세계 최대 규모로 기네스북에 등재된 복합 쇼핑몰로, 명품 브랜드부터 트렌디한 팝업스토어, 아이스링크까지 한 번에 즐길 수 있는 쇼핑의 메카.",
  img: "images/busan/신세계백화점.jpg",
  coords: [35.1693, 129.1302]
},
{
  location: "부산", categories: ["쇼핑", "관광"],
  title: "국제시장",
  desc: "영화 배경으로도 유명한 부산의 대표 전통시장으로, 의류, 잡화, 기계 부품 등 '없는 것 빼고 다 있다'는 만물 시장 특유의 활기찬 매력을 가진 곳.",
  img: "images/busan/국제시장.jpg",
  coords: [35.0990, 129.0276]
},
{
  location: "부산", categories: ["쇼핑", "관광", "힐링"],
  title: "롯데프리미엄아울렛 동부산점",
  desc: "그리스 산토리니를 모티브로 한 이국적인 건축물 안에서 다양한 브랜드를 합리적인 가격에 쇼핑하고, 탁 트인 등대 전망대도 즐길 수 있는 곳.",
  img: "images/busan/롯데프리미엄아울렛.jpg",
  coords: [35.1878, 129.2183]
},
{
  location: "부산", categories: ["쇼핑", "관광"],
  title: "BIFF광장 및 남포동 거리",
  desc: "부산 극장가의 역사이자 최신 패션 브랜드 로드숍, 뷰티 매장이 밀집해 있으며, 씨앗호떡을 비롯한 풍성한 길거리 먹거리 쇼핑까지 즐길 수 있는 곳.",
  img: "images/busan/BIFF광장.jpg",
  coords: [35.0975, 129.0270]
},

    // ===== 광주 =====
    {
      location: "광주", categories: ["관광", "힐링", "가족"],
      title: "무등산 양떼목장",
      desc: "푸른 초원에서 귀여운 양들과 교감하며 도심 속 힐링을 즐길 수 있는 곳입니다.",
      img: "images/gwangju/양떼목장.jpg",
      coords: [35.1220, 126.9990]
    },
    {
      location: "광주", categories: ["문화", "관광"],
      title: "국립아시아문화전당 (ACC)",
      desc: "아시아 문화 교류와 예술 창작의 중심지로, 옛 전남도청 부지에 지어진 독창적인 건축미 속에서 다채로운 미디어아트와 대형 전시를 즐길 수 있는 곳.",
      img: "images/gwangju/국립아시아문화전당.jpg",
      coords: [35.1468, 126.9154]
    },
    {
      location: "광주", categories: ["문화", "관광"],
      title: "광주 시립미술관",
      desc: "중외공원의 아름다운 자연 속에 자리 잡은 호남 현대 미술의 중심지로, 국내외 수준 높은 기획 전시와 지역 작가들의 깊이 있는 작품을 감상할 수 있는 공간.",
      img: "images/gwangju/광주시립미술관.jpg",
      coords: [35.1665, 126.9025]
    },
    {
      location: "광주", categories: ["문화", "관광"],
      title: "광주극장",
      desc: "1935년에 문을 열어 국내에서 가장 오래된 단관 극장으로, 지금도 옛 극장 형태와 손으로 그린 손간판의 감성을 그대로 간직한 채 독립·예술 영화를 상영하는 곳.",
      img: "images/gwangju/광주극장.jpg",
      coords: [35.1505, 126.9185]
    },
    {
      location: "광주", categories: ["문화", "힐링", "가족"],
      title: "양림동 펭귄마을 및 역사문화마을",
      desc: "100년 전 선교사들의 근대 건축물과 주민들이 버려진 물건으로 만든 아기자기한 정크아트가 공존하는, 과거와 현재가 얽힌 독특한 예술 마을.",
      img: "images/gwangju/양림동펭귄마을.jpg",
      coords: [35.1383, 126.9050]
    },
    {
      location: "광주", categories: ["힐링", "자연"],
      title: "무등산 국립공원 및 서석대",
      desc: "광주의 어머니 산으로 불리며, 세계적으로도 희귀한 해발 1,000m대 고지에 펼쳐진 거대한 주상절리대(서석대, 입석대)의 장엄한 풍경을 감상할 수 있는 곳.",
      img: "images/gwangju/무등산.jpg",
      coords: [35.1220, 126.9990]
    },
    {
      location: "광주", categories: ["관광", "체험", "커플", "가족"],
      title: "지산유원지 모노레일",
      desc: "레트로한 감성의 리프트를 타고 올라가 무등산 절벽 위를 아슬아슬하게 달리는 모노레일로, 광주 시내 전체를 한눈에 내려다볼 수 있는 짜릿한 전망 명소.",
      img: "images/gwangju/지산유원지.jpg",
      coords: [35.1412, 126.9562]
    },
    {
      location: "광주", categories: ["관광", "힐링", "자연"],
      title: "광주호 호수생태원",
      desc: "잔잔한 호숫가를 따라 끝없이 이어진 나무 데크길을 걸으며, 수려한 습지 경관과 계절 꽃을 만날 수 있는 자연 휴식처.",
      img: "images/gwangju/호수생태원.jpg",
      coords: [35.1875, 126.9400]
    },
    {
      location: "광주", categories: ["관광", "문화", "자연", "커플"],
      title: "사직전망타워",
      desc: "양림동 사직공원 높은 곳에 위치하여 낮에는 광주 시내와 무등산의 파노라마 뷰를, 밤에는 반짝이는 도심의 화려한 야경을 감상하기 좋은 숨은 조망 포인트.",
      img: "images/gwangju/사직전망타워.JPG",
      coords: [35.1380, 126.9022]
    },
    {
      location: "광주", categories: ["관광", "체험", "쇼핑"],
      title: "1913송정역시장",
      desc: "100년이 넘는 역사를 지닌 전통시장을 현대적인 감각의 간판과 디자인으로 재해석하여, 아기자기한 야간 조명 아래 다채로운 길거리 음식을 즐기기 좋은 핫플레이스.",
      img: "images/gwangju/송정역시장.jpg",
      coords: [35.1390, 126.7954]
    },
    {
      location: "광주", categories: ["힐링", "문화"],
      title: "우제길미술관",
      desc: "무등산 자락에 위치한 프라이빗한 예술 공간으로, 자연과 조화를 이루는 모던한 건축물 안에서 현대 미술 작품을 감상하고 야외 테라스에서 차 한잔의 여유를 즐기는 곳.",
      img: "images/gwangju/우제길미술관.jpg",
      coords: [35.1521, 126.9612]
    },
    {
      location: "광주", categories: ["힐링", "관광", "자연", "커플"],
      title: "풍암저수지 및 풍암호수공원",
      desc: "도심 속 잔잔한 호수를 따라 잘 조성된 장미원과 산책로를 걸으며, 시원한 분수 소리와 함께 여유롭게 사색을 즐기기 좋은 쉼터.",
      img: "images/gwangju/풍암저수지.jpg",
      coords: [35.1225, 126.8700]
    },
    {
      location: "광주", categories: ["힐링", "자연"],
      title: "광주 시민의 숲",
      desc: "첨단지구 영산강 변에 위치하여 울창한 야외 수목들과 잘 가꾸어진 잔디밭이 어우러진 곳.",
      img: "images/gwangju/시민의숲.jpg",
      coords: [35.1920, 126.8380]
    },
    {
      location: "광주", categories: ["체험", "관광", "가족"],
      title: "광주기아챔피언스필드",
      desc: "국내 최고 수준의 야구장 시설을 갖춘 곳.",
      img: "images/gwangju/기아챔피언스필드.jpg",
      coords: [35.1680, 126.8892]
    },
    {
      location: "광주", categories: ["체험", "문화", "가족"],
      title: "빛고을공예창작촌",
      desc: "남구 무등산 자락에 위치하여 도자, 목공예, 섬유, 금속 등 전문 공예인들과 함께 나만의 특별한 전통 공예품을 직접 손으로 빚고 만들어볼 수 있는 문화 체험 공간.",
      img: "images/gwangju/빛고을공예창작촌.jpg",
      coords: [35.1263, 126.9224]
    },
    {
      location: "광주", categories: ["체험", "관광"],
      title: "김치타운 (광주김치박물관)",
      desc: "맛의 고장 광주의 대표 브랜드인 '남도 김치'의 역사와 문화를 배우고, 조리실에서 명인의 비법을 따라 직접 김치를 담그고 맛볼 수 있는 이색적인 오감 만족 체험장.",
      img: "images/gwangju/김치타운.jpg",
      coords: [35.1595, 126.8310]
    },
    {
      location: "광주", categories: ["체험", "문화"],
      title: "국립광주과학관",
      desc: "빛, 예술, 과학을 아우르는 독창적인 전시물과 함께 직접 만지고 조작하는 특화된 실험·실습 프로그램을 제공하여 아이와 어른 모두 과학의 원리를 재미있게 깨우치는 곳.",
      img: "images/gwangju/국립광주과학관.jpg",
      coords: [35.1700, 126.8890]
    },
    {
      location: "광주", categories: ["체험", "힐링", "자연"],
      title: "무등산 국립공원 평촌명품마을",
      desc: "무등산 자락의 청정 자연 속에서 전통 두부 만들기, 무등산 분청사기 도예 체험, 생태 숲 탐방 등 시골 고향의 따스함과 자연을 함께 경험하는 주민 주도형 생태 체험 마을.",
      img: "images/gwangju/평촌마을.jpg",
      coords: [35.1050, 127.0110]
    },
    {
      location: "광주", categories: ["쇼핑", "관광"],
      title: "롯데아울렛 수완점",
      desc: "호수공원 주변에 위치하여 수려한 경관을 바라보며 시원하게 쇼핑을 즐길 수 있는 대규모 아울렛.",
      img: "images/gwangju/롯데아울렛수완.jpg",
      coords: [35.1870, 126.8341]
    },
    {
      location: "광주", categories: ["쇼핑", "관광"],
      title: "양동시장",
      desc: "호남 지역에서 가장 큰 규모를 자랑하는 백년 전통의 종합 시장으로, 신선한 로컬 농수산물과 혼수, 의류는 물론 광주의 명물인 양동통닭 등 풍성한 먹거리 쇼핑이 가능한 곳.",
      img: "images/gwangju/양동시장.jpg",
      coords: [35.1458, 126.9021]
    },
    {
      location: "광주", categories: ["쇼핑", "문화"],
      title: "대인예술시장",
      desc: "전통시장의 활기찬 분위기 속에 지역 예술가들의 작업실과 갤러리가 스며들어 있어, 독특한 예술 아트 상품, 수공예품 쇼핑과 함께 다채로운 문화 행사를 경험하는 이색 마켓.",
      img: "images/gwangju/대인시장.jpg",
      coords: [35.1528, 126.9203]
    },
    {
      location: "광주", categories: ["쇼핑", "관광"],
      title: "광주신세계 및 유스퀘어",
      desc: "호남 지역의 대표적인 쇼핑 랜드마크로, 글로벌 명품 브랜드와 최신 트렌디한 팝업스토어는 물론 대형 서점, 영화관, 터미널이 한데 모인 복합 쇼핑·문화 공간.",
      img: "images/gwangju/광주신세계.jpg",
      coords: [35.1517, 126.9175]
    },
    {
      location: "광주", categories: ["쇼핑", "관광", "커플"],
      title: "충장로 및 예술의 거리",
      desc: "광주의 오랜 역사를 자랑하는 대표적인 패션 로드숍 거리이자, 골목 구석구석 개성 있는 보세 의류, 뷰티 매장, 그리고 고미술품과 서화 등을 구경하며 쇼핑할 수 있는 곳.",
      img: "images/gwangju/충장로.jpg",
      coords: [35.1495, 126.9190]
    },

    // ===== 서울 =====
    {
    "location": "서울", "categories": ["문화", "관광"],
    "title": "국립중앙박물관",
    "desc": "대한민국을 대표하는 박물관으로, 구석기 시대 유물부터 조선 시대 회화, 세계 문화재까지 아우르는 압도적인 규모와 미디어아트 전시를 감상할 수 있는 문화의 중심지.",
    "img": "images/seoul/국립중앙박물관.jpg",
    "coords": [37.5239, 126.9804]
  },
  {
    "location": "서울", "categories": ["문화", "관광","가족"],
    "title": "경복궁",
    "desc": "조선 왕조의 법궁으로, 웅장한 근정전과 아름다운 경회루를 거닐며 수백 년 역사의 숨결을 느끼고 화려한 수문장 교대 의식 등 전통 문화를 생생히 체험하는 곳.",
    "img": "images/seoul/경복궁.jpg",
    "coords": [37.5796, 126.977]
  },
  {
    "location": "서울", "categories": ["문화", "관광","가족"],
    "title": "동대문디자인플라자 (DDP)",
    "desc": "세계적인 건축가 자하 하디드가 설계한 우주선 모양의 비정형 건축물로, 매 시즌 세계적인 패션쇼와 혁신적인 현대 미술 디자인 전시가 열리는 트렌디한 문화 공간.",
    "img": "images/seoul/ddp.jpg",
    "coords": [37.5665, 127.0092]
  },
  {
    "location": "서울",
    "categories": ["문화", "힐링","체험","커플", "가족"],
    "title": "예술의전당",
    "desc": "오페라하우스, 음악당, 미술관, 서예박물관 등이 한데 모인 아시아 최고 수준의 복합아트센터로, 격조 높은 클래식 공연과 대형 미술 전시를 상시 즐길 수 있는 곳.",
    "img": "images/seoul/예술의전당.webp",
    "coords": [37.4834, 127.0142]
  },
  {
    "location": "서울",
    "categories": ["문화", "관광","커플"],
    "title": "대학로 연극거리",
    "desc": "한국 소극장 문화의 메카로, 개성 넘치는 수많은 소극장에서 매일 다채로운 연극과 뮤지컬이 상연되며 젊은 예술가들의 열정과 아날로그 감성을 느낄 수 있는 거리.",
    "img": "images/seoul/대학로.jpg",
    "coords": [37.5819, 127.0022]
  },
  {
    "location": "서울",
    "categories": ["힐링", "문화","가족","커플"],
    "title": "미술관옆동물원 (서울대공원 산림욕장)",
    "desc": "청계산 막계골의 수려한 자연림을 따라 조성된 산림욕장 길로, 소나무와 참나무가 뿜어내는 진한 피톤치드를 마시며 도심 근교에서 완벽한 산림욕을 즐기는 공간.",
    "img": "images/seoul/서울대공원.jpg",
    "coords": [37.4275, 127.0169]
  },
  {
    "location": "서울",
    "categories": ["힐링", "관광","자연"],
    "title": "서울숲",
    "desc": "울창한 숲과 넓은 잔디밭, 거울연못이 어우러진 도심 속 오아시스로, 자전거를 타거나 나무 그늘 아래 돗자리를 펴고 조용히 피크닉을 즐기기 좋은 휴식처.",
    "img": "images/seoul/서울숲.jpg",
    "coords": [37.5443, 127.0374]
  },
  {
    "location": "서울",
    "categories": ["힐링", "관광","자연"],
    "title": "푸른수목원",
    "desc": "구로구 끝자락에 위치한 수목원으로, 잔잔한 항동저수지를 둘러싼 데크길과 옛 항동철길의 아날로그 감성이 어우러져 한적하게 사색하며 걷기 좋은 쉼터.",
    "img": "images/seoul/푸른수목원.jpg",
    "coords": [37.4832, 126.8242]
  },
  {
    "location": "서울",
    "categories": ["힐링", "문화"],
    "title": "길상사",
    "desc": "성북동 자락의 고즈넉한 사찰로, 화려한 단청 대신 소박하고 단정한 전각들과 맑은 바람 소리가 가득해 도심의 소음을 잊고 마음을 정화하기 좋은 곳.",
    "img": "images/seoul/길상사.jpg",
    "coords": [37.5947, 126.9964]
  },
  {
    "location": "서울",
    "categories": ["힐링", "관광","자연"],
    "title": "선유도공원",
    "desc": "과거 정수장 시설을 친환경적인 생태공원으로 재탄생시킨 곳으로, 구조물과 담쟁이덩굴이 오묘하게 어우러진 녹색 기둥의 정원 속에서 조용한 휴식을 선사하는 섬.",
    "img": "images/seoul/선유도공원.webp",
    "coords": [37.5434, 126.899]
  },
  {
    "location": "서울",
    "categories": ["힐링", "관광"],
    "title": "서촌 백인제가옥 및 한옥 골목",
    "desc": "경복궁 서쪽 골목을 따라 이어진 고즈넉한 근대 한옥의 정취를 느끼며, 북촌보다 한적하고 여유로운 분위기 속에서 느리게 걷기 좋은 감성 산책로.",
    "img": "images/seoul/백인제가옥.jpg",
    "coords": [37.581, 126.983]
  },
  {
    "location": "서울",
    "categories": ["자연", "체험"],
    "title": "불암산 나비생태공원",
    "desc": "불암산 자락에 위치한 생태 학습 공간. 계절별 식생 변화 관찰이 가능하며, 휠체어나 유모차 이동이 가능한 무장애 산책로가 조성되어 실질적 접근성이 뛰어남.",
    "img": "images/seoul/불암산생태공원.jpg",
    "coords": [37.66, 127.085]
  },
  {
    "location": "서울",
    "categories": ["자연", "힐링"],
    "title": "남산 둘레길",
    "desc": "남산의 생태계를 보존하며 고도 등고선을 따라 조성된 보행로. 완만한 경사로 설계되어 접근성이 높으며 도심 열섬 현상을 완화하는 숲길.",
    "img": "images/seoul/남산둘레길.jpg",
    "coords": [37.55, 126.99]
  },
  {
    "location": "서울",
    "categories": ["자연", "관광"],
    "title": "북한산 국립공원",
    "desc": "거대한 화강암봉과 수려한 계곡으로 이루어진 세계적으로 드문 도심 속 국립공원. 연간 방문객 수용력이 입증된 서울의 대표적인 자연 경관.",
    "img": "images/seoul/북한산.jpg",
    "coords": [37.6584, 126.9782]
  },
  {
    "location": "서울",
    "categories": ["자연", "커플"],
    "title": "월드컵공원 하늘공원",
    "desc": "과거 난지도 쓰레기 매립지를 생태 공원으로 복원한 환경 재생의 대표적 사례. 가을철 억새밭과 한강을 조망할 수 있는 탁 트인 시야가 특징.",
    "img": "images/seoul/하늘공원.jpg",
    "coords": [37.5678, 126.8854]
  },
  {
    "location": "서울",
    "categories": ["자연", "관광","커플"],
    "title": "청계천 생태 산책로",
    "desc": "고가도로를 철거하고 도심 한가운데를 가로지르도록 복원된 인공 하천. 주변부 기온 저감 효과 및 수생태계 복원이라는 실용적 가치를 지닌 공간.",
    "img": "images/seoul/청계천.jpg",
    "coords": [37.5691, 126.9787]
  },
  {
    "location": "서울",
    "categories": ["체험", "문화"],
    "title": "국립항공박물관",
    "desc": "항공 산업의 역사와 기술을 전시하는 국립 시설. 조종 시뮬레이터 및 기내 훈련 체험 등 실감형 디바이스를 활용한 기술 중심의 항공 직무 체험을 지원함.",
    "img": "images/seoul/국립항공박물관.jpg",
    "coords": [37.551, 126.801]
  },
  {
    "location": "서울",
    "categories": ["체험", "가족"],
    "title": "코엑스 아쿠아리움",
    "desc": "수백 종의 해양 생물을 테마별 구역으로 나누어 전시한 대형 실내 수족관. 수중 생태계 관찰 및 먹이 주기 프로그램 등 생물학적 체험 학습의 효용이 높음.",
    "img": "images/seoul/코엑스아쿠아리움.jpg",
    "coords": [37.5131, 127.0588]
  },
  {
    "location": "서울",
    "categories": ["체험", "문화"],
    "title": "북촌전통공방",
    "desc": "전통 한옥 구역 내 조성된 공예 체험 시설. 매듭, 천연 염색 등 전통 기술을 기반으로 한 실습형 프로그램을 통해 문화유산의 실증적 체험을 제공함.",
    "img": "images/seoul/북촌공방.jpg",
    "coords": [37.582, 126.985]
  },
  {
    "location": "서울",
    "categories": ["체험", "커플"],
    "title": "롯데월드 어드벤처",
    "desc": "도심 중심부에 위치한 대규모 실내외 복합 테마파크. 기상 조건과 무관하게 어트랙션 탑승 및 퍼레이드 관람 등의 동적인 엔터테인먼트 체험이 가능함.",
    "img": "images/seoul/롯데월드.jpg",
    "coords": [37.5111, 127.0982]
  },
  {
    "location": "서울",
    "categories": ["가족", "관광", "힐링"],
    "title": "남산서울타워 및 케이블카",
    "desc": "레트로한 케이블카를 타고 올라가 서울의 탁 트인 파노라마 뷰를 감상하고, 타워 광장의 사랑의 자물쇠와 다채로운 미디어아트를 즐기며 가족 3대가 함께 추억을 쌓는 서울의 랜드마크.",
    "img": "images/seoul/남산타워.jpg",
    "coords": [37.5512, 126.9882]
  },
  {
    "location": "서울",
    "categories": ["가족", "문화", "체험"],
    "title": "한성백제박물관 및 올림픽공원",
    "desc": "넓고 푸른 나홀로나무 잔디밭에서 가족들과 뛰어놀거나 자전거를 타고, 박물관 내부에서 서울의 고대 역사를 재미있는 디지털 인터랙티브 전시로 체험하는 복합 휴식 공간.",
    "img": "images/seoul/한성백제박물관.jpg",
    "coords": [37.5206, 127.1214]
  },
  {
    "location": "서울",
    "categories": ["쇼핑", "관광"],
    "title": "동대문 패션타운 (두타몰)",
    "desc": "대한민국 패션의 중심지이자 잠들지 않는 쇼핑 도시로, 최신 트렌드의 의류와 잡화를 도소매로 저렴하게 구매할 수 있으며 심야 쇼핑 특유의 에너지를 느낄 수 있는 곳.",
    "img": "images/seoul/동대문패션타운.jpg",
    "coords": [37.5689, 127.0088]
  },
  {
    "location": "서울",
    "categories": ["쇼핑", "관광"],
    "title": "더현대 서울",
    "desc": "파격적인 실내 녹지 공간과 인공 폭포를 조성하여 자연 속에서 쇼핑하는 듯한 느낌을 주며, 글로벌 핫플레이스와 최신 트렌디한 팝업스토어가 끊이지 않는 쇼핑 명소.",
    "img": "images/seoul/더현대서울.jpg",
    "coords": [37.5259, 126.9284]
  },
  {
    "location": "서울",
    "categories": ["쇼핑", "관광"],
    "title": "스타필드 코엑스몰",
    "desc": "거대한 '별마당 도서관'을 중심으로 패션, 뷰티, 라이프스타일 브랜드 매장이 끝없이 펼쳐진 초대형 지하 복합 쇼핑몰로, 날씨와 상관없이 하루 종일 즐기기 좋은 곳.",
    "img": "images/seoul/코엑스몰.jpg",
    "coords": [37.512, 127.059]
  },
  {
    "location": "서울",
    "categories": ["쇼핑", "문화"],
    "title": "성수동 연무장길",
    "desc": "붉은 벽돌 공장들을 리모델링한 이색적인 공간 속에서 국내 명품 및 디자이너 브랜드의 플래그십 스토어와 개성 넘치는 편집숍, 한정판 팝업 매장들을 만날 수 있는 트렌디한 거리.",
    "img": "images/seoul/성수동연무장길.jpg",
    "coords": [37.544, 127.054]
  },
  {
    "location": "전주",
    "categories": ["문화", "관광","커플","가족"],
    "title": "전주한옥마을",
    "desc": "도심 한가운데 700여 채의 전통 한옥이 군락을 이루고 있는 국내 최대 규모의 한옥 주거지로, 한복을 입고 골목길을 걸으며 한국의 전통 미를 온전히 느끼는 곳.",
    "img": "images/jeonju/전주한옥마을.jpg",
    "coords": [35.8147, 127.1526]
  },
  {
    "location": "전주",
    "categories": ["문화", "관광"],
    "title": "경기전",
    "desc": "조선 태조 이성계의 어진(초상화)을 모신 유서 깊은 공간으로, 울창한 대나무 숲길과 고풍스러운 전각들이 어우러져 한 폭의 그림 같은 역사적 정취를 선사하는 곳.",
    "img": "images/jeonju/경기전.jpg",
    "coords": [35.8153, 127.1495]
  },
  {
    "location": "전주",
    "categories": ["문화", "관광"],
    "title": "전동성당",
    "desc": "호남 지역 서양식 근대 건축물 중 가장 규모가 크고 오래된 성당으로, 붉은 벽돌의 아름다운 로마네스크 양식 외관이 주변 한옥 풍경과 오묘한 조화를 이루는 문화재.",
    "img": "images/jeonju/전동성당.jpg",
    "coords": [35.8133, 127.1493]
  },
  {
    "location": "전주",
    "categories": ["문화", "힐링","커플"],
    "title": "전주향교",
    "desc": "조선시대 지방 양반들의 교육기관으로, 수백 년 된 거대한 은행나무들이 고즈넉한 한옥 마당을 채우고 있어 드라마 촬영지로도 사랑받는 아늑한 문화 공간.",
    "img": "images/jeonju/전주향교.jpg",
    "coords": [35.8122, 127.1565]
  },
  {
    "location": "전주",
    "categories": ["문화", "체험"],
    "title": "국립무형유산원",
    "desc": "인류의 소중한 자산인 무형문화재를 체계적으로 보존하고 전승하는 복합문화공간으로, 장인들의 전통 공예품 전시와 수준 높은 판소리, 전통 공연을 무료로 관람할 수 있는 곳.",
    "img": "images/jeonju/국립무형유산원.jpg",
    "coords": [35.81, 127.155]
  },
  {
    "location": "전주",
    "categories": ["문화", "관광"],
    "title": "국립전주박물관",
    "desc": "조선 전주이씨의 발상지이자 호남 문화의 중심이었던 전북 지역의 역사 유물을 한눈에 살펴보고, 전주 한지의 역사와 매력을 깊이 있게 탐구할 수 있는 곳.",
    "img": "images/jeonju/국립전주박물관.jpg",
    "coords": [35.814, 127.098]
  },
  {
    "location": "전주",
    "categories": ["문화", "관광","가족"],
    "title": "자만벽화마을",
    "desc": "한옥마을이 내려다보이는 가파른 산동네 골목길을 따라 아기자기하고 화려한 벽화들이 그려진 곳으로, 옛 달동네 감성과 현대적 예술 감각이 공존하는 이색 마을.",
    "img": "images/jeonju/자만벽화마을.jpg",
    "coords": [35.816, 127.157]
  },
  {
    "location": "전주",
    "categories": ["문화", "힐링","가족","커플"],
    "title": "서학동예술마을",
    "desc": "옛 서학동 법원 인근 골목에 화가, 사진가, 자수공예가 등 지역 예술인들이 모여 형성한 마을로, 조용한 골목을 걸으며 개성 넘치는 공방과 작은 갤러리를 구경하기 좋은 곳.",
    "img": "images/jeonju/서학동예술마을.jpg",
    "coords": [35.81, 127.147]
  },
  {
    "location": "전주",
    "categories": ["힐링", "관광","자연","커플"],
    "title": "덕진공원",
    "desc": "전주의 허파 역할을 하는 곳으로, 여름이 되면 거대한 호수를 가득 채우는 붉은 연꽃의 향연과 전통 한옥 형태로 지어진 '연화정도서관' 마루에 앉아 잔잔한 호수를 바라보며 사색하기 좋은 명소.",
    "img": "images/jeonju/덕진공원.jpg",
    "coords": [35.8475, 127.1215]
  },
  {
    "location": "전주",
    "categories": ["힐링", "관광","자연"],
    "title": "전주수목원",
    "desc": "고속도로 건설 시 잘려 나간 수목을 모아 가꾼 청정 수목원으로, 사계절 다채로운 야생화와 울창한 유리온실, 그리고 인스타 포토존으로 유명한 습지원 장미원 풍경 속에서 완벽한 산림욕을 즐기는 곳.",
    "img": "images/jeonju/전주수목원.jpg",
    "coords": [35.871, 127.06]
  },
  {
    "location": "전주",
    "categories": ["힐링", "관광","자연","가족"],
    "title": "완산칠봉 꽃동산",
    "desc": "봄이 되면 온 산이 겹벚꽃과 철쭉으로 뒤덮여 붉은 꽃 파도를 이루는 곳으로, 꼭 봄이 아니더라도 울창한 나무 터널을 따라 완만하게 조성된 능선길을 걸으며 시원한 숲바람을 맞기 좋은 힐링 코스.",
    "img": "images/jeonju/완산칠봉.jpg",
    "coords": [35.808, 127.14]
  },
  {
    "location": "전주",
    "categories": ["힐링", "문화","커플"],
    "title": "아중호수 (아중저수지)",
    "desc": "산으로 둘러싸인 아늑한 저수지를 따라 수상 데크길이 길게 이어져 있는 산책로로, 낮에는 잔잔한 물결을 보며 걷고 밤에는 은은한 조명과 물 위에 비친 별빛을 보며 조용히 야간 산책을 즐기기 좋은 곳.",
    "img": "images/jeonju/아중호수.jpg",
    "coords": [35.827, 127.185]
  },
  {
    "location": "전주",
    "categories": ["힐링", "문화"],
    "title": "한옥마을 오목대",
    "desc": "한옥마을 나지막한 언덕 끝자락에 위치한 정자로, 고풍스러운 정자 마루에 걸터앉아 땀을 식히며 발아래로 끝없이 펼쳐진 수백 채 한옥 지붕들의 고즈넉한 곡선미를 감상할 수 있는 휴식 공간.",
    "img": "images/jeonju/오목대.jpg",
    "coords": [35.8145, 127.1545]
  },
  {
    "location": "전주",
    "categories": ["힐링", "관광","자연"],
    "title": "건지산 편백나무숲",
    "desc": "전북대학교 인근에 위치하여 도심과 가깝지만, 하늘이 보이지 않을 정도로 빽빽하게 우거진 편백나무 군락이 있어 진한 피톤치드 향을 마시며 맨발로 흙길을 걷거나 평상에 누워 쉴 수 있는 쉼터.",
    "img": "images/jeonju/건지산.jpg",
    "coords": [35.85, 127.135]
  },
  {
    "location": "전주",
    "categories": ["힐링", "관광"],
    "title": "전주천 생태한울길",
    "desc": "한옥마을 옆을 흐르는 1급수 청정 하천을 따라 조성된 길로, 물각시와 수달이 사는 맑은 물소리를 들으며 남천교 청연루 아래 그늘에서 쉬거나 억새풀 사이로 자전거를 타며 여유를 만끽하는 생태 산책로.",
    "img": "images/jeonju/전주천.jpg",
    "coords": [35.815, 127.145]
  },
  {
    "location": "전주",
    "categories": ["자연", "힐링"],
    "title": "전주 삼경사 및 기린봉 숲길",
    "desc": "전주의 동쪽을 지키는 기린봉 자락에 위치하여, 도심과 가깝지만 울창한 소나무 숲길을 따라 산새 소리를 들으며 맑은 공기를 듬뿍 마실 수 있는 청정 자연 산책로.",
    "img": "images/jeonju/기린봉.jpg",
    "coords": [35.82, 127.165]
  },
  {
    "location": "전주",
    "categories": ["자연", "관광"],
    "title": "색장정원 주변 원당천변",
    "desc": "전주 외곽의 한적한 시골 정취를 간직한 곳으로, 졸졸 흐르는 원당천을 따라 흐드러지게 피어난 야생화와 들풀을 보며 자연 고유의 흙냄새를 맡을 수 있는 숨은 생태 명소.",
    "img": "images/jeonju/원당천.jpg",
    "coords": [35.7831, 127.1552]
  },
  {
    "location": "전주",
    "categories": ["자연", "힐링","가족"],
    "title": "상림동 맹종죽 대나무숲",
    "desc": "영화 촬영지로도 알음알음 알려진 전주 외곽의 비밀스러운 대나무 군락지로, 하늘 높이 뻗은 거대한 맹종죽 사이로 불어오는 시원한 대바람 소리를 들으며 산림욕을 즐기기 좋은 숲.",
    "img": "images/jeonju/맹종죽숲.jpg",
    "coords": [35.8242, 127.0494]
  },
  {
    "location": "전주",
    "categories": ["체험", "문화"],
    "title": "전주전통술박물관",
    "desc": "집집마다 술을 빚던 전통 가양주 문화의 맥을 잇는 곳으로, 전통 누룩의 향을 맡으며 막걸리 거르기, 모주 끓이기 등 전주의 깊은 맛을 직접 내 손으로 빚어보는 이색 체험장.",
    "img": "images/jeonju/전통술박물관.jpg",
    "coords": [35.8155, 127.154]
  },
  {
    "location": "전주",
    "categories": ["체험", "관광","커플"],
    "title": "전주난장",
    "desc": "근현대사 80년의 손때 묻은 실제 소품들을 모아 만든 체험형 레트로 테마파크로, 옛 교복을 입고 추억의 오락실 게임, 고고장, 옛 만화방 등을 직접 만지고 즐기는 생생한 시간여행 공간.",
    "img": "images/jeonju/전주난장.jpg",
    "coords": [35.817, 127.152]
  },
  {
    "location": "전주",
    "categories": ["체험", "문화","가족"],
    "title": "전주비빔밥 체험관 (한벽문화관)",
    "desc": "맛의 고장 전주의 대표 음식인 비빔밥의 역사와 유래를 배우고, 신선한 로컬 식재료와 고유의 양념을 활용하여 커다란 가마솥이나 놋그릇에 직접 비빔밥을 요리하고 시식하는 전통 식문화 체험.",
    "img": "images/jeonju/비빔밥체험.jpg",
    "coords": [35.813, 127.157]
  },
  {
    "location": "전주",
    "categories": ["체험", "문화","가족","커플"],
    "title": "전주부채문화관",
    "desc": "조선시대 선자청의 맥을 이어 전통 부채인 합죽선과 태극선의 아름다움을 조명하고, 무형문화재 장인의 숨결이 깃든 선면에 나만의 그림과 글귀를 그려 넣어 세상에 하나뿐인 나만의 부채를 만드는 곳.",
    "img": "images/jeonju/부채문화관.jpg",
    "coords": [35.814, 127.153]
  },
  {
    "location": "전주",
    "categories": ["쇼핑", "문화"],
    "title": "전주남부시장 청년몰",
    "desc": "전통시장 2층의 유휴 공간을 젊은 사장들의 톡톡 튀는 아이디어로 채운 곳으로, 개성 넘치는 핸드메이드 소품, 독특한 액세서리, 레트로 굿즈 등을 구경하며 쇼핑하기 좋은 문화 마켓.",
    "img": "images/jeonju/청년몰.jpg",
    "coords": [35.8125, 127.1485]
  },
  {
    "location": "전주",
    "categories": ["쇼핑", "관광"],
    "title": "한옥마을 공방 및 기념품 거리",
    "desc": "태조로와 은행로를 따라 길게 이어진 쇼핑 거리로, 고풍스러운 전주 한지 공예품, 전통 부채, 수제 도장, 그리고 전주의 명물인 풍년제과 초코파이 등 로컬 색이 짙은 기념품을 구매할 수 있는 곳.",
    "img": "images/jeonju/한옥마을쇼핑.jpg",
    "coords": [35.814, 127.152]
  },
  {
    "location": "전주",
    "categories": ["쇼핑", "문화"],
    "title": "객리단길 소품숍 골목",
    "desc": "트렌디한 카페와 맛집들이 모여 있는 다가동 객사길 구석구석에 위치한 쇼핑 코스로, 아기자기한 인테리어 소품, 다이어리 꾸미기 용품, 감성적인 빈티지 의류를 판매하는 편집숍들이 밀집한 거리.",
    "img": "images/jeonju/객리단길소품숍.jpg",
    "coords": [35.818, 127.143]
  },
  {
    "location": "전주",
    "categories": ["쇼핑", "관광"],
    "title": "롯데백화점 전주점",
    "desc": "전주 서신동에 위치한 전북 지역 최대 규모의 백화점으로, 국내외 유명 패션 브랜드와 뷰티 매장, 대형 식품관과 영화관이 한데 모여 있어 쾌적하고 편리하게 쇼핑을 즐길 수 있는 곳.",
    "img": "images/jeonju/롯데백화점전주.jpg",
    "coords": [35.836, 127.126]
  },
  {
    "location": "전주",
    "categories": ["쇼핑", "관광"],
    "title": "전주 모래내시장",
    "desc": "전주 시내 중심에 위치한 전통 종합 시장으로, 신선한 로컬 농수산물과 반찬거리는 물론 옛날 방식 그대로 구워내는 과자류 등 정겨운 시골 장터의 매력과 풍성한 먹거리 쇼핑이 가능한 곳.",
    "img": "images/jeonju/모래내시장.jpg",
    "coords": [35.833, 127.145]
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

    const filteredPlaces = mockData.filter(item =>
      item.location === place && cats.some(cat => item.categories.includes(cat))
    );

    if (filteredPlaces.length > 0) {
      filteredPlaces.forEach(item => {
        const tagsHtml = item.categories.map(c =>
          `<span class="tag" data-location="${item.location}" data-category="${c}">#${c}</span>`
        ).join('');

        const cardHtml = `
          <div class="recommend-card">
            <img src="${item.img}" alt="${item.title}" onerror="this.src='images/${item.location === '부산' ? 'busan' : item.location === '광주' ? 'gwangju' : item.location === '서울' ? 'Seoul' : 'Jeonju'}.jpg'">
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

      bindTagEvents(mockData);

    } else {
      alert(`[${place}] 지역에서 선택하신 카테고리에 맞는 여행지가 아직 등록되어 있지 않습니다.`);
      resultSection.style.display = 'none';
    }
  });

  // =====================================================
  // 5. 태그 클릭 → 해당 장소 핀 누적 추가
  // =====================================================

  // 현재 지도에 올라간 장소 목록 (누적)
  let selectedCoursePlaces = [];

  function bindTagEvents(allData) {
    document.querySelectorAll('.recommend-tags .tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const location  = tag.dataset.location;
        const category  = tag.dataset.category;

        // 태그가 가리키는 장소 찾기
        // - 지역 태그(#부산 등): 해당 카드의 장소 1개
        // - 카테고리 태그: 해당 카드의 장소 1개
        // → 카드 단위 장소를 특정하기 위해 카드 title을 data 속성으로 활용
        const cardTitle = tag.closest('.recommend-card')?.querySelector('h3')?.innerText;
        const targetPlace = allData.find(d => d.title === cardTitle);

        if (!targetPlace) return;

        // 이미 추가된 장소면 제거(토글), 없으면 추가
        const existIdx = selectedCoursePlaces.findIndex(p => p.title === targetPlace.title);
        if (existIdx !== -1) {
          selectedCoursePlaces.splice(existIdx, 1);
          tag.classList.remove('tag-active');
        } else {
          selectedCoursePlaces.push(targetPlace);
          // 같은 카드의 모든 태그 활성화 표시
          tag.closest('.recommend-card')
             ?.querySelectorAll('.tag')
             .forEach(t => t.classList.add('tag-active'));
        }

        if (selectedCoursePlaces.length === 0) {
          // 핀이 없으면 패널 닫기
          const panel = document.getElementById('course-panel');
          panel.classList.remove('open');
          setTimeout(() => { panel.style.display = 'none'; }, 400);
          return;
        }

        openCoursePanel(selectedCoursePlaces);
      });
    });
  }

  // =====================================================
  // 6. 코스 패널 열기 + 카카오맵 렌더링
  // =====================================================
  let kakaoMap     = null;
  let mapPolylines = [];
  let mapOverlays  = [];

  function openCoursePanel(places) {
    if (places.length === 0) return;

    const panel = document.getElementById('course-panel');
    panel.style.display = 'flex';
    requestAnimationFrame(() => panel.classList.add('open'));

    renderCourseList(places);
    renderMap(places);

    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderCourseList(places) {
    const sidebar       = document.getElementById('course-sidebar');
    const courseTitleEl = document.getElementById('course-title');

    // 총 거리 계산
    let totalDist = 0;
    for (let i = 0; i < places.length - 1; i++) {
      totalDist += getDistanceKm(places[i].coords, places[i + 1].coords);
    }
    courseTitleEl.innerText = places.length === 1
      ? `📍 ${places[0].title}`
      : `총 ${places.length}곳 · ${totalDist.toFixed(1)}km`;

    sidebar.innerHTML = '';
    places.forEach((place, idx) => {
      // 다음 장소까지 거리·시간
      let routeHtml = '';
      if (idx < places.length - 1) {
        const dist = getDistanceKm(place.coords, places[idx + 1].coords);
        const mins = Math.round(dist / 40 * 60);
        routeHtml = `
          <div class="course-route-info">
            <span class="route-icon">🚗</span>
            <span class="route-dist">${dist.toFixed(1)} km</span>
            <span class="route-sep">·</span>
            <span class="route-time">${mins < 60 ? mins + '분' : Math.floor(mins/60) + '시간 ' + (mins%60 ? mins%60+'분' : '')}</span>
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
            ${routeHtml}
          </div>
        </div>
      `;
    });
  }

  function renderMap(places) {
    const mapEl = document.getElementById('course-map');

    // 기존 오버레이·폴리라인 제거
    mapPolylines.forEach(p => p.setMap(null));
    mapOverlays.forEach(o => o.setMap(null));
    mapPolylines = []; mapOverlays = [];

    const center = new kakao.maps.LatLng(places[0].coords[0], places[0].coords[1]);
    if (!kakaoMap) {
      kakaoMap = new kakao.maps.Map(mapEl, { center, level: 8 });
    }

    const latlngs = [];

    places.forEach((place, idx) => {
      const pos = new kakao.maps.LatLng(place.coords[0], place.coords[1]);
      latlngs.push(pos);

      // 번호 핀 (커스텀 오버레이)
      const markerContent = `
        <div class="map-pin">
          <div class="map-pin-num"><span>${idx + 1}</span></div>
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

    // 경로 폴리라인
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

      // 구간 거리·시간 라벨
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

    // 모든 핀이 보이도록 지도 범위 조정
    const bounds = new kakao.maps.LatLngBounds();
    latlngs.forEach(ll => bounds.extend(ll));
    kakaoMap.setBounds(bounds);
  }

  // Haversine 직선 거리 계산
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
  // 7. 패널 닫기 → 선택 장소 초기화
  // =====================================================
  document.getElementById('close-course-panel').addEventListener('click', () => {
    const panel = document.getElementById('course-panel');
    panel.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 400);

    // 누적 선택 목록 초기화
    selectedCoursePlaces = [];

    // 모든 태그 활성 표시 제거
    document.querySelectorAll('.recommend-tags .tag').forEach(t => t.classList.remove('tag-active'));

    // 지도 오버레이/폴리라인 제거
    mapPolylines.forEach(p => p.setMap(null));
    mapOverlays.forEach(o => o.setMap(null));
    mapPolylines = []; mapOverlays = [];
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