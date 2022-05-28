const { Schema, model } = require('mongoose');

const SaleSchema = new Schema({
    titleEn: String,
    titleHy: String,
    titleRu: String,

    readyHy:String,
    readyRu:String,
    readyEn:String,

    infoHy: String,
    infoEn: String,
    infoRu: String,

    categoryEn: String,
    categoryHy: String,
    categoryRu: String,

    more_infoHy: String,
    more_infoEn: String,
    more_infoRu: String,

    sizeEn: String,
    sizeHy: String,
    sizeRu: String,

    weightHy: String,
    weightEn: String,
    weightRu: String,

    materialEn: String,
    materialRu: String,
    materialHy: String,

    color: Array,

    discountEn: String,
    discountHy: String,
    discountRu: String,


    price: Number,
    salePrice:Number,
    code: String,
    hit: Number,
    news: Number,
    available:Number,
    avatar: Array,
    date: Date,

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Sale', SaleSchema);