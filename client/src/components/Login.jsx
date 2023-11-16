import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState('someemail');
  const [password, setPassword] = useState('somepassword');
  const navigate = useNavigate();
  async function submit (e) {
    e.preventDefault();
    // console.log(email);
    // console.log(password);

    try{
        const result = await axios({
          method : "POST",
          url: "http://localhost:8000/getuserrole",
          data : {
            userEmail : email,
            userPassword: password,
          }
        })
        // console.log(result.data);
        if(result.data === "student"){
          console.log(email);
          navigate("/student", { state: { userEmail: email } });
        }
        if(result.data === "teacher"){  
          navigate("/teacher")
        }
        if(result.data === "admin"){
          navigate("/admin")
        }
    }catch{
      console.log("got error");
    }
  }
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f0f0f0', /* Change this color to suit your design */
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <Form action='POST'>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridRollNumber">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter College Mail" onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Choose...</option>
              <option value="computerscience">Computer Science</option>
              <option value="electronics">Electronics and Communication</option>
              <option value="mathematics">Mathematics</option>
              {/* Add other department options as needed */}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{
              setPassword(e.target.value);
            }}/>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" onClick={submit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
