const questions = [

  {
    question: "여행 중 에너지를 얻는 순간은?",
    left: "혼자 힐링",
    right: "사람들과 어울리기",

    leftDesc: "조용한 혼자만의 시간이 좋아요",
    rightDesc: "사람들과 함께할 때 즐거워요",

    leftEmoji: "🌙",
    rightEmoji: "🎉",

    leftType: "I",
    rightType: "E"
  },

  {
    question: "더 끌리는 여행지는?",

    left: "자연",
    right: "도시",

    leftDesc: "힐링되는 자연 풍경이 좋아요",
    rightDesc: "화려한 도시 감성이 좋아요",

    leftEmoji: "🌿",
    rightEmoji: "🏙️",

    leftType: "S",
    rightType: "N"
  },

  {
    question: "여행 계획 스타일은?",

    left: "철저한 계획",
    right: "즉흥 여행",

    leftDesc: "계획표대로 움직이는 게 좋아요",
    rightDesc: "그때그때 자유롭게 움직여요",

    leftEmoji: "📋",
    rightEmoji: "🎒",

    leftType: "J",
    rightType: "P"
  },

  {
    question: "맛집을 고를 때는?",

    left: "검증된 맛집",
    right: "새로운 음식 도전",

    leftDesc: "후기 좋은 곳이 좋아요",
    rightDesc: "신기한 음식이 궁금해요",

    leftEmoji: "⭐",
    rightEmoji: "🔥",

    leftType: "S",
    rightType: "N"
  },

  {
    question: "여행 중 갈등이 생기면?",

    left: "논리적으로 해결",
    right: "감정적으로 공감",

    leftDesc: "문제를 빠르게 해결해요",
    rightDesc: "상대 기분을 먼저 생각해요",

    leftEmoji: "🧠",
    rightEmoji: "💖",

    leftType: "T",
    rightType: "F"
  },

  {
    question: "더 좋아하는 여행 활동은?",

    left: "박물관·역사 탐방",
    right: "축제·액티비티",

    leftDesc: "의미 있는 장소 탐방이 좋아요",
    rightDesc: "신나는 체험이 좋아요",

    leftEmoji: "🏛️",
    rightEmoji: "🎡",

    leftType: "I",
    rightType: "E"
  },

  {
    question: "숙소 취향은?",

    left: "편안하고 안정적",
    right: "특별하고 감성적",

    leftDesc: "편하게 쉬는 게 중요해요",
    rightDesc: "감성 숙소가 좋아요",

    leftEmoji: "🛏️",
    rightEmoji: "✨",

    leftType: "J",
    rightType: "P"
  },

  {
    question: "여행 사진 스타일은?",

    left: "기록용 사진",
    right: "감성 인생샷",

    leftDesc: "추억 기록이 중요해요",
    rightDesc: "감성 사진은 필수예요",

    leftEmoji: "📷",
    rightEmoji: "📸",

    leftType: "T",
    rightType: "F"
  }

];

let current = 0;

const scores = {

  E: 0,
  I: 0,

  S: 0,
  N: 0,

  T: 0,
  F: 0,

  J: 0,
  P: 0

};

const question =
  document.getElementById("question");

const leftText =
  document.getElementById("left-text");

const rightText =
  document.getElementById("right-text");

const leftDesc =
  document.getElementById("left-desc");

const rightDesc =
  document.getElementById("right-desc");

const leftEmoji =
  document.getElementById("left-emoji");

const rightEmoji =
  document.getElementById("right-emoji");

const progressBar =
  document.getElementById("progress-bar");

const progressText =
  document.getElementById("progress-text");

const questionNumber =
  document.getElementById("question-number");

const leftButton =
  document.getElementById("left-btn");

const rightButton =
  document.getElementById("right-btn");

function updateQuestion() {

  const q = questions[current];

  question.innerText =
    q.question;

  leftText.innerText =
    q.left;

  rightText.innerText =
    q.right;

  leftDesc.innerText =
    q.leftDesc;

  rightDesc.innerText =
    q.rightDesc;

  leftEmoji.innerText =
    q.leftEmoji;

  rightEmoji.innerText =
    q.rightEmoji;

  const percent =
    Math.round(
      ((current + 1) / questions.length) * 100
    );

  progressBar.style.width =
    `${percent}%`;

  progressText.innerText =
    `${percent}%`;

  questionNumber.innerText =
    `Q${current + 1}`;

}

function selectAnswer(type) {

  scores[type]++;

  current++;

  if (current < questions.length) {

    updateQuestion();

  } else {

    showResult();

  }

}

function showResult() {

  const mbtiTravelData = {

    ESTP: {
      resultType: "모험가형 여행자",
      nickname: "익스트림 헌터",
      recommend: ["제주도", "설악산", "지리산"],
      resultDesc:
        "새로운 경험과 모험을 즐기는 자유로운 여행자입니다.",
      travelStyle:
        `"계획은 사치, 일단 뛰고 본다."
번지점프, 액티비티, 익스트림 스포츠를 사랑하는 타입.`
    },

    ESFP: {
      resultType: "흥폭발 여행자",
      nickname: "축제의 중심점",
      recommend: ["부산 광안리", "홍대", "이비자"],
      resultDesc:
        "사람들과 어울리며 분위기를 즐기는 여행자입니다.",
      travelStyle:
        `"인생은 파티다."
축제와 핫플에서 에너지를 얻는 여행 스타일.`
    },

    ENTP: {
      resultType: "호기심 탐험가",
      nickname: "호기심의 방랑자",
      recommend: ["도쿄", "런던", "베를린"],
      resultDesc:
        "새로운 문화와 경험을 끊임없이 탐험합니다.",
      travelStyle:
        `"여긴 왜 이럴까?"
색다른 장소와 문화를 파헤치는 타입.`
    },

    ENFP: {
      resultType: "감성 자유 여행자",
      nickname: "낭만 가득 몽상가",
      recommend: ["제주도", "남해", "파리"],
      resultDesc:
        "감성과 낭만을 중요하게 생각하는 여행자입니다.",
      travelStyle:
        `"모든 순간이 영화 같다."
즉흥적이고 감성적인 여행을 사랑하는 타입.`
    },

    ISTP: {
      resultType: "자연 모험가",
      nickname: "실전 탐험가",
      recommend: ["속초", "평창", "무등산"],
      resultDesc:
        "자연 속에서 활동적인 경험을 즐깁니다.",
      travelStyle:
        `"몸이 먼저 움직인다."
캠핑과 액티비티를 좋아하는 자유인.`
    },

    ISFP: {
      resultType: "감성 예술 여행자",
      nickname: "예술적 유랑자",
      recommend: ["전주", "교토", "피렌체"],
      resultDesc:
        "분위기와 감성을 천천히 즐기는 여행자입니다.",
      travelStyle:
        `"풍경 자체가 힐링."
감성 카페와 예쁜 골목을 사랑하는 타입.`
    },

    INTP: {
      resultType: "지적 탐험가",
      nickname: "고독한 분석가",
      recommend: ["경주", "아테네", "로마"],
      resultDesc:
        "역사와 문화를 깊이 탐구하는 스타일입니다.",
      travelStyle:
        `"생각하며 걷는다."
유적지와 박물관 탐방을 좋아하는 타입.`
    },

    INFP: {
      resultType: "치유 여행자",
      nickname: "꿈꾸는 은둔자",
      recommend: ["남해", "홋카이도", "스위스"],
      resultDesc:
        "조용하고 감성적인 공간에서 힐링을 추구합니다.",
      travelStyle:
        `"나만의 비밀 장소를 찾는다."
복잡함보다 여유를 사랑하는 타입.`
    },

    ESTJ: {
      resultType: "완벽 계획 여행자",
      nickname: "여행 사령관",
      recommend: ["서울", "싱가포르", "도쿄"],
      resultDesc:
        "체계적이고 효율적인 여행을 선호합니다.",
      travelStyle:
        `"계획이 곧 여행이다."
분 단위 계획표를 짜는 타입.`
    },

    ESFJ: {
      resultType: "따뜻한 동행 여행자",
      nickname: "친절한 동행자",
      recommend: ["오사카", "부산", "다낭"],
      resultDesc:
        "함께하는 사람들의 행복을 중요하게 생각합니다.",
      travelStyle:
        `"다 같이 행복해야 진짜 여행."
일행 챙기기를 좋아하는 타입.`
    },

    ENTJ: {
      resultType: "도시 정복 여행자",
      nickname: "야망의 정복자",
      recommend: ["뉴욕", "두바이", "강남"],
      resultDesc:
        "최고의 장소와 경험을 추구합니다.",
      travelStyle:
        `"목표는 반드시 달성한다."
핫플과 고급 여행을 선호하는 타입.`
    },

    ENFJ: {
      resultType: "소통형 여행자",
      nickname: "에너지 전도사",
      recommend: ["발리", "태국", "캄보디아"],
      resultDesc:
        "사람과의 교류를 가장 중요하게 생각합니다.",
      travelStyle:
        `"함께 떠나야 더 즐겁다."
사람을 통해 에너지를 얻는 타입.`
    },

    ISTJ: {
      resultType: "정석 여행자",
      nickname: "기록하는 수집가",
      recommend: ["경주", "런던", "도쿄"],
      resultDesc:
        "검증된 루트와 안정적인 여행을 좋아합니다.",
      travelStyle:
        `"정석이 최고다."
꼼꼼하게 계획하고 기록하는 타입.`
    },

    ISFJ: {
      resultType: "안정형 여행자",
      nickname: "따뜻한 안식처",
      recommend: ["강릉", "제주도", "후쿠오카"],
      resultDesc:
        "편안하고 안정감 있는 여행을 선호합니다.",
      travelStyle:
        `"익숙함 속의 행복."
조용하고 편안한 여행을 좋아하는 타입.`
    },

    INTJ: {
      resultType: "전략형 여행자",
      nickname: "철저한 전략가",
      recommend: ["독일", "스위스", "싱가포르"],
      resultDesc:
        "효율과 계획 중심의 완벽한 여행을 추구합니다.",
      travelStyle:
        `"최소 비용 최대 효율."
숨은 명소까지 조사하는 전략형 타입.`
    },

    INFJ: {
      resultType: "의미 탐구 여행자",
      nickname: "깊이를 찾는 여행자",
      recommend: ["교토", "티베트", "인도"],
      resultDesc:
        "의미와 감정을 남기는 여행을 좋아합니다.",
      travelStyle:
        `"여행은 마음에 남아야 한다."
깊은 감성과 철학을 추구하는 타입.`
    }

  };

  const mbti =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  const selected =
    mbtiTravelData[mbti];

  if (!selected) {

    alert("결과 데이터를 찾을 수 없습니다.");

    return;

  }

  localStorage.setItem(
    "travel-result-type",
    selected.resultType
  );

  localStorage.setItem(
    "travel-result-mbti",
    mbti
  );

  localStorage.setItem(
    "travel-result-desc",
    selected.resultDesc
  );

  localStorage.setItem(
    "travel-result-nickname",
    selected.nickname
  );

  localStorage.setItem(
    "travel-result-style",
    selected.travelStyle
  );

  localStorage.setItem(
    "travel-result-choice",
    selected.travelStyle
  );

  localStorage.setItem(
    "travel-result-recommend",
    JSON.stringify(selected.recommend)
  );

  window.location.href =
    "/pages/travel-test/result.html";

}