import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../Redux/slices/users';
import axios from 'axios';
import { useClerk } from '@clerk/clerk-react';
import { fetchDriver } from '../Redux/slices/drivers';
import { Modal, Button } from 'react-bootstrap';
import { addReviewToServer } from '../Redux/slices/review';

function MyOrdering() {
  const dispatch = useDispatch();
  const { user } = useClerk();
  const [nameDriver, setNameDriver] = useState('');
  const [ratingWindowOpen, setRatingWindowOpen] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);
  const [notes, setNotes] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userEmail = user.emailAddresses.find(email => email?.verification.status === 'verified');
        const response = await axios.get('https://localhost:7185/api/User');
        const fetchedUser = response.data.find(x => x.email === userEmail.emailAddress);
        const userId = fetchedUser ? fetchedUser.id : null;
        setSelectedUserId(userId); // אם אתה רוצה לשלוח את המזהה של המשתמש לצורך הדירוג
        if (userId) {
          dispatch(fetchUserById(userId));
          const driverResponse = await dispatch(fetchDriver());
          const driverData = driverResponse.payload;
          const driver = driverData.find(driver => driver.id === userId)?.nameDriver;
          setNameDriver(driver);
        }
      }
    };

    fetchUserData();
  }, [dispatch, user]);

  const userData = useSelector(state => state.users.User);

  const handleOpenRatingWindow = (orderId) => {
    setSelectedOrderId(orderId);
    setRatingWindowOpen(true);
  };

  const handleCloseRatingWindow = () => {
    setRatingWindowOpen(false);
  };

  const handleSubmitRating = () => {
    console.log('Submitted rating:', selectedStars, 'Notes:', notes);
    handleCloseRatingWindow();
    dispatch(addReviewToServer({
      orderid: selectedOrderId,
      userid: selectedUserId,
      date: new Date().toISOString(),
      rating: selectedStars,
      comment: notes
    }));
  };

  return (
    <div>
      <h4 style={{ textAlign: 'left' }}>My Orders</h4>
      <div className="row">
        {userData && userData.orderList && userData.orderList.map(order => (
          <div key={order.id} className="col-md-4 mb-3" >
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order ID: {order.id}</h5>
                <p className="card-text">Date: {order.driveTime.split('T')[0]}</p>
                <p className="card-text">Source: {order.source}</p>
                <p className="card-text">Destination: {order.destination}</p>
                <Button
                  variant="primary"
                  onClick={() => handleOpenRatingWindow(order.id)}
                  style={{ backgroundColor: '#80cbc4', borderColor: '#80cbc4' }}
                >
                  Add Rating to Driver {nameDriver}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={ratingWindowOpen} onHide={handleCloseRatingWindow} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rate Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                variant="primary"
                onClick={() => setSelectedStars(star)}
                style={{
                  backgroundColor: star <= selectedStars ? '#80cbc4' : '#fff',
                  borderColor: '#80cbc4',
                  color: star <= selectedStars ? '#fff' : '#000',
                }}
              >
                ★
              </Button>
            ))}
          </div>
          <textarea style={{ width: 300, height: 150 }} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Enter your notes about the driver..."></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-primary" style={{ backgroundColor: '#80cbc4' }} mr={2} onClick={handleSubmitRating}>Submit Rating</Button>
          <Button className="btn btn-primary" style={{ backgroundColor: '#80cbc4' }} onClick={handleCloseRatingWindow}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyOrdering;
