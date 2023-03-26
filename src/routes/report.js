// Router for report model
const express = require("express");
const router = express.Router();

const Report = require("../models/Report").model;
const RequestDetails = require("../models/RequestDetails").model;
const Reporters = require("../models/Reporters").model;
const Reporter = require("../models/Reporter").model;
const ReportedContent = require("../models/ReportedContent").model;
const ReportedUser = require("../models/ReportedUser").model;

const { v4: uuidv4 } = require('uuid');

// Uploads a new report.
// To be used by Client-Facing API
router.post("/upload", async(req, res) => {
    const documentID = uuidv4()
    
    const requestDetails = new RequestDetails({
        id: req.body.requestDetails.id,
        applicationName: req.body.requestDetails.application
    })

    const reporters = new Reporters({
        reporters: req.body.reporters.map((obj) => new Reporter({
            id: obj.id,
            name: obj.name,
            description: obj.description
        }))
    })

    const reportedContent = new ReportedContent({
        description: req.body.reportedContent.description,
        properties: {
            type: req.body.reportedContent.properties.type,
            id: req.body.reportedContent.properties.id,
            collectionName: req.body.reportedContent.properties.collectionName,
            contentURL: req.body.reportedContent.properties.contentURL
        }
    })

    const reportedUser = new ReportedUser({
        id: req.body.reportedUser.id,
        name: req.body.reportedUser.name,
        description: req.body.reportedUser.description
    })

    const report = new Report ({
        documentID: documentID,
        requestDetails: requestDetails,
        reporters: reporters,
        reportedContent: reportedContent,
        reportedUser: reportedUser,
        reason: req.body.reason
    })

    // Save to db
    await report.save()

    // Following payload currently has placeholders right now
    const payload = {
        documentId: documentID,
        contentUrl: "s3.aws.com/us-east/<Content-URL>",
        contentDetails: {
          contentType: "placeholder",
          contentLength: "placeholder",
          timestamp: new Date().valueOf()
        }
      }

    res.send(payload)
})

// Called by the Worker API to send outcome of report
// Used by Worker API
router.post("/result", async(req, res) => {
    const documentId = req.body.documentId
    const outcome = req.body.outcome

    res.send({
        documentId: documentId,
        outcome: outcome
    })
})

// Grabs the list of all the reports
router.get("/reports", async(req, res) => {
    const reportedContent = await RequestDetails.find()
    res.send(reportedContent)
})


module.exports = router;