const { Schema, model } = require('mongoose');

const ColorSchema = new Schema({
    color: String
})

module.exports = model('Color', ColorSchema)