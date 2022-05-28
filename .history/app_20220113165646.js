const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
// const csrf = require('csurf');

const app = express();

const keys = require("./keys/keys");

app.set("views", __dirname + "/views");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//sessions

app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//middlewares

const errorHandler = require("./middleware/error");
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");

// app.use(csrf());
app.use(cookieParser());
app.use(flash());
app.use(varMiddleware);
app.use(userMiddleware);

app.use(helmet());
app.use(compression());

// translate
var i18n = require("i18n");

i18n.configure({
  locales: ["ru", "hy", "en"],
  defaultLocale: "hy",
  cookie: "locale",
  directory: __dirname + "/locales",
  directoryPermissions: "755",
  autoReload: true,
  updateFiles: true,
  objectNotation: true,
  api: {
    __: "__",
    __n: "__n",
  },
});

app.use(i18n.init);

app.use((req, res, next) => {
  if (req.cookies.locale === undefined) {
    res.cookie("locale", "hy", { maxAge: 900000, httpOnly: true });
    req.setLocale("hy");
  }
  next();
});

app.get("/hy", (req, res) => {
  res.cookie("locale", "hy", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
});

app.get("/en", (req, res) => {
  res.cookie("locale", "en", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
});

app.get("/ru", (req, res) => {
  res.cookie("locale", "ru", { maxAge: 900000, httpOnly: true });
  res.redirect("back");
});

app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  next();
});

//routes

const indexRouter = require("./routes/index");
const aboutRouter = require("./routes/about");
const contactRouter = require("./routes/contact");
const resultSearchRouter = require("./routes/result-search");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const shopingCartRouter = require("./routes/shoping-cart");
const shopSingleRouter = require("./routes/shop-single");
const personalRouter = require("./routes/personal");
const ordersRouter = require("./routes/orders");
const favoriteRouter = require("./routes/favorite");
const changePasswordRouter = require("./routes/change-password");
const allCategoryRouter = require("./routes/all-category");
const conditionRouter = require("./routes/condition");

app.use("/", indexRouter);
app.use("/about", aboutRouter);
app.use("/contact", contactRouter);
app.use("/result-search", resultSearchRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/shoping-cart", shopingCartRouter);
app.use("/shop-single", shopSingleRouter);
app.use("/personal", personalRouter);
app.use("/orders", ordersRouter);
app.use("/favorite", favoriteRouter);
app.use("/change-password", changePasswordRouter);
app.use("/all-category", allCategoryRouter);
app.use("/condition", conditionRouter);

//admin routes

const adminUsersRouter = require("./routes/admin/users");
const adminSettingsRouter = require("./routes/admin/settings");
const adminSaleRouter = require("./routes/admin/sale");
const adminOrdersRouter = require("./routes/admin/orders");

app.use("/admin-users", adminUsersRouter);
app.use("/admin-settings", adminSettingsRouter);
app.use("/admin-sale", adminSaleRouter);
app.use("/admin-orders", adminOrdersRouter);

app.use(errorHandler);

//Server

const PORT = process.env.PORT || 3000;

function start() {
  try {
    mongoose.connect(keys.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log("Server is listening on port  http://localhost:3000/");
    });
  } catch (e) {
    console.log(e);
  }
}

app.get("/test", async function (req, res) {
  return json.send("test well done");
});
start();
