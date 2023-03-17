// Model for request details
const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    applicationName: String
})

module.exports = mongoose.model("RequestDetails", schema)