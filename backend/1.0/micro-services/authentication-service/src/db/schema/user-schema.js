const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { privateKey } = require("../../utils/controller/key_read");
const User = require('../models/User');

//Todo: mobile_num can  be used to  provide two step verification
const UserSchema = mongoose.Schema({
  user_name: { type: String },
  email: { type: String, required: true },
  password_hash: { type: String, required: true },
  verified: { type: Boolean, required: false },
  mobile_num: { type: String, required: true }
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};

UserSchema.methods.generateJwt = function() {
  const pk = privateKey();

  return jwt.sign({ username: this.user_name }, pk, {
    algorithm: "RS256",
    expiresIn: 60 * 60
  });
};

UserSchema.statics.isEmailExist = function (email, cb) {

  return this.find({ email: email }, function (err, users) {
    if (err) {
      return cb(err);

    }

    if (users.length > 0) {
      return cb(null, true);
    }

    return cb(null, false);
  })

}

UserSchema.statics.isUserNameExist = function (username, cb) {

  return this.find({ user_name: username }, function (err, users) {
    if (err) {
      return cb(err);

    }
    
    if (users.length > 0) {
      return cb(null, true);
    }

    return cb(null, false);
  })

}

UserSchema.statics.isMobileNumExist = function (mobile_num, cb) {

  return this.find({ mobile_num: mobile_num }, function (err, users) {
    if (err) {
      return cb(err);

    }
    
    if (users.length > 0) {
      return cb(null, true);
    }

    return cb(null, false);
  })

}

UserSchema.statics.findByEmail = function(email, cb) {
  this.findOne({email: email}, function(err, user) {
    if (err)  { return cb(err); }
    return cb(null, user);
  })
}





module.exports = UserSchema;
