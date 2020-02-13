var TelegramBot = require( 'node-telegram-bot-api' );

module.exports = new TelegramBot(process.env.BOT_TOKEN, { polling: true } );
