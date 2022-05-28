const { Router } = require("express");
const router = Router();
const multer = require("multer");
const Service = require("../../models/Service");
const Advantage = require("../../models/Advantage");
const Contact = require("../../models/Contact");
const About = require("../../models/About");
const HeaderSliderText = require("../../models/HeaderSliderText");
const Category = require("../../models/Category");
const Logo = require("../../models/Logo");
const Slider = require("../../models/Slider");
const Color = require("../../models/Color");
const auth = require("../../middleware/auth");
const Condition = require("../../models/Condition");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'uploads')     //you tell where to upload the files,
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({
  storage: storage,
  onFileUploadStart: function (file) {
    console.log(file.originalname + " is starting ...");
  },
});

router.get("/", auth, async (req, res) => {
  const service = await (await Service.find()).reverse();
  const advantage = await (await Advantage.find()).reverse();
  const contact = await Contact.find();
  const about = await About.find();
  const HeaderText = await HeaderSliderText.find();
  const category = await Category.find();
  const logo = await Logo.find();
  const slider = await Slider.find();
  const color = await Color.find();
  const condition = await Condition.find();

  if (req.session.user.role == "User") {
    res.redirect("/");
  } else {
    res.render("admin/settings", {
      title: "Settings",
      service,
      advantage,
      contact: [
        {
          id: 1,
          phone: 10,
          email: "test",
          instagram: "test",
          facebook: "test",
          workingHourse: "test",
        },
      ],
      about,
      HeaderText,
      category,
      logo: [
        {
          id: 1,
        },
      ],
      slider,
      color,
      condition,
    });
  }

  // res.render('admin/settings', {
  //     title: 'Settings',
  //     service,
  //     advantage,
  //     contact,
  //     about,
  //     HeaderText,
  //     category,
  //     logo,
  //     slider,
  //     color
  // })
});

router.post("/service", upload.single("avatar"), function (req, res, next) {
  const post = new Service({
    avatar: req.file.filename,
    titleHy: req.body.titleHy,
    titleRu: req.body.titleRu,
    titleEn: req.body.titleEn,
  });
  post.save();
  res.redirect("/admin-settings");
  return false;
});

router.post("/advantage", upload.single("avatar"), function (req, res, next) {
  const post = new Advantage({
    avatar: req.file.filename,
    titleHy: req.body.titleHy,
    descriptionHy: req.body.descriptionHy,
    titleRu: req.body.titleRu,
    descriptionRu: req.body.descriptionRu,
    titleEn: req.body.titleEn,
    descriptionEn: req.body.descriptionEn,
  });
  post.save();
  res.redirect("/admin-settings");
  return false;
});

router.post("/delete", async (req, res) => {
  await Service.deleteOne({ _id: req.body.id });
  res.redirect("/admin-settings");
});

router.post("/delete_advantage", async (req, res) => {
  await Advantage.deleteOne({ _id: req.body.id });
  res.redirect("/admin-settings");
});

// router.post('/contact', async (req, res) => {
//     const {phone, email, instagram, facebook, workingHourse} = req.body;
//     const post = new Contact({phone, email, instagram, facebook, workingHourse})
//     post.save()
//     res.redirect('/admin-settings')
// })

router.post("/contact", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Contact.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-settings");
});

router.post("/about", upload.single("avatar"), async function (req, res, next) {
  // const post = new About({
  //     avatar: req.file.filename,
  //     title: req.body.title,
  //     info: req.body.info
  // })
  // post.save()
  // res.redirect('/admin-settings')
  // return false;
  const { id } = req.body;
  delete req.body.id;
  await About.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-settings");
});

router.post("/header", async (req, res) => {
  // const post = new HeaderSliderText({
  //     title: req.body.title,
  //     description: req.body.description
  // })
  // post.save()
  // res.redirect('/admin-settings')
  const { id } = req.body;
  delete req.body.id;
  await HeaderSliderText.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-settings");
});

router.post("/category", async (req, res) => {
  try {
    const post = new Category({
      categoryHy: req.body.categoryHy,
      categoryRu: req.body.categoryRu,
      categoryEn: req.body.categoryEn,
    });
    await post.save();
    res.redirect("/admin-settings");
  } catch (e) {
    console.log(e);
  }
});

router.post("/logo", upload.single("avatar"), async function (req, res, next) {
  // const post = new Logo({
  //     avatar: req.file.filename,
  // })
  // post.save()
  const { id } = req.body;
  delete req.body.id;
  await Logo.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-settings");
  return false;
});

router.post(
  "/slider",
  upload.single("avatar"),
  async function (req, res, next) {
    const post = new Slider({
      avatar: req.file.filename,
    });
    post.save();
    res.redirect("/admin-settings");
    return false;
  }
);

router.post("/sliderDelete", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Slider.findByIdAndRemove(id);
  res.redirect("/admin-settings");
});

router.post("/colors", async (req, res) => {
  const post = new Color({ color: req.body.color });
  await post.save();
  res.redirect("/admin-settings");
});

router.post("/condition", async (req, res) => {
  // const post = new Condition({
  //     conditionHy: req.body.conditionHy,
  //     conditionRu: req.body.conditionRu,
  //     conditionEn: req.body.conditionEn,
  // })
  // await post.save();

  const { id } = req.body;
  delete req.body.id;
  await Condition.findByIdAndUpdate(id, req.body);

  res.redirect("/admin-settings");
});

module.exports = router;
