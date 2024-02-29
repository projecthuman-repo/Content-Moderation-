const express = require('express');
const mongoose = require("mongoose");
const textRouter = require('./routes/text');
const reportRouter = require('./routes/report');
const dotenv = require('dotenv');
dotenv.config();

// Make sure to put this .env outside src
const uri = process.env.ATLAS_URI || "empty";

mongoose
.connect(uri, { dbName: "contentModeration" })
.then(() => {
    const app = express()
    app.use(express.json()) // new
    app.use("/text", textRouter)
    app.use("/report", reportRouter)
		

        app.listen(process.env.PORT || 8080, () => {
            console.log("Connected to mongodb")
        });
		
	})
