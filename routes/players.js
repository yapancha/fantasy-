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
    db.execute("SELECT `player_id` FROM `players`", async function(error, results, fields) {
        if (error) throw error;
        await results.forEach(function(player) {
            var url = "http://cricapi.com/api/playerStats?pid=" + player.player_id + "&apikey=" + apiKey;
             request(url, async function(error, response, body) {
                var rawData = JSON.parse(body);

                if (error) throw error;

                if(rawData.data.batting.ODIs == undefined || rawData.data.batting.ODIs == undefined){
                    var runs = 0;
                    var wickets = 0;
                    var catches = 0;
                    var stumpings = 0;
                    var centuries = 0;
                    var fivefers = 0;
                }
                else{
                    var runs = rawData.data.batting.ODIs.Runs || 0;
                    var wickets = rawData.data.bowling.ODIs.Wkts|| 0;
                    var catches = rawData.data.batting.ODIs.Ct|| 0;
                    var stumpings = rawData.data.batting.ODIs.St || 0;
                    var centuries = rawData.data.batting.ODIs["100"] || 0;
                    var fivefers = rawData.data.bowling.ODIs["5w"] || 0;
                }   
                var playerInfo = {
                    pid : rawData.pid,
                    runs: runs,
                    wickets : wickets,
                    catches : catches,
                    runouts : 0,
                    stumpings : stumpings,
                    centuries : centuries,
                    fivefers : fivefers,
                    ducks : 0,
                    mom : 0,
                    double : 0,
                    hattrick : 0 ,
                    points : 0 
                }

                db.execute(
                    "INSERT INTO `stats`(`player_id`, `runs`, `wickets`, `catches`, `run_outs`, `stumpings`, `centuries`,"+
                     "`fivefers`, `ducks`, `mom`, `double_century`, `hattrick`, `points`) VALUES"
                    + "(?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [playerInfo.pid, playerInfo.runs, playerInfo.wickets, playerInfo.catches, playerInfo.runouts,
                        playerInfo.stumpings, playerInfo.centuries, playerInfo.fivefers,
                            playerInfo.ducks, playerInfo.mom, playerInfo.double, playerInfo.hattrick, playerInfo.points],
                     function(error, results, fields) {
                        if (error) throw error;
                    }
                );            });
        });

    });
    res.send("done");

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
