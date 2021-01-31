const chai = require('chai');
const assert = chai.assert;
const User = require('../../db/models/User');
const {createUser } = require('../../services/user-service');



//import connection
require('./test-helper');

describe('createUser() method', ()=> {

    //Empty fields user object
    it('callback should be called with (error)', (done) =>{
        createUser({}, (err, user) => {
            assert.strictEqual(err.message, "Empty fields exist.");
            assert.isUndefined(user);

            return done();
        })
    });

    //Email already exist
    it('callback should be called with (error)', (done) => {
        new User({user_name: "Thanu", email: "thanu@gmail.com", mobile_num: "0555", password_hash: "anna"})
        .save(function(err, user) {

            createUser({user_name: "Thanusha", email: "thanu@gmail.com", mobile_num: "04555", password: "anna"}, (err, exist) => {
                assert.isNull(err);
                assert.isTrue(exist);

                return done();
            })

        })
    })

    //Username already exist
    it('callback should be called with (error)', (done) => {
        new User({user_name: "Thanu", email: "thanusha@gmail.com", mobile_num: "0555", password_hash: "anna"})
        .save(function(err, user) {

            createUser({user_name: "Thanu", email: "thanu@gmail.com", mobile_num: "04555", password: "anna"}, (err, exist) => {
                assert.isNull(err);
                assert.isTrue(exist);

                return done();
            })

        })
    })

    //Mobilenum already exist
    it('callback should be called with (error)', (done) => {
        new User({user_name: "Thanu", email: "thanusha@gmail.com", mobile_num: "0555", password_hash: "anna"})
        .save(function(err, user) {

            createUser({user_name: "Thanusha", email: "thanu@gmail.com", mobile_num: "0555", password: "anna"}, (err, exist) => {
                assert.isNull(err);
                assert.isTrue(exist);

                return done();
            })

        })
    })
    
    //Succeesfully saved
    it('should  save user successfully', (done) => {
        createUser({user_name: "Thanusa", email: "thanusa@gmail.com", mobile_num: "55", password: "anna"}, (err,exist,user) => {
            
            
            assert.isNull(err);
            assert.isFalse(exist);
            assert.strictEqual(user.email,"thanusa@gmail.com" );

            return done();
        })
    })



})