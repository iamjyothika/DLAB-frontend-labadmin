import { React, useState } from 'react';
import Table from 'react-bootstrap/Table';
import img from './lbmin6.png';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';

export default function Booking() {
  const getButtonStyleAndText = (currentBookings, maxCount) => {
    if (currentBookings >= maxCount) {
      return {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
    } else {
      return {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      };
    }
  };

  const getButtonText = (currentBookings, maxCount) => {
    return currentBookings >= maxCount ? 'Reject' : 'Accept';
  };

  const [bookings, setBookings] = useState([
    { name: 'Laura', age: 27, test: 'Vitamin D Test', date: '24-06-2024', timeSlot: '9.00-10.00 AM', maxCount: 20, currentBookings: 18 },
    { name: 'Irene', age: 54, test: 'Cardiomap Test', date: '20-06-2024', timeSlot: '10.00-11.00 AM', maxCount: 50, currentBookings: 50 },
    { name: 'Paul', age: 33, test: 'Platelet Count Test', date: '23-06-2024', timeSlot: '11.00-12.00 AM', maxCount: 30, currentBookings: 21 },
    { name: 'John', age: 33, test: 'Sodium Test', date: '26-06-2024', timeSlot: '10.00-11.00 AM', maxCount: 20, currentBookings: 21 },
    { name: 'Teresa', age: 36, test: 'Liver Function Test', date: '21-06-2024', timeSlot: '9.00-10.00 AM', maxCount: 50, currentBookings: 51 },
  ]);

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        filter: "brightness(90%)",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <Row style={{ width: '100%', overflow: 'hidden' }}>
        <Col xs={12}>
          <Card style={{ backgroundColor: 'white' }}>
            <CardHeader>
              <CardTitle
                tag="h2"
                className="text-center"
                style={{ fontSize: '28px', fontWeight: 'bold', color: "black" }}
              >
                CUSTOMER APPOINTMENTS
              </CardTitle>
            </CardHeader>
            <CardBody style={{ overflow: 'hidden' }}>
              <Table responsive style={{ overflow: 'hidden' }}>
                <thead className="text-primary">
                  <tr style={{ color: 'black', fontWeight: 'bold' }}>
                    <th style={{ width: '10%', padding: '5px', textAlign: 'center' }}>
                      <div style={{ padding: '5px' }}>
                        <b>CUSTOMER NAME</b>
                      </div>
                    </th>
                    <th style={{ width: '10%', padding: '8px', textAlign: 'center' }}>
                      <b>AGE</b>
                    </th>
                    <th style={{ width: '15%', padding: '8px', textAlign: 'center' }}>
                      <b>TEST</b>
                    </th>
                    <th style={{ width: '15%', padding: '8px', textAlign: 'center' }}>
                      <b>DATE</b>
                    </th>
                    <th style={{ width: '15%', padding: '8px', textAlign: 'center' }}>
                      <b>TIME SLOT</b>
                    </th>
                    <th style={{ width: '10%', padding: '8px', textAlign: 'center' }}>
                      <b>MAXIMUM COUNT</b>
                    </th>
                    <th style={{ width: '10%', padding: '8px', textAlign: 'center' }}>
                      <b>CURRENT BOOKINGS</b>
                    </th>
                    <th style={{ width: '10%', padding: '8px', textAlign: 'center' }}>
                      <b>STATUS</b>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ overflow: 'hidden', textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.name}</td>
                      <td>{booking.age}</td>
                      <td>{booking.test}</td>
                      <td>{booking.date}</td>
                      <td>{booking.timeSlot}</td>
                      <td>{booking.maxCount}</td>
                      <td>{booking.currentBookings}</td>
                      <td>
                        <button
                          style={getButtonStyleAndText(booking.currentBookings, booking.maxCount)} 
                        >
                          {getButtonText(booking.currentBookings, booking.maxCount)}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
