const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    name: String,
    description: String
})

// export the schema itself to be used in the reporter list
exports.schema = schema;

// export the model as well
exports.model = mongoose.model("Reporter", schema);