import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export const Admin = () => {

const [email, setEmail] = useState('');
const [role, setRole] = useState('');
const [password, setPassword] = useState('');
const [confirmpassword, setConfirmPassword] = useState('');

const verifyPassword = async(e) => {
e.preventDefault();
  if (password !== confirmpassword) {
    alert("Password should match!");
  }

  else{
    console.log(email);
    console.log(password);
    console.log(role);

    try{
      const result = await axios({
        method: "POST",
        url : 'http://localhost:8000/createuser',
        data : {
          userEmail : `${email}`,
          userPassword : `${password}`,
          userRole: `${role}`
        }
        
      })
      console.log(result.data.msg);
      alert(result.data.msg);
     } catch{
      console.log('failed')
     }
  }
};

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center' }}>Add User</h1>
      <Form action='POST'>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridRollNumber">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Add User Mail" onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDepartment">
            <Form.Label>Choose Department</Form.Label>
            <Form.Select defaultValue="Choose..." onChange={(e)=>{
              setRole(e.target.value);
            }}>
              <option>Choose...</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >Create Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id = "first_password" onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >Re-Enter Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id = "second_password" onChange={(e)=>{
              setConfirmPassword(e.target.value)
            }}/>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={verifyPassword}>
          Submit
        </Button>
      </Form>
    </div>
  );
  
}
 export default Admin;