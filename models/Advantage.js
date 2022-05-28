const { Schema, model } = require('mongoose');

const AdvantageSchema = new Schema({
    titleHy: String,
    descriptionHy: String,
    titleRu: String,
    descriptionRu: String,
    titleEn: String,
    descriptionEn: String,
    avatar: String
})

module.exports = model("Advantage", AdvantageSchema)