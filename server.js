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
  if(msg.reply_to_message.text == 'Digite o lembrete:'){
    bot.sendMessage( msg.chat.id, "Beleza! Agora digita a hora que devo lembrar:");
  }
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

// Matches /editable
bot.onText(/\/editable/, function onEditableText(msg) {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Edit Text',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit'
          },
          {
            text: 'Edit Text 2',
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: 'edit2'
          }
        ]
      ]
    }
  };
  bot.sendMessage(msg.from.id, 'Original Text', opts);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;

  if (action === 'edit') {
    text = 'Edited Text';
  }

  bot.editMessageText(text, opts);
});

// Finally, start our server
app.listen(3000, function() {
  console.log("Telegram app listening on port 3000!");
});
