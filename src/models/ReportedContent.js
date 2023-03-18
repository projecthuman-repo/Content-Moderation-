// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    description: String,
    properties: {
        type: String,
        id: String,
        collectionName: String,
        contentURL: String
    }
})

exports.schema = schema
exports.model = mongoose.model("ReportedContent", schema)