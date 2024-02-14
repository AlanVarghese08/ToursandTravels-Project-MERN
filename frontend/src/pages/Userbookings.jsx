import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
import "./userbookings.css";
// import PaymentForm from "./PaymentForm";
import Modal from "./Modal";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/${id}`, {
          headers: {
            "content-type": "application/json",
          },
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();
        setBookings(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  let bookingNumber = 1;

  const handlePay = (bookingId) => {
    setShowModal(true);
    setSelectedBookingId(bookingId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBookingId(null);
  };

  return (
    <div>
      <h2>User Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking Number</th>
              <th>Tour Name</th>
              <th>Full Name</th>
              <th>Guest Size</th>
              <th>Phone</th>
              <th>Booked At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{bookingNumber++}</td>
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.bookAt).toLocaleString()}</td>
                <td>
                  {booking.status === "Requested" && (
                    <button disabled={true} className="requested-button">
                      Requested
                    </button>
                  )}
                  {booking.status === "accepted" && (
                    <button
                      onClick={() => handlePay(booking._id)}
                      className="pay-button"
                    >
                      Pay
                    </button>
                  )}
                  {booking.status === "paid" && (
                    <button disabled={true} className="paid-button">
                      Paid
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <Modal handleClose={handleCloseModal} bookingId={selectedBookingId} />
      )}
    </div>
  );
};

export default UserBookings;
