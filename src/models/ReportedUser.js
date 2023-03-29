// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    name: String,
    description: String
})

exports.schema = schema
exports.model = mongoose.model("ReportedUser", schema)