import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from "axios";

function Teacher() {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [examId, setExamId] = useState('');
  const [marksToUpdate, setMarksToUpdate] = useState('');
  const [gradeToUpdate, setGradeToUpdate] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [allMarks, setAllMarks] = useState([]);


  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => {
    setShowUpdateModal(false);
    // Clear form fields on modal close
    setStudentId('');
    setExamId('');
    setMarksToUpdate('');
    setGradeToUpdate('');
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    // Add logic to handle the submission of updated marks (e.g., send to backend)
    try{
      const result = await axios({
        method : "POST",
        url: "http://localhost:8000/updatemarks",
        data : {
          studentID : studentId,
          examID: examId,
          Grade: gradeToUpdate,
          TotalScore : marksToUpdate
        }
      })
      console.log(result.data);
      alert(result.data.msg);
    }catch{
      console.log('error');
    }
    console.log('Updating marks:', studentId, examId, marksToUpdate);
    // Close the modal after submission
    handleUpdateClose();
  };
  const handleViewClick = async () => {
    // Add logic to fetch and set all student marks from the backend
    try {
      const result = await axios.get("http://localhost:8000/getallmarks");
      setAllMarks(result.data);
      console.log(result);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching student marks:', error);
    }
  };

  const handleViewClose = () => {
    setShowViewModal(false);
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
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <Button variant="primary" onClick={handleUpdateClick}>
          Update Student Marks
        </Button>
        <Button variant="success" onClick={handleViewClick} style={{ marginLeft: '10px' }}>
          View All Student Marks
        </Button>
      </div>


      {/* Update Marks Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Student Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="examId">
              <Form.Label>Exam ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Exam ID"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="marksToUpdate">
              <Form.Label>Marks to Update</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Marks"
                value={marksToUpdate}
                onChange={(e) => setMarksToUpdate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="gradeToUpdate">
              <Form.Label>Marks to Update</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Grade"
                value={gradeToUpdate}
                onChange={(e) => setGradeToUpdate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Marks
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showViewModal} onHide={handleViewClose}>
        <Modal.Header closeButton>
          <Modal.Title>All Student Marks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Total Score</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {allMarks.map((mark, index) => (
                <tr key={index}>
                  <td>{mark.StudentName}</td>
                  <td>{mark.CourseName}</td>
                  <td>{mark.TotalScore}</td>
                  <td>{mark.Grade}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Teacher;
