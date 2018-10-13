const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../db/models/User');
const { validateUser } = require('../utils/services/validation');



const SALT_ROUNDS = 10;


//Todo: complete validataion and save
/**Save User document in Mongodb 
 * if user object contains valid
 * properties
 * 
 * @param {*} user
 * 
 * @returns  user 
 */
let createUser = (user) => {
    let isValid = validateUser(user);

    if (!isValid)
    {
        return "user object contains empty fields";
    }

    if (isEmailExists(user.email))
    {
        return "Email is already exists.";
    }

    if (isUserNameExists(user.user_name))
    {
        return "Username is already taken.";
    }

    if (isMobileNumExists(user.mobile_num))
    {
        return "Mobile Number is already exists."
    }

    bcrypt.genSalt(SALT_ROUNDS, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            
            let newUser = new User({
                user_name: user.user_name ,
                email: user.email ,
                password_hash: hash,
                mobile_num: user.mobile_num
            });

            newUser.save(function(err, user){

                if (err)
                {
                    return "Error storing user";
                }

                return user;
            });
        });
    });

}


/**
 * 
 * @param {*} user_name
 * @returns user 
 */
let findByUserName = (user_name) => {

    return User.find({user_name: user_name});
}

/**
 * 
 * @param {*} email
 * @returns user 
 */
let findByEmail = (email) => {
    return User.find({email: email});
}

/**
 * 
 * @param {*} mobile_num 
 * @returns user
 */
let findByMobileNum = (mobile_num) => {
    return User.find({mobile_num: mobile_num});
}

/**
 * 
 * @param {*} user_name 
 * @returns Boolean
 */
let isUserNameExists = (user_name) => {
    
}

/**
 * 
 * @param {*} email
 * @return Boolean 
 */
let isEmailExists = (email) => {

}

/**
 * 
 * @param {*} mobile_num
 * @return Boolean 
 */
let isMobileNumExists = (mobile_num) => {

}








module.exports = {
    createUser: createUser,
};









