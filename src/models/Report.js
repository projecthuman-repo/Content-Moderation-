// Model for request details
const mongoose = require("mongoose");

const RequestDetails = require("./RequestDetails").schema;
const Reporters = require("./Reporters").schema;
const ReportedContent = require("./ReportedContent").schema;
const ReportedUser = require("./ReportedUser").schema;

const schema = mongoose.Schema({
    documentID: String,
    requestDetails: RequestDetails,
    reporters: Reporters,
    reportedContent: ReportedContent,
    reportedUser: ReportedUser,
    reason: String,
    moderationOutcome: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        default: 'pending',
    }
});

exports.schema = schema;
module.exports = mongoose.model("Report", schema);