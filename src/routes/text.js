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

router.post("/image", function (req, res) {
    
    // Assume that this request only handles one image for now and that
    // image has the key "file"
    
    // TODO: PARSE THE BODY TO GRAB THE REFERENCE OF THE IMAGE
    const body = req.body

    // TODO: QUERY MONGODB DATABASE BASED ON REFERENCE
    const image = None
    const mimetype = image.mimetype
    const size = image.size / 1e6

    // TODO: these checks are placeholders for now.
    // talk to frontend team regarding the standard for file uploads
    const validTypes = ["image/png", "image/jpeg", "image/jpg"]
    const maxImageSize = 20 // in MB
    
    let errorMsg = null
    
    // Validity checks
    if (!(validTypes.includes(mimetype))) {
        errorMsg = "invalid mimetype"
    }
    if (size > maxImageSize) {
        errorMsg = "maximum image size reached"
    }
    
    // Error 415 Unsupported Media Type
    if (errorMsg) { res.status(415).send(errorMsg) }
    else {
        // TODO: send the file to the nightly worker
        res.send("success")
    }

});


router.get("/test", async (req, res) => {
    // let collection = await db.collection("test");
    // let results = await collection.find({})

    console.log(db)
})

router.post("/video", function (req, res) {
       
    // Assume that this request only handles one image for now and that
    // video has the key "file"
    // TODO: PARSE THE BODY TO GRAB THE REFERENCE OF THE VIDEO
    const body = req.body

    video = None
    console.log(video)

    // TODO: QUERY MONGODB DATABASE BASED ON REFERENCE OF VIDEO
    const mimetype = video.mimetype
    const size = video.size / 1e6

    const validTypes = ["video/mp4"]
    const maxVideoSize = 100 // in MB
    
    let errorMsg = null
    
    // Validity checks
    if (!(validTypes.includes(mimetype))) {
        errorMsg = "invalid mimetype"
    }
    if (size > maxVideoSize) {
        errorMsg = "maximum video size reached"
    }
    
    if (errorMsg) { res.status(415).send(errorMsg) }
    else {
        res.send("success")
    }

});

module.exports = router;