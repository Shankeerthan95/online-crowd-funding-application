const mongoose = require('mongoose');
const PersonOrOrganization = require('../db/models/user_model');



/**
 * cb(error, user, )
 */

let createUser = (userInfo, cb) => {

    let newEntry = new PersonOrOrganization({
        user_name: userInfo.user_name,
        email: userInfo.email,
        mobile_num: userInfo.mobile_num,
        country: userInfo.country,
        organization: userInfo.organization,
        social_medias: userInfo.social_medias
        
    });

    PersonOrOrganization.save((function(err, user) {
        if (err) return cb(err);
        return cb(null, user);
    }));

}