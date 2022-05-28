const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { registerValidators } = require('../utils/validators');
const Logo = require('../models/Logo')



router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();
    const logo = await Logo.find();

    if (req.session.isAuthenticated) {
        res.redirect('/')
    } else {
        res.render('register', {
            title: 'Գրանցվել',
            contact,
            category,
            regError: req.flash('regError'),
            passwordError: req.flash('passwordError'),
            logo
        })
    }

})

router.post('/', registerValidators, async (req, res) => {
    try {
        const { email, password, name, phone, surname } = req.body;

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('regError', errors.array()[0].msg)
            return res.status(422).redirect('/register')
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            email,
            password: hashPassword,
            name,
            surname,
            phone,
            role: 'User'
        })
        await user.save()
        res.redirect('/login')
    } catch (e) {
        console.log(e)
    }
})


router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})

module.exports = router;