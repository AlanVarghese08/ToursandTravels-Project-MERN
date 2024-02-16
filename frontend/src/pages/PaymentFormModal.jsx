import React, { useState } from "react";

const PaymentFormModal = ({ onClose, bookingId }) => {
  const [formData, setFormData] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePay = () => {
    // Implement payment processing logic here
    console.log("Processing payment:", formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
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
          type="text"
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
        <button onClick={handlePay}>Pay</button>
      </div>
    </div>
  );
};

export default PaymentFormModal;
