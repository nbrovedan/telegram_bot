var TelegramBot = require( 'node-telegram-bot-api' );

module.exports = function(app){
  return new TelegramBot(app.configs.consts.bot_token, { polling: true } );
};
