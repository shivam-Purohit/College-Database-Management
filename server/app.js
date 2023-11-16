const express = require('express')
const {showUsersData, showUserRole, createUser, updateMarks, GetAllMarks, AddAnnouncement, GetAnnouncement, GetResult, GetAttendence, GetFaculty} = require('./controllers/database')
const app  = express();
const PORT = 8000;
const page_routes = require('./routes/page')
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');

// Use bodyParser to handle JSON data
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`started at port : ${PORT}`)
})

// app.get("", (req, res)=>{
//     res.json({"users" : ["userone", "usertwo", "userthree"]});
// })

app.use("/api/auth", page_routes);

app.get('/getusersdata', async (req, res)=>{
    const usersdata = await showUsersData();
    console.log(usersdata[0].role);
})

app.post('/getuserrole', async(req, res)=>{
    // const email = "bt21cse@iiitn.ac.in";
    console.log(req.body)
    const email = req.body.userEmail;
    const userdata = await showUserRole(email);
    console.log(userdata);
    const role = userdata[0].role
    // // console.log(role);
    // // res.json({"role":`${role}`})
    res.send(role)
})

app.post('/createuser', async(req, res)=>{
    // console.log(req.body)
    const email = req.body.userEmail;
    const password = req.body.userPassword;
    const role = req.body.userRole;
    const userdata = await createUser(email, password, role);
    // const role = userdata[0].role
    // // console.log(role);
    // // res.json({"role":`${role}`})
    res.json({"msg":`${userdata}`})
})

app.post('/updatemarks', async (req, res)=>{
    const { studentID, examID, TotalScore, Grade} = req.body;
    const result = await updateMarks(studentID, examID, TotalScore, Grade);
    console.log("result is :",result);
    res.json({'msg' : `marks updated for the studentID : ${studentID}!`})
});
app.get('/getallmarks', async (req, res)=>{
    const result = await GetAllMarks();
    console.log("result is :", result);
    res.send(result)
});

app.post('/addannouncement', async (req, res)=>{
    console.log(req.body.announcementText)
    const announcementHeading = req.body.announcementHeading;
    const announcementText = req.body.announcementText;
    const result = await AddAnnouncement(announcementHeading, announcementText);
    console.log("result is :", result);
    res.json({'msg' : 'added announcement'})
});

app.get('/getannouncement', async (req, res)=>{
    console.log('i am database')
    const result = await GetAnnouncement();
    console.log("result is :", result);
    res.send(result)
});
app.get('/getresult', async (req, res)=>{
    const StudentID  = 1;
    const result = await GetResult(StudentID);
    console.log("result is :", result);
    res.send(result)
});
app.get('/getattendance', async (req, res)=>{
    const StudentID  = 1;
    const result = await GetAttendence(StudentID);
    console.log("result is :", result);
    res.send(result)
});
app.get('/getfaculty', async (req, res)=>{
    const result = await GetFaculty();
    console.log("result is :", result);
    res.send(result)
});