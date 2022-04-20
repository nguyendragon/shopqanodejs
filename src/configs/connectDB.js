// import mysql from 'mysql2';
import mysql from 'mysql2/promise';

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ridanode'
// });

// const pool = mysqlPool.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ridanode'
// }); 

// local
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ridanode'
});

// vps
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'rida080gjbq_9wfq',
//     password: 'fh00SmxE3rc3QO',
//     database: '9wfq_rida080gjbq'
// });

export default connection;