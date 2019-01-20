const express = require('express');
const router = express.Router();

const { findByUserName, findByUserById} =  require('../services/find');



//Response full details of user
router.get('/:id', (req, res) => {
    
    return findByUserById(req.params.id, (err, user) => {

        if (err) {
            return res.send("Error in controllers/index.js line: 14");
        }

        return res.json(user);

    })

})


//Response only payments and posts
router.get('/:id/summary', (req, res) => {
    console.log(req.params.id);
})


router.get('/:id/posts', (req, res) => {
    console.log(req.params.id);
})

router.get('/:id/payments', (req, res) => {
    console.log(req.params.id);
})



//Use this api to update user infomation
router.put('/:id/update', (req, res) => {

})








module.exports = router;