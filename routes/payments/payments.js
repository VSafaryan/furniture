const { Router } = require('express');
const router = Router();
// const Cash = require('../../models/Order/Cash')
// const WithoutBank = require('../../models/Order/WithoutBank');
const WithBank = require('../../models/Order/Withbank');
const ContactUs = require('../../models/ContactUs')
const auth = require('../../middleware/auth');
const config = require('./config')

router.get('/', auth, async (req, res) => {

    // const cash = await (await Cash.find()).reverse();
    // const withoutBank = await (await WithoutBank.find()).reverse();
    const withBank = await (await WithBank.find()).reverse();
    const contactMessage = await (await ContactUs.find()).reverse()
        res.render('payments', {
            title: 'payments page',
            // cash,
            // withoutBank,
            // withBank,
            // contactMessage
        })
    
})

module.exports = router;
