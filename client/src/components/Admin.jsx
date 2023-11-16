import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

export const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false); 
  const [announcementHeading, setAnnouncementHeading] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [announcement, setAnnouncement] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Clear form fields on modal close
    setEmail('');
    setRole('');
    setPassword('');
    setConfirmPassword('');
  };
  const handleShowAnnouncementModal = () => {
    setShowAnnouncementModal(true);
  };

  const handleCloseAnnouncementModal = () => {
    setShowAnnouncementModal(false);
    // Clear form fields on modal close
    setAnnouncement('');
  };
  const verifyPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords should match!');
    } else {
      console.log(email);
      console.log(password);
      console.log(role);

      try {
        const result = await axios({
          method: 'POST',
          url: 'http://localhost:8000/createuser',
          data: {
            userEmail: email,
            userPassword: password,
            userRole: role,
          },
        });
        console.log(result.data.msg);
        alert(result.data.msg);
      } catch {
        console.log('Failed');
      }

      handleCloseModal();
    }
  };
  const addAnnouncement = async (e) => {
    e.preventDefault();
    // Add logic to handle the submission of announcements (e.g., send to backend)
    try {
      const result = await axios({
        method: 'POST',
        url: 'http://localhost:8000/addannouncement',
        data: {
          announcementHeading: announcementHeading,
          announcementText: announcement,
        },
      });
      console.log(result.data);
      alert(result.data.msg);
    } catch (error) {
      console.log('Failed to add announcement');
    }

    handleCloseAnnouncementModal();
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row', // Updated to row
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Add User Button */}
      <div style={{ marginRight: '10px' }}>
        <Button variant="primary" onClick={handleShowModal}>
          Add User
        </Button>
      </div>
  
      {/* Add Announcement Button */}
      <div>
        <Button variant="info" onClick={handleShowAnnouncementModal}>
          Add Announcement
        </Button>
      </div>

      {/* Add User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={verifyPassword}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridRollNumber">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Add User Mail"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridDepartment">
                <Form.Label>Choose Department</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Re-Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
            {/* Add Announcement Modal */}
            <Modal show={showAnnouncementModal} onHide={handleCloseAnnouncementModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Announcement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addAnnouncement}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAnnouncementHeading">
              <Form.Label>Announcement Heading</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Announcement Heading"
                onChange={(e) => {
                  setAnnouncementHeading(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridAnnouncementText">
              <Form.Label>Announcement Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your announcement text here..."
                onChange={(e) => {
                  setAnnouncement(e.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Add Announcement
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default Admin;
