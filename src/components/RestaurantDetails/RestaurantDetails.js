import React from "react";
import LikeButton from "../LikeButton/LikeButtonRestaurants";
import "./RestaurantDetails.scss";
import axios from "axios";

const RestaurantDetails = (props) => {
    const restaurant=props.restaurant
//   const restaurant = props.restaurant;
  console.log("restaurant info here" + props.name)
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

  const handleUnlikeRestaurants = () => {
    axios.delete(
      "http://localhost:8080/restaurants/favourites",
      {
        data: {
          restaurant,
          userId: 1,
        },
      },
      {
        "Content-Type": "application/json",
      }
    );
  };
  console.log(restaurant)
  return (
    <div className="restaurant">
      {props.name.length > 0 ? (
        <div>
          <img src={props.photo} className="restaurant__image" />
          <LikeButton
            restaurant={restaurant}
            handleLike={handleLikeRestaurants}
            handleUnlike={handleUnlikeRestaurants}
          />

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
