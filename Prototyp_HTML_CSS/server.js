
var express = require('express');
var http = require('http');
var sqlite3 = require('sqlite3');
    

var app = express();
var server = http.createServer(app);
    
var db = new sqlite3.Database('DB/2nd Book.db');
    
const bodyParser = require("body-parser");
    
    /** bodyParser.urlencoded(options)
     * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
     * and exposes the resulting object (containing the keys and values) on req.body
     */
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    
    /**bodyParser.json(options)
     * Parses the text as JSON and exposes the resulting object on req.body.
     */
    app.use(bodyParser.json());



app.post("http://localhost:3000", function (req, res) {

    db.serialize(()=>{
        db.run('INSERT INTO Benutzer(Benutzername,EMail,Passwort,PersonID) VALUES(?,?,?,?)', [req.body.benutzername, req.body.email, req.body.passwort, 11], function(err) {
          if (err) {
            return console.log(err.message);
          }
          console.log("New user has been added");
          res.send("New user has been added into the database");
          
        });
    });

    res.end("location('http://localhost')");


    }).listen(3000);