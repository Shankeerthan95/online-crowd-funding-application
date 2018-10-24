const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createUser  = require('./services/createUser');

app.use(bodyParser.json());

//Initiate mongoDb connection
require('./db/connect');




//Initiate Rabbitmq event listening
const {onUserSignup} = require('./amqp/subcribe');

//Persist user in db when message is consumed by service
onUserSignup((user) => {
       createUser(JSON.parse(user.content.toString()), (err, user) => {});
});








app.listen('4000',() =>{
    console.log("Listening on 4000");
});





