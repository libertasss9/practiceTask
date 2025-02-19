import React from "react";

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (value) => {
    onRatingChange(value); 
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          className="text-5xl lg:text-6xl"
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
