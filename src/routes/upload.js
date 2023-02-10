// upload.js - uploading files route module.

const express = require("express");
const fileUpload = require("express-fileupload")
const router = express.Router();

router.use(fileUpload())

/**
 * Image Upload Endpoint
 * 
 * This endpoint handles the upload of images to the server. It expects a 
 * `multipart/form-data` request with a single image file, which should have 
 * the key "file".
 * 
 * The endpoint returns one of the following responses:
 * - 200 OK with the message "success" if the file was successfully received.
 * - 415 Unsupported Media Type with an error message if the image file is 
 * not a valid type or exceeds the maximum size limit.
 * 
 * @route POST /image
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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
    
    // Error 415 Unsupported Media Type
    if (errorMsg) { res.status(415).send(errorMsg) }
    else {
        // TODO: send the file to the nightly worker
        res.send("success")
    }

});

/**
 * Route for handling video uploads
 * 
 * This route is designed to handle the uploading of video files. It expects a 
 * `multipart/form-data` request with a single video file, which should have 
 * the key "file".
 * 
 * The endpoint performs two validity checks on the uploaded video file:
 * 1. Validates the video file's mimetype against a list of accepted types, 
 * which in this case is just "video/mp4".
 * 2. Validates the video file's size against the maximum allowed size, which 
 * is set to 100 MB in this case.
 * 
 * The endpoint returns one of the following responses:
 * - 200 OK with the message "success" if the file was successfully received.
 * - 415 Unsupported Media Type with an error message if the video file is 
 * not a valid type or exceeds the maximum size limit.
 * 
 * @route POST /video
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
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
    
    if (errorMsg) { res.status(415).send(errorMsg) }
    else {
        res.send("success")
    }

});

module.exports = router;