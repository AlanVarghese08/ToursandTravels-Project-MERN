import React from "react";

const Card = ({ title, count }) => {
  return (
    <div className="cardd">
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  );
};

export default Card;
