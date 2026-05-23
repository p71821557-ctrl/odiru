// 👤 로그인 체크 (서버 세션 기반)
async function checkLogin() {

  const userInfo = document.getElementById("userInfo");
  const imgWrap  = document.getElementById("profile-img-wrap");

  try {
    const res  = await fetch("/api/user");
    const user = await res.json();

    // 로그인 안 됨 → 메인으로
    if (!user) {
      alert("로그인이 필요합니다.");
      window.location.href = "/";
      return;
    }

    // 프로필 이미지
    if (user.profileImage) {
      imgWrap.innerHTML = `
        <img
          class="profile-img"
          src="${user.profileImage}"
          alt="프로필"
        />
      `;
    } else {
      imgWrap.innerHTML = `
        <div class="profile-placeholder">👤</div>
      `;
    }

    // 닉네임 표시
    userInfo.innerHTML = `환영합니다 😊 <strong>${user.nickname}</strong>`;

  } catch (err) {
    console.error("유저 정보 불러오기 실패:", err);
    userInfo.innerHTML = "정보를 불러올 수 없습니다.";
  }
}

// 🚪 로그아웃
function doLogout() {
  if (confirm("로그아웃 하시겠습니까?")) {
    window.location.href = "/logout";
  }
}

// 🔙 메인 이동
function goMain() {
  window.location.href = "/";
}

// 🚀 실행
checkLogin();