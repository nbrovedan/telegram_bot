var TelegramBot = require( 'node-telegram-bot-api' );
var bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true } );
module.exports = function(app){
  return bot;
}
