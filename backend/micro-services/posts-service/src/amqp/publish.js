const amqp = require('amqplib/callback_api');
const { ON_POST_CREATED }  = require('./evetTypes');


let onPostCreated = (msg, cb) => {

    amqp.connect('amqp://rabbit', function(err, conn) {

        if (err) {
            return cb(err);
        }

        conn.createChannel(function(err, ch) {

            if (err) {
                return cb(err);
            }

            let ex = 'post-direct';

        ch.assertExchange(ex, 'direct',{durable: false} );
        ch.publish(ex, ON_POST_CREATED , new Buffer(JSON.stringify(msg)));


        })

        setTimeout(function() { conn.close(); process.exit(0) }, 2000);
        
    })


}




module.exports = {
    onPostCreated
}