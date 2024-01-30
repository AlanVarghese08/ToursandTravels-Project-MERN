// ToursAdmin.jsx

import React, { useState, useEffect } from "react";
import { BASE_URL } from "../utils/config";
import "./ToursAdmin.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const Toursadmin = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddTourForm, setShowAddTourForm] = useState(false);
  const [newTourData, setNewTourData] = useState({
    title: "",
    city: "",
    address: "",
    distance: 0,
    photo: "",
    desc: "",
    price: 0,
    maxGroupSize: 0,
    featured: false,
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tours?page=0`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch tours");
        }
        const data = await response.json();
        setTours(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/tours/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete tour");
      }

      // Filter out the deleted tour from the state
      setTours((prevTours) => prevTours.filter((tour) => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const handleAddTourClick = () => {
    setShowAddTourForm(true);
  };

  const handleAddTourChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTourData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTourSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/tours/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTourData),
      });

      if (!response.ok) {
        throw new Error("Failed to add tour");
      }

      const result = await response.json();
      const addedTour = result.data;
      console.log("added tour", addedTour);

      setTours((prevTours) => [...prevTours, addedTour]);
      setShowAddTourForm(false);
      // Reset the newTourData state
      setNewTourData({
        title: "",
        city: "",
        address: "",
        distance: 0,
        photo: "",
        desc: "",
        price: 0,
        maxGroupSize: 0,
        featured: false,
      });
    } catch (error) {
      console.error("Error adding tour:", error);
    }
  };

  return (
    <div>
      <h1>Tours</h1>
      <Button variant="contained" color="primary" onClick={handleAddTourClick}>
        Add tour
      </Button>
      {showAddTourForm && (
        <Form onSubmit={handleAddTourSubmit}>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={newTourData.title}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City</Label>
            <Input
              type="text"
              name="city"
              id="city"
              placeholder="Enter city"
              value={newTourData.city}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Enter address"
              value={newTourData.address}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="distance">Distance</Label>
            <Input
              type="number"
              name="distance"
              id="distance"
              placeholder="Enter distance"
              value={newTourData.distance}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="photo">Photo URL</Label>
            <Input
              type="text"
              name="photo"
              id="photo"
              placeholder="Enter photo URL"
              value={newTourData.photo}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="desc">Description</Label>
            <Input
              type="textarea"
              name="desc"
              id="desc"
              placeholder="Enter description"
              value={newTourData.desc}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="price">Price</Label>
            <Input
              type="number"
              name="price"
              id="price"
              placeholder="Enter price"
              value={newTourData.price}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="maxGroupSize">Max Group Size</Label>
            <Input
              type="number"
              name="maxGroupSize"
              id="maxGroupSize"
              placeholder="Enter max group size"
              value={newTourData.maxGroupSize}
              onChange={handleAddTourChange}
              required
            />
          </FormGroup>
          {/* Featured field (assuming it's a boolean) */}
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                id="featured"
                name="featured"
                checked={newTourData.featured}
                onChange={handleAddTourChange}
              />
              Featured
            </Label>
          </FormGroup>
          <Button color="primary" type="submit">
            Save
          </Button>{" "}
          <Button color="secondary" onClick={() => setShowAddTourForm(false)}>
            Cancel
          </Button>
        </Form>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="tour-card-container">
          {tours.map((tour) => (
            <div key={tour._id} className="tour-card">
              <img src={tour.photo} alt="tour-img" />
              <h2>{tour.title}</h2>
              <h4>Rs.{tour.price}</h4>
              <p>{tour.address}</p>
              <p>{tour.description}</p>
              <div className="button-container">
                <Button
                  color="danger"
                  variant="contained"
                  onClick={() => handleDelete(tour._id)}
                >
                  Delete
                </Button>{" "}
                <span className="spacer"></span>{" "}
                <Button color="primary" variant="contained">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toursadmin;
