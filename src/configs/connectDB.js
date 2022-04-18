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
const connection = mysql.createPool({
    host: '103.81.84.104',
    user: 'rida080',
    password: 'y4PRMeU75FGe',
    database: 'ridanode'
});
export default connection;