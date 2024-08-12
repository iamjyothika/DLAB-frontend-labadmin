import { React, useState } from 'react';
import Table from 'react-bootstrap/Table';
import img from './lbmin6.png'
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Input,
  Col,
  Button
} from 'reactstrap';

export default function Feedback() {
  const [replies, setReplies] = useState({
    Laura: '',
    Aardhra: '',
    Devika: '',
    Naina: '',
  });

  const handleReplyChange = (name, value) => {
    setReplies((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSendReply = (name) => {
    // Here you can implement the logic to send the reply
    console.log(`Sending reply to ${name}: ${replies[name]}`);
    // Optionally, you can clear the reply input after sending
    setReplies((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  return (
<div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop:'0',
        overflowX:"hidden",
        filter: "brightness(90%)"
      }}
    >
      <Row>
        <Col xs={12}>
          <Card style={{ backgroundColor: 'white', border: '3px',borderBlockColor:"black",margin:"30px",marginLeft:"55px", backdropFilter: "blur(5px)" }}>
            <CardHeader>
              <CardTitle
                tag="h2"
                className="text-center"
                style={{ fontSize: '40px', fontWeight: 'bold' }}
              >
                FEEDBACK
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive style={{backgroundColor:"white"}}>
                <thead className="text-primary">
                  <tr style={{ color: 'black', fontWeight: 'bold' }}>
                    <th style={{ width: '25%' }}>
                      <div style={{ border: '1px', padding: '5px' }}>
                        <b>CUSTOMER NAME</b>
                      </div>
                    </th>
                    <th style={{ width: '25%' }}>
                      <b>LAB NAME</b>
                    </th>
                    <th style={{ width: '25%' }}>
                      <b>DATE</b>
                    </th>
                    <th style={{ width: '25%' }}>
                      <b>FEEDBACK</b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{fontWeight:"bold"}}>Laura</td>
                    <td  style={{fontWeight:"bold"}}>Hyatt Labs</td>
                    <td  style={{fontWeight:"bold"}}>24-02-2024</td>
                    <td  style={{fontWeight:"bold"}}>
                      <div style={{ position: 'relative' }}>
                        The clinic was very hygienic and clinic staff were
                        friendly. My visit was pleasant
                        <Input
                          style={{ marginTop: '15px' }}
                          type="text"
                          placeholder="Reply"
                          value={replies.Laura}
                          onChange={(e) =>
                            handleReplyChange('Laura', e.target.value)
                          }
                        />
                        <Button
                          
                          style={{
                            position: 'absolute',
                            top: '88%',
                            right: '0px',
                            padding: '7px 14px',
                            transform: 'translateY(-50%)',
                            backgroundColor: '#007bff',
                            color:"white"
                          }}
                          onClick={() => handleSendReply('Laura')}
                        >
                          Send
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:"bold"}}>Aardhra</td>
                    <td style={{fontWeight:"bold"}}>Optigen Labs</td>
                    <td style={{fontWeight:"bold"}}>31-07-2023</td>
                    <td style={{fontWeight:"bold"}}>
                      My visit to the clinic was very upsetting as I had to
                      wait an awful lot of time for a single blood test
                      <div style={{ position: 'relative' }}>
                        <Input
                          style={{ marginTop: '15px' }}
                          type="text"
                          placeholder="Reply"
                          value={replies.Aardhra}
                          onChange={(e) =>
                            handleReplyChange('Aardhra', e.target.value)
                          }
                        />
                        <Button
                          style={{
                            position: 'absolute',
                            top: '51%',
                            right: '0px',
                            padding: '7px 14px',
                            transform: 'translateY(-50%)',
                            backgroundColor: '#007bff',
                            color:"white"
                          }}
                          onClick={() => handleSendReply('Aardhra')}
                        >
                          Send
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:"bold"}}>Devika</td>
                    <td style={{fontWeight:"bold"}}>Riott Innovations</td>
                    <td style={{fontWeight:"bold"}}>01-03-2024</td>
                    <td style={{fontWeight:"bold"}}>
                      it was an ok experience for me as testing duration and
                      waiting period was alright but the staff were
                      unprofessional and just chatting around
                      <div style={{ position: 'relative' }}>
                        <Input
                          style={{ marginTop: '15px' }}
                          type="text"
                          placeholder="Reply"
                          value={replies.Devika}
                          onChange={(e) =>
                            handleReplyChange('Devika', e.target.value)
                          }
                        />
                        <Button
                          style={{
                            position: 'absolute',
                            top: '50%',
                            right: '0px',
                            padding: '7px 14px',
                            transform: 'translateY(-50%)',
                            backgroundColor: '#007bff',
                            color:"white"
                          }}
                          onClick={() => handleSendReply('Devika')}
                        >
                          Send
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style={{fontWeight:"bold"}}>Naina</td>
                    <td style={{fontWeight:"bold"}}>Hyatt Labs</td>
                    <td style={{fontWeight:"bold"}}>06-02-2024</td>
                    <td style={{fontWeight:"bold"}}>
                      it was an ok experience for me as testing duration and
                      waiting period was alright but the staff were
                      unprofessional
                      <div style={{ position: 'relative' }}>
                        <Input
                          style={{ marginTop: '15px' }}
                          type="text"
                          placeholder="Reply"
                          value={replies.Naina}
                          onChange={(e) =>
                            handleReplyChange('Naina', e.target.value)
                          }
                        />
                        <Button
                          style={{
                            position: 'absolute',
                            top: '51%',
                            right: '0px',
                            padding: '7px 14px',
                            transform: 'translateY(-50%)',
                            backgroundColor: '#007bff',
                            color:"white"
                          }}
                          onClick={() => handleSendReply('Naina')}
                        >
                          Send
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
