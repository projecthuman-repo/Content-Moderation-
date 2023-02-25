const express = require('express');
const app = express();

const uploadRouter = require('./routes/upload')
app.use("/upload", uploadRouter)

   
app.listen(process.env.PORT || 8080);