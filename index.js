var express = require('express'),
    expressLayouts = require('express-ejs-layouts'),
    cookieParse = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    axios  = require('axios'),
    path   = require('path'),
    base64Img = require('base64-img');

var app = express();

app.use('/', express.static(__dirname));
app.use('*/css', express.static('public/dist/css'));
app.use('*/dist', express.static('public/dist'));
app.use('*/fonts', express.static('public/dist/fonts'));
app.use('*/files', express.static('public/src/files'));
app.use('*/img',  express.static('public/src/img'));
app.use('*/js', express.static('public/src/js'));

app.use(expressLayouts);
app.use(cookieParse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('view cache', false);
app.set('views', [
  path.join(__dirname, 'views')
]);

app.use(session({

  secret: 'asfdh09f0947524@#$SAF+Q)@_#(_@#*&~QF* QBF qf_ASDF_--**=+_ADF 20547=3)*///45x4+}{DI!"D_@@#o!@#V a0dfadFDR++--)09uufxcp__iwrkr$$$2osof_||_if0400d a__asldjf}',
  resave: true,
  saveUninitialized: false

}));

require('./app/routes/routes.js')(app, base64Img);

app.listen(5000);
