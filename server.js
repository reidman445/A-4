// Set the 'NODE_ENV' variable

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// Load the module dependencies

const configureExpress = require('./config/express');

const bodyParser = require('body-parser');


// Create a new Express application instance

const app = configureExpress();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());



// Use the Express application instance to listen to the '3000' port

app.listen(5000);


// Log the server status to the console

console.log('Server running at http://localhost:5000/');


// Use the module.exports property to expose our Express application instance for external usage

module.exports = app;