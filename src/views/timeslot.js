import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import backgroundImage from './lbmin6.png'; 
import { BASE_URL } from "components/baseurl";


function Timeslot(){
  const labid=sessionStorage.getItem("id");
  console.log(labid);
  const[setSlot,setSlotData]=useState({start_time:"",end_time:"",max_clients:"",lab:labid});
  console.log(setSlot);
  const navigate=useNavigate();
  const [validated, setValidated] = useState(false);
  const token = sessionStorage.getItem('token');
  console.log('Token',token);
  const handleSubmit =   async(e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
     
      e.stopPropagation();
      setValidated(true);
      return;
  }

    console.log("Lab",setSlot.lab);
    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }
    try{
     

      const response = await axios.post(`${BASE_URL}/lab/timeslot/`, setSlot ,{
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
          
        }
      });
     
      console.log('Response:', response);
      navigate('/admin/timeslot-list');
       
     

   
    } catch (error) {
      console.error('Error in adding doctor:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSlotData({ ...setSlot, [name]: value });
  };
  



return (
    <div className="content" style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center", opacity: '0.9' }}>
    <Container>
      <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
        <Col md={6}>
          <div className="form-container" style={{ marginTop: "100px" }}>
            <Card className="form-card" style={{border: "2px solid white", backgroundColor: "white", opacity: "0.9" }}>
              <Card.Body className="labs">
                <h2 className="text-center mt-4 form-title" style={{ color: 'black' }}>ADDING TIMESLOT</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ height: "310px" }}>
                  <Form.Group as={Row} controlId="start_time" style={{ marginBottom: "20px" }}>
                    <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Start Time :</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        style={{ width: "100%", borderRadius: '16px', border: "1px solid black" }}
                        className="form-control-styled"
                        required
                        type="datetime-local"
                        name="start_time"
                        value={setSlot.start_time}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="end_time" style={{ marginBottom: "20px" }}>
                    <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>End Time :</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        style={{ width: "100%", borderRadius: '16px', border: "1px solid black" }}
                        className="form-control-styled"
                        required
                        type="datetime-local"
                        name="end_time"
                        value={setSlot.end_time}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="max_clients" style={{ marginBottom: "20px" }}>
                    <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Max Clients :</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        style={{ width: "100%", borderRadius: '16px', border: "1px solid black" }}
                        className="form-control-styled"
                        required
                        type="number"
                        name="max_clients"
                        value={setSlot.max_clients}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Form.Group>

                  <Row>
                    <Col className="text-center">
                      <Button type="submit" style={{ backgroundColor: "green", marginTop: "8px", padding: "10px 55px", marginLeft: "12px", borderRadius: '3px', color: "white" }}>ADD</Button>
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

export default Timeslot;

    
  





















