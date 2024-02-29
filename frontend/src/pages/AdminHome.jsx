import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import Card from "../components/Card";
import "../pages/adminhome.css";

const AdminHome = () => {
  const [userCount, setUserCount] = useState(0);
  const [tourCount, setTourCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(`${BASE_URL}/users/`, {
          method: "GET",
          credentials: "include",
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          const count = userData.count;
          console.log(count);
          setUserCount(count || 0);
        } else {
          console.error("Error fetching user count:", userResponse.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      try {
        const tourResponse = await fetch(
          `${BASE_URL}/tours/search/getTourCount`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (tourResponse.ok) {
          const tourCountData = await tourResponse.json();

          const count =
            tourCountData && tourCountData.data ? tourCountData.data : 0;

          setTourCount(count);
        } else {
          console.error("Error fetching tour count:", tourResponse.status);
        }
      } catch (error) {
        console.error("Error fetching tour data:", error);
      }
      try {
        const userResponse = await fetch(`${BASE_URL}/booking/`, {
          method: "GET",
          credentials: "include",
        });
        if (userResponse.ok) {
          const bookings = await userResponse.json();
          const count = bookings.count;
          console.log(count);
          setBookingCount(count || 0);
        } else {
          console.error("Error fetching user count:", userResponse.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className="admin-home"
      style={{
        backgroundImage:
          'url("https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_640.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="admin-home-title" style={{ color: "white" }}>
        Welcome to Admin Dashboard
      </h1>
      <div className="container-card">
        <Card title="Users" count={userCount} />
        <Card title="Tours" count={tourCount} />
        <Card title="Bookings" count={bookingCount} />
      </div>
    </div>
  );
};

export default AdminHome;
