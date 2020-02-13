var consign = require('consign');
var express = require('express');
var app = express();

consign()
    .include('libs/db.js')
    .then('libs/middlewares.js')
    .then('intentions')
    .then('routes')
    .then('libs/boot.js')
    .into(app);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err.message);
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
