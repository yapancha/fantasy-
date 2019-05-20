var x = document.getElementById("playerFind");

x.addEventListener("input", function() {
  document.getElementById("demo").innerHTML = "You wrote: " + x.value;
  var resultElement = document.getElementById("demo2");

  axios
    .get("/api/players/find/" + x.value)
    .then(function(response) {
      let len = response.data.length;
      if (len == 0) {
        resultElement.innerHTML = "No players found";
      } else {
        resultElement.innerHTML = "";
      }
      for (var i = 0; i < len; i++) {
        resultElement.innerHTML +=
          "<strong>Name:</strong> " +
          response.data[i].full_name +
          "  <strong>Country: </strong>: " +
          response.data[i].country +
          "<br>";
      }
    })
    .catch(function(error) {
      resultElement.innerHTML = error;
    });
});
