const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const About = require('../models/About');
const Category = require('../models/Category')
const Logo = require('../models/Logo')


var Publishable_Key = '###publishablekey###'
var Secret_Key = '###secretkey#####'


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const about = await About.find()
    const category = await Category.find();
    const logo = await Logo.find();

    res.render('paymentIdram', {
        key:"test12345678910",

    })
})

module.exports = router;