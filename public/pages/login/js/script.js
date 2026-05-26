console.log("ODIRU LOGIN");



// ==========================================
// 카카오 버튼
// ==========================================
const kakaoButtons =
document.querySelectorAll(".kakao-btn");

kakaoButtons.forEach((button) => {

  // hover
  button.addEventListener(
    "mouseenter",
    () => {

      button.style.transform =
      "translateY(-3px)";

    }
  );

  button.addEventListener(
    "mouseleave",
    () => {

      button.style.transform =
      "translateY(0px)";

    }
  );



  // 클릭 시 카카오 로그인 이동
  button.addEventListener(
    "click",
    () => {

      window.location.href =
      "/auth/kakao";

    }
  );

});



// ==========================================
// 로그인 상태 체크
// ==========================================
async function checkLogin() {

  try {

    const res =
      await fetch("/api/user");

    const user =
      await res.json();

    // 로그인 안 됨
    if (!user) {

      console.log("비로그인 상태");

      return;

    }

    console.log("로그인 유저:", user);

    // 버튼 텍스트 변경
    kakaoButtons.forEach((button) => {

      button.innerHTML = `
        👋 ${user.nickname}님
      `;

      // 클릭 시 마이페이지 이동
      button.onclick = () => {

        window.location.href =
        "/pages/mypage/mypage.html";

      };

    });




    // ==========================================
    // 상단 프로필 자동 추가
    // ==========================================
    const profileArea =
      document.getElementById(
        "profile-area"
      );

    if (profileArea) {

      profileArea.innerHTML = `

        <div class="login-user">

          <img
            src="${user.profileImage}"
            class="top-profile"
          />

          <span>
            ${user.nickname}님
          </span>

        </div>

      `;

    }

  }

  catch (err) {

    console.log(err);

  }

}



// ==========================================
// 실행
// ==========================================
checkLogin();