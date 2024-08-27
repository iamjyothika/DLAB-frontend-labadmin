import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "components/baseurl";
import backgroundImage from './lbmin6.png';
import Select from "react-select";
 

function Icons() {
  const labid=sessionStorage.getItem("id");
  console.log(labid);
  const [packages,setPackages]=useState({packagename:"",tests:[],price:"",packageimage:"",lab_name:labid})
  const [testOptions, setTestOptions] = useState([]);
  console.log(packages)
  // const [tests, setTests] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate(); 
  const token = sessionStorage.getItem('token');
  console.log('Token',token);
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/lab/tests/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type':'application/json'
          }
        });
        console.log('API Response:', response.data);
        const options = response.data.map(test => ({
          value: test.id,
          label: test.testname
        }));
        setTestOptions(options);
        console.log('Test Options:', options);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
  }, [token]);





  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
  
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
  
    if (!token) {
      console.error('Token not found. Please login again.');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('packagename', packages.packagename);
      formData.append('price', packages.price);
      formData.append('packageimage', packages.packageimage);
      formData.append('lab_name', packages.lab_name);
    
  
      // Append selected test IDs to the form data
      packages.tests.forEach((test) => {
        formData.append('tests', test); 
        console.log("Appending Test ID:", test);
      });
  
      const response = await axios.post(`${BASE_URL}/lab/package/`, formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Response:', response);
      navigate('/admin/package-list');
  
    } catch (error) {
      console.error('Error in adding package:', error);
    }
  };
  
  const handleTestChange = (selectedOptions) => {
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setPackages({ ...packages, tests: selectedValues });
    console.log("Selected Tests:", selectedValues); // Log selected test values
  };
  

const handleFileChange = (e) => {
  setPackages({ ...packages, packageimage: e.target.files[0] });
};



   

  return (
    <div className="content" style={{ backgroundImage: `url(${backgroundImage})`, height: "100vh", backgroundSize: "cover", backgroundPosition: "center",opacity:'0.9' }}>
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
          <Col md={8}>
            <div className="form-container" style={{ marginTop: "100px" }}>
              <Card className="form-card" style={{ border: "2px solid white", backgroundColor:"white",opacity:"0.9", width:"100%" }}>
                <Card.Body className="labs" >
                  <h2 className="text-center mt-4 form-title" style={{color:'black'}}>ADD PACKAGE</h2>
                  <Form noValidate validated={validated}  style={{ height: "auto" }}>
                    <Form.Group as={Row} controlId="packageName" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{color:'black',fontSize:'14px',fontWeight:"bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px"}}>Package Name :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{width:"100%", borderRadius: '16px',border:"1px solid black"}}
                          className="form-control-styled"
                          required
                          type="text"
                          placeholder="Enter package name"
                          value={setPackages.packagename}
                          onChange={(e) => setPackages({ ...packages, packagename: e.target.value })}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="testsIncluded" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{ color: 'black', fontSize: '14px', fontWeight: "bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px" }}>Tests included :</Form.Label>
                      <Col sm="8">
                        <Select
                          isMulti
                          options={testOptions}
                          value={testOptions.filter(option => packages.tests.includes(option.value))}
                          onChange={handleTestChange}
                          placeholder="Select tests included"
                          styles={{
                            container: (provided) => ({
                              ...provided,
                              width: '100%',
                              borderRadius: '16px',
                              border: "1px solid black"
                            }),
                            menu: (provided) => ({
                              ...provided,
                              borderRadius: '16px'
                            }),
                            control: (provided) => ({
                              ...provided,
                              borderRadius: '16px'
                            })
                          }}
                        />
                      </Col>
                    </Form.Group>

                    

                    <Form.Group as={Row} controlId="price" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{color:'black',fontSize:'14px',fontWeight:"bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px"}}>Package Price :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{width:"100%", borderRadius: '16px',border:"1px solid black"}}
                          className="form-control-styled"
                          type="text"
                          placeholder="Enter price"
                          required
                          value={setPackages.price}
                          onChange={(e) => setPackages({ ...packages, price: e.target.value })}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="image" style={{ marginBottom: "20px" }}>
                      <Form.Label column sm="3" style={{color:'black',fontSize:'14px',fontWeight:"bold", whiteSpace: "nowrap", textAlign: "right", paddingRight: "15px"}}>Upload Image :</Form.Label>
                      <Col sm="8">
                        <Form.Control style={{width:"100%", borderRadius: '16px',border:"1px solid black"}}
                          className="form-control-styled"
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          
                        />
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col className="text-center">
                        <Button className="bn" type="submit"   onClick={handleSubmit} style={{backgroundColor:"green",marginTop:"8px",padding:"10px 55px",marginLeft:"21px",borderRadius:'3px',color:"white"}}>ADD</Button>
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

export default Icons;
