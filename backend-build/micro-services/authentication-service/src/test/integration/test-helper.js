const mongoose = require('mongoose');

beforeEach(function(done){

    function clearDB(){
        for (let collectionIndex in mongoose.connection.collections)
        {
            mongoose.connection.collections[collectionIndex].deleteMany(function(){});
        }
        return done();
    }

    if (mongoose.connection.readyState === 0)
    {
        //Todo: connection url should be in config file
        mongoose.connect('mongodb://localhost/authenction-service', { useNewUrlParser: true }, function(err){
            if (err)
            {
                throw err;

            }

            return clearDB();
        });
    } else 
    {
        return clearDB();
    }

});


afterEach(function(done){
    mongoose.disconnect();
    return done();
});