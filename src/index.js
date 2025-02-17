import express from "express";
import session from "express-session";
import FileStorage from "session-file-store";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

//settings
const app = express();
app.set("PORT", 3000);
const firmaCookie = "Carlos Tevez";
// const fileStorage = FileStorage(session)
const secret = "Apache3210";
const mongodbUri = "mongodb+srv://Frahumada_Admin:UyiKMmsUH7TO9QrM@frahumada.twiqt.mongodb.net/?retryWrites=true&w=majority&appName=Frahumada";


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(firmaCookie)); //
// Parte 1 --> FileStorage
// app.use(session({
//   store: new fileStorage({path:"./sessions",ttl:10, retries:0}),
//   secret,
//   resave: false,
//   saveUninitialized: false,
// }))
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongodbUri,
      ttl: 15,
    }),
    secret,
    resave: false,
    saveUninitialized: false,
  })
);

//routes
app.get("/", (req, res) => {
  res.json({ title: "Home Page" });
});

// routes cookies
app.get("/set-cookie", (req, res) => {
  res.cookie("MyCookie", "Valor de la cookie", { maxAge: 10000 });
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
  res.cookie("MySignedCookie", "Valor de la cookie FIRMADA", { signed: true });
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

//login
app.get("/login", (req, res) => {
  const user = req.query.user;
  const pass = req.query.pass;

  req.session.user = user;
  res.redirect("/user");
});

app.get("/user", (req, res) => {
  const user = req.session.user;
  if (req.session?.user) {
    return res.send(`El usuario registrado es ${user}`);
  }
  {
    res.send(`No hay usuario registrado`);
  }
});

//listeners
app.listen(app.get("PORT"), () => {
  console.log(`🟢 Server on port http://localhost:${app.get("PORT")} 🟢`);
});
