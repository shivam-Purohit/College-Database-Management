import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import iiitnImage from '../components/Indian_Institute_of_Information_Technology,_Nagpur_Logo.jpg';

const Home = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    marginTop: '12em',
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

  const mainCardsStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow cards to wrap onto the next line
    margin: '10px',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
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
  // Footer styles
  const footerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent : "space-evenly",
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    marginTop: '20px',
    textAlign: 'center',
  };

  const imageStyle = {
    marginRight: '20px', // Adjust the margin as needed
    height: '150px', // Adjust the height as needed
  };
  const rightStyle = {
// Adjust the margin as needed
    width : '20em',
  };

  const navigate = useNavigate();

  const navigateToContacts = () => {
    // 👇️ navigate to /contacts
    navigate('/login');
  };

  // State to manage the list of cards
  const [cards, setCards] = useState([]);

  // Example: Fetch data from the backend and update the cards state
  useEffect(() => {
    // Replace this with your actual API call
    const fetchData = async () => {
      try {
        // Example API endpoint, replace with your actual endpoint
        const response = await axios.get('http://localhost:8000/getannouncement');
        console.log(response.data);
        // const data = await response.data.json();

        // console.log(data)
        // Update the cards state with the fetched data
        setCards( response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div id="main-page">
      <div style={containerStyle}>
        <h1 style={titleStyle}>Welcome to the College Management System</h1>
        <div style={buttonContainerStyle}>
          <button style={adminButtonStyle} onClick={navigateToContacts}>
            Admin
          </button>
          <button style={teacherButtonStyle} onClick={navigateToContacts}>
            Teacher
          </button>
          <button style={studentButtonStyle} onClick={navigateToContacts}>
            Student
          </button>
        </div>
      </div>
      <div id="announcement">
        <h1 id="announcement-heading"> News and Announcement</h1>
        <div style={mainCardsStyle}>
          {/* Map through the cards array and create a Card component for each */}
          {cards.map((card) => (
            <Card key={card.id} border="primary" style={{ width: '18rem', margin: '1em' }}>
              <Card.Body>
                <Card.Title>{card.AnnouncementHeading}</Card.Title>
                <Card.Text>{card.AnnouncementText}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <footer style={footerStyle} id='footer'>
        {/* Image on the left */}
        <img src={iiitnImage} alt="Image for IIITN" style={imageStyle} />

        {/* Content on the right */}
        <div style={rightStyle}>
          <p>Permanent Address: Survey No. 140,141/1 behind Br. Sheshrao Wankhade Shetkari Sahkari Soot Girni, Village - Waranga, PO - Dongargaon(Butibori), Tahsil- Nagpur (Rural), District Nagpur, Maharashtra- 441108</p>
          <p>📱 9405215010</p>
          <p>𝕏  ⓕ  💼 </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
