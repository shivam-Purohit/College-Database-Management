import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop : '12em',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    width: '80%',
    maxWidth: '600px',
    margin: '50px auto',
  };

  const titleStyle = {
    color: '#333',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const adminButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ff6666',
    color: '#fff',
  };

  const teacherButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#66ccff',
    color: '#fff',
  };

  const studentButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#99ff99',
    color: '#333',
  };

  const handleLogin = (userType) => {
    // Perform actions based on the user type (e.g., redirect to login page)
    console.log(`Logging in as ${userType}`);
  };
  const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  };
  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to the College Management System</h1>
      <div>
        <button style={adminButtonStyle} onClick={navigateToContacts}>
          Admin
        </button>
        <button style={teacherButtonStyle} onClick={() => handleLogin('teacher')}>
          Teacher
        </button>
        <button style={studentButtonStyle} onClick={() => handleLogin('student')}>
          Student
        </button>
      </div>
    </div>
  );
};

export default Home;
