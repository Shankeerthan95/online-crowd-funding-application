const express = require('express');
const app = express();

//To test
module.exports = app; 

//Todo: it should be decoupled from source code
const PORT = 8080;


//Initiate mongoDb connection
require('./db/connect');




app.listen(PORT, 'localhost', () => {
    console.log("App Listening on ", PORT);

});