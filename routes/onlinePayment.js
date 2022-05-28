const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const About = require('../models/About');
const Category = require('../models/Category')
const Logo = require('../models/Logo')
const Checkout = require('../models/Checkout');
const Cash = require('../models/Order/Cash');
const Withoutbank = require('../models/Order/WithoutBank');
const WithBank = require('../models/Order/Withbank')
const multer = require('multer');
const auth = require('../middleware/auth');
const idram = require('../models/Order/paymentAmeria')
const DeliveryCity = require('../models/Delivery_city');


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const about = await About.find()
    const category = await Category.find();
    const logo = await Logo.find();

   

    res.render('onlinePayment', {
        title: 'payment page',
        contact,
        about,
        category,
        logo,
    })
})


//through a bank
router.post('/withbank', auth, function (req, res, next) {
    upload(req, res, async function (err) {

        const { title, quantity, totalValueTemp, totalValue, name, surname, email, phone, address, } = req.body;

        // var delivery_price = req.body.delivery_price;
        // delivery_price = parseInt(delivery_price) + parseInt(totalValue)

        let img = req.files;
        let avatar = []
        img.forEach(i => {
            let imgName = i.filename;
            avatar.push(imgName)
        })

        let now = new Date()

        const user = await req.user
        .populate('cart.items.saleId')
        .execPopulate()
        console.log('user here, user', user)

        const post = new WithBank({
            name, surname, email, phone, address, avatar, title, quantity, totalValueTemp, totalValue,  now, status: "Ընթացքում",
            user: {
                userId: req.user
            },
        })

        console.log('new post', post)

        await post.save();
        res.redirect('/orders')
    });
})


router.post("/withbank/status", async (req, res) => {
    const { id } = req.body;
    delete req.body.id
    await Withbank.findByIdAndUpdate(id, req.body)
    res.redirect('/admin-orders')
})


module.exports = router;