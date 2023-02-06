const express = require('express');
const app = express();


app.get('/', function (req, res) {
    return res.send('PHC Content Moderation');
   });
   
   app.listen(process.env.PORT || 8080);