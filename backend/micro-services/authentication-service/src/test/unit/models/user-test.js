const assert = require("assert");
const sinon = require("sinon");
const chai = require("chai");
const mongoose = require("mongoose");
const User = require("../../../db/models/User");

//Import mongodb connection for testing
require("../test-helper");

//Test create new user in MonogoDb
describe("#User (model) persity user object in DB", function() {
  describe("successfull save operation", function() {
    it("#should return created user", function(done) {
      let UserMock = sinon.mock(
        new User({
          user_name: "shank",
          email: "shakeerthana@gmail.com",
          password: "07774595",
          mobile_num: "044589494"
        })
      );
      let user = UserMock.object;

      let expectedResult = { staus: true };

      UserMock.expects("save").yields(null, expectedResult);
      user.save(function(err, user) {
        if (err) {
          return done(err);
        }

        UserMock.verify();
        UserMock.restore();

        return done();
      });
    });
  });

  describe("UnSuccessful save operation", function() {
    describe("user_name doesn't exist in User object", function() {
      it("#should return user_name doesn't exist", function(done) {
        let UserMock = sinon.mock(
          new User({
            email: "shankeerthan@gmail.com",
            password: "23",
            mobile_num: "0774455"
          })
        );
        let user = UserMock.object;

        let expectedResult = { status: false };

        UserMock.expects("save").yields(null, expectedResult);
        user.save(function(err, user) {
          if (err) {
            return done(err);
          }

          UserMock.verify();
          UserMock.restore();

          return done();
        });
      });
    });

    describe("email doesnt' exist in User Object ", function() {
      it("should return email doesn't exist", function(done) {
        let UserMock = sinon.mock(
          new User({
            user_name: "shank",
            password: "3jff",
            mobile_num: "04400440"
          })
        );
        let user = UserMock.object;

        let expectedResult = { status: false };

        UserMock.expects("save").yields(null, expectedResult);

        user.save(function(err, user) {
          if (err) {
            return done(err);
          }

          UserMock.verify();
          UserMock.restore();

          return done();
        });
      });
    });

    describe("password doesn't  exist", function() {
        it("#should return error password doesn't exist", function(done){

            let UserMock = sinon.mock(new User({user_name: "shank", email: "shankeerthan@gamil.com", mobile_num: "077444"}));
            let user = UserMock.object;

            let expectedResult = { status: false };

            UserMock.expects('save').yields(null, expectedResult);

            user.save(function(err) {
                if (err)
                {
                    return done(err);
                }

                UserMock.verify();
                UserMock.restore();

                return done();
            })
        })
    });

    describe("mobile_num doesn't exist", function() {
        it("#should return an error mobile_num doesn't exist", function(done){
            
            let UserMock = sinon.mock(new User({ user_name: "sanak", email: "saa@gmail.com", password: "23rjff"}));

            let user = UserMock.object;

            let expectedResult = { status: false };
            UserMock.expects('save').yields(null, expectedResult);

            user.save(function(err, user){
                if (err) return done(err);

                UserMock.verify();
                UserMock.restore();

                return done();
            })
        })
    });
  });
});
