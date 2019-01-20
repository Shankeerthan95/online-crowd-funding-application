const mongoose = require('mongoose');
const PersonOrOrganization = require('../db/models/user_model');




/**
 * cb(error, user, )
 */

let createUser = (userInfo, cb) => {
    
    console.log(userInfo);

     let newEntry = new PersonOrOrganization(userInfo);

    newEntry.save((function(err, user) {

        if (err) return cb(err);
        return cb(null, user);
    }));

}



module.exports = createUser;