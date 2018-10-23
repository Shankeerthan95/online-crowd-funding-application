const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Initiate mongoDb connection
require('./db/connect');




//Initiate Rabbitmq event listening
require('./amqp/subcribe');









app.listen('4000',() =>{
    console.log("Listening on 4000");
});





