const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/authenction-service', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (error)=> { console.log(error); });
db.once('open', ()=> {
    console.log("App and mongoDb are connected succefully");

});
