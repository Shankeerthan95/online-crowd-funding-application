const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const { createUser } = require('../../../services/user-service');

describe('check', () => {
    it ('should console. log ', () => {
        createUser({user_name: 'shf', email: "shf@gmail.com", mobile_num: "04455995", password: "hfs"})
        .then(result => {
            console.log(result);
           
        })
        .catch(err => {
            console.log(err);

            
        })

    })
})




