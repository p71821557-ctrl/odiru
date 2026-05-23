console.log("ODIRU LOGIN");

// 카카오 버튼

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