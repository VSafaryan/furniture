const { Schema, model } = require('mongoose');

const ContactUsSchema = new Schema({
    name: String,
    email: String,
    phone:String,
    theme: String,
    messageContact: String,
})

module.exports = model("ContactUs", ContactUsSchema)