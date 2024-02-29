import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setBookings(data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleAccept = async (bookingId, currentStatus) => {
    let newStatus;

    switch (currentStatus) {
      case "requested":
        newStatus = "accepted";
        break;
      case "accepted":
        newStatus = "accepted";
        break;
      case "paid":
        newStatus = "paid";
        break;
      default:
        newStatus = "accepted";
    }

    try {
      const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "accepted" }
              : booking
          )
        );
        console.log(
          `Booking with ID ${bookingId} updated to ${newStatus} successfully.`
        );
      } else {
        console.error(`Error updating booking with ID ${bookingId}.`);
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
        console.log(`Booking with ID ${bookingId} deleted successfully.`);
      } else {
        console.error(`Error deleting booking with ID ${bookingId}.`);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const renderAcceptButton = (status, bookingId) => {
    switch (status) {
      case "Requested":
        return (
          <>
            <button
              className="accept"
              onClick={() => handleAccept(bookingId, status)}
            >
              Accept
            </button>
            <button className="delete" onClick={() => handleDelete(bookingId)}>
              Decline
            </button>
          </>
        );
      case "accepted":
        return (
          <button className="accepted" disabled>
            Accepted
          </button>
        );
      case "paid":
        return (
          <button className="paid" disabled>
            Paid
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Tour Name</th>
              <th>Guest Name</th>
              <th>No of People</th>
              <th>Booked At</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{new Date(booking.bookAt).toLocaleString()}</td>
                <td>{renderAcceptButton(booking.status, booking._id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
