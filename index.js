// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// Time processing without parameters
app.get("/api", function (req, res) {
  const date = new Date();
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({ unix, utc });
});

// Time processing with parameters
app.get("/api/:time", function (req, res) {
  const { time } = req.params;
  let validatedTime = undefined;
  if (isNaN(time)) {
    validatedTime = time;
  } else {
    validatedTime = Number(time);
  }
  const date = new Date(validatedTime);
  if (date.toString() === "Invalid Date") {
    res.json({
      error : "Invalid Date"
    })
  }
  const unix = date.getTime();
  const utc = date.toUTCString();
  res.json({ unix, utc });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
