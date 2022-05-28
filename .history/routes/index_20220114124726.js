const { Router } = require("express");
const router = Router();
const Service = require("../models/Service");
const Advantage = require("../models/Advantage");
const Contact = require("../models/Contact");
const HeaderSliderText = require("../models/HeaderSliderText");
const Sale = require("../models/Sale");
const Category = require("../models/Category");
const Slider = require("../models/Slider");
const Logo = require("../models/Logo");
const Color = require("../models/Color");

router.get("/", async (req, res) => {
  const service = await (await Service.find().limit(6)).reverse();
  const advantage = await (await Advantage.find()).reverse();
  const contact = await Contact.find();
  const HeaderText = await HeaderSliderText.find();
  // const sale = await (await Sale.find().limit(6)).reverse();

  const sale = await Sale.find().sort({ date: -1 }).limit(6);

  const hit = await (await Sale.find({ hit: "1" }).limit(6)).reverse();
  const news = await Sale.find({ news: "1" });

  const slider = await Slider.find();

  const logo = await Logo.find();

  const category = await Category.find();

  const color = await Color.find();

  console.log(req);

  res.render("index", {
    title: "Գլխավոր",
    service,
    advantage,
    contact,
    HeaderText,
    sale,
    news,
    hit,
    category,
    slider,
    logo,
    color,
  });
});

module.exports = router;
