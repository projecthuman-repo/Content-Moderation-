const mongoose = require("mongoose")
const Reporter = require("./Reporter").schema;
// if we want to use the reporter schema

const schema = mongoose.Schema({
    reporters: [
          Reporter
      ],    
})

// const schema = mongoose.Schema({
//     reporters: [
//           Reporter
//       ],    
// }, {_id:false})

exports.schema = schema
exports.model = mongoose.model("Reporters", schema)