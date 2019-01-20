const amqp = require("amqplib/callback_api");

const ON_POST_CREATED = require('./evetTypes');

const POST_DIRECT_EX = "post-direct";


let onPostCreated = cb => {
  
  amqp.connect('amqp://rabbit', function(err, connection) {
    if (err ) {
     console.log("Err in subscribe.js line 12");

     return cb(err);
    }
    
    connection.createChannel(function(err, channel) {

      if (err) {
         console.log("Error in subscribe.js line 18");
         return cb(err);
      }

      channel.assertExchange(POST_DIRECT_EX, "direct", { durable: false})
      channel.assertQueue("", {exclusive: true}, function(err, q) {

        channel.bindQueue(q.queue, POST_DIRECT_EX, 'onPostCreated');

        channel.consume(q.queue, function(msg) {
          return cb(null, msg);
        }, {noAck: true});
      })
    })
  })
  
};



module.exports = {
    onPostCreated
}