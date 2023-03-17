// Router for report model
const express = require("express");
const router = express.Router();
const RequestDetails = require("../models/RequestDetails");
const { v4: uuidv4 } = require('uuid');

// Grabs the list of all the reports
router.get("/reports", async(req, res) => {
    const reportedContent = await RequestDetails.find()
    res.send(reportedContent)
})

// Uploads a new requestdetails document
router.post("/upload", async(req, res) => {
    const newReport = new RequestDetails({
        id: uuidv4(),
        applicationName: req.body.applicationName
    })

    await newReport.save()
    res.send(newReport)
})

module.exports = router;