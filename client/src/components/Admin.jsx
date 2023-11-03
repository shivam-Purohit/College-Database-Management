import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Admin = () => {
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
            <Form.Control type="email" placeholder="Enter College Mail" />
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
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
  
}
 export default Admin;