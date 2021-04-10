// Load the 'index' controller

const index = require('../controllers/index.server.controller');

const update = require('../controllers/update.server.controller');



// Define the routes module' method

module.exports = function (app) {


    app.get('/', function (req, res) {

        res.render('index', {

            info: "see the results in console window"

        })

    });


    app.get('/run', index.trainAndPredict);

    app.post("/update",async (req,res) => {
        console.log('Got body:', req.body);

        var pLength = req.body.fullName;
        

        //res.send(pLength ); 
        update.trainAndPredict(req,res);

    });



};