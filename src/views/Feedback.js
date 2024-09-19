import { React, useState,useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import img from './lbmin6.png';
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
import { BASE_URL } from 'components/baseurl';



function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [reviews, setReviews] = useState([]);
  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('id');

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/lab/lab-feedback/`, {
        headers: {
          Authorization: `Token ${token}`, // Send the token in the request header
        },
      });
      console.log(response.data);
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const fetchLabReviewsWithUserEmails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/lab-allreview/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const fetchedReviews = response.data;
      console.log('Responses',response.data);

      const reviewsWithUserDetails = await Promise.all(
        fetchedReviews.map(async (review) => {
          try {
            const userResponse = await axios.get(`${BASE_URL}/user/userdata/${review.user}/`);
            console.log('Response data',response.data)
            const userEmail = userResponse.data.email;

            return {
              ...review,
              email: userEmail || 'Unknown Email', // Assign the fetched email or 'Unknown Email' as a fallback
            };
          } catch (userError) {
            console.error(`Error fetching user data for user ID ${review.user}:`, userError);
            return {
              ...review,
              email: 'Unknown Email',
            };
          }
        })
      );

      setReviews(reviewsWithUserDetails);
    } catch (error) {
      console.error('Error fetching the lab reviews:', error);
    }
  };

  // Trigger fetching data on component mount
  useEffect(() => {
    fetchFeedback();
    fetchLabReviewsWithUserEmails();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginTop: '0',
        overflowX: 'hidden',
        filter: 'brightness(90%)',
        minHeight: '100vh', // Ensure the background covers the full height
        height: 'auto', // Allows the background to expand with the content
      }}
    >
      <Row>
        <Col xs={12}>
          <Card
            style={{
              backgroundColor: 'white',
              border: '3px',
              borderBlockColor: 'black',
              margin: '30px',
              marginLeft: '55px',
              backdropFilter: 'blur(5px)',
            }}
          >
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
              <Table responsive style={{ backgroundColor: 'white' }}>
                <thead className="text-primary">
                  <tr style={{ color: 'black', fontWeight: 'bold' }}>
                    <th style={{ width: '25%' }}>
                      <div style={{ border: '1px', padding: '5px' }}>
                        <b>CUSTOMER NAME</b>
                      </div>
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
                  {reviews.map((review, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: 'bold' }}>{review.email}</td>
                      <td style={{ fontWeight: 'bold' }}>{review.created_at.split('T')[0]}</td>
                      <td style={{ fontWeight: 'bold' }}>
                        <div style={{ position: 'relative' }}>
                          {review.description}
                        </div>
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

export default Feedback;
