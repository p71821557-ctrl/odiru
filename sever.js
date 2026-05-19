const express = require("express");
const session = require("express-session");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");

const app = express();



// MongoDB 연결
mongoose.connect(
  "mongodb://127.0.0.1:27017/odiru"
)
.then(() => {

  console.log("MongoDB 연결 성공");

})
.catch((err) => {

  console.log(err);

});



// public 연결
app.use(
  express.static(
    path.join(__dirname, "public")
  )
);



// 세션
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



// 카카오 로그인
passport.use(
  new KakaoStrategy(

    {

      clientID:
        "05d30bdbb381878c14e4d47a15d86d8f",

      callbackURL:
        "http://localhost:3000/auth/kakao/callback",

    },



    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {

      try {

        console.log(profile);

        // 기존 회원 조회
        let user = await User.findOne({

          kakaoId: profile.id,

        });



        // 회원 없으면 자동 회원가입
        if (!user) {

          user = await User.create({

            kakaoId: profile.id,

            nickname: profile.username,

            profileImage:
              profile._json.properties.profile_image,

          });

          console.log("회원가입 완료");

        } else {

          console.log("기존 회원 로그인");

        }



        return done(null, user);

      } catch (err) {

        console.log(err);

        return done(err);

      }

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
          src="${req.user.profileImage}"
          width="120"
          style="
            border-radius:50%;
            margin-top:20px;
          "
        >

        <h2 style="margin-top:20px;">
          ${req.user.nickname}
        </h2>

        <p style="margin-top:20px;">
          MongoDB 저장 완료
        </p>

      </div>

    `);

  }

);



// 로그인 상태 확인
app.get("/api/user", (req, res) => {

  if (!req.user) {

    return res.json(null);

  }

  res.json(req.user);

});



// 로그아웃
app.get("/logout", (req, res) => {

  req.logout(() => {

    res.redirect("/");

  });

});



// 기본 페이지
app.get("/", (req, res) => {

  res.redirect("/pages/login/login.html");

});



// 서버 실행
app.listen(3000, () => {

  console.log("서버 실행 완료 : 3000");

});