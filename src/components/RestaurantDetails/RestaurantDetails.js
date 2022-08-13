import React, { useState, useEffect } from "react";
import "./RestaurantDetails.scss";
import axios from "axios";
import LikeButtonRestaurant from "../LikeButton/LikeButtonRestaurants";

const RestaurantDetails = (props) => {
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [userId, setUserId] = useState(1);


  const getSelectRestaurant = () => {
    axios
      .get(
        `http://localhost:8080/restaurants/${props.restaurantId}?userId=${userId}`
      )
      .then((response) => {
        setRestaurantDetails(response.data);
      });
  };

  useEffect(() => {
    if (props.favouriteRestaurantDetails) {
      setRestaurantDetails(props.favouriteRestaurantDetails);
    } else {
      getSelectRestaurant();
    }
  }, {});
  // the above line only works if the user liked the restaurant

  //   const restaurant = props.restaurant;
  //   console.log("restaurant info here" + props.name);
  const handleLikeRestaurants = () => {
    axios.post(
      "http://localhost:8080/restaurants/favourites",
      {
        restaurantDetails,
        userId: 1,
      },
      {
        "Content-Type": "application/json",
      }
    );
  };

  const handleUnlikeRestaurants = () => {
    axios.delete(
      `http://localhost:8080/restaurants/favourites/${props.restaurantId}?userId=${userId}`,
    );
  };
  //   console.log(restaurant);
  return (
    <div className="restaurant">
       {Object.keys(restaurantDetails).length>0?(
        <div>
          <img src={restaurantDetails.photos}></img>
          <div>
            <LikeButtonRestaurant
              restaurantDetails={restaurantDetails}
              handleLike={handleLikeRestaurants}
              handleUnlike={handleUnlikeRestaurants}
            />
            <h2>{restaurantDetails.name}</h2>
            <p>{restaurantDetails.categories}</p>
            <p>{restaurantDetails.price}</p>
          </div>
        </div>
       ):(
           <p>Loading...</p>
       )}
        
      {/* ) : (
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
      )} */}
    </div>
  );
};

export default RestaurantDetails;
