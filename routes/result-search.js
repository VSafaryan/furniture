const { Router } = require('express');
const router = Router();
const Contact = require('../models/Contact');
const Category = require('../models/Category');
const Sale = require('../models/Sale');
const Logo = require('../models/Logo')
const Color = require('../models/Color')



router.get('/:categoryEn/:page', async (req, res) => {
    var perPage = 15
    var page = req.params.page || 1

    // let countSaleCategory = await (await Sale.find({categoryEn: req.params.categoryEn})).length;

    // let countSale = await (await Sale.find({categoryEn: req.params.categoryEn})).length;

    // const sale_by_category = await Sale.find({ categoryEn: req.params.categoryEn });z
    const contact = await Contact.find()
    const category = await Category.find()
    const logo = await Logo.find();
    const color = await Color.find()

    let category_name = req.params.categoryEn

    let min_price = req.query.min_price;
    let max_price = req.query.max_price;


    var array_price = []
    sales_filter = []

    const sales = await Sale.find({categoryEn: req.params.categoryEn});
    sales.forEach(i => {
        if (i.price >= min_price && i.price <= max_price) {
            sales_filter.push(i)
        }
        array_price.push(i.price)
    })

    var sale_max_price = Math.max.apply(null, array_price)
    var sale_min_price = Math.min.apply(null, array_price);


    Sale
        .find({categoryEn: req.params.categoryEn})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .sort({date: -1})
        .exec(function (err, sale_by_category) {
            Sale.countDocuments().exec(function (err, count) {
                // let currentpages = '/result-search/'+page
                if (err) return next(err)
                res.render('result-search', {
                    sale_by_category: sale_by_category,
                    current: page,
                    pages: Math.ceil(sales.length / perPage),
                    title: "Կատեգորիա  " + category_name,
                    contact,
                    category,
                    page,
                    category_name,
                    countSale: sales.length,
                    logo,
                    color,
                    sales_filter,
                    sale_max_price,
                    sale_min_price
                    // countSaleCategory
                    // currentpage
                })
            })
        })

})

module.exports = router;