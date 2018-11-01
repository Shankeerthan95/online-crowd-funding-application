const Post = require('../db/models/post-model');

let findPosts = (params, cb) => {

    //Todo: it should return amount raised and target by using message broker
    Post.find({}, '_id title image_urls campaign_location description target_amount')
    .sort({'timestamp': -1})
    .skip(params.perPage * params.currentPage)
    .limit(params.perPage)
    .exec(function(err, posts) {
        if (err) {
            cb(err);
        }
        cb(null, posts);
    });
}

let findById = (id, cb) => {

    Post.findById(id, function(err, post) {
        if (err) {
          return  cb(err);
        } 

        return cb(null, post);

    });
}


let findNew = (params, cb) => {

    Post.find({}, '_id title image_urls campaign_location description target_amount')
    .sort({'timestamp': -1})
    .limit(params.limit)
    .exec(function(err, posts) {
        if (err) {
          return console.log(err);
        } 

        return console.log(posts);

    })
}




module.exports = {
    findPosts,
    findById,
    findNew
}