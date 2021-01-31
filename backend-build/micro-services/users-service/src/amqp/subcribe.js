const amqp = require("amqplib/callback_api");
const { ON_POST_CREATED } = require("./eventTypes");

const USER_SIGNUP = "signup";
const POST_DIRECT_EX = "post-direct";

let onUserSignup = cb => {
  amqp.connect(
    "amqp://rabbit",
    function(err, connection) {
      if (err) {
        return console.log(err);
      }

      connection.createChannel(function(err, channel) {
        if (err) {
          return console.log(err);
        }

        channel.assertExchange(USER_SIGNUP, "fanout", { durable: false });
        channel.assertQueue("", { exclusive: true }, function(err, queue) {
          channel.bindQueue(queue.queue, USER_SIGNUP);

          channel.consume(queue.queue, function(msg) {
            cb(msg);
          });
        });
      });
    }
  );
};

let onPostCreated = cb => {
  amqp.connect("amqp://rabbit",
    function(err, conn) {
      if (err) {
        return console.log("Error in subcribe.js line: 38");
        cb(err);
      }

      conn.createChannel(function(err, ch) {

        if (err) {
            return console.log("Error in subcribe.js line: 38");
            cb(err);
        }

        ch.assertExchange(POST_DIRECT_EX, "direct", { durable: false });
        ch.assertQueue("", { exclusive: true }, function(err, q) {
          ch.bindQueue(q.queue, POST_DIRECT_EX, ON_POST_CREATED);

          ch.consume(
            q.queue,
            function(msg) {
              
              cb(null, msg);
            },
            { noAck: true }
          );
        });
      });
    }
  );
};

module.exports = {
  onUserSignup,
  onPostCreated
};
