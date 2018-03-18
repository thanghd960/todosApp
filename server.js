const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();
// Create port
const port = 8000;
const db = require('./config/db');
app.use(bodyParser.urlencoded({ extended: true }))





MongoClient.connect(db.url,(err, database) => {
    if (err){
        return console.log(err);
    } 
    else{
        require('./app/routes')(app, database);
        app.listen(port, () => {
            console.log("Đang chạy trên port" + port);
        });
    }
    
});
