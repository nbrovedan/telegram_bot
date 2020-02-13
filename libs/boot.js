module.exports = function (app) {
  app.listen(app.get('port'), function () {
    console.log('Servidor inciado em ' + app.get("port"));
  });
} 
