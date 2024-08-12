/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import backgroundImage from './lbmin6.png'; 
import { BASE_URL } from "components/baseurl";


function Map() {

  const labid=sessionStorage.getItem("id");
  console.log(labid);
  const [formData, setFormData] = useState({ testname:"",description:"",testprice:"",lab:labid});
  console.log(formData);
  const [validated, setValidated] = useState(false);
  const navigate=useNavigate();
  const token = sessionStorage.getItem('token');
  console.log('Token',token);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    

    
    console.log("Lab",formData.lab);
    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }
    try{
      const response = await axios.post(`${BASE_URL}/lab/tests/`, formData ,{
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });
     
      console.log('Response:', response);
      navigate('/admin/abc');
       
     

   
    } catch (error) {
      console.error('Error adding test:', error);
    }
  };



    



    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }


  return (
    <div className="content" style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(100%)", opacity: '0.9' }}>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
          <Col md={6}>
            <div className="form-container" style={{ marginTop: "100px" }}>
              <Card className="form-card" style={{  backgroundColor: "white", opacity: "0.9" }}>
                <Card.Body className="labs">
                  <h2 className="text-center mt-4 form-title" style={{ color: 'black', fontWeight: "bold" }}>ADD TEST</h2>
                  <Form noValidate validated={validated}  style={{ height: "310px" }}>
                    <Form.Group as={Row} controlId="testName" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" className="text-right form-label" style={{color:"black",fontSize:'15px',fontWeight:"bold"}}>Test Name :</Form.Label>
                      <Col sm="8">
                        <Form.Control className="form-control-styled" style={{ borderRadius: '16px',border:"1px solid black" }}
                          required
                          type="text"
                          placeholder="Enter test name"
                          value={formData.testname}
                          onChange={(e)=>setFormData({...formData,testname:e.target.value})}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="description" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" className="text-right form-label" style={{color:"black",fontSize:'15px',fontWeight:"bold"}}>Description :</Form.Label>
                      <Col sm="8">
                        <Form.Control className="form-control-styled" style={{ borderRadius: '16px',border:"1px solid black" }}
                          required
                          type="text"
                          placeholder="Enter description"
                          value={formData.description}
                          onChange={(e)=>setFormData({...formData,description:e.target.value})}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="price" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" className="text-right form-label" style={{color:"black",fontSize:'15px',fontWeight:"bold"}}>Test Price :</Form.Label>
                      <Col sm="8">
                        <Form.Control className="form-control-styled" style={{ borderRadius: '16px',border:"1px solid black" }}
                          required
                          type="number"
                          placeholder="Enter price"
                          value={formData.testprice}
                          onChange={(e)=>setFormData({...formData,testprice:e.target.value})}
                        />
                      </Col>
                    </Form.Group>


                    <Row>
                      <Col className="text-center">
                        {/* <Button type="button" onClick={handleClicks} style={{ backgroundColor: "#007bff", marginTop: "8px", padding: "10px 55px", borderRadius: '3px',color:"white" }}>BACK</Button> */}
                        <Button type="submit" onClick={handleSubmit} style={{ backgroundColor: "green", marginTop: "8px", padding: "10px 55px", marginLeft: "12px", borderRadius: '3px',color:"white" }}>ADD TEST</Button>
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

export default Map;
