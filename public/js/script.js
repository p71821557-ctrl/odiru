// HERO TEXT

const heroTitle =
document.getElementById("hero-title");

const heroTexts = [

  "국내 어디든 떠나보세요",
  "감성 여행 코스",
  "국내 인기 여행지",
  "호텔 · 여행지 한번에"

];

let heroIndex = 0;

setInterval(() => {

  heroIndex++;

  if(heroIndex >= heroTexts.length){

    heroIndex = 0;

  }

  heroTitle.innerText =
  heroTexts[heroIndex];

},3000);




// HERO SLIDE

const slides =
document.querySelectorAll(".slide");

let slideIndex = 0;

setInterval(() => {

  slides.forEach((slide) => {

    slide.classList.remove("active");

  });

  slideIndex++;

  if(slideIndex >= slides.length){

    slideIndex = 0;

  }

  slides[slideIndex]
  .classList.add("active");

},4000);




// LOGIN

const loginBtn =
document.getElementById("login-btn");

const signupBtn =
document.getElementById("signup-btn");

const logoutBtn =
document.getElementById("logout-btn");

const mypageBtn =
document.getElementById("mypage-btn");

const heroLoginBtn =
document.getElementById("hero-login-btn");

const heroSignupBtn =
document.getElementById("hero-signup-btn");




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

  loginBtn.onclick = () => {

    window.location.href =
    "/pages/mypage/mypage.html";

  };

} else {

  loginBtn.onclick = moveLogin;

}




// 로그인 이동

function moveLogin(){

  window.location.href =
  "/pages/login/login.html";

}

heroLoginBtn?.addEventListener(
  "click",
  moveLogin
);




// 회원가입 이동

function moveSignup(){

  window.location.href =
  "/pages/login/signup.html";

}

signupBtn?.addEventListener(
  "click",
  moveSignup
);

heroSignupBtn?.addEventListener(
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
      "/pages/login/login.html";

      return;

    }

    window.location.href =
    "/pages/mypage/mypage.html";

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




// 여행 플래너

const routeBtn =
document.getElementById("route-btn");

const startPlace =
document.getElementById("start-place");

const endPlace =
document.getElementById("end-place");

const googleMap =
document.getElementById("google-map");

routeBtn?.addEventListener(
  "click",
  () => {

    const start =
    startPlace.value;

    const end =
    endPlace.value;

    if(!start || !end){

      alert("출발지와 도착지를 입력해주세요.");

      return;

    }

    googleMap.src =
    `https://maps.google.com/maps?q=${end}&t=&z=9&ie=UTF8&iwloc=&output=embed`;

  }
);