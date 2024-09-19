import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'; 
import { BASE_URL } from "components/baseurl";
import axios from "axios";

function User() {
  const [packageData, setPackageData] = useState([]);
  // const [testNames, setTestNames] = useState({});

  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');


  const handleButtonClick = () => {
    navigate('/packages');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          
                const packageResponse = await axios.get(`${BASE_URL}/lab/package/`, {
                  headers: {
                    'Authorization': `Token ${token}`
                  }
                });
               
      
               
                setPackageData(packageResponse.data);
      
               
                
      
                console.log('Packages Data:', packageResponse.data); 
               
      
              } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error, possibly redirect to login if unauthorized
              }
            } else {
              console.error('Token not found. Please login again.');
              navigate('/login');
            }
          };
      
          fetchData();
        }, [navigate, token]);
        const getTestCount = (testIds) => {
          console.log('Test IDs:', testIds); // Debug log to see the structure
      
          if (Array.isArray(testIds)) {
            return testIds.length;
          } else {
            console.error('Expected an array of test IDs, but got:', testIds);
            return 0;
          }
        };
      
      
   return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Welcome to DLabs - Ultimate Health Partner</h1>
        <p style={{ lineHeight: "30px", fontWeight: "bold" }}>Discover Our Comprehensive Lab Packages</p>
        <Button variant="success" onClick={handleButtonClick} style={styles.button}>
          + Add Packages
        </Button>
      </div>

      <div style={styles.cardContainer}>
        {packageData.map((pkg) => (
          <Card key={pkg.id} style={styles.card}>
            <Card.Body>
              <Card.Title>{pkg.packagename}</Card.Title>
              <Card.Text>
                Tests Included: {getTestCount(pkg.tests)} tests
              </Card.Text>
              <div style={styles.priceContainer}>
                <div style={styles.priceText}>
                  ₹ {pkg.price}
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
    padding: '20px',
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
    marginTop: '10px',
    color: "white"
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
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  priceText: {
    backgroundColor: 'green', // Green background
    color: 'white', // White text
    padding: '10px 20px', // Padding to resemble a button
    borderRadius: '5px', // Rounded corners
    fontWeight: 'bold',
    fontSize: '16px',
  }
};

export default User;
