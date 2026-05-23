const express = require("express");
const session = require("express-session");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");

const app = express();

app.use((req, res, next) => {
  res.setHeader('ngrok-skip-browser-warning', 'true');
  next();
});

// MongoDB 연결
mongoose.connect("mongodb://127.0.0.1:27017/odiru")
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.log(err));

// 세션 설정
app.use(
  session({
    secret: "odiru-secret",
    resave: false,
    saveUninitialized: false,
  })
);

// passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// 로그인 저장
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// 로그인 유지
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// 카카오 로그인 설정
passport.use(
  new KakaoStrategy(
    {
      clientID: "05d30bdbb381878c14e4d47a15d86d8f",
      clientSecret: "zkyFHRrBty1KTkyljiVTFVlj1wyCgfUJ",
      callbackURL: "http://localhost:3000/auth/kakao/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("=== 카카오 콜백 진입 ===");
      console.log("accessToken:", accessToken);
      console.log("profile:", JSON.stringify(profile, null, 2));

      try {
        let user = await User.findOne({ kakaoId: profile.id });

        if (!user) {
          user = await User.create({
            kakaoId: profile.id,
            nickname: profile.username,
            profileImage: profile._json?.kakao_account?.profile?.profile_image_url
              || profile._json?.properties?.profile_image
              || "",
          });
          console.log("신규 회원가입 완료:", user.nickname);
        } else {
          console.log("기존 회원 로그인:", user.nickname);
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

// 정적 파일 (public 폴더)
app.use(express.static(path.join(__dirname, "public")));

// 메인 페이지
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 카카오 로그인 시작
app.get("/auth/kakao", passport.authenticate("kakao"));

// 카카오 로그인 완료 → 메인 페이지로 리디렉션
app.get(
  "/auth/kakao/callback",
  (req, res, next) => {
    console.log("=== /auth/kakao/callback 라우트 진입 ===");
    console.log("query:", req.query);
    next();
  },
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    console.log("=== 로그인 성공, 메인으로 이동 ===");
    res.redirect("/");
  }
);

// 로그인 상태 확인 API
app.get("/api/user", (req, res) => {
  if (!req.user) return res.json(null);
  res.json({
    nickname: req.user.nickname,
    profileImage: req.user.profileImage,
    kakaoId: req.user.kakaoId,
  });
});

// 로그아웃
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

// 서버 실행
app.listen(3000, '0.0.0.0', () => {
  console.log("서버 실행 완료 : 3000");
});