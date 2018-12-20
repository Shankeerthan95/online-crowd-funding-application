const Post = require("../db/models/post-model");

let findPosts = (params, cb) => {
  //Todo: it should return amount raised and target by using message broker
  Post.find(
    {},
    "_id title image_urls campaign_location description target_amount"
  )
    .sort({ timestamp: -1 })
    .skip(params.perPage * params.currentPage)
    .limit(params.perPage)
    .exec(function(err, posts) {
      if (err) {
        cb(err);
      }
      cb(null, posts);
    });
};

let findById = (id, cb) => {
  Post.findById(id, function(err, post) {
    if (err) {
      return cb(err);
    }

    return cb(null, post);
  });
};

//Find latest posts
let findNew = (params, cb) => {
  if (params.order === "dsc") {

    console.log("dsc");

    Post.find(
      {},
      "_id title image_urls campaign_location description target_amount"
    )
      .sort({ timestamp: -1 })
      .skip(params.perPage * params.limit)
      .limit(params.limit)
      .exec(function(err, posts) {
        if (err) {
          return cb(err);
        }

        return cb(null, posts);
      });
  } else if (order === "asc") {

    console.log("asc");

    Post.find(
      {},
      "_id title image_urls campaign_location description target_amount"
    )
      .sort({ timestamp: +1 })
      .skip(params.perPage * params.limit)
      .limit(params.limit)
      .exec(function(err, posts) {
        if (err) {
          return cb(err);
        }

        return cb(null, posts);
      });
  }
};

//TODO : IMPLEMENT  METHOD
let findSuccessfull = (params, cb) => {};

//TODO : IMPLEMENT METHOD
let findGainingMomentum = (params, cb) => {};

module.exports = {
  findPosts,
  findById,
  findNew
};
