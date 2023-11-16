import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function Student() {
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [resultType, setResultType] = useState('');

  const handleResultClick = async (type) => {
    try {
      let result;
      if (type === 'result') {
        result = await axios.get("http://localhost:8000/getresult", {
          studentID: 1,
        });
      } else if (type === 'attendance') {
        result = await axios.get("http://localhost:8000/getattendance", {
          studentID: 1, 
        });
      }
      setResultData(result.data);
      setResultType(type);
      setShowResultModal(true);
    } catch (error) {
      console.error(`Error fetching student ${type}:`, error);
    }
  };

  const handleResultClose = () => {
    setShowResultModal(false);
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
        <Button variant="primary" onClick={() => handleResultClick('result')}>
          Get Result
        </Button>
        <Button variant="success" onClick={() => handleResultClick('attendance')} style={{ marginLeft: '10px' }}>
          Get Attendance
        </Button>
      </div>

      {/* Student Result or Attendance Modal */}
      <Modal show={showResultModal} onHide={handleResultClose}>
        <Modal.Header closeButton>
          <Modal.Title>{resultType === 'result' ? 'Student Result' : 'Student Attendance'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>{resultType === 'result' ? 'Course Name' : 'Course Name'}</th>
                <th>{resultType === 'result' ? 'Total Score' : 'Attendance Percentage'}</th>
                <th>{resultType === 'result' ? 'Grade' : 'Date'}</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((result, index) => (
                <tr key={index}>
                  <td>{resultType === 'result' ? result.CourseName : result.CourseName}</td>
                  <td>{resultType === 'result' ? result.TotalScore : result.AttendancePercentage}</td>
                  <td>{resultType === 'result' ? result.Grade : result.Date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Student;
