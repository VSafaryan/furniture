const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Logo = require('../models/Logo');
const Category = require('../models/Category')
const Condition = require("../models/Condition");


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const logo = await Logo.find();
    const category = await Category.find();
    const condition = await Condition.find();

    res.render('condition', {
        title: "Պայմաններ",
        contact,
        logo,
        category,
        condition
    })
})

module.exports = router;