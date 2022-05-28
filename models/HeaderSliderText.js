const { Schema, model } = require('mongoose');

const HeaderSliderTextSchema = new Schema({
    title: String,
    description: String
})

module.exports = model('Header Slider Text', HeaderSliderTextSchema);