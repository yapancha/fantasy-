let express = require("express");
let mysql = require("mysql2");
let bodyParser = require("body-parser");
var request = require("request");
var cricapi = require("cricapi");
const app = express();
cricapi.setAPIKey("mA2JflRG73h1887W1FzSFTTBv0k2");
cricapi.matches(function(databundle) {
  console.log("matches", databundle);
});
// info for mysql connection
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "QZhZfJa6OQ",
  password: "t0NUCXsGlP",
  database: "QZhZfJa6OQ"
});
// connect to mysql
connection.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log("You are now connected with mysql database...");
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

//login
app.get("/users/login/:username", function(req, res) {
  console.log("GET login user");
  var username = req.params.username;
  console.log(username);
  connection.execute(
    `SELECT username, password FROM users WHERE username = ?`,
    [username],
    function(error, results, fields) {
      if (error) throw error;
      request(
        "https://cricapi.com/api/playerStats?apikey=mA2JflRG73h1887W1FzSFTTBv0k2&pid=35320",
        function(error, response, body) {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          res.json({ results, body: JSON.parse(body) });
        }
      );
    }
  );
});

//signup
app.post("/users/signup", function(req, res) {
  console.log("POST new user");
  //   connection.query("select * from users", function(error, results, fields) {
  //     if (error) throw error;
  //     res.json(results);
  //   });
});

//rest api to get all customers
app.get("/users", function(req, res) {
  console.log("GET all users");
  connection.query("SELECT * FROM users", function(error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.listen(8000, () => {
  console.log("server started...");
});
