const mongoose = require('mongoose');
const userSchema = require('../schema/user_schema');

const PersonOrOrganization = mongoose.model('PersonOrOrganization', userSchema);




module.exports = PersonOrOrganization;


