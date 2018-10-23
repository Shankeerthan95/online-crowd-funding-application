const amqp = require('amqplib/callback_api');

const USER_SIGNUP = 'signup';


amqp.connect('amqp://localhost', function(err, connection) {
    if (err) {
        console.log(err);
    }

    connection.createChannel(function(err, channel) {
        if (err) {
            console.log(err);
        }

        channel.assertExchange(USER_SIGNUP,'fanout',{durable: false});
        channel.assertQueue('', {exclusive: true}, function(err, queue) {

            channel.bindQueue(queue.queue, USER_SIGNUP);

            channel.consume(queue.queue, function(msg) {
                console.log('----------------------------------------------------------------------')
                console.log(msg.content.toString());
            })
        })

    })
});
