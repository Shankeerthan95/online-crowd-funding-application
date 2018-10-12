const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authenction-service');

const db = mongoose.connection;

db.on('error', (error)=> { console.log(error); });
db.once('open', ()=> {
    console.log("App and mongoDb are connected succefully");

});
