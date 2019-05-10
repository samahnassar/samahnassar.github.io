var http = require("http");

var sqlite3 = require("sqlite3").verbose();

//create a server object:
http
  .createServer(function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    var db = new sqlite3.Database("database.db");
    db.serialize(function() {
      db.all("SELECT rowid AS id, info FROM lorem", function(err, rows) {
        res.write(JSON.stringify(rows));
        res.end();
      });
    });

    db.close();
  })
  .listen(8080); //the server object listens on port 8080
