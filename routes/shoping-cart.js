const { Router, response } = require("express");
const router = Router();
const Contact = require("../models/Contact");
const qs = require('qs');
const Category = require("../models/Category");
const fetch = require("cross-fetch");
const axios = require('axios');
const Checkout = require("../models/Checkout");
const Cash = require("../models/Order/Cash");
const Withoutbank = require("../models/Order/WithoutBank");
const WithoutBankCredit = require("../models/Order/WithoutBankCredit");
const WithBank = require("../models/Order/Withbank");
const multer = require("multer");
const Logo = require("../models/Logo");
const auth = require("../middleware/auth");
const Withbank = require("../models/Order/Withbank");
const Products = require("../models/Sale");
const Ameria = require("../models/Order/paymentAmeria");
const Idram = require("../models/Order/paymentIdram");
const DeliveryCity = require("../models/Delivery_city");
const ConditionPay = require("../models/ConditionPay");
const User = require("../models/User")
// const bodyParser = require("body-parser");

//not sure what "extended: false" is for
// app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage }).array("avatar", 4);

  router.get("/", async (req, res) => {
  const contact = await Contact.find();
  const category = await Category.find();
  const logo = await Logo.find();
  const deliveryCity = await DeliveryCity.find();
  const conditionPay = await ConditionPay.find();

  // const user = await User.findOne()
  // const oneUser = await req.user.toObject();


  const checkout = await Checkout.find();

  res.render("shoping-cart", {
    title: "Գնումների զամբյուղ",
    contact,
    category,
    checkout,
    logo,
    deliveryCity,
    conditionPay
  });
});

//cash
// router.post("/cash", auth, async (req, res) => {
//   const user = await req.user.populate("cart.items.saleId").execPopulate();

//   console.log(user);

//   const {
//     name,
//     surname,
//     email,
//     phone,
//     address,
//     city,
//     title,
//     quantity,
//     totalValueTemp,
//     totalValue,
//   } = req.body;

//   let now = new Date();

//   var delivery_price = req.body.delivery_price;
//   delivery_price = parseInt(delivery_price) + parseInt(totalValue);
//   console.log(delivery_price);

//   const post = await new Cash({
//     name,
//     surname,
//     email,
//     phone,
//     address,
//     city,
//     title,
//     quantity,
//     totalValueTemp,
//     now,
//     totalValue,
//     delivery_price,
//     user: {
//       userId: req.user,
//     },
//     status: "Ընթացքում",
//   });
//   await post.save();
//   res.redirect("/orders");
// });



//withoutbank start
 
router.post("/withoutbank", auth, function (req, res, next) {
  upload(req, res, async function (err) {
    const { title, quantity,phone, totalValueTemp, totalValue } = req.body;

    // var delivery_price = req.body.delivery_price;
    // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

    let img = req.files;
    let avatar = [];
    img.forEach((i) => {
      let imgName = i.filename;
      avatar.push(imgName);
    });

    let now = new Date();

    const post = new Withoutbank({
      title,
      quantity,
      totalValueTemp,
      totalValue,
      phone,
      avatar,
      now,
      status: "Ընթացքում",
    });
    await post.save();
    res.redirect("/successPaymentModal");
  });
});

//withoutbank end




//withoutbank Credit start
 
router.post("/withoutbankcredit", auth, function (req, res, next) {
  upload(req, res, async function (err) {
    const { title, quantity,phone, totalValueTemp, totalValue } = req.body;

    // var delivery_price = req.body.delivery_price;
    // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

    let img = req.files;
    let avatar = [];
    img.forEach((i) => {
      let imgName = i.filename;
      avatar.push(imgName);
    });

    let now = new Date();

    const post = new WithoutBankCredit({
      title,
      quantity,
      totalValueTemp,
      totalValue,
      phone,
      avatar,
      now,
      status: "Ընթացքում",
    });
    await post.save();
    res.redirect("/successPaymentModal");
  });
});

//withoutbank Credit end



//through a bank
router.post("/withbank", function (req, res, next) {
  upload(req, res, async function (err) {
    const {
      title,
      quantity,
      totalValueTemp,
      totalValue,
      name,
      surname,
      email,
      phone,
      address,
    } = req.body;

    // var delivery_price = req.body.delivery_price;
    // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

    let img = req.files;
    let avatar = [];
    img.forEach((i) => {
      let imgName = i.filename;
      avatar.push(imgName);
    });

    let now = new Date();

    // const user = await req.user.populate("cart.items.saleId").execPopulate();
    // console.log('user here, user', user)

    const post = new WithBank({
      name,
      surname,
      email,
      phone,
      address,
      avatar,
      title,
      quantity,
      totalValueTemp,
      totalValue,
      now,
      status: "Ընթացքում",
      user: {
        userId: req.user,
      },
    });

    // console.log('new post', post)

    await post.save();
    res.redirect("/successPaymentModal");
  });
});


//withoutbank Credit start




//through a bank
router.post("/withbank", function (req, res, next) {
  upload(req, res, async function (err) {
    const {
      title,
      quantity,
      totalValueTemp,
      totalValue,
      name,
      surname,
      email,
      phone,
      address,
    } = req.body;

    // var delivery_price = req.body.delivery_price;
    // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

    let img = req.files;
    let avatar = [];
    img.forEach((i) => {
      let imgName = i.filename;
      avatar.push(imgName);
    });

    let now = new Date();

    // const user = await req.user.populate("cart.items.saleId").execPopulate();
    // console.log('user here, user', user)

    const post = new WithBank({
      name,
      surname,
      email,
      phone,
      address,
      avatar,
      title,
      quantity,
      totalValueTemp,
      totalValue,
      now,
      status: "Ընթացքում",
      user: {
        userId: req.user,
      },
    });

    // console.log('new post', post)

    await post.save();
    res.redirect("/successPaymentModal");
  });
});


//withoutbank Credit end


//online payment ameria start
router.post("/withbank_ameria", auth, function (req, res, next) {
  upload(req, res, async function (err) {
    const {
      title,
      quantity,
      totalValueTemp,
      totalValue,
      name,
      surname,
      email,
      phone,
      address,
      ClientID,
      Username,
      Password,
      OrderID,
      amount,
    } = req.body;

    // let delivery_price = req.body.delivery_price;
    // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

    let now = new Date();

    const user = await req.user.populate("cart.items.saleId").execPopulate();
    console.log("user here, user", user);

    const post = new Ameria({
      name,
      surname,
      email,
      phone,
      address,
      title,
      quantity,
      totalValueTemp,
      totalValue,
      ClientID,
      Username,
      Password,
      OrderID,
      amount,
      now,
      status: "Ընթացքում",
      user: {
        userId: req.user,
      },
    });

    console.log("new post77777777777777777777777777777777", post);

    await post.save();

    res.redirect("/successPaymentModal");
  });
});

//online payment ameria payment start
router.post("/withbank_ameria_payment",async function (req, res, next) {
  upload(req, res, async function (err) {
    const {
      title,
      quantity,
      totalValueTemp,
      totalValue,
      address,
      name,
      surname,
      email,
      phone,
      amount,
    } = req.body;

 

    let now = new Date();
    let OrderID = 2602001 + Math.round(Math.random() * 1000)
    let ClientID = "8b8fa58a-d6f2-4eed-9bd9-e94da389a11a"
    let Password = "lazY2k"
    let Username = "3d19541048"
    const BackURL = 'http://localhost:3000/'

    // const user = await req.user.populate("cart.items.saleId").execPopulate();

    const post =  new Ameria({
        name,
        surname,
        email,
        phone,
        address,
        title,
        quantity,
        totalValueTemp,
        totalValue,
        amount,
        now,
        status: "Ընթացքում",
        OrderID: OrderID,
        ClientID: ClientID,
        Password: Password,
        Username: Username,
        user: {
          userId: req.user,
        },
      });


   await fetch("https://servicestest.ameriabank.am/VPOS/api/VPOS/InitPayment", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "ClientID":"8b8fa58a-d6f2-4eed-9bd9-e94da389a11a",
        "Username":"3d19541048",
        "Password":"lazY2k",
        "OrderID":OrderID,
        "Amount":10,
        "Description":"test",
        "BackURL":"http://localhost:3000/shoping-cart/payment_status"
      }),
    
    })
    .then((data) =>  data.json())
    .then(async (response) => {
    
      console.log(response,'888888888888888888888888888888888888888888888888888888888888888888888');
      let _id = response.PaymentID
      let status = response.status
      _id && await post.save();
      res.redirect(`https://servicestest.ameriabank.am/VPOS/Payments/Pay?id=${_id}&lang=AM`);
    }).catch(function(err) {
        alert(err,'error')
    })

  //  res.redirect("https://servicestest.ameriabank.am/VPOS/Payments/Pay?id=5&lang=AM");
  });
});

router.get('/payment_status',async function(req,res,next) {
    const {paymentID} = req.query;

    await fetch(
        "https://servicestest.ameriabank.am/VPOS/api/VPOS/GetPaymentDetails ",
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                PaymentID: paymentID,
                Username: "3d19541048",
                Password: "lazY2k",
            }),
        }
    )
        .then((response) => response.json())
        .then((data) => {
            // return res.json({status:data.ResponseCode});
            if (data.ResponseCode == "00") {
                return res.redirect('http://localhost:3000/approved-page');
            } else {
                return res.redirect('http://localhost:3000/approved-pageFail');
            }
        })
        .catch(function (response) {
            return res.redirect('http://localhost:3000/approved-pageFail');
        });
})



//online payment ameria payment end



//online payment Idram payment start

router.post("/withbank_idram_payment", async function (req, res, next) {
    upload(req, res, async function (err) {
      const {
        title,
        quantity,
        totalValueTemp,
        totalValue,
        name,
        surname,
        email,
        phone,
        address,
        amount,
      } = req.body;
  
      let now = new Date();
      let EDP_BILL_NO = 2602001 + Math.round(Math.random() * 10000)
      const EDP_REC_ACCOUNT = 110000721
      const SECRET_KEY = 'n5s2Ce93WsXEJfkpNNT4XdvQzxTNfmSbfcY6NB'
  
      // const user = await req.user.populate("cart.items.saleId").execPopulate();


      const post =  new Idram({
          name,
          surname,
          email,
          phone,
          address,
          title,
          quantity,
          totalValueTemp,
          totalValue,
          amount,
          now,
          status: "Ընթացքում",
          EDP_BILL_NO,
          user: {
            userId: req.user,
          },
        });


        await post.save();


    axios({
      method: 'post',
      url: 'https://banking.idram.am/Payment/GetPayment',
      data: qs.stringify({
        "SUCCESS_URL":"https://www.pakovikahuyqmariya.am/approved-page",
        "FAIL_URL":" https://www.pakovikahuyqmariya.am/approved-pageFail",
        "RESULT_URL":"https://www.pakovikahuyqmariya.am/paymentsResult",
        "SECRET_KEY":"n5s2Ce93WsXEJfkpNNT4XdvQzxTNfmSbfcY6NB",
        "EMAIL":"stepankhachikyan@mail.ru"
      }),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response =>{
       console.log(response.data)
  
       res.redirect('/onlinePayment')
      })  
      res.redirect('/onlinePayment')
    });
  });


  router.get('shoping-cart/paymentsResult',function(req,res,next) {


    // let EDP_PRECHECK = 'NO'
    // EDP_BILL_NO
    // EDP_REC_ACCOUNT
    // EDP_AMOUNT
    // let arr = [50000,50000,6650000]

    // let summa = arr.reduce(function(acc,value) {
    //       return acc + value
    //   },0)


alert(summa)
  })

//online payment Idram payment end
// router.get('/paymentsResult', async (req, res) => {
//     try {
//         const data = await Idram.findOne({where: {BILL_NO:req.body.EDP_BILL_NO}})
//         if (!data) {
//             res.send({message:'error'})
//             return 
//         }
//         res.send('OK')
//     } catch(err) {
//         console.log(err)
//         res.send({message:"error"})
//     }
// })

router.post("/withoutbank/status", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Withoutbank.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-orders");
});

router.post("/withbank/status", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Withbank.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-orders");
});

router.post("/withbank_idram/status", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Idram.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-orders");
});

router.post("/withbank_ameria/status", async (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  await Ameria.findByIdAndUpdate(id, req.body);
  res.redirect("/admin-orders");
});

module.exports = router;
