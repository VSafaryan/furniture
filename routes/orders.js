const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const Cash = require('../models/Order/Cash');
const WithBank = require('../models/Order/Withbank')
const WithoutBank = require('../models/Order/WithoutBank')
const WithoutBankCredit = require('../models/Order/WithoutBankCredit')
const Logo = require('../models/Logo')
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();
    // const cash = await Cash.find()
    // const withBank = await WithBank.find();
    // const withoutBank = await WithoutBank.find()
    const logo = await Logo.find();


    // console.log(cash)

    const user = await req.user
        .populate('cart.items.saleId')
        .execPopulate()
    console.log(user)

    let timeId = user._id

    const cash = await Cash.find({ 'user.userId': req.user._id })
        .populate('user.userId')

    const withBank = await WithBank.find({ 'user.userId': req.user._id })
        .populate('user.userId');

    const test = await WithBank.find()
    console.log('test', test)

    const withoutBank = await WithoutBank.find({ 'user.userId': req.user._id })
        .populate('user.userId')
        
    const withoutbankCredit = await WithoutBankCredit.find({ 'user.userId': req.user._id })
    .populate('user.userId')

  //  console.log(withoutbankCredit,'withoutbankCredit');

        // const paymentIdram = await WithoutBank.find({ 'user.userId': req.user._id })
        
        // .populate('user.userId')

        // console.log(cash,'cash');
        // console.log(withBank,'withBank');
        // console.log(withoutBank,'withoutBank');

    res.render('orders', {
        title: 'Գնումների պատմություն',
        contact,
        category,
        cash,
        withBank,
        withoutBank,
        withoutbankCredit,
        // paymentIdram,
        logo,
        timeId,
        userId: req.user ? req.user._id.toString() : null
    })
})

module.exports = router;