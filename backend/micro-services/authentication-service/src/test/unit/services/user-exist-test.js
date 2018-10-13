const assert = require('assert');
const User = require('../../../db/models/User');
const { isEmailExist, isUserNameExist, isMobileNumExist } = require('../../../services/user-service');

//Import mongodb connection for testing
require("../test-helper");

let mockUser = {
    user_name: "mock",
    email: "mock@gmail.com",
    password_hash: "mock",
    mobile_num: "0774941862"
};




describe('Check existence of user by user_name', function()
{
    describe("User exists", function(){
        it("#Should return true", function(done){
            
            let user = new User(mockUser);
            user.save(function(err, user){
                if (err) return done(err);
                
                assert.strictEqual(isUserNameExist(mockUser.user_name), true);

                return done();
            })
            
            
        })

    })

    describe("User doesn't exist", function(){

        it("#Should return false", function(done) {
            assert.strictEqual(isUserNameExist(mockUser.user_name), false);

            return done();
        })

    })

});

describe("Check existence of User by Email", function(){
    describe("User exists", function(){
        it("#Should return true", function(done){
            
            let user = new User(mockUser);
            user.save(function(err, user){
                if (err) return done(err);

                assert.strictEqual(isEmailExist(mockUser.email), true);

                return done();
            })
            
            
        })

    })

    describe("User doesn't exist", function(){
        it("#Should return false", function(done) {

            assert.strictEqual(isEmailExist(mockUser.email), false);
        })
    })

});

describe("Check existence of user by mobile_num", function(){

    describe("User exists", function(){
        it("#Should return true", function(done){
            
            let user = new User(mockUser);
            user.save(function(err, user){
                if (err) return done(err);

                assert.strictEqual( isMobileNumExist(mockUser.mobile_num), true);

                return done();

            })
            
            
        })
    })

    describe("User doesn't exist", function(){
        it("#Should return false", function(done) {
            assert.strictEqual(isMobileNumExist(mockUser.mobile_num), false);
        })
    })

});