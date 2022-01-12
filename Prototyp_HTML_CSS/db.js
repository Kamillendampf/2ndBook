
function connect(){
  
const { create } = require('domain');
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('DB/2nd Book.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the 2ndBook SQlite database.');
  });

}

connect();
