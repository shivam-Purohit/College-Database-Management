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
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteAnnouncementModal, setShowDeleteAnnouncementModal] = useState(false);
  // Add state variables for user and announcement deletion
  const [userToDelete, setUserToDelete] = useState('');
  const [announcementToDelete, setAnnouncementToDelete] = useState('');
  // Add state variable for input in delete announcement modal
  const [deleteAnnouncementInput, setDeleteAnnouncementInput] = useState('');
  const [deleteUserInput, setDeleteUserInput] = useState('');

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

  const handleShowDeleteUserModal = (email) => {
    console.log(email);
    console.log(deleteUserInput)
    setShowDeleteUserModal(true);
    setUserToDelete(email);
  };

  
  const handleCloseDeleteUserModal = () => {
    setShowDeleteUserModal(false);
    setUserToDelete('');
  };

  const handleShowDeleteAnnouncementModal = () => {
    setShowDeleteAnnouncementModal(true);
  };

  const handleCloseDeleteAnnouncementModal = () => {
    setShowDeleteAnnouncementModal(false);
    // Clear form field on modal close
    setDeleteAnnouncementInput('');
  };

    const deleteUser = async () => {
    // Implement logic to delete user based on email (userToDelete)
    try {
      const result = await axios({
        method: 'DELETE',
        url: 'http://localhost:8000/deleteuser',
        data: {
          userEmail: deleteUserInput,
        },
      });
      console.log(result.data);
      alert(result.data.msg);
    } catch (error) {
      console.log('Failed to delete user');
    }

    handleCloseDeleteUserModal();
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



  const deleteAnnouncement = async () => {
    // Implement logic to delete announcement based on ID (announcementToDelete)
    try {
      console.log(deleteAnnouncementInput)
      const result = await axios({
        method: 'DELETE',
        url: 'http://localhost:8000/deleteannouncement',
        data: {
          announcementId: deleteAnnouncementInput,
        },
      });
      console.log(result.data);
      alert(result.data.msg);
    } catch (error) {
      console.log('Failed to delete announcement');
    }

    handleCloseDeleteAnnouncementModal();
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
        background: `url('https://iiitn.ac.in/images/album/independence-day2023//6.jpg') center/cover`, // Replace 'your-background-image.jpg' with your image URL
        color: 'white',
      }}
    >
      {/* Add User Button */}
      <div style={{ marginRight: '10px' }}>
        <Button variant="primary" onClick={handleShowModal}>
          Add User
        </Button>
      </div>

      {/* Add Announcement Button */}
      <div style={{ marginRight: '10px' }}>
        <Button variant="info" onClick={handleShowAnnouncementModal}>
          Add Announcement
        </Button>
      </div>

      {/* Add Delete User Button */}
      <div style={{ marginRight: '10px' }}>
        <Button variant="danger" onClick={() => handleShowDeleteUserModal(email)}>
          Delete User
        </Button>
      </div>

      {/* Add Delete Announcement Button */}
      <div>
        <Button variant="danger" onClick={() => handleShowDeleteAnnouncementModal(1)}>
          Delete Announcement
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

      {/* Delete User Modal */}
      <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          <Button variant="danger" onClick={deleteUser}>
            Yes, Delete
          </Button>
        </Modal.Body>
      </Modal>

      {/* Delete Announcement Modal */}
      <Modal show={showDeleteAnnouncementModal} onHide={handleCloseDeleteAnnouncementModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Announcement ID to Delete</Form.Label>
              <Form.Control
                type="text"
                placeholder="Announcement ID"
                value={deleteAnnouncementInput}
                onChange={(e) => setDeleteAnnouncementInput(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="danger" onClick={deleteAnnouncement}>
            Yes, Delete
          </Button>
        </Modal.Body>
      </Modal>
            {/* Delete User Modal */}
            <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter User Email to Delete</Form.Label>
              <Form.Control
                type="text"
                placeholder="User Email"
                value={deleteUserInput}
                onChange={(e) => setDeleteUserInput(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button variant="danger" onClick={deleteUser}>
            Yes, Delete
          </Button>
        </Modal.Body>
      </Modal>

    </div>
  );
};

export default Admin;