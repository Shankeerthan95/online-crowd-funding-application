/*
Todo: 
    validatePassword (instance)
    generateJwt (instance)
    isEmailExist (statics)
    isUserNameExist (statics)
    isMobileNumExist (statics)
    findByEmail (statics)

*/

const mongoose = require("mongoose");
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;
const stub = sinon.stub();
// const spy = sinon.spy();
const User = require("../../../db/models/User");

//Initializing mongodb connection
//mongoose.connect('mongodb://localhost/authenction-service', { useNewUrlParser: true });
require("../test-helper");

describe("isEmailExist() method", function() {
  it("Call back should be called with (null, false)", done => {
    User.isEmailExist("s", (err, exist) => {
      if (err) {
        return done(err);
      }
      assert.isFalse(exist);
      assert.isNull(err);

      return done();
    });
  });

  it("callback should be called with (null, true)", done => {
    new User({
      user_name: "Thanu",
      email: "thanu@gmail.com",
      mobile_num: "07755",
      password_hash: "hffs"
    }).save(function(err, user) {
      if (err) return done(err);

      User.isEmailExist("thanu@gmail.com", (err, exist) => {
        assert.isTrue(exist);
        assert.isNull(err);

        return done();
      });
    });
  });
});

describe("isUserNameExist() method", function() {
  it("Call back should be called with (null, false)", done => {
    User.isUserNameExist("s", (err, exist) => {
      if (err) {
        return done(err);
      }
      assert.isFalse(exist);
      assert.isNull(err);

      return done();
    });
  });

  it("callback should be called with (null, true)", done => {
    new User({
      user_name: "Thanu",
      email: "thanu@gmail.com",
      mobile_num: "07755",
      password_hash: "hffs"
    }).save(function(err, user) {
      if (err) return done(err);

      User.isUserNameExist("Thanu", (err, exist) => {
        assert.isTrue(exist);
        assert.isNull(err);

        return done();
      });
    });
  });
});

describe("isUserMobileNumExist() method", function() {
  it("Call back should be called with (null, false)", done => {
    User.isMobileNumExist("s", (err, exist) => {
      if (err) {
        return done(err);
      }
      assert.isFalse(exist);
      assert.isNull(err);

      return done();
    });
  });

  it("callback should be called with (null, true)", done => {
    new User({
      user_name: "Thanu",
      email: "thanu@gmail.com",
      mobile_num: "07755",
      password_hash: "hffs"
    }).save(function(err, user) {
      if (err) return done(err);

      User.isMobileNumExist("07755", (err, exist) => {
        assert.isTrue(exist);
        assert.isNull(err);

        return done();
      });
    });
  });
});

describe("findByEmail() method", function() {
  it("should return no user ", done => {
    User.findByEmail("ss", (err, user) => {
      assert.isNull(err);
      assert.isNull(user);

      return done();
    });
  });

  it('Should return a user', done => {
    new User({user_name: "sha", email: "sha@gmail.com", password_hash: "hfs", mobile_num: "0955"})
    .save(function(err, user){
      if (err) { return done(err); }

      User.findByEmail(user.email, (err, user) => {
        assert.isNull(err);
        assert.strictEqual(user.email, "sha@gmail.com");

        return done();
      })
    })
  })
});
