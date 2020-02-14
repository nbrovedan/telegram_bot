var TelegramBot = require( 'node-telegram-bot-api' );

module.exports = function(app){
  return new TelegramBot(process.env.BOT_TOKEN, { polling: true } );
};
