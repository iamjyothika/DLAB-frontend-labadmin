import React, { useState,useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'; // Make sure to import the image
import { BASE_URL } from "components/baseurl";

function Tables() {
  const[tested,setTested]=useState([]);
  const navigate = useNavigate();
  const token=sessionStorage.getItem('token');
  

  const handleButtonClick = () => {
    // Navigate to the desired route
    navigate('/test');
  };
  useEffect(() => {
    if (token){
      axios.get(`${BASE_URL}/lab/tests/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        setTested(response.data)
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
        <h1 style={styles.heading}>Comprehensive Lab Testing</h1>
        <p style={{lineHeight:"42px",fontWeight:"bold"}}>Explore Our Extensive Laboratory Tests available.</p>
        <Button onClick={handleButtonClick} style={styles.button} variant="success">
         + Add Test
        </Button>
      </div>
      <div className="container" style={styles.cardContainer}>
        {tested.map((member, index) => (
          <Card key={index} style={styles.card}>
            <Card.Body style={styles.cardBody}>
              <div className="team-info">
                <h4 style={styles.name}>{member.testname}</h4>
                <h6 style={styles.package}>{member.packagename}</h6>
                <h6 style={styles.description}>{member.description}</h6>
                <div style={styles.priceContainer}>
                  <div style={styles.priceButton}>
                    ₹ {member.testprice} 
                  </div>
                </div>
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
    color:"white"
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px'
  },
  card: {
    width: '300px',
  },
  cardBody: {
    paddingTop: '0', 
  },
  package: {
    textTransform: 'lowercase',
    fontWeight: 'normal',
    fontSize: '16px'
  },
  description: {
    textTransform: 'lowercase',
    fontWeight: 'normal',
    fontSize: '16px'
  },
  priceContainer: {
    textAlign: "center",  // Center the price button
    marginTop: "10px",
  },
  priceButton: {
    backgroundColor: "green", 
    color: "white",  
    padding: "10px 20px",  
    borderRadius: "5px",  
    fontWeight: "bold", 
    fontSize: "16px", 
    display: "inline-block",  
  }
};
 


export default Tables;
