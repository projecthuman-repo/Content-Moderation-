// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    applicationName: String
})

exports.schema = schema
exports.model = mongoose.model("RequestDetails", schema)