
const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const About = require('../models/About');
const Category = require('../models/Category')
const Logo = require('../models/Logo')


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const about = await About.find()
    const category = await Category.find();
    const logo = await Logo.find();

    res.render('successPaymentModal', {
        title: 'success',
        contact,
        about,
        category,
        logo
    })
})

module.exports = router;