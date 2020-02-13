var bodyParser = require("body-parser");

module.exports = function (app) {
    app.set("port", 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true}));
};
