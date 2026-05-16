const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// public 폴더 연결
app.use(express.static(path.join(__dirname, "public")));

// 기본 페이지
app.get("/", (req, res) => {
  res.redirect("/pages/login/login.html");
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버 실행 완료 : ${PORT}`);
});