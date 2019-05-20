let mysql = require("mysql2");
var connection = mysql.createConnection({
  host: "remotemysql.com",
  user: "QZhZfJa6OQ",
  password: "t0NUCXsGlP",
  database: "QZhZfJa6OQ"
});
connection.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("You are now connected with mysql database...");
});
module.exports = connection;
