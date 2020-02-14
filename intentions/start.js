module.exports = function(app){
  let _bot = app.libs.telegram;

  _bot.onText( /\/start/, function(msg, match){
    _bot.sendMessage( msg.chat.id, "Hello world!");
  });
}
