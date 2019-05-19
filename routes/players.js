const express = require("express");
const router = express.Router();

router.get("/players", (req, res) => {
  res.render("sample.ejs");
});
//=============
//add players
//+++++++++++++
router.get("/players/add", function(req, res) {
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
router.get("/players/add/stats", function(req, res) {
  console.log("GET login user");

  players.forEach(function(player) {
    connection.execute(
      "SELECT `player_id` FROM `players`",
      [player.pid, player.name, player.country],
      function(error, results, fields) {
        if (error) throw error;
        console.log(results);
      }
    );
  });

  res.send("done");
});
//=============
//find players
//+++++++++++++
router.get("/players/find/:name", (req, res) => {
  connection.execute(
    "SELECT `full_name`, `country` FROM `players` WHERE `full_name` like ?  ",
    ["%" + req.params.name + "%"],
    function(error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

module.exports = router;
