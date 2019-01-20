const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

//Initiate mongodb connection
require('./db/connect');


//Setup express router
const router = require('./controllers/index');
app.use('/api/v1/post', router);

















app.listen(8000, () => {
    console.log("Post services listening on 8000");
});






