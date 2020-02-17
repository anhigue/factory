const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const db = require('./db/db.config');
const config = require('./config/config');

/** 
 * @description const to access in all app
*/
const app = express();

/** 
 * @description chose the port to run the server on base file based config
*/
let port;
if (config.develop.port) {
    port = config.develop.port;
} else {
    port = config.production.port;
}

/** 
 * @description set configuration
*/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
});
app.use('/api/factory', require('./routes')(app));
app.use(cors());

/**
 * @description start to listen the web server
 */
app.listen(port, () => {
    console.log("Server on " + port);
    console.log("Debug del server: ");
});

module.exports = app;