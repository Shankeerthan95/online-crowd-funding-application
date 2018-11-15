const Post = require('../db/models/post-model');
const { validatePost } = require('../utils/services/validation');




//Todo : publish and get _id of posted person in other services

const createPost = (post_body, cb) => {

    if (!validatePost(post_body)) {
        return cb("Request doesn't fulfill");
    }

    new Post(post_body).save(function(err, post) {
        if (err) {
            cb(err);
            return;
        }

       return  cb(null, post);
    })

}



module.exports = createPost;
