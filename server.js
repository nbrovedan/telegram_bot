var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");
const { Telegram } = require("telegraf");

const tg = new Telegram(process.env.BOT_TOKEN);

app.use(bodyParser.json()); // for parsing application/json

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function(req, res) {
  tg.sendMessage(process.env.CHANNEL_ID, "Lembrete qualquer");
  res.send("Joke is delivered");
});

// Finally, start our server
app.listen(3000, function() {
  console.log("Telegram app listening on port 3000!");
});
