var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var TelegramBot = require( 'node-telegram-bot-api' );
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

var bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true } );

bot.on('message', function(msg){
  console.log('msg', msg);
});

app.use(bodyParser.json()); // for parsing application/json

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/lembrar", function(req, res) {
  bot.sendMessage(process.env.CHANNEL_ID, "Um lembrete qualquer");
  res.send("Enviado...");
});

bot.onText( /\/lembrar/, function(msg, match){
  bot.sendMessage( msg.chat.id, "Digite o lembrete:");
});

bot.onText(/\/love/, function onLoveText(msg) {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: JSON.stringify({
      keyboard: [
        ['Yes, you are the bot of my life ❤'],
        ['No, sorry there is another one...']
      ]
    })
  };
  bot.sendMessage(msg.chat.id, 'Do you love me?', opts);
});

// Finally, start our server
app.listen(3000, function() {
  console.log("Telegram app listening on port 3000!");
});
