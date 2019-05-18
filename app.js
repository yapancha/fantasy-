let express = require("express");
let mysql = require("mysql2");
let bodyParser = require("body-parser");
var request = require("request");
var cricapi = require("cricapi");
var path = require("path");
const fs = require("fs");
const app = express();

app.use("*/css", express.static("public/css"));
app.use("*/js", express.static("public/js"));
app.use("*/images", express.static("public/images"));
app.use("*/icons", express.static("public/icons"));
app.use("*/partials", express.static("views/partials"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
let rawdata = fs.readFileSync("plyers.json");
let players = JSON.parse(rawdata);

// cricapi.setAPIKey("mA2JflRG73h1887W1FzSFTTBv0k2");
// cricapi.matches(function(databundle) {
//   console.log("matches", databundle);
// });
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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/players", (req, res) => {
  res.render("sample.ejs");
});
app.get("/players/find/:name", (req, res) => {
  connection.execute(
    "SELECT `full_name`, `country` FROM `players` WHERE `full_name` like ?  ",
    ["%" + req.params.name + "%"],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});
//login
app.get("/players/add", function(req, res) {
  console.log("GET login user");

  players.forEach(function(player) {
    connection.execute(
      "INSERT INTO `players`(`player_id`, `full_name`, `country`) VALUES (?,?,?)",
      [player.pid, player.name, player.country],
      function(error, results, fields) {
        if (error) throw error;
      }
    );
  });

  res.send("done");
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
