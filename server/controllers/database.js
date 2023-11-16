
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

async function updateMarks(studentID, examID, TotalScore, Grade) {
    try {
  
      // Update the marks in the database
      const [result] = await pool.query(
        `UPDATE Marks
        SET TotalScore =  ? , Grade = ?
        WHERE StudentID = ? AND ExamID = ?;`,
        [TotalScore, Grade, studentID, examID]
      );
      console.log(result);
      return "marks updated!"
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };
async function GetAllMarks() {
    try {
  
      // Update the marks in the database
      const [result] = await pool.query(
        `SELECT
        Marks.MarksID,
        Student.StudentName,
        Exam.Date,
        Exam.Time,
        Course.CourseName,
        Marks.TotalScore,
        Marks.Grade
    FROM
        Marks
    JOIN
        Student ON Marks.StudentID = Student.StudentID
    JOIN
        Exam ON Marks.ExamID = Exam.ExamID
    JOIN
        Course ON Exam.CourseID = Course.CourseID;
    `
);
      console.log(result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };

async function AddAnnouncement(announcementHeading, announcementText) {
    try {
  
      // Update the marks in the database
      const [result] = await pool.query(
        `INSERT INTO announcement (announcementHeading, AnnouncementText) VALUES (?)`, 
        [[announcementHeading, announcementText]]
      );
      console.log(result);
      return "announcment added";
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };

  async function GetAnnouncement() {
    try {
  
      // Update the marks in the database
      const [result] = await pool.query(
        `select * from announcement`, 
        
      );
      console.log(result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };
  async function GetResult() {
    try {
      console.log("something")
      // Get the mark in the database
      const [result] = await pool.query(
        `SELECT
        Marks.MarksID,
        Student.StudentName,
        Exam.Date,
        Exam.Time,
        Course.CourseName,
        Marks.TotalScore,
        Marks.Grade
    FROM
        Marks
    JOIN
        Student ON Marks.StudentID = Student.StudentID
    JOIN
        Exam ON Marks.ExamID = Exam.ExamID
    JOIN
        Course ON Exam.CourseID = Course.CourseID
    WHERE
        Student.StudentID = 1;
    `
        
      );
      console.log("result in the database", result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };
  async function GetAttendence() {
    try {
      console.log("something")
      // Get the mark in the database
      const [result] = await pool.query(
        `SELECT
        sa.AttendanceID,
        sa.Date,
        sa.AttendancePercentage,
        c.CourseName
    FROM
        StudentAttendance sa
    JOIN
        Course c ON sa.CourseID = c.CourseID
    WHERE
        sa.StudentID = 1; 
    
    `
        
      );
      console.log("result in the database", result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };
  async function GetFaculty() {
    try {
  
      // Update the marks in the database
      const [result] = await pool.query(
        `select * from faculty`, 
        
      );
      console.log(result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };

  async function DeleteUser(userEmail) {
    try {
      console.log("useremail is:",userEmail)
      // Update the marks in the database
      const [result] = await pool.query(
        `DELETE FROM users
        WHERE email = ?;`,
        [userEmail]
        
      );
      console.log("result in db :", result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };
  async function DeleteAnnouncement(announcementId) {
    try {
      console.log("announcementid is:",announcementId)
      // Update the marks in the database
      const [result] = await pool.query(
        `DELETE FROM announcement
        WHERE AnnouncementID  = ?;`,
        [announcementId]
        
      );
      console.log("result in db :", result);
      return result;
    }   
    catch(e){
        const sqlerror = e.sqlMessage;
        console.log(sqlerror);
        return sqlerror;
    }
  };

module.exports= {showUsersData, showUserRole, createUser, updateMarks, GetAllMarks, AddAnnouncement, GetAnnouncement, GetResult, GetAttendence, GetFaculty, DeleteUser, DeleteAnnouncement};