const { Router } = require("express");
const router = Router();
const Contact = require("../models/Contact");
const Category = require("../models/Category");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Logo = require("../models/Logo");

router.get("/", async (req, res) => {
  const contact = await Contact.find();
  const category = await Category.find();
  const logo = await Logo.find();
  console.log(contact);

  if (req.session.isAuthenticated) {
    res.redirect("/");
  } else {
    res.render("login", {
      title: "Մուտք",
      contact,
      category,
      loginError: req.flash("loginError"),
      passwordError: req.flash("passwordError"),
      logo,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) {
            throw Error;
          } else if (candidate.role == "Administrator") {
            res.redirect("/admin-users");
          } else {
            res.redirect("/");
          }
        });
      } else {
        req.flash("passwordError", "Սխալ գաղտնաբառ");
        res.redirect("/login");
      }
    } else {
      req.flash("loginError", "Սխալ էլեկտրոնային փոստի հասցե");
      res.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
