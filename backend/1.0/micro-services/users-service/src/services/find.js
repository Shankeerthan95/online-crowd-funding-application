const PersonOrOrganization = require('../db/models/user_model');


let findByUserName = (username, cb) => {
    PersonOrOrganization.find({user_name: username}, function(err, results){
        
        if (err) {
            return console.log("Error in find.js line: 8");
        }

        return console.log(results);
    })
}


let findByUserById = (id, cb) => {
    PersonOrOrganization.findById(id, function(err, res)  {

        if (err) {
        
            console.log("Error in find.js line: 20");
            return cb(err); 
        }
        
        console.log(res);
        return cb(null, res);
    })
}



module.exports = {
    findByUserName,
    findByUserById
}