const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category')
const Logo = require('../models/Logo')
const User = require('../models/User')
const bcrypt = require("bcryptjs")


router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const category = await Category.find();
    const logo = await Logo.find();
    const oneUser = req.user.toObject();
    const user = await User.find()

    res.render('change-password', {
        title: 'Փոխել գաղտնաբառը',
        contact,
        category,
        logo,
        user,
        oneUser
    })
})



// (await bcrypt.compare(password, user.password))


router.post('/change-password',async function(req,res,next) {
    const {_id,password,confirmPassword} = req.body

    if(!(_id  && password && confirmPassword)){
        return res.json({err:"somethig is wrong!"})
    }
    const thisUser = await User.findOne({_id})
    if(password !== confirmPassword){
        return res.json({err:"password in not much!"})
    }
    if(!thisUser){
        return res.json({err:"user not found!"})
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        console.log(hashPassword,"hashpassword")
        thisUser.password = hashPassword
     thisUser.save()
         return res.redirect('/login')
        // return res.json({message:"poxvac e!"});
      } catch (error) {
        res.redirect('/login')
        return res.json(0);
      }

})



module.exports = router;