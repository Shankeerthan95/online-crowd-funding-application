const express = require('express');
const passport = require('passport');
const { findByEmail }  = require('../services/user-service');
const loginRouter = express.Router();


//URL /api/v1/auth/login
loginRouter.post('/', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        
        
        
        if (err) {
            res.json(err);
            return next(err);
        }
        


        if (info)
        {
            res.status(401).json(info);
            return next();
        }

        //Success
        res.status(200).json(user.generateJwt());

        return next();
        
    })(req, res, next);
})






module.exports = loginRouter;