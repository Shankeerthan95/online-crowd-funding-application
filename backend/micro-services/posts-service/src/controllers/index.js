const express = require('express');
const router = express();
const createPost = require('../services/createPost');
const { findPosts, findById } = require('../services/find');

router.post('/new', (req, res) => {

    
    if (!req.body.post) {

        
        return res.status(400).end("post obj not exist");
    }

   
    createPost(req.body.post, function(err, post) {

        if (err) {
            return  res.json(err.message);
        }

        return  res.json(post);



    });
    
})

/*
*   1 post - random for every request 
*   newers posts 10
*   gaining momentum 10
*   successfull 5
*/
router.get('/posts/home', (req, res) => {

});


//Todo : for simplicity now i skip req params
router.get('/posts', (req, res) => {

    
    if (req.query.page && req.query.limit){
        findPosts({perPage:  Number.parseInt(req.query.limit) , currentPage: Number.parseInt(req.query.page) }, (err, posts) => {

            if (err) {
                //todo: 
                return res.status(400).end("Error");
            }

            return res.status(200).json(posts);

        })
    }
    
    

})

//Todo: for simplicity i skip raised amout by collecting message from payment service
router.get('/posts/:id', (req, res) => {
   
    findById(req.params.id, (err, post) => {
        
        if (err) {
            //Todo: change status codes and meaningful error messages
            return res.status(400).end("Error");
        }

        return res.status(200).json(post);


    });
})









module.exports = router;

