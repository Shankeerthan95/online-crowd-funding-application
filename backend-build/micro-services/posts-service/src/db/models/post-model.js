const mongoose = require('mongoose');
PostSchema = require('../schema/post-schema');



module.exports = mongoose.model('Post', PostSchema);



