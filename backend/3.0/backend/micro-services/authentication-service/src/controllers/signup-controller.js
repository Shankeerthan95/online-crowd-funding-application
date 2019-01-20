const express = require('express')
const signupRouter = express.Router();
const { pickUser } = require('../utils/controller/pick');
const { createUser } = require('../services/user-service');
const {onSignup } = require('../amqp/publish');


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
            return res.status(500).json(err.message);
            // return res.status(500).send("Error in signup, Try again.");
        } 

        if (exist)
        {
            return res.status(401).send("Entered credentials already exist.");
        }

        if (user)
        {

            onSignup(pickUser(req.body.user), (err,msg) => {
            console.log("working");

                if (err) {
                    res.send(err.message);
                }
                res.status(200).send(msg);
            })
        }
    });

    
});




module.exports = signupRouter;
