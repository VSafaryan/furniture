const { Schema, model } = require('mongoose');

const ConditionSchema = new Schema({
    conditionHy: String,
    conditionRu: String,
    conditionEn: String
})

module.exports = model('Condition', ConditionSchema)