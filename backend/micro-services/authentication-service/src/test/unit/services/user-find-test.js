const assert = require("assert");
const User = require("../../../db/models/User");
const { findByEmail, findByMobileNum, findByUserName }  = require('../../../services/user-service')

//Import MongoDB connection
require("../test-helper");

describe("Find User by user_name", function() {
  describe("User exists", function() {
    it("#should find result length equls 1.", function(done) {
      let mockUser = new User({
        user_name: "mock",
        email: "mock@gmail.com",
        password_hash: "mock",
        mobile_num: "09905555"
      });
      mockUser.save(function(err, user) {
        if (err) {
          return done(err);
        }

        const users = findByUserName(user.user_name);
        users.then(userArray => { assert.strictEqual(userArray.length, 1); });
        

        return done();
       
      });
    });
  });

  describe("User doesn't exist", function() {
    
    it("#should find result length equals 0. ", function(done){

        

        const users = findByUserName("mock");
        users.then(userArray => { assert.strictEqual(userArray.length, 0) });
        
        done();
       
    })

  });
});

describe("Find User by email", function () {
    describe("User exists", function () {
        it("#Should find result length equqls 1.", function (done) {

            let mockUser = new User({
                user_name: "mock",
                email: "mock@gmail.com",
                password_hash: "mock",
                mobile_num: "09905555"
            });
            mockUser.save(function (err, user) {
                if (err) {
                    return done(err);
                }

                const users = findByEmail(user.email);
                users.then(userArray => assert.strictEqual(userArray.length, 1));

                 return done();
            });
        });

  describe("User doesn't exist", function() {
    it("#Should find result length equals 0", function(done){

        const users = findByEmail("mock@gmail.com");
        users.then(usersArray => { assert.strictEqual(usersArray.length, 0)});
        done();
      })
  });
});

describe("Find User by mobile_num", function () {
    describe("User exists", function () {
        it("#Should find result length equqls 1.", function (done) {

            let mockUser = new User({
                user_name: "mock",
                email: "mock@gmail.com",
                password_hash: "mock",
                mobile_num: "09905555"
            });
            mockUser.save(function (err, user) {
                if (err) {
                    return done(err);
                }

                const users = findByEmail(user.mobile_num);
                users.then(userArray => assert.strictEqual(userArray.length, 1));

                 return done();
            });
        });

    });

    describe("User doesn't exist", function () {
        it("#Should find result length equals 0", function (done) {

            const users = findByMobileNum("09905555");
            users.then(usersArray => { assert.strictEqual(usersArray.length, 0) });
            return done();
        });
  });
})

});
