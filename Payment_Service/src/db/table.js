const  mysql_connection_pool  = require("./connect");

let create_db = "create database payment_service;";
let use_db = "use payment_service;";
let drop_payments = "DROP TABLE IF EXISTS payment_service.payments;";
let drop_post_payments = "DROP TABLE IF EXISTS payment_service.post_payments;";
let create_payments_table =
  "create table payments(post_id varchar(30),payment_id varchar(30)," +
  "payer_id_paypal varchar(200),payer_name varchar(200),amount float,donatedAt datetime," +
  "primary key (payment_id));";
let create_post_payments_table =
  "create table  post_payments (user_id varchar(30)," +
  "post_id varchar(30), total_amount float, primary key (post_id));";


mysql_connection_pool.query(use_db, function(err, results) {
    if (err) {
        console.log("Error in line 18 table.js");
        console.log(err);
    }

    mysql_connection_pool.query(drop_payments, function(err, results) {
        if (err) {
            console.log("Error in line 24 table.js");
        }
        console.log(results);

        mysql_connection_pool.query(create_payments_table, function(err, results) {
            if (err) {
                console.log("Error in line 30 table.js");
            }
            console.log(results);
        })
    })

    mysql_connection_pool.query(drop_post_payments, function(err, results){
        if (err) {
            console.log("Error in line 38 table.js");
        }
        console.log(results);

        mysql_connection_pool.query(create_post_payments_table, function(err, results) {
            if (err) {
                console.log("Error in line 44 table.js");
            }

            console.log(results);
        })
    })


    console.log(results);
});




