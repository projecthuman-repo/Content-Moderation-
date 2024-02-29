// Router for report model
const express = require("express");
const router = express.Router();
const http = require('http')

const Report = require('../models/Report');
const RequestDetails = require("../models/RequestDetails").model;
const Reporters = require("../models/Reporters").model;
const Reporter = require("../models/Reporter").model;
const ReportedContent = require("../models/ReportedContent").model;
const ReportedUser = require("../models/ReportedUser").model;

const { v4: uuidv4 } = require('uuid');

/* This endpoint allows the client to upload a new report to the server using an HTTP POST request. 
The endpoint receives a JSON object with various properties such as requestDetails, reporters, etc..
It generates a new documentID using uuidv4 and creates new objects for each of the above-mentioned properties. 
The report is then saved to a database, and a payload containing the documentID and some placeholders is created. 
This payload is then sent to a worker API using the SendRequest method. 
Finally, a success message is sent back to the client. */
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
        documentID: documentID,
        contentUrl: "s3.aws.com/us-east/<Content-URL>",
        contentDetails: {
          contentType: "placeholder",
          contentLength: "placeholder",
          timestamp: new Date().valueOf()
        }
      }

    // urlparams for worker api
    var urlparams = {
        host: '127.0.0.1',
        port: 8000,
        path: '/moderate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Convert payload to json and send to worker using SendRequest method
    const payloadJSON = JSON.stringify(payload);
    
    console.log(payloadJSON) // For debugging purposes
    
    SendRequest(payloadJSON, urlparams);

    res.send("success")
})

/**
 * Send a request to a URL with specified data.
 *
 * @param {string} datatosend - The data to send in the request body.
 * @param {Object} urlparams - The URL parameters to include in the request.
 */
function SendRequest(datatosend, urlparams) {

    //Create a request object.
    var request = http.request(urlparams);

    //Send off the request.
    request.write(datatosend); 

    //End the request.
    request.end(); 
}

// Called by the Worker API to send outcome of report
// Used by Worker API
router.post("/result", async (req, res) => {
    const { documentId, outcome } = req.body;

    try {
        const report = await Report.findOne({ documentID: documentId });
        if (!report) {
            return res.status(404).send({ message: "Report not found." });
        }
        report.moderationOutcome = outcome;
        report.status = 'reviewed';

        await report.save();

        // Here, add additional logic such as notifying users or taking action based on the outcome

        res.send({ message: "Report updated successfully with moderation result." });
    } catch (error) {
        console.error("Failed to update report with moderation result:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

// Grabs the list of all the reports
router.get("/reports", async(req, res) => {
    const reportedContent = await RequestDetails.find()
    res.send(reportedContent)
})


module.exports = router;
