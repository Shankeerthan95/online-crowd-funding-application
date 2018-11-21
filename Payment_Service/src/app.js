const express = require('express');
const app = express();
const _ = require('lodash');
const bodyParser = require('body-parser');

app.use(bodyParser.json());








//Setup tables
require('./db/table');


//Import services method
const { initPaymentRecordForPost} = require('./services/index');


//Subscribe  to post creation
const { onPostCreated } = require('./amqp/subscribe');
onPostCreated((err, msg) => {
    if (err) {

        return console.log("Error in app.js line 19");
    }

    console.log(JSON.parse(msg.content.toString()));
    let parsedMsg =JSON.parse(msg.content.toString());
    initPaymentRecordForPost({post_id: parsedMsg._id, user_id: parsedMsg.user_id })
})



//Use router to handle requests
const Router = require('./controllers/index');
app.use('/api/v1/payment', Router);









app.listen(5000, () => {
    console.log("Successfully listen on 5000");
})


// module.exports = {
//     my_sql_connection
// }

