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
import {React , useState} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  CardTitle,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { FaUser } from 'react-icons/fa';
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import img from './lbmin6.png'

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    setModalOpen(true);
  };

  const confirmLogout = () => {
    setModalOpen(false);
    // Perform logout actions here
  };

  const cancelLogout = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div style={{ backgroundColor: '#0a9a73', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <p style={{fontSize:"25px",fontWeight:"bold",color:"white",marginLeft:'240px',marginTop:'6px',fontFamily:"monospace"}}>Your healthcare journey starts here...</p>
        <div style={{ flex: 1 }}>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle
            tag="div"
            style={{
              backgroundColor:"black",
              width:"28px",
              height:"28px",
              borderRadius:"60%",
              marginLeft:"180px"
            }}
          >
            {/* <div style={{ backgroundColor: 'black', borderRadius: '14%', padding: '4px', marginRight: '25px',maxHeight:"8px" }}> */}
             <FaUser style={{ color: 'white', width: '15px', height: '25px', marginTop: '1px',marginLeft:"6px"}} />
            {/* </div> */}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={handleLogin}>Login</DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>          
          </DropdownMenu>
        </Dropdown>
        </div>
          {/* <div style={{ backgroundColor: 'black', borderRadius: '54%', padding: '7px', marginRight: '25px',maxHeight:"28px" }}>
            <FaUser style={{ color: 'white', width: '15px', height: '25px',marginTop:"-8px" }} />
          </div> */}
        </div>
      <div className="content" style={{ marginTop: '0', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" style={{marginTop:"15px"}}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fas fa-flask" style={{color:"blueviolet"}}></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Packages</p>
                      {/* <CardTitle tag="p">150GB</CardTitle> */}
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" style={{marginTop:"15px"}}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fas fa-vial" style={{color:"deepskyblue"}}></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Tests</p>
                      <CardTitle tag="p">+1k</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar"/> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" style={{marginTop:"15px"}}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="far fa-calendar-alt" style={{color:"seagreen"}}></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Bookings</p>
                      <CardTitle tag="p">35</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats" style={{marginTop:"15px"}}>
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                    <i class="fas fa-file-medical-alt" style={{color:"pink"}}></i>
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Test Report</p>
                      <CardTitle tag="p">+2K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Tests Performed</CardTitle>
                <p className="card-category">Monthly performance</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Famous Packages</CardTitle>
                <p className="card-category">Chart prepared for last month</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" />Senior Citizen{" "}
                  <i className="fa fa-circle text-warning" /> Women's Advanced Checkup{" "}
                  <i className="fa fa-circle text-danger" /> Full Body Checkup{" "}
                  <i className="fa fa-circle text-gray" /> Postnatal Package
                </div>
                {/* <hr /> */}
                {/* <div className="stats">
                  <i className="fa fa-calendar" /> Number of emails sent
                </div> */}
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center" tag="h5">Our Packages</CardTitle>
              </CardHeader>
              <CardBody>
              <div class="table-container" style={{height: "368px"}}>
              <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Package Name</th>
                      <th>Test Count</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="mt-5">
                      <td>Senior Citizen Packages</td>
                      <td>99 Tests</td>
                      <td>₹ 4599</td>
                    </tr>
                    <tr className="mt-5">
                      <td>Full Body Checkup</td>
                      <td>90 Tests</td>
                      <td>₹ 3500</td>
                    </tr>
                    <tr className="mt-5">
                      <td>Postnatal Package</td>
                      <td>55 Tests</td>
                      <td>₹ 2580</td>
                    </tr>
                    <tr className="mt-5">
                      <td>Women's Advanced Checkup</td>
                      <td>99 Tests</td>
                      <td>₹ 3999</td>
                    </tr>
                    <tr className="mt-5">
                      <td>Men's Health Checkup</td>
                      <td>42 Tests</td>
                      <td>₹ 2599</td>
                    </tr>
                    <tr className="mt-5">
                      <td>Cardio Checkup</td>
                      <td>102 Tests</td>
                      <td>₹ 5999</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              </CardBody> 
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modalOpen} toggle={cancelLogout}>
          <ModalHeader toggle={cancelLogout}>Confirm Logout</ModalHeader>
          <ModalBody>
            Are you sure you want to logout?
          </ModalBody>
          <ModalFooter>
            <Button className="text-right" color="secondary" onClick={cancelLogout} style={{color:"white"}}>Cancel</Button>{' '}
            <Button color="success" onClick={confirmLogout} style={{color:"white"}}>Logout</Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
