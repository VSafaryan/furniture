const { Router } = require("express");
const router = Router();
const Contact = require("../models/Contact");
const Category = require("../models/Category");
const User = require("../models/User");
const Logo = require("../models/Logo");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const contact = await Contact.find();
  const category = await Category.find();
  const logo = await Logo.find();

  const user = req.user.toObject();

  res.render("personal", {
    title: "Անձնական սենյակ",
    contact,
    category,
    logo,
    user,
  });
});

router.post("/me", async function (req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ message: "bad request!" });
  }

  const thisUser = await User.find({ where: { _id: userId } });

  if (!thisUser) {
    return res.json({ message: "user not found!" });
  } else {
    return res.json(thisUser);
  }
});

module.exports = router;
