const { Router } = require('express');
const router = Router();
// const Cash = require('../../models/Order/Cash')
// const WithoutBank = require('../../models/Order/WithoutBank');
const WithBank = require('../../models/Order/Withbank');
const ContactUs = require('../../models/ContactUs')
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {

    // const cash = await (await Cash.find()).reverse();
    // const withoutBank = await (await WithoutBank.find()).reverse();
    const withBank = await (await WithBank.find()).reverse();
    const contactMessage = await (await ContactUs.find()).reverse()

    if (req.session.user.role == 'User') {
        res.redirect('/')
    } else {
        res.render('admin/message', {
            title: 'Message',
            // cash,
            // withoutBank,
            withBank,
            contactMessage
        })
    }
})

module.exports = router;
