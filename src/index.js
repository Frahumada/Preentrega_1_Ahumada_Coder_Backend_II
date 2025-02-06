import express from "express";
import cookieParser from "cookie-parser";

//settings
const app = express();
app.set("PORT", 3000);
const firmaCookie = "Carlos Tevez"

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(firmaCookie)); //

//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});

// routes cookies
app.get("/set-cookie", (req, res) => {
  res.cookie("MyCookie", "Valor de la cookie", {maxAge: 10000});
  res.send("Cookie seteada");
});

app.get("/get-cookie", (req, res) => {
  const Cookie = req.cookies.MyCookie;
  console.log(Cookie);
  res.send(Cookie);
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("MyCookie");
  res.send("Cookie removida");
});

// routes cookies firmadas
app.get("/set-signed-cookie", (req, res) => {
  res.cookie("MySignedCookie", "Valor de la cookie FIRMADA", {signed: true});
  res.send("Cookie FIRMADA seteada");
});

app.get("/get-signed-cookie", (req, res) => {
  const signedCookie = req.signedCookies.MySignedCookie;
  console.log(signedCookie);
  res.send(signedCookie);
});

app.get("/delete-signed-cookie", (req, res) => {
  res.clearCookie("MySignedCookie");
  res.send("Cookie FIRMADA removida");
});

//listeners
app.listen(app.get("PORT"), () => {
  console.log(`🟢 Server on port http://localhost:${app.get("PORT")} 🟢`);
});

