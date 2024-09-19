import React from "react";
import { Card, Button ,Form,Modal} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'; 
import { useState,useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "components/baseurl";


function Timeslotl() {
  const [slot, setSlot] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState({
    id: null,
    start_time: '',
    end_time: '',
    max_clients: 0
  });
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const handleButtonClick = () => {
    navigate('/timeslot');
  };

  useEffect(() => {
    if (token) {
      axios.get(`${BASE_URL}/lab/timeslot/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        setSlot(response.data);
      })
      .catch((error) => {
        console.error('Error fetching timeslots:', error);
        navigate('/login');
      });
    } else {
      console.error('Token not found. Please login again.');
      navigate('/login');
    }
  }, [navigate, token]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [date, time] = dateTimeString.split('T');
    const [year, month, day] = date.split('-');
    const [hours, minutes] = time.split(':');
    const ampm = +hours >= 12 ? 'PM' : 'AM';
    const formattedHours = +hours % 12 || 12;
    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
  };

  const formatToDateTimeLocal = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [date, time] = dateTimeString.split('T');
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}T${time.slice(0, 5)}`; // Slice to include only hours and minutes
  };

  const formatFromDateTimeLocal = (dateTimeString) => {
    if (!dateTimeString) return '';
    const [date, time] = dateTimeString.split('T');
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}T${time}:00Z`; // Add seconds and 'Z'
  };

  const handleEditClick = (timeSlot) => {
    setCurrentSlot({
      id: timeSlot.id,
      start_time: formatToDateTimeLocal(timeSlot.start_time) || '',
      end_time: formatToDateTimeLocal(timeSlot.end_time) || '',
      max_clients: timeSlot.max_clients || 0
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // New handleInputChange to handle input changes more clearly
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSlot({
      ...currentSlot,
      [name]: value
    });
  };

  const handleSaveChanges = (event) => {
    event.preventDefault();  // Prevent form from refreshing the page
  
    if (!currentSlot.id) {
      console.error('Current slot ID is missing.');
      return;
    }
  
    // Format the time before sending it to the API
    const start_time = formatFromDateTimeLocal(currentSlot.start_time);
    const end_time = formatFromDateTimeLocal(currentSlot.end_time);
  
    axios.patch(`${BASE_URL}/lab/timeslot/${currentSlot.id}/`, 
      { 
        ...currentSlot, 
        start_time, 
        end_time 
      }, 
      {
        headers: {
          'Authorization': `Token ${token}`
        }
      }
    )
    .then((response) => {
      // Update the local state with the new data
      const updatedSlot = slot.map(time => 
        time.id === currentSlot.id 
          ? { ...response.data } 
          : time
      );
      setSlot(updatedSlot);  // Update slot with new timeslot data
  
      // Ensure the modal closes after the state is updated
      handleClose();
    })
    .catch((error) => {
      console.error('Error updating timeslot:', error);
    });
  };
  

  const handleDeleteClick = (id) => {
    axios.delete(`${BASE_URL}/lab/timeslot/${id}/`, {
      headers: {
        'Authorization': `Token ${token}`
      }
    })
    .then(() => {
      setSlot(slot.filter(time => time.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting timeslot:', error);
    });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Find the Perfect Time for Your Medical Needs</h1>
        <p style={{ lineHeight: "42px", fontWeight: "bold" }}>
          Schedule your appointments with ease. Check available timeslots and book your visit with our top-notch medical professionals today.
        </p>
        <Button onClick={handleButtonClick} style={styles.button} variant="success">
          + Add Timeslot
        </Button>
      </div>
      <div style={styles.cardContainer}>
      {slot.length > 0 ? (
        slot.map((time) => (
          <Card key={time.id} style={styles.card}>
            <Card.Body>
              <Card.Text><b>Start Time: {formatDateTime(time.start_time)}</b></Card.Text>
              <Card.Text><b>End Time: {formatDateTime(time.end_time)}</b></Card.Text>
              <Card.Text><b>Maximum Clients: {time.max_clients}</b></Card.Text>
              <Button
                variant="primary"
                onClick={() => handleEditClick(time)}
                style={styles.editButton}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteClick(time.id)}
                style={styles.deleteButton}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <Card style={styles.noTimeslotsCard}>
          <Card.Body>
            <Card.Text style={styles.noTimeslotsMessage}>
              No Timeslots Available
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>

      


      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Time Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentSlot && (
            <Form onSubmit={handleSaveChanges}>
              <Form.Group controlId="start_time">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="start_time"
                  value={currentSlot.start_time || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="end_time">
                <Form.Label>End Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="end_time"
                  value={currentSlot.end_time || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="max_clients">
                <Form.Label>Maximum Clients</Form.Label>
                <Form.Control
                  type="number"
                  name="max_clients"
                  value={currentSlot.max_clients}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button type="submit" style={styles.button} variant="success">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  heading: {
    margin: 0,
    fontSize: '2rem'
  },
  button: {
    marginTop: '4px',
    color: 'white'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '300px',
    cursor: 'pointer'
  }
};

export default Timeslotl;