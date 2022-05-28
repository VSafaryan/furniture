const { Schema, model } = require('mongoose');

const ConditionPaySchema = new Schema({
    conditionPayHy: String,
    conditionPayRu: String,
    conditionPayEn: String
})

module.exports = model('ConditionPay', ConditionPaySchema)