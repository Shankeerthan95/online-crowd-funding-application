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
async function  findByUserName(user_name)
{
    const users = await User.find({user_name: user_name});
   

    return users;
}

/**
 * 
 * @param {*} email
 * @returns user 
 */
async function findByEmail(email) {

    const users = await User.find({email: email});

    return users;
}


/**
 * 
 * @param {*} mobile_num 
 * @returns user
 */
async function findByMobileNum( mobile_num) {
    const users = await User.find({mobile_num: mobile_num});

    return users;
}

/**
 * 
 * @param {*} user_name 
 * @returns Boolean
 */
let isUserNameExist = (user_name) => {
    const UserPromise = findByUserName(user_name);
    return UserPromise.then(array => array.length) === 0 ? false : true;
}

/**
 * 
 * @param {*} email
 * @return Boolean 
 */
let isEmailExist = (email) => {
    const UserPromise = findByEmail(email);
    return UserPromise.then(array => array.length) === 0 ? false : true;
}

/**
 * 
 * @param {*} mobile_num
 * @return Boolean 
 */
let isMobileNumExist = (mobile_num) => {
    const UserPromise = findByMobileNum(mobile_num);
    return UserPromise.then(array => array.length) === 0 ? false : true;
}








module.exports = {
    createUser: createUser,
    findByEmail: findByEmail,
    findByMobileNum: findByMobileNum,
    findByUserName: findByUserName,
    isEmailExist: isEmailExist,
    isUserNameExist: isUserNameExist,
    isMobileNumExist: isMobileNumExist
};









