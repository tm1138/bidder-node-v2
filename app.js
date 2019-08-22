var config = require('./config/envconfig.json');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

//Database Section Start

var DatabaseService = require('./services/service.database');
databaseService = new DatabaseService(config.dbConfig);

databaseService.Init().
then(() => 
{
    console.log('Connected to mongoDb.....');
})
.catch(err => {
    console.error('Could not connect to mongoDb', err);
});

//Database section end

//Helpers Start
var FormattingHelper = require('./helpers/helper.error.formatter')
formattingHelper = new FormattingHelper();
//Helpers End

//services section start

var CustomerService = require('./services/service.customer');
var customerService = new CustomerService(databaseService, formattingHelper);

//services section end

//routing service section start

var customerRoute = require('./routes/routes.customer')(express, customerService);

//routing service section end

var app = express();

app.use(session({
    name: "s_id",
    resave: false,
    saveUninitialized: false,
    secret: config.Session.secret,
    cookie: {
        maxAge: (config.Session.session_expiry_in_minutes * 60 * 1000),
        sameSite: true,
        secure: false
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route setting start

app.use('/api/customer', customerRoute);

//route setting end


var server = app.listen(config.Server.port, ()=> {
    console.log('Server listening on port ' + config.Server.port);
})


