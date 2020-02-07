var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const axios = require("axios");
const { Telegram } = require("telegraf");

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:<password>@cluster0-niqji.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log(collection);
  client.close();
});




const tg = new Telegram(process.env.BOT_TOKEN);

app.use(bodyParser.json()); // for parsing application/json

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/lembrar", function(req, res) {
  tg.sendMessage(process.env.CHANNEL_ID, "Lembrete qualquer");
  res.send("Enviado...");
});

// Finally, start our server
app.listen(3000, function() {
  console.log("Telegram app listening on port 3000!");
});
