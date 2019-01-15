const amqp  = require('amqplib/callback_api');

const USER_SIGNUP = 'signup';


//it publish message to Rabbitmq when client signup request is success
let onSignup = (msg,cb) => {

    amqp.connect('amqp://rabbit', function(err, connection) {
        if (err) {
            return cb (err);
        }

        connection.createChannel(function(err, channel) {
            if (err) {
                return cb(err);
            }

            channel.assertExchange(USER_SIGNUP, 'fanout', {durable: false});
            channel.publish(USER_SIGNUP,'', Buffer.from(JSON.stringify(msg)));
            return  cb(null, "Hello , created from rabbitmq");

        })

        setTimeout(function() {
            connection.close()
        }, 2000);
    })

}




module.exports = {
    onSignup
}