const express = require('express');
const mongoose = require("mongoose");
const uploadRouter = require('./routes/upload');
const reportRouter = require('./routes/report');
const dotenv = require('dotenv');
dotenv.config();

// Make s
const uri = process.env.ATLAS_URI || "empty";

mongoose
.connect(uri, { dbName: "contentmoderation" })
.then(() => {
    const app = express()
    app.use(express.json()) // new
    app.use("/upload", uploadRouter)
    app.use("/report", reportRouter)
		

        app.listen(process.env.PORT || 8080, () => {
            console.log("Connected to mongodb")
        });
		
	})
