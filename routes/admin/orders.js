const { Router } = require('express');
const router = Router();
const Cash = require('../../models/Order/Cash')
const WithoutBank = require('../../models/Order/WithoutBank');
const WithoutBankCredit = require('../../models/Order/WithoutBankCredit');
const WithBank = require('../../models/Order/Withbank');
const PaymentAmeria = require('../../models/Order/paymentAmeria');
const PaymentIdram = require('../../models/Order/paymentIdram');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {

    const cash = await (await Cash.find()).reverse();
    const withoutBank = await (await WithoutBank.find()).reverse();
    const withoutBankCredit = await (await WithoutBankCredit.find()).reverse();
    const withBank = await (await WithBank.find()).reverse();
    const paymentAmeria = await (await PaymentAmeria.find()).reverse();
    const paymentIdram = await (await PaymentIdram.find()).reverse();

    if (req.session.user.role == 'User') {
        res.redirect('/')
    } else {
        res.render('admin/orders', {
            title: 'Orders',
            cash,
            withoutBank,
            withoutBankCredit,
            withBank,
            paymentAmeria,
            paymentIdram
        })
    }
})


router.post('/deleteCash',async (req,res) => {
    await WithBank.deleteOne({ _id: req.body.id })
    res.redirect('/admin-orders')
})

router.post('/deleteAmeria',async (req,res) => {
    await PaymentAmeria.deleteOne({ _id: req.body.id })
    res.redirect('/admin-orders')
})


router.post('/deleteIdram',async (req,res) => {
    await PaymentIdram.deleteOne({ _id: req.body.id })
    res.redirect('/admin-orders')
})
module.exports = router;
