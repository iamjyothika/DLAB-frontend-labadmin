import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'; 
import { useState,useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "components/baseurl";


 function Doctorl() {
  const[doctor,setDoctor]=useState([]);
  const navigate = useNavigate();
  const token=sessionStorage.getItem('token');
  


  const handleButtonClick = () => {
    // Navigate to the desired route
    navigate('/doctor');
  };
  useEffect(() => {
    if (token){
      axios.get(`${BASE_URL}/lab/docter/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        setDoctor(response.data)
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
    


  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Discover Skilled Medical Professionals</h1>
        <p style={{lineHeight:"42px",fontWeight:"bold"}}>Browse through our roster of experienced doctors and specialists.</p>
        <Button onClick={handleButtonClick} style={styles.button} variant="success">
         + Add Doctor
        </Button>
      </div>
      <div className="container" style={{ 
  marginTop: "60px", 
  padding: "0 40px",
  display: "grid", 
  gridTemplateColumns: "repeat(3, 1fr)", 
  gridGap: "20px" 
}}>
  {doctor.map((member, index) => (
    <Card key={index} style={{ 
      padding: "20px", 
      textAlign: "center", 
      borderRadius: "10px", 
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
    }}>
      <Card.Body>
        <div className="team-img" style={{ marginBottom: "15px" }}>
          <img 
            src={member.doctorimage} 
            style={{ 
              height: "120px", 
              width: "120px", 
              objectFit: "cover", 
              borderRadius: "50%" 
            }} 
            alt={member.name} 
          />
        </div>
        <div className="team-info">
          <h4 style={{ color: "green", margin: "10px 0" }}>{member.doctorname}</h4>
          <h6 style={{ fontSize: "12px", color: "#555" }}>{member.qualification}</h6>
          <h6 style={{ color: "#777" }}>{member.specialiazation}</h6>
        </div>
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
  
};
export default Doctorl;
