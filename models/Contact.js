const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
    phone: String,
    email: String,
    workingHourse: String,
    instagram: String,
    facebook: String
})

module.exports = model('Contact', ContactSchema)