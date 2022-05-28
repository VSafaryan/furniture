const { Schema, model } = require('mongoose');

const WithoutBankCreditSchema = new Schema({
    // passport_photo_front_side: String,
    // passport_photo_back_side: String,
    // property_certificates: String,
    avatar: Array,

    title: Array,
    quantity: Array,
    totalValueTemp: Array,
    totalValue: Number,
    phone:String,
    now: String,
    // delivery_price: Number,

    user: {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    status: String,
})

module.exports = model('Without Bank credit', WithoutBankCreditSchema)
