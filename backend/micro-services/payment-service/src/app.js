const express = require('express');
const app = express();

//Initate paypal configuration
require('./configure/paypal');




//Setup tables
require('./db/table');

















app.listen(5000, () => {
    console.log("Successfully listen on 5000");
})


// module.exports = {
//     my_sql_connection
// }

