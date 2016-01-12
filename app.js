/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var bodyParser = require('body-parser');
var cfenv = require("cfenv");
var path = require('path');
var cors = require('cors');

//Setup Cloudant Service.
var appEnv = cfenv.getAppEnv();
cloudantService = appEnv.getService("medkartOrdersDBService");
var orders = require('./routes/orders');

// create a new express server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'www')));

//REST HTTP Methods

app.get('/orders', orders.listOrders);
app.post('/newOrder', orders.createNewOrder);


var host = (process.env.VCAP_APP_HOST || "localhost" );
// The port on the DEA for communication with the application:
var port = 8080;

console.log("host is "+host);
console.log("port is "+port);

// Start server
app.listen(port);


