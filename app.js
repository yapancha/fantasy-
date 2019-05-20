let express = require("express");
let bodyParser = require("body-parser");
var request = require("request");
var cricapi = require("cricapi");
var path = require("path");
const db = require("./db.js");
const fs = require("fs");
const app = express();
const apiKey = "mA2JflRG73h1887W1FzSFTTBv0k2";
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

// connect to mysql

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
module.exports = {
    db: db,
    apiKey: apiKey,
    request: request
};

app.use("/api/players", require("./routes/players.js"));
app.use("/players", require("./routes/players.js"));
app.listen(8000, () => {
    console.log("server started...");
});
