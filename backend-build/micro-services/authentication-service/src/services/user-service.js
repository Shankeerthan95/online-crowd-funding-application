const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const { validateUser } = require("../utils/services/validation");

const SALT_ROUNDS = 10;

let createUser = function(user, cb) {
  // console.log(user);

  //Check for Undefined fields in user object
  if (!validateUser(user)) {
    return cb(new Error("Empty fields exist."));
  }

  User.isEmailExist(user.email, function(err, exist) {
    if (err) {
      return cb(err);
    }

    if (exist) {
      return cb(null, exist);
    }
    User.isUserNameExist(user.user_name, function(err, exist) {
      if (err) {
        return cb(err);
      }

      if (exist) {
        return cb(null, exist);
      }
      User.isMobileNumExist(user.mobile_num, function(err, exist) {
        if (err) {
          return cb(err);
        }

        if (exist) {
          return cb(null, exist);
        }

        bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
          if (err)  return cb(err);
          new User({
            user_name: user.user_name,
            email: user.email,
            mobile_num: user.mobile_num,
            password_hash: hash
          }).save(function(err, user) {
            if (err) {
              return cb(err);
            }

            return cb(null, false, user);
          });
        });
      });
    });
  });
};

module.exports = {
  createUser
};
