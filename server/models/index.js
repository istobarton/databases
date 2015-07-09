var db = require('../db');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};


module.exports = {
  messages: {
    get: function (req, res) {
      var queryStr = "SELECT messages.text, messages.roomname, users.username FROM messages JOIN users ON messages.userID = users.id;";
      db.query(queryStr, function(err, result, fields){
        if (err) { console.error(err); }
        res.writeHead(200, headers);
        res.end(JSON.stringify({results: result}));
      });
    }, // a function which produces all the messages
    post: function (req, res) {
      var queryStr = "INSERT INTO messages (text, roomname, userID) VALUES (" + db.escape(req.body.text) + ", 'main', '1');"
      db.query(queryStr , function(err, result, fields){
        if (err) { console.error(err); }
        res.writeHead(201, headers);
        res.end(JSON.stringify({location: '/classes/messages'}));
      });
    } // a function which can be used to insert a message into the database
  },


  users: {
    // Ditto as above.
    get: function (req, res) {
      db.query("SELECT username FROM users", function (err, result, fields){
        if (err) { console.error(err); }
        res.writeHead(200, headers)
        res.end(JSON.stringify({results: result}))
      });

    },
    post: function (req, res) {
      db.query("INSERT INTO users (username) VALUES (" + db.escape(req.body.username) + ")", function(err, result){
        //TODO -- MAKE QUERY STRING AND LOG RESULT FROM MYSQL TO SEE WHY RECIEVING NULL IN TEST RESULTS
        res.writeHead(201, headers);
        res.end(JSON.stringify({location: '/classes/users'}));
      })
    }
  }
};


