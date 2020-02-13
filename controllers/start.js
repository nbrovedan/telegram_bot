module.exports = function(app){
  app.get("/start", function(req, res) {
    bot.sendMessage(process.env.CHANNEL_ID, "Um lembrete qualquer");
    res.send("Enviado...");
  });
}
