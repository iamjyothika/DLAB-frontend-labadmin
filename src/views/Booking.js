import { React, useEffect, useState } from 'react';
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
import axios from 'axios';
import { BASE_URL } from 'components/baseurl';
import { useParams } from 'react-router-dom'


function Booking() {
 
  const token=sessionStorage.getItem('token');
  const labid=sessionStorage.getItem("id");

  const [bookings, setBookings] = useState([])
  const[timeslot,setTimeSlots]=useState([]);
  const[tests,setTests]=useState([]);
  const [userEmailMap, setUserEmailMap] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (token){
      axios.get(`${BASE_URL}/lab/all-reservations/${labid}/`,{
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        console.log('Appointments:',response);
        setBookings(response.data)
        const userIds = response.data.map(booking => booking.client);
          fetchUserEmails(userIds);
        
      })
      .catch((error) => {
       console.error('Error fetching reservations:', error);
     
    });
    axios.get(`${BASE_URL}/lab/timeslot/`, { // Adjust this endpoint as needed
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
        console.log('Timeslots:',response.data)

        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error('Error fetching time slots:', error);
      });
      axios.get(`${BASE_URL}/lab/tests/`, { // Adjust this endpoint as needed
        headers: {
          'Authorization': `Token ${token}`
        }
      })
        .then((response) => {
          console.log('Tests:',response.data)
          const testMap = response.data.reduce((map, test) => {
            map[test.id] = test.testname;
            return map;
          }, {});
          setTests(testMap);
        })
  
         
        .catch((error) => {
          console.error('Error fetching tests:', error);
        });
       

  }
}, [token]);
const fetchUserEmails = (userIds) => {
  const uniqueUserIds = [...new Set(userIds)]; // Avoid duplicate requests
  uniqueUserIds.forEach(userId => {
    axios.get(`${BASE_URL}/user/userdata/${userId}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((response) => {
       
        setUserEmailMap(prevState => ({
          ...prevState,
          [userId]: response.data.email
        }));
      })
      .catch((error) => {
        console.error(`Error fetching user data for user ${userId}:`, error);
      });
  });
};

const updateBookingStatus = (id, newStatus) => {
  console.log('Updating booking status:', id, newStatus);
  axios.patch(`${BASE_URL}/lab/reservation/status/${id}/`, {
   
    status: newStatus,
  }, {
    headers: {
      'Authorization': `Token ${token}`,
    },
  })
    .then((response) => {
      console.log('Update response:', response);
      // Update the booking status in state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id ===id ? { ...booking, status: newStatus } : booking
        )
      );
    })
    .catch((error) => {
      console.error('Error updating booking status:', error);
    });
};




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

// const getButtonText = (currentBookings, maxCount) => {
//   return currentBookings >= maxCount ? 'Reject' : 'Accept';
// };
// const getStatusButtonStyleAndText = (status) => {
//   if (status === 'Pending') {
//     return {
//       backgroundColor: 'yellow',
//       color: 'black',
//       padding: '10px 20px',
//       border: 'none',
//       borderRadius: '5px',
//       cursor: 'pointer',
//     };
//   }
  
// };

// const getStatusButtonText = (status) => {
//   return status || 'Pending';
// };

const timeslotMap = timeslot.reduce((map, slot) => {
  map[slot.id] = slot;
  return map;
}, {});
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];  // Extracts the date part
};

// Function to extract and format the time slot from the datetime string
const formatTimeSlot = (startTime, endTime) => {
  if (!startTime || !endTime) return '';

  // Ensure valid date strings by appending 'Z' if not present
  const startDateStr = startTime.endsWith('Z') ? startTime : startTime + 'Z';
  const endDateStr = endTime.endsWith('Z') ? endTime : endTime + 'Z';

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('Invalid date:', startDateStr, endDateStr);
    return 'Invalid time';
  }

  const formatTime = (date) => {
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};



  

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
                      <b>STATUS</b>
                    </th>
                    <th style={{ width: '10%', padding: '8px', textAlign: 'center' }}>
                      <b>ACTION</b>
                    </th>
                  </tr>
                </thead>
                <tbody style={{ overflow: 'hidden', textAlign: 'center', color: 'black', fontWeight: 'bold' }}>
                {bookings.map((booking, index) => {
            const timeslot = timeslotMap[booking.time_slot]; 
            const email = userEmailMap[booking.client];
            
                    return (
                      <tr key={index}>
                        <td>{email || 'N/A'}</td>

                        <td>{tests[booking.test] || 'N/A'}</td>
                        <td>{timeslot ? formatDate(timeslot.start_time) : 'N/A'}</td>
                        <td>{timeslot ? formatTimeSlot(timeslot.start_time, timeslot.end_time) : 'N/A'}</td>
                        <td>
                        <span style={{ color: booking.status === 'Pending' ? 'orange' : 'black' }}>
            {booking.status}
          </span>
           
                        </td>
                        <td style={{ textAlign: 'center' }}>
  {booking.status === 'pending' ? (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <button
        style={{
          backgroundColor: 'green',
          color: 'white',
          padding: '5px 10px',
          marginRight: '5px', // Add margin to space out the buttons
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          flex: '0 1 auto', // Ensure buttons do not stretch
        }}
        onClick={() => updateBookingStatus(booking.id, 'approved')}
      >
        Approve
      </button>
      <button
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '5px 10px',
          marginLeft: '5px', // Add margin to space out the buttons
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          flex: '0 1 auto', // Ensure buttons do not stretch
        }}
        onClick={() => updateBookingStatus(booking.id, 'rejected')}
      >
        Reject
      </button>
    </div>
  ) : (
    <span>{booking.status}</span>
  )}
</td>


                      </tr>
                    );
                  })}
                  
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default Booking;
