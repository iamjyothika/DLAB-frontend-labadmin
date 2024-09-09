
import img from './labmain6.webp';
import { BASE_URL } from 'components/baseurl';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function Report() {
  const { bookingId } = useParams();
  console.log(bookingId);
   
  const [formdata, setFormdata] = useState({
    result_file: "",
    reservation: bookingId
  });     
  console.log(formdata);
  


  const token = sessionStorage.getItem('token');

  const handleFileChange = (e) => {
    setFormdata({
      ...formdata,
      result_file: e.target.files[0]
    });
    console.log('File selected:', e.target.files[0]); // Log the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formdata.result_file) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();   
    formData.append('result_file', formdata.result_file);
    formData.append('reservation', formdata.reservation);
    

    console.log('Form data prepared:', {         
      reservation: formdata.reservation,
      result_file: formdata.result_file.name
    });

    try {
      const response = await axios.post(`${BASE_URL}/lab/test-result/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Token ${token}`
        },
      });   
      console.log('Response:', response.data);
      alert('Test report uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed. Please try again.');
    } 
    
  };

  return (
    <div style={{
      backgroundImage: `url(${img})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      opacity: '0.8'
    }}>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '100%' }}>
          <Col md={6}>
            <div className="form-container" style={{ marginTop: '100px' }}>
              <Card className="form-card" style={{ border: '2px solid white', backgroundColor: 'white', opacity: '0.9' }}>
                <Card.Body className="labs">
                  <h2 className="text-center mt-4 form-title" style={{ color: 'black' }}>
                    ADDING TEST REPORT
                  </h2>
                  <Form noValidate onSubmit={handleSubmit} style={{ height: 'auto' }}>
                    <Form.Group as={Row} controlId="test_file" style={{ marginBottom: '20px' }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: 'bold', whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '15px' }}>
                        Test Result File :
                      </Form.Label>
                      <Col sm="8">
                        <Form.Control
                          style={{ width: '100%', borderRadius: '16px', border: '1px solid black' }}
                          className="form-control-styled"
                          required
                          type="file"
                          name="test_file"
                          onChange={handleFileChange}
                        />
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col className="text-center">
                        <Button
                          type="submit"
                        
                          style={{
                            backgroundColor: 'green',
                            marginTop: '8px',
                            padding: '10px 55px',
                            borderRadius: '3px',
                            color: 'white',
                          }}
                        >
                          SUBMIT
                        </Button>
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

export default Report;

