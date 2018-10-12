const mongoose = require('mongoose');


//Todo: mobile_num can  be used to  provide two step verification
const UserSchema = mongoose.Schema({
    user_name: { type: String},
    email: {type: String, required: true},
    password_hash: {type: String, required: true},
    verified: { type: Boolean, required: false},
    mobile_num: {type: String, required: true}
});






module.exports = UserSchema;
