// upload.js - uploading files route module.
const express = require("express");
const fileUpload = require("express-fileupload")
const router = express.Router();
var profanity = require('profanity-util');

router.use(fileUpload())

router.post("/report", function (req, res) {
    const text = req.body.text
    
    // Uses profanity-util to detect profane language. check() method returns all the profane languages detected
    const results = profanity.check(text)
    
    // If the results length was not empty it will return the list
    if (results.length) {        
        res.send({results: profanity.check(results)})
    } else {

        // if it passed, return "pass" as string
        res.send("pass")
    }
})

module.exports = router;
