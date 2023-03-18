// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    type: String,
    id: String,
    collectionName: String,
    contentURL: String
})

module.exports = mongoose.model("ReportedContent", schema)