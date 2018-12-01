//Initate mqsql connection pool
const mysql = require('mysql');


const mysql_connection_pool   = mysql.createPool({
    connectionLimit : 20,
    host            : 'localhost',
    user            : 'root',
    database        : 'payment_service'
  });
   




module.exports=  mysql_connection_pool;