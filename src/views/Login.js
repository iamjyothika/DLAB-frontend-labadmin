import React, { useState} from 'react';
import {
  // MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from 'mdb-react-ui-kit';
import img from "./log.jpg"; 
import backgroundImg from "./lbmin6.png"; 
import userGif from "./man.gif"; // Replace with the correct path to your user GIF
import { Button } from 'react-bootstrap';
import { BASE_URL } from 'components/baseurl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();


    console.log('name', username);
    console.log('password', password);
    try {
      const response = await axios.post(`${BASE_URL}/lab/login/`, {
        username: username,
        password:password
     
      });
      console.log(response);
      if (response.status === 200) {
        const {token,user}= response.data;
        const userId=user.id;
        
        console.log('Login successful:',response.data);
        

     
        // localStorage.setItem('token',token);
        sessionStorage.setItem('token',token);
        sessionStorage.setItem('id',userId);

        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      setError('Invalid email or password.'); // Handle error responses
      console.error('Login error:', error);
    }
  };
      

   
      

    
  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImg})`, 
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat', 
      marginTop:'-10',
      // backgroundAttachment: 'fixed', 
      height: '100vh', 
      // margin: 0, 
      // padding: 0 
    }}>
      <MDBContainer className=' d-flex justify-content-center'>
        <MDBCard style={{ maxWidth: '900px', marginTop: '80px', maxHeight: '1000px' }}>
          <MDBRow className='g-0 d-flex align-items-center'>
            <MDBCol md='5'>
              <MDBCardImage src={img} alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
            </MDBCol>
            <MDBCol md='7'>
            <div className='text-center' style={{top:'35%'}}>               
              <h5 style={{ marginBottom: '20px',fontWeight:'bold',fontSize:"35px",color:"#0a9a73" }}>Welcome to DLabs...</h5>
            </div>
              <MDBCardBody className='text-center' style={{height:"140%"}}>
                <div style={{ position: 'relative', marginBottom: '80px' }}>
                  <img 
                    src={userGif} 
                    alt='user' 
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      position: 'absolute', 
                      top: '-20px', 
                      left: '50%', 
                      transform: 'translateX(-50%)' ,
                      marginBottom:"12px"
                    }} 
                  />
                </div>
                <div>
                <MDBInput 
                  wrapperClass='mb-4' 
                  id='form1' 
                  type='text' 
                  style={{ width: '75%', margin: '0 auto' }} 
                  placeholder='Username' 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} 

                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  id='form2' 
                  type='password' 
                  style={{ width: '75%', margin: '0 auto' }} 
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <Button className='bn' type='submit' onClick={handleLogin} style={{backgroundColor:"#0a9a73",color:"white",width:"50%"}}>LOGIN </Button>
                <div className="d-flex justify-content-between mx-4 mb-4" style={{ width: '75%', margin: '0 auto' }}>
                  <a href="#!" style={{ color: "green", marginLeft: "165px",marginTop:"15px" }}>Forgot password?</a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );

}
export default App;
