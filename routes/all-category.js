const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Sale = require('../models/Sale');
const Logo = require('../models/Logo')
const Color = require('../models/Color')


router.get('/:page', async (req, res) => {

    const contact = await Contact.find()
    const category = await Category.find()
    const url = req.originalUrl;

    let countSale = await (await Sale.find()).length;

    const logo = await Logo.find();
    const color = await Color.find();

    var perPage = 9
    var page = req.params.page || 1


    let min_price = req.query.min_price;
    let max_price = req.query.max_price;

    let $sale = await Sale.find()

    var array_price = []
    $sale.forEach(i => {
        let price = i.price
        array_price.push(price)
    })
    var sale_max_price = Math.max.apply(null, array_price)
    var sale_min_price = Math.min.apply(null, array_price);


    sales_filter = []

    const sales = await Sale.find();
    sales.forEach(i => {
        if (i.price >= min_price && i.price <= max_price) {
            sales_filter.push(i)
        }
    })
    // console.log(sales_filter)

    Sale.find({}).skip((perPage * page) - perPage).sort({date: -1}).limit(perPage).exec(function (err, sale) {
        Sale.countDocuments().exec(function (err, count) {
            if (err) return next(err)
            res.render('all-category', {
                sale: sale,
                current: page,
                pages: Math.ceil(count / perPage ),
                title: 'Բոլոր կատեգորիաները',
                contact,
                category,
                url,
                countSale,
                logo,
                color,
                sales_filter,
                sale_max_price,
                sale_min_price
            })
        })
    })
})


router.post('/delate', async function(req,res){
    const {id} = req.body

    if(!id){
        return res.json({message:"bad request!"})
    }

    const thisCategorien = await Category.destroy({where:{id}})

    const category = await Category.find()
    return res.json(category)
})


module.exports = router;