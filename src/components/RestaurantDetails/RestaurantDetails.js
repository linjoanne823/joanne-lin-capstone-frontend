import React from "react";
import "./RestaurantDetails.scss";

const RestaurantDetails = (props) => {
  return (
    <div className="restaurant">
      {props.name.length > 0 ? (
        <div>
          <img src={props.photo} className="restaurant__image" />
          <h2>{props.name}</h2>
          <p>{props.categories}</p>
          <p>{props.price}</p>
          <h3>Recommended Reviews:</h3>
          <p>{"⭐".repeat(props.rating)}</p>
          <p>{props.location}</p>
          <p>{props.review}</p>
        </div>
      ) : null}
    </div>
  );
};

export default RestaurantDetails;
