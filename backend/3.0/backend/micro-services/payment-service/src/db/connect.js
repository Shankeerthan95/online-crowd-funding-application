//Initate mqsql connection pool
const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'payment_service'
// })

// connection.connect();

const mysql_connection_pool   = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    database        : 'payment_service'
  });
   




module.exports=  mysql_connection_pool;