const { Router } = require('express')
const router = Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const auth = require('../../middleware/auth');


router.get('/', auth, async (req, res) => {

    const user = await (await User.find()).reverse()

    if (req.session.user.role == 'User') {
        res.redirect('/')
    } else {
        res.render('admin/users', {
            title: 'Users',
            user
        })
    }

})


router.post('/add', async (req, res) => {
    const { name, surname, email, password, phone, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        surname,
        email,
        role,
        phone,
        password: hashPassword
    })
    user.save()
    res.redirect('/admin-users')
})

router.post('/delete', async (req, res) => {
    await User.deleteOne({ _id: req.body.id })
    res.redirect('/admin-users')
})


module.exports = router;