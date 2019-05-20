const express = require("express");
const router = express.Router();
const config = require("../app.js");

const db = config.db;
const apiKey = config.apiKey;
const request = config.request;
router.get("/", (req, res) => {
    res.render("sample.ejs");
});
//=============
//add players
//+++++++++++++
router.get("/add", function(req, res) {
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
//=============
//add stats
//+++++++++++++
router.get("/stats", function(req, res) {
    db.execute("SELECT `player_id` FROM `players`", function(error, results, fields) {
        if (error) throw error;
        results.forEach(function(player) {
            var url = "http://cricapi.com/api/playerStats?pid=" + player.player_id + "&apikey=" + apiKey;
            request(url, function(error, response, body) {
                if (error) throw error;
                var playerInfo = JSON.parse(body);
                console.log("body:", playerInfo.fullName); // Print the HTML for the Google homepage.
            });
        });
        res.end();
    });
});
//=============
//find players
//+++++++++++++
router.get("/find/:name", (req, res) => {
    console.log(db);

    console.log("FIND", req.params);
    db.execute(
        "SELECT `full_name`, `country` FROM `players` WHERE `full_name` like ?  ",
        ["%" + req.params.name + "%"],
        function(error, results, fields) {
            if (error) throw error;
            res.send(results);
        }
    );
});

module.exports = router;
