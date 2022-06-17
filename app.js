const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/index');

const app = express();

dotenv.config();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', '*'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    // Pass to next layer of middleware
    next();
});

app.use('/api',router);
  

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
  
module.exports = app;
  