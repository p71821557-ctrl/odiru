// 👤 로그인 체크
function checkLogin() {

  const userInfo =
    document.getElementById(
      "userInfo"
    );

  const userData =
    localStorage.getItem(
      "mwt-user"
    );

  // 로그인 안됨
  if (!userData) {

    userInfo.innerHTML = `
      로그인 필요
    `;

    return;
  }

  // 문자열 → 객체
  const user =
    JSON.parse(userData);

  // 닉네임 표시
  userInfo.innerHTML = `
    환영합니다 😊 ${user.nickname}
  `;
}

// 🔙 메인 이동
function goMain() {

  window.location.href =
    "../index.html";
}

// 🚀 실행
checkLogin();