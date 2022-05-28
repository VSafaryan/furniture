const {Router} = require('express')
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const Logo = require('../models/Logo')

router.get('/', async (req,res)=> {
    const contact = await Contact.find()
    const category = await Category.find();
    const logo = await Logo.find();

    res.render('favorite', {
        title: 'Իմ նախընտրածները',
        contact,
        category,
        logo
    })
})

module.exports = router;