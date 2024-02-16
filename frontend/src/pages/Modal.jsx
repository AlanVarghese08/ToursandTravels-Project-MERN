// Modal.js
import React from "react";
import PaymentForm from "./PaymentForm";

const Modal = ({ handleClose, bookingId }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>Payment Form</h2>
        <PaymentForm bookingId={bookingId} />
      </div>
    </div>
  );
};

export default Modal;
