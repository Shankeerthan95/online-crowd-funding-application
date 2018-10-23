const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    user_name: {type: String, required: true, max: 100, min: 10},
    email: {type: String, required: true, max: 300},
    mobile_num: { type: String, required: true, max: 10, min: 10},
    country: {type: String, required: true, max: 200},
    organization: {
        isOrganization: {type: Boolean},
        name: {type: String},
        isNonProfit: { type: Boolean},
        noOfMembers: {type: Number, min: 1},
        hasOffice: {type: Boolean },
        address: {
            street: { type: String},
            cityOrTown: { type: String},
            district: {type: String},
            stateOrProvince: { type: String},
            country:{ type: String},
            postalCode: { type: String}
        },
        descrption: {type: String, min: 1000},
    },
    social_medias: [
        {type: String}
    ]

});




module.exports = userSchema;


