
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysqlshivam@1131',
    database: 'auth'
}).promise();


async function showUsersData(){
    const result = await pool.query(`select role from users where users.email = "bt21cse@iiitn.ac.in"`);
    // console.log(result);
    return result[0];
}   
async function showUserRole(email){
    const result = await pool.query(`select role from users where users.email = ?`, [email]);
    return result[0];
}
module.exports= {showUsersData, showUserRole};