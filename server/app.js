const express = require('express')
const {showUsersData, showUserRole} = require('./controllers/database')
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