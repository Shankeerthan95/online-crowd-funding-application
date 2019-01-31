const assert = require('assert')
const { validateUser } = require('../../../utils/services/validation');
const chai = require('chai');
const should = chai.should;



describe("Validate User fields exist or not", function(){
    describe("successful User object", function(){
        it("#should return true", function(){
            
            let user = {
                user_name: "shak",
                email: "shankeerthan@gmail.com",
                password: "shank",
                mobile_num : "0774941862"
            };

           assert.strictEqual(validateUser(user), true);

        });
    })

    describe("unsuccessful user object", function(){
        it('#should return false', function(){
            let user = {
                email: "shankeerthan@gmail.com",
                password: "shank",
                mobile_num : "0774941862"
            };

           assert.strictEqual(validateUser(user), false);
            
        });

        it('#should return false', function(){
            let user = {
                user_name: "shanke",
                password: "shank",
                mobile_num : "0774941862"
            };

           assert.strictEqual(validateUser(user), false);
            
        });

        it('#should return false', function(){
            let user = {
                user_name: "shanke",
                email: "shank@gmai.com",
                mobile_num : "0774941862"
            };

           assert.strictEqual(validateUser(user), false);
            
        });

        it('#should return false', function(){
            let user = {
                user_name: "shanke",
                password: "shank",
                email: "shank@gmail.com",
            };

           assert.strictEqual(validateUser(user), false);
            
        });
        

        
    })

})