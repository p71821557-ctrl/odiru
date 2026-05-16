const express = require("express");
const session = require("express-session");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const path = require("path");

const app = express();

// public 연결
app.use(express.static(path.join(__dirname, "public")));

// 세션
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
        "http://localhost:3000/auth/kakao/callback",
    },

    (accessToken, refreshToken, profile, done) => {

      console.log(profile);

      return done(null, profile);

    }
  )
);

// 로그인 시작
app.get(
  "/auth/kakao",
  passport.authenticate("kakao")
);

// 로그인 완료
app.get(
  "/auth/kakao/callback",

  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),

  (req, res) => {

    res.send(`
      <div style="
        font-family:sans-serif;
        text-align:center;
        margin-top:80px;
      ">

        <h1>카카오 로그인 성공 🎉</h1>

        <img
          src="${req.user._json.properties.profile_image}"
          width="120"
          style="
            border-radius:50%;
            margin-top:20px;
          "
        >

        <h2 style="margin-top:20px;">
          ${req.user.username}
        </h2>

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