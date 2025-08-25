const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "secret-key", // 아무 문자열
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }, // 30분
  })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {

  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.sendFile(path.join(__dirname, "public", "webapp", "login", "index.html"))
});

app.post("/login", (req, res) => {
  const { password } = req.body;

  // 예시용 계정 (DB 대신)
  if (password === "20010826") {
    req.session.user = 'niha'; // 세션에 저장
    return res.redirect("/dashboard");
  } else {
    return res.send("잘못된 비밀번호 입니다.");
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/"); // 로그인 안 했으면 로그인 페이지로
  }
  res.sendFile(path.join(__dirname, "public", "webapp", "dashboard", "index.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "webapp", "error", "404error.html"));
  res.status(500).sendFile(path.join(__dirname, "public", "webapp", "error", "500error.html"));
});

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});