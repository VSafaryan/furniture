const { Schema, model } = require('mongoose');

const SliderSchema = new Schema({
    avatar: String,
})

module.exports = model('Slider image', SliderSchema)