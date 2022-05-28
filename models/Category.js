const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    categoryHy: String,
    categoryRu: String,
    categoryEn: String,
})

module.exports = model('Category', CategorySchema);