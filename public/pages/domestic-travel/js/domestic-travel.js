document.addEventListener("DOMContentLoaded", () => {

  // 여행지 선택

  const placeCards =
  document.querySelectorAll(".place-card");

  placeCards.forEach((card) => {

    card.addEventListener("click", () => {

      placeCards.forEach((c) => {

        c.classList.remove("selected");

      });

      card.classList.add("selected");

    });

  });





  // 카테고리 선택

  const categoryBtns =
  document.querySelectorAll(".cat-btn");

  categoryBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

      btn.classList.toggle("selected");

    });

  });





  // 완료 버튼

  document
  .getElementById("submitBtn")
  .addEventListener("click", () => {

    const place =
    document.querySelector(
      ".place-card.selected .place-name"
    )?.innerText;

    const cats = [];

    document
    .querySelectorAll(".cat-btn.selected")
    .forEach((b) => {

      cats.push(b.innerText);

    });

    if (!place || cats.length === 0) {

      alert(
        "여행지와 카테고리를 모두 선택해주세요!"
      );

      return;
    }

    alert(
      `🎉 선택 완료!\n지역 : ${place}\n카테고리 : ${cats.join(", ")}`
    );

  });

});





// 로그인 관련

const loginBtn =
document.getElementById("login-btn");

const signupBtn =
document.getElementById("signup-btn");

const logoutBtn =
document.getElementById("logout-btn");

const mypageBtn =
document.getElementById("mypage-btn");





// 로그인 상태

const loginState =
localStorage.getItem("isLogin");

const loginUser =
localStorage.getItem("loginUser");

if(loginState === "true"){

  loginBtn.innerText =
  `${loginUser}님`;

  signupBtn.style.display =
  "none";

  logoutBtn.style.display =
  "inline-block";

}





// 로그인

function moveLogin(){

  window.location.href =
  "../login/login.html";

}

loginBtn?.addEventListener(
  "click",
  moveLogin
);





// 회원가입

function moveSignup(){

  window.location.href =
  "../login/signup.html";

}

signupBtn?.addEventListener(
  "click",
  moveSignup
);





// 마이페이지

mypageBtn?.addEventListener(
  "click",
  () => {

    const isLogin =
    localStorage.getItem("isLogin");

    if(isLogin !== "true"){

      alert("로그인이 필요합니다.");

      window.location.href =
      "../login/login.html";

      return;

    }

    window.location.href =
    "../mypage/mypage.html";

  }
);





// 로그아웃

logoutBtn?.addEventListener(
  "click",
  () => {

    localStorage.removeItem("isLogin");

    localStorage.removeItem("loginUser");

    alert("로그아웃 되었습니다.");

    location.reload();

  }
);