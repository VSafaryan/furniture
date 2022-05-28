
const { Router } = require('express')
const router = Router();
const Contact = require('../models/Contact');
const About = require('../models/About');
const Category = require('../models/Category')
const Logo = require('../models/Logo')
// const storage = require('sessionstorage-for-node');



router.get('/', async (req, res) => {
    const contact = await Contact.find()
    const about = await About.find()
    const category = await Category.find();
    const logo = await Logo.find();

    res.render('paymentsResult', {
        title: 'payments Result',
        contact,
        about,
        category,
        logo
    })


    // let arr = []
    // let price = []
    // let a = localStorage.getItem("jStorage")

    // let b = JSON.parse(a)
    // let c = b

    // let e = Object.entries(c)

    // arr.push(e[1][1])

    // for (var key of Object.keys(e[1][1])) {
    //     arr.push(e[1][1][key])
    // }

    // console.log(arr)
    // arr.forEach((product) => {
    //     price.push(product.price)
    // })

    // let filtered = price.filter(function(x) {
    //     return x !== undefined;
    // });

    // console.log(filtered);

    // let totalPrice = filtered.reduce(function (acc,value) {
    //     return acc + +(value)
    // },0)

    // console.log(totalPrice)

    // if(totalPrice == EDP_AMOUNT) {
    //     res.send("ok")
    // } else  {
    //     res.send("error")
    // }


    // router.get('/', async (req, res) => {
    //     try {
    //         res.send('OK')
    //     } catch(err) {
    //         console.log(err)
    //         res.send({message:"error"})
    //     }
    // })

})

router.post('/',async(req,res) => {
    try {
        res.send('OK')
    }
    catch(err) {
        console.log('payment error', e)
        res.send({message:"error"})
    }
})

// const resultPaymentIdram = async (req,res) => {
//     try {
//         const data = await Order.findOne({where: {PaymentID: req.body.EDP_BILL_NO}})
//         if (!data) {
//             res.send({message:'error'})
//             return
//         }
//         await Order.update({status:'true'}, {where:{PaymentID: req.body.EDP_BILL_NO}})
//         res.send('OK')
//     } catch(err) {
//       console.log('payment error', e)
//         res.send({message:"error"})
//     }
  
// }


// idram payment result

// router.get('/',function(req,res) {

//     try {
//         const data = storage.getItem('checknum')

//         if (data !== req.body.EDP_BILL_NO) {
//             res.send({message:'error'})
//             return 
//         }
//         res.send('OK')
//     } catch(err) {
//         console.log(err)
//         res.send({message:"error"})
//     }

// } )



module.exports = router;