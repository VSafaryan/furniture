const { model, Schema } = require('mongoose');

const ServiceSchema = new Schema({
    titleHy: String,
    titleRu: String,
    titleEn: String,
    avatar: String
})

module.exports = model('Service', ServiceSchema)
