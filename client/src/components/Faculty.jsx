import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function FacultyPage() {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    // Replace the placeholder URL with the actual URL of your backend API
    const apiUrl = 'http://localhost:8000/getfaculty';
    
    // Fetch faculty data from the backend
    axios.get(apiUrl)
      .then(response => setFacultyData(response.data))
      .catch(error => console.error('Error fetching faculty data:', error));
  }, []);

  return (
    <Container style={{ marginTop : '5em', marginBottom : '5em'  }}>
      <Row>
        {facultyData.map((faculty, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={faculty.ImageUrl} style={{ height: '15em' }} alt={faculty.Name} />
              <Card.Body>
                <Card.Title>{faculty.Name}</Card.Title>
                <Card.Title>{faculty.Department}</Card.Title>
                <Card.Text>{faculty.Description}</Card.Text>
                <Button variant="primary">View Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default FacultyPage;
