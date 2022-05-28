const { Schema, model } = require('mongoose')

const DeliveryCitySchema = new Schema({
    name: String,
    distance: String,
    price: String
})

module.exports = model('Delivery_City', DeliveryCitySchema)