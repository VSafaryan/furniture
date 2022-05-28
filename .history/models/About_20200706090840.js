const { Schema, model } = require('mongoose');

const AboutSchema = new Schema({
    title: String,
    info: String,
    avatar: String
})

module.exports = model('About', AboutSchema)