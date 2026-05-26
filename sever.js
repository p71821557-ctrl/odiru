const express = require("express");
const session = require("express-session");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const mongoose = require("mongoose");
const path = require("path");

const User = require("./models/User");
const TravelSelection = require("./models/TravelSelection");

const app = express();



// ==========================================
// JSON
// ==========================================
app.use(express.json());



// ==========================================
// NGROK WARNING REMOVE
// ==========================================
app.use((req, res, next) => {

  res.setHeader(
    "ngrok-skip-browser-warning",
    "true"
  );

  next();

});



// ==========================================
// MONGODB
// ==========================================
mongoose.connect(
  "mongodb://127.0.0.1:27017/odiru"
)

  .then(() => {

    console.log("MongoDB 연결 성공");

  })

  .catch((err) => {

    console.log(err);

  });



// ==========================================
// SESSION
// ==========================================
app.use(

  session({

    secret: "odiru-secret",

    resave: false,

    saveUninitialized: false,

  })

);



// ==========================================
// PASSPORT
// ==========================================
app.use(passport.initialize());

app.use(passport.session());



// ==========================================
// LOGIN SAVE
// ==========================================
passport.serializeUser((user, done) => {

  done(null, user.id);

});



// ==========================================
// LOGIN 유지
// ==========================================
passport.deserializeUser(

  async (id, done) => {

    try {

      const user =
        await User.findById(id);

      done(null, user);

    } catch (err) {

      done(err);

    }

  }

);



// ==========================================
// KAKAO LOGIN
// ==========================================
passport.use(

  new KakaoStrategy(

    {

      clientID:
        "05d30bdbb381878c14e4d47a15d86d8f",

      clientSecret:
        "zkyFHRrBty1KTkyIjiVTFVIj1wyCgfUJ",

      callbackURL:
        "https://cameo-deceit-statute.ngrok-free.dev/auth/kakao/callback",

    },

    async (

      accessToken,
      refreshToken,
      profile,
      done

    ) => {

      console.log(
        "=== 카카오 콜백 진입 ==="
      );

      console.log(
        JSON.stringify(
          profile,
          null,
          2
        )
      );

      try {

        // ==========================================
        // 카카오 닉네임 가져오기
        // ==========================================
        const kakaoNickname =

          profile._json
            ?.properties
            ?.nickname

          ||

          profile._json
            ?.kakao_account
            ?.profile
            ?.nickname

          ||

          profile.displayName

          ||

          "카카오유저";



        // ==========================================
        // 카카오 프로필 이미지
        // ==========================================
        const kakaoProfileImage =

          profile._json
            ?.kakao_account
            ?.profile
            ?.profile_image_url

          ||

          profile._json
            ?.properties
            ?.profile_image

          ||

          "";



        // ==========================================
        // 기존 회원 찾기
        // ==========================================
        let user =
          await User.findOne({

            kakaoId: profile.id

          });



        // ==========================================
        // 신규 회원가입
        // ==========================================
        if (!user) {

          user =
            await User.create({

              kakaoId: profile.id,

              nickname:
                kakaoNickname,

              profileImage:
                kakaoProfileImage,

            });

          console.log(
            "신규 회원가입 완료:",
            user.nickname
          );

        }



        // ==========================================
        // 기존 회원 로그인
        // ==========================================
        else {

          // nickname 이상할 경우 자동 수정
          if (

            !user.nickname ||

            user.nickname === "." ||

            user.nickname === ".님" ||

            user.nickname === ""

          ) {

            user.nickname =
              kakaoNickname;

            await user.save();

          }

          console.log(
            "기존 회원 로그인:",
            user.nickname
          );

        }



        return done(null, user);

      } catch (err) {

        console.log(err);

        return done(err);

      }

    }

  )

);



// ==========================================
// STATIC
// ==========================================
app.use(

  express.static(

    path.join(__dirname, "public")

  )

);



// ==========================================
// MAIN PAGE
// ==========================================
app.get("/", (req, res) => {

  res.sendFile(

    path.join(

      __dirname,
      "public",
      "index.html"

    )

  );

});



// ==========================================
// LOGIN PAGE
// ==========================================
app.get("/login", (req, res) => {

  res.sendFile(

    path.join(

      __dirname,
      "public",
      "pages",
      "login",
      "login.html"

    )

  );

});



// ==========================================
// KAKAO LOGIN START
// ==========================================
app.get(

  "/auth/kakao",

  passport.authenticate("kakao")

);



// ==========================================
// KAKAO CALLBACK
// ==========================================
app.get(

  "/auth/kakao/callback",

  passport.authenticate(

    "kakao",

    {

      failureRedirect: "/login",

    }

  ),

  (req, res) => {

    console.log(
      "=== 로그인 성공 ==="
    );

    res.redirect("/");

  }

);



// ==========================================
// USER API
// ==========================================
app.get("/api/user", (req, res) => {

  if (!req.user) {

    return res.json(null);

  }

  res.json({

    nickname:
      req.user.nickname,

    profileImage:
      req.user.profileImage,

    kakaoId:
      req.user.kakaoId,

  });

});



// ==========================================
// SAVE TRAVEL SELECTION
// ==========================================
app.post(

  "/save-selection",

  async (req, res) => {

    try {

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message:
            "로그인이 필요합니다.",

        });

      }

      const {

        place,
        categories

      } = req.body;



      const newSelection =
        await TravelSelection.create({

          userId:
            req.user.kakaoId,

          place,

          categories,

        });



      console.log(
        "여행 선택 저장 완료:",
        newSelection
      );



      res.json({

        success: true,

        data: newSelection,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

        message:
          "서버 에러",

      });

    }

  }

);



// ==========================================
// MY TRAVEL LIST
// ==========================================
app.get(

  "/my-selections",

  async (req, res) => {

    try {

      if (!req.user) {

        return res.status(401).json({

          success: false,

        });

      }

      const data =
        await TravelSelection.find({

          userId:
            req.user.kakaoId,

        })

          .sort({

            createdAt: -1

          });



      res.json({

        success: true,

        data,

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        success: false,

      });

    }

  }

);



// ==========================================
// LOGOUT
// ==========================================
app.get("/logout", (req, res) => {

  req.logout(() => {

    res.redirect("/");

  });

});



// ==========================================
// SERVER START
// ==========================================
app.listen(

  3000,
  "0.0.0.0",

  () => {

    console.log(
      "서버 실행 완료 : 3000"
    );

  }

);