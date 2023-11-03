
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysqlshivam@1131',
    database: 'auth'
}).promise();


async function showUsersData(){
    const result = await pool.query(`select * from users`);
    return result[0];
}   
async function showUserRole(email){
    const result = await pool.query(`select role from users where users.email = ?`, [email]);
    return result[0];
}
async function createUser(email, password ,role){
    try{
        const result = await pool.query(`insert into users (email, password, role) values (?, ?, ?)`,[email, password, role])
        console.log(!result.sqlMessage);
        return "user was created";
    }
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
}
module.exports= {showUsersData, showUserRole, createUser};