import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./paymentform.css";
import { BASE_URL } from "../utils/config";

const PaymentForm = () => {
  const { bookingid } = useParams();
  const totalamountParam = new URLSearchParams(window.location.search).get(
    "totalamount"
  );
  const totalamount = totalamountParam ? parseInt(totalamountParam) : 0;

  const [formData, setFormData] = useState({
    bookingId: bookingid,
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: totalamount,
  });

  const navigate = useNavigate(); // Use useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePay = async () => {
    try {
      const response = await fetch(`${BASE_URL}/pay/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Payment created successfully:", data);

        // Update booking status to "paid"
        const bookingResponse = await fetch(
          `${BASE_URL}/booking/${formData.bookingId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "paid" }),
          }
        );

        if (bookingResponse.ok) {
          console.log("Booking status updated to paid.");
        } else {
          console.error(
            "Failed to update booking status:",
            bookingResponse.statusText
          );
        }

        // Redirect to booked page
        navigate("/booked"); // Assuming "/booked" is your booked page route
      } else {
        console.error("Failed to create payment:", data.message);
      }
    } catch (err) {
      console.error("Error creating payment:", err);
    }
  };

  return (
    <div className="payment-form">
      <h2>Payment Details</h2>
      <label htmlFor="nameOnCard">Name on Card:</label>
      <input
        type="text"
        id="nameOnCard"
        name="nameOnCard"
        value={formData.nameOnCard}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="cardNumber">Card Number:</label>
      <input
        type="text"
        id="cardNumber"
        name="cardNumber"
        value={formData.cardNumber}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="expiryDate">Expiry Date:</label>
      <input
        type="month"
        id="expiryDate"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleInputChange}
        required
      />
      <label htmlFor="cvv">CVV:</label>
      <input
        type="text"
        id="cvv"
        name="cvv"
        value={formData.cvv}
        onChange={handleInputChange}
        required
      />
      <button onClick={handlePay}>Pay {totalamount}</button>
    </div>
  );
};

export default PaymentForm;
