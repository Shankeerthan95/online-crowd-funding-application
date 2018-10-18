const express = require('express')
const signupRouter = express.Router();
const { createUser } = require('../services/user-service');


//URL /api/v1/auth/signup
signupRouter.post('/', (req, res) => {
    
    
    if (!req.body.user)
    {
              
        res.status(401).send({message: "Error, body doesn't contain user"});
        return;
    }

    createUser(req.body.user, (err, exist, user) => {
        if (err)
        {
            return res.status(500).send("Error in signup, Try again.");
        } 

        if (exist)
        {
            return res.status(401).send("Entered credentials already exist.");
        }

        if (user)
        {
            return res.status(200).json(user);
        }
    });

    
});




module.exports = signupRouter;
