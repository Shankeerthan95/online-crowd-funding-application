const mysql_connection_pool = require("../db/connect");

/*
*   This method wiil invoke when user post a post
*   amqp protocol 
*/
let initPaymentRecordForPost = ({post_id, user_id }) => {
  let sql =
    `insert into post_payments (post_id, user_id , total_amount)` +
    "values('" + post_id  + "'" + ", '" +  user_id + "' ," + "0)";

    console.log(sql);

  mysql_connection_pool.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
      return console.log("Error in index.js line 14");
    
    }
    console.log(results);
    console.log(fields);
  });
};

let persistPaymentForPost = payment => {
  let sql =
    `insert into payments ('post_id', 'payment_id', 'payer_id_paypal', 'payer_name', 'amount','donatedAt')` +
    `values(${payment.post_id}, ${payment.payment_id}, ${
      payment.payer_id_paypal
    }, ${payment.payer_name}, ${payment.amount}, ${payment.donatedAt})`;

    mysql_connection_pool.query(sql, function(err, results, fields) {
        if (err) {
            return console.log('Error in index.js line: 30')
        }

        console.log(results);
        console.log(fields);

        //On success by amqp send total amount raised for post should sent post sevice
    })
};







let listRaisedAmountForUser = (user_id) => {

    let sql = `select post_id, amount from post_payments where user_id = ${user_id}`;

    mysql_connection_pool.query(sql, function(err, results, fields) {
        if (err) {
            return console.log('Error in index.js line: 64');
        }

        console.log(results);
        console.log(fields);

    })
}






module.exports = {
  initPaymentRecordForPost,
  persistPaymentForPost,
  listPayersForPost,
  listRaisedAmountForUser
};





