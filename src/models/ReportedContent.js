// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    description: String,
    properties: Object
})

exports.schema = schema
exports.model = mongoose.model("ReportedContent", schema)