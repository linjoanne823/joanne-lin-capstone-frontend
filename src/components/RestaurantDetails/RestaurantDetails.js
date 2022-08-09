import React from "react";
import LikeButton from "../LikeButton/LikeButtonRestaurants";
import "./RestaurantDetails.scss";
import axios from "axios";

const RestaurantDetails = (props) => {
  const restaurant = props.restaurant
  const handleLikeRestaurants = () => {
    axios.post(
      "http://localhost:8080/restaurants/favourites",
      {
        restaurant,
        userId: 1,
      },
      {
        "Content-Type": "application/json",
      }
    );
  };
  return (
    <div className="restaurant">
      {props.name.length > 0 ? (
        <div>
          <img src={props.photo} className="restaurant__image" />
          <LikeButton restaurant={props.restaurant} handleLike={handleLikeRestaurants}/>

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
