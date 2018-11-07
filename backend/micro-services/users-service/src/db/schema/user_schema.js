const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    user_name: {type: String, required: true, max: 100, min: 10},
    email: {type: String, required: true, max: 300},
    mobile_num: { type: String, required: true, max: 10, min: 10},
    country: {type: String, required: true, max: 200},
    person: {
        firstName: { type: String},
        lastName: { type: String},
    },
    address: {
        street: { type: String},
        cityOrTown: { type: String},
        district: {type: String},
        stateOrProvince: { type: String},
        country:{ type: String},
        postalCode: { type: String}
    },
    organization: {
        
        name: {type: String},
        isNonProfit: { type: Boolean},
        noOfMembers: {type: Number, min: 1},
        hasOffice: {type: Boolean },
        description: {type: String, min: 1000},
    },
    social_medias: [
        {type: String}
    ],
    posts: [ {
        post_id: {type: String},
        title: {type: String},
        timestamp: {type: Date }
    }]

});




module.exports = userSchema;


