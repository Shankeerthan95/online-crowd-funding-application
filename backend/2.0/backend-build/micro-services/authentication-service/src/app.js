const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');


//To test
module.exports = app; 


setTimeout(() => {

    //Todo: it should be decoupled from source code
const PORT = 3000;


//Initiate mongoDb connection
require('./db/connect');


//Parse application/json ulrencoded
app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({extended: true}));


//Initialize passport 
app.use(passport.initialize())

//Import passport configuration
require('./config/passport-config');



//Import routes
const { signupRouter,loginRouter } = require('./controllers/index');
app.use('/api/v1/auth/signup', signupRouter);

app.use('/api/v1/auth/login', loginRouter);



app.listen(PORT, () => {
    console.log("App Listening on ", PORT);

},50000);

})



