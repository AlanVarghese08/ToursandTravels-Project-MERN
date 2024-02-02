import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthContext";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const id = user._id;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>User Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found for this user.</p>
      ) : (
        <table>
          <thead>
            <tr>
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
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{booking.phone}</td>
                <td>{new Date(booking.bookAt).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
