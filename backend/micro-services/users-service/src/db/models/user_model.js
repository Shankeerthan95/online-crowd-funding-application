const mongoose = require('mongoose');
const userSchema = require('../schema/user_schema');

const PersonOrOrganization = new mongoose.model('PersonOrganization', userSchema);




module.exports = PersonOrOrganization;


