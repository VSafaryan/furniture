const { Router } = require('express')
const router = Router();


const ContactUs = require('../models/ContactUs')

router.post('/', async function(req,res){
    const {name,email,phone,theme ,messageContact} = req.body

    const newConatct = await ContactUs.create({name,email,phone,theme ,messageContact})
    // res.redirect('/contact');
    return res.json(newConatct)
})


router.get('/', async function(req,res){
    const allContacts = await ContactUs.findAll()

    return res.json(allContacts)
})

module.exports = router;