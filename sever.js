const express = require("express");
const session = require("express-session");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const path = require("path");

const app = express();

// public 폴더 연결
app.use(express.static(path.join(__dirname, "public")));

// 세션 설정
app.use(
  session({
    secret: "odiru-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// 로그인 저장
passport.serializeUser((user, done) => {
  done(null, user);
});

// 로그인 유지
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// 카카오 로그인
passport.use(
  new KakaoStrategy(
    {
      clientID: "05d30bdbb381878c14e4d47a15d86d8f",

      callbackURL:
        "http://127.0.0.1:3000/auth/kakao/callback",
    },

    (accessToken, refreshToken, profile, done) => {

      console.log(profile);

      return done(null, profile);

    }
  )
);

// 카카오 로그인 시작
app.get(
  "/auth/kakao",
  passport.authenticate("kakao")
);

// 로그인 성공
app.get(
  "/auth/kakao/callback",

  passport.authenticate("kakao", {
    failureRedirect:
      "/pages/login/login.html",
  }),

  (req, res) => {

    res.send(`
      <div style="
        width:100%;
        height:100vh;

        display:flex;
        justify-content:center;
        align-items:center;

        background:#f5f7fb;

        font-family:sans-serif;
      ">

        <div style="
          width:420px;

          background:white;

          padding:50px;

          border-radius:30px;

          text-align:center;

          box-shadow:
          0 15px 40px rgba(0,0,0,0.12);
        ">

          <img
            src="${req.user._json.properties.profile_image}"

            style="
              width:120px;
              height:120px;

              border-radius:50%;

              margin-bottom:25px;
            "
          >

          <h1>
            ${req.user.username}님
          </h1>

          <p style="
            margin-top:15px;
            color:#666;
          ">
            카카오 로그인 성공 🎉
          </p>

          <button
            onclick="
              location.href='/'
            "

            style="
              width:100%;
              height:58px;

              margin-top:35px;

              border:none;
              border-radius:18px;

              background:#2979ff;

              color:white;

              font-size:18px;
              font-weight:bold;

              cursor:pointer;
            "
          >
            홈으로 이동
          </button>

        </div>

      </div>
    `);

  }
);

// 기본 페이지
app.get("/", (req, res) => {
  res.redirect("/pages/login/login.html");
});

// 서버 실행
app.listen(3000, () => {
  console.log("서버 실행 완료 : 3000");
});