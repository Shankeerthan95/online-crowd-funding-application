const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostSchema = new Schema({
    title: {type: String, required: true},
    by: { type: String, required: true},
    user_id: {type: String, required: true},
    image_urls : [
        {type: String}
    ],
    video_urls: [
        {type: String}
    ],
    story: {
        type: String,
        min: 1000,
        required: true 
    },
    target_amount: {
        currency: { type: String, required: true},
        amount: { type: Number, required: true},
        collected_amount: { type: Number}

    },
    campaign_period: {
        start: {type:Date, required: true},
        end: {type: Date, required: true},
        
    },
    shares: {
        total: {type: Number},
        facebook: {type: Number},
        twitter: { type: Number}
    },
    comments: [
        {
            by: {type: String},
            body: {type: String, max: 1000, required: true },
            timestamp: {type: Date, required: true}
        }
    ],
    description: {
        type: String,
        required: true,
        min: 200,
        max: 1000
    },
    campaign_location: {
        country: [ {type: String}],
        places: [ {type: String }]
    },
    timestamp: {type: Date, default: Date.now}

});
    





module.exports =PostSchema;