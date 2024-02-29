import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Home from "./../pages/Home";

import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ThankYou from "../pages/ThankYou";
import SearchResultList from "../pages/SearchResultList";
import AdminHome from "../pages/AdminHome";
import Users from "../pages/Users";
import Toursadmin from "../pages/Toursadmin";
import Bookings from "../pages/Bookings";
import Userbookings from "../pages/Userbookings";
import Profile from "../pages/Profile";
import { AdminRoutes, Main, isAuth } from "../context/AuthContext";
import PaymentForm from "../pages/PaymentForm";
import Booked from "../pages/Booked";

const Router = () => {
  let Isadmin = isAuth();
  const { user } = useContext(AuthContext);
  let isadmin = Isadmin && user.role === "admin";
  let isuser = Isadmin && user.role === "user";

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {user ? (
        <>
          <Route
            path="/home"
            element={
              <AdminRoutes token={isuser}>
                <Main child={<Home />} />
              </AdminRoutes>
            }
          />
          <Route
            path="/tours"
            element={
              <AdminRoutes token={isuser}>
                <Main child={<Tours />} />
              </AdminRoutes>
            }
          />
          <Route
            path="/tours/:id"
            element={
              <AdminRoutes token={isuser}>
                <Main child={<TourDetails />} />
              </AdminRoutes>
            }
          />
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/tour/search" element={<SearchResultList />} />
        </>
      )}

      <Route
        path="/payment/:bookingid"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<PaymentForm />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/thank-you"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<ThankYou />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/booked"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<Booked />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/tour/search"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<SearchResultList />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/adminHome"
        element={
          <AdminRoutes token={isadmin}>
            <Main child={<AdminHome />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/users"
        element={
          <AdminRoutes token={isadmin}>
            <Main child={<Users />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/toursadmin"
        element={
          <AdminRoutes token={isadmin}>
            <Main child={<Toursadmin />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/bookings"
        element={
          <AdminRoutes token={isadmin}>
            <Main child={<Bookings />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/userbookings"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<Userbookings />} />
          </AdminRoutes>
        }
      />
      <Route
        path="/profile"
        element={
          <AdminRoutes token={isuser}>
            <Main child={<Profile />} />
          </AdminRoutes>
        }
      />
    </Routes>
  );
};

export default Router;
