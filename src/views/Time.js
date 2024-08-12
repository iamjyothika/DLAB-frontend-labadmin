import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'; 
import { useState,useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "components/baseurl";


 function Timeslotl() {
  const[slot,setSlot]=useState([]);
  const navigate = useNavigate();
  const token=sessionStorage.getItem('token');
  


  const handleButtonClick = () => {
    // Navigate to the desired route
    navigate('/timeslot');
  };
  useEffect(() => {
    if (token){
      axios.get(`${BASE_URL}/lab/timeslot/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        setSlot(response.data)
    })
    .catch((error) => {
      console.error('Error fetching tests:', error);
      // Handle error, possibly redirect to login if unauthorized
    });
  } else {
    console.error('Token not found. Please login again.');
    // Redirect to login if token is not found
    navigate('/login');
  }
}, [navigate, token]);
const formatDateTime = (dateTimeString) => {
const [date, time] = dateTimeString.split('T');
  const [hours, minutes] = time.split(':');
  const ampm = +hours >= 12 ? 'PM' : 'AM';
  const formattedHours = +hours % 12 || 12;
  return `${date} ${formattedHours}:${minutes} ${ampm}`;
};
    
   




return (
    <div style={styles.pageContainer}>
    <div style={styles.header}>
      <h1 style={styles.heading}>Find the Perfect Time for Your Medical Needs</h1>
      <p style={{ lineHeight: "42px", fontWeight: "bold" }}>
        Schedule your appointments with ease. Check available timeslots and book your visit with our top-notch medical professionals today.
      </p>
      <Button onClick={handleButtonClick} style={styles.button} variant="success">
        + Add Timeslot
      </Button>
    </div>
  
  
    <div style={styles.cardContainer}>
        {slot.map((time) => (
          <Card key={time.id} style={styles.card}>
            <Card.Body>
             <Card.Text>
               <b>Start Time: {formatDateTime(time.start_time)}</b>
              </Card.Text>
              <Card.Text><b>End Time: {formatDateTime(time.end_time)}</b></Card.Text>
              <Card.Text><b>Maximum Clients: {time.max_clients}</b></Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
const styles = {
  pageContainer: {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  heading: {
    margin: 0,
    fontSize: '2rem'
  },
  button: {
    marginTop: '4px',
    color:'white'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '300px',
    cursor: 'pointer'
  }
  
};
export default Timeslotl;

















