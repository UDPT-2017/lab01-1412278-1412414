var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var pg = require('pg');
var passport = require('passport');
var flash    = require('connect-flash');
var configDB = require('./lib/db.js');

// configuration ===============================================================
pg.connect(configDB.url);
require('./config/passport')(passport);
