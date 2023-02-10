// upload.js - uploading files route module.

const express = require("express");
const fileUpload = require("express-fileupload")
const router = express.Router();

router.use(fileUpload())

// Upload image route
router.post("/image", function (req, res) {
    
    // Assume that this request only handles one image for now and that
    // image has the key "file"
    const image = req.files.file

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
    
    if (errorMsg) { res.status(422).send(errorMsg) }
    else {
        res.send("success")
    }

});

// Upload video route
router.post("/video", function (req, res) {
       
    // Assume that this request only handles one image for now and that
    // video has the key "file"
    const video = req.files.file
    console.log(video)

    const mimetype = image.mimetype
    const size = image.size / 1e6

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
    
    if (errorMsg) { res.status(422).send(errorMsg) }
    else {
        res.send("success")
    }

});

module.exports = router;