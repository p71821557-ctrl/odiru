// 홈 이동

const backHome =
  document.getElementById("back-home");

if(backHome){

  backHome.addEventListener("click", () => {

    window.location.href =
      "../index.html";

  });

}



// 회원가입

const signupButton =
  document.getElementById("signup-btn");

if(signupButton){

  signupButton.addEventListener("click", () => {

    const nickname =
      document.getElementById("nickname").value;

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    if(
      nickname === "" ||
      email === "" ||
      password === ""
    ){

      alert("모든 정보를 입력해주세요!");
      return;

    }

    const user = {

      nickname,
      email,
      password

    };

    localStorage.setItem(
      "mwt-user",
      JSON.stringify(user)
    );

    alert("회원가입 완료!");

    window.location.href =
      "./login.html";

  });

}



// 로그인

const loginSubmit =
  document.getElementById("login-submit");

if(loginSubmit){

  loginSubmit.addEventListener("click", () => {

    const email =
      document.getElementById("login-email").value;

    const password =
      document.getElementById("login-password").value;

    const savedUser =
      JSON.parse(
        localStorage.getItem("mwt-user")
      );

    if(!savedUser){

      alert("회원가입이 필요합니다!");
      return;

    }

    if(
      email === savedUser.email &&
      password === savedUser.password
    ){

      localStorage.setItem(
        "isLogin",
        "true"
      );

      localStorage.setItem(
        "loginUser",
        savedUser.nickname
      );

      alert(
        `${savedUser.nickname}님 로그인 성공!`
      );

      window.location.href =
        "../index.html";

    }else{

      alert("이메일 또는 비밀번호가 틀렸습니다.");

    }

  });

}