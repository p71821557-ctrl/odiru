console.log("로그인 페이지 연결 완료");

const googleButtons = document.querySelectorAll(".google-btn");
const kakaoButtons = document.querySelectorAll(".kakao-btn");

// Google 로그인
googleButtons.forEach((button) => {

  button.addEventListener("click", () => {
    alert("Google 로그인 준비중");
  });

});

// Kakao 로그인
kakaoButtons.forEach((button) => {

  button.addEventListener("click", () => {
    alert("Kakao 로그인 준비중");
  });

});