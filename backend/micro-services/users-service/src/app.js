const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const createUser  = require('./services/createUser');

app.use(bodyParser.json());

//Initiate mongoDb connection
require('./db/connect');


//Import express router
const router = require('./controllers/index');
app.use('/api/v1/user', router);




//Initiate Rabbitmq event listening
const {onUserSignup, onPostCreated} = require('./amqp/subcribe');


//Persist user in db when message is consumed by service
onUserSignup((user) => {
       createUser(JSON.parse(user.content.toString()), (err, user) => {});
});

onPostCreated((err, msg) => {
    if (err) {
        return console.log("Error in app.js line 25");
    }

    return console.log(msg.content.toString());
})








app.listen('4000',() =>{
    console.log("Listening on 4000");
});





