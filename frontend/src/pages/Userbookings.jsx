// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { BASE_URL } from "../utils/config";
// import jwt from "jsonwebtoken";

// const UserBookings = () => {
//   const { userId } = useParams();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const decoded = jwt.decode(accesstoken);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/booking/userbookings/${userId}`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch data: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("de", decoded);
//         setBookings(data.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, [userId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <h2>User Bookings</h2>
//       {bookings.length === 0 ? (
//         <p>No bookings found for this user.</p>
//       ) : (
//         <ul>
//           {bookings.map((booking) => (
//             <li key={booking._id}>{/* Display booking details here */}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UserBookings;
