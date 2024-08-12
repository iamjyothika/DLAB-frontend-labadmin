import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import backgroundImage from './lbmin6.png'; 
import { BASE_URL } from "components/baseurl";

function Notifications() {
  const labid=sessionStorage.getItem("id");
  console.log(labid);
  const [doctorData,setDoctorData]=useState({doctorname:"",qualification:"",specialiazation:"",doctor_image:null,lab:labid});
  console.log(doctorData)
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); 
  const token = sessionStorage.getItem('token');
  console.log('Token',token);


  // const handleClicks = () => {
  //   navigate('/xyz'); 
  // };

  const handleSubmit =   async(e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
     
      e.stopPropagation();
      setValidated(true);
      return;
  }

    console.log("Lab",doctorData.lab);
    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }
    try{
     

      const response = await axios.post(`${BASE_URL}/lab/docter/`, doctorData ,{
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
          
        }
      });
     
      console.log('Response:', response);
      navigate('/admin/xyz');
       
     

   
    } catch (error) {
      console.error('Error in adding doctor:', error);
    }
  };
  const handleFileChange = (e) => {
    setDoctorData({ ...doctorData, doctor_image: e.target.files[0] });
  };
  



  return (
    <div className="content" style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center", opacity: '0.9' }}>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
          <Col md={6}>
            <div className="form-container" style={{ marginTop: "100px" }}>
              <Card className="form-card" style={{  backgroundColor: "white", opacity: "0.9" }}>
                <Card.Body className="labs">
                  <h2 className="text-center mt-4 form-title" style={{ color: 'black' }}>ADD DOCTOR</h2>
                  <Form noValidate validated={validated} style={{ height: "310px" }}>
                    <Form.Group as={Row} controlId="name" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Doctor Name :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{ width: "100%", borderRadius: '16px',border:"1px solid black" }}
                          className="form-control-styled"
                          required
                          type="text"
                          placeholder="Enter name"
                          value={doctorData.doctorname}
                          onChange={(e)=>setDoctorData({...doctorData,doctorname:e.target.value})}
                          />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="qualification" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Qualification :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{ width: "100%", borderRadius: '16px',border:"1px solid black" }}
                          className="form-control-styled"
                          required
                          type="text"
                          placeholder="Enter qualification"
                          value={doctorData.qualification}
                          onChange={(e)=>setDoctorData({...doctorData,qualification:e.target.value})}
                        
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="specialization" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Specialization :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{ width: "100%", borderRadius: '16px',border:"1px solid black" }}
                          className="form-control-styled"
                          required
                          type="text"
                          placeholder="Enter specialization"
                          value={doctorData.specialiazation}
                          onChange={(e)=>setDoctorData({...doctorData,specialiazation:e.target.value})}
                        />
                      </Col>
                    </Form.Group>

                    {/* <Form.Group as={Row} controlId="labName" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'white', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Lab Name :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{ width: "100%", borderRadius: '16px' }}
                          className="form-control-styled"
                          required
                          type="text"
                          placeholder="Enter lab name"
                        />
                      </Col>
                    </Form.Group> */}

                    <Form.Group as={Row} controlId="image" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Upload Image :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{ width: "100%", borderRadius: '16px',border:"1px solid black" }}
                          className="form-control-styled"
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                       

                        />
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col className="text-center">
                        {/* <Button type="submit" onClick={handleClicks} style={{ backgroundColor: "#007bff", marginTop: "8px", padding: "10px 55px", marginLeft: "21px", borderRadius: '3px',color:"white" }}>BACK</Button> */}
                        <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: "green", marginTop: "8px", padding: "10px 55px", marginLeft: "12px", borderRadius: '3px',color:"white" }}>ADD</Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Notifications;
