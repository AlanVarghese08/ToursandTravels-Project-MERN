import React from "react";
import { Routes, Route } from "react-router-dom";

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

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tour/search" element={<SearchResultList />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/users" element={<Users />} />
      <Route path="/toursadmin" element={<Toursadmin />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/userbookings" element={<Userbookings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Router;
