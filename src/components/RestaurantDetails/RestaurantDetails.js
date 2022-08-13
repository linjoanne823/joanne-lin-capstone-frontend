import React, { useState, useEffect } from "react";
import axios from "axios";
import LikeButtonRestaurant from "../LikeButton/LikeButtonRestaurants";
import { Box, Typography } from "@mui/material";

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
      `http://localhost:8080/restaurants/favourites/${props.restaurantId}?userId=${userId}`
    );
  };
  return (
    <Box sx={{ height: "60vh" }}>
      {Object.keys(restaurantDetails).length > 0 ? (
        <Box>
          <Box
            component="img"
            sx={{ width: "300px" }}
            src={restaurantDetails.photos}
          />
          <LikeButtonRestaurant
            restaurantDetails={restaurantDetails}
            handleLike={handleLikeRestaurants}
            handleUnlike={handleUnlikeRestaurants}
          />
          <Typography component="span" variant="h5">
            <Box sx={{ fontWeight: "600" }}>{restaurantDetails.name}</Box>
          </Typography>
          <Typography component="span">
            {restaurantDetails.categories}
          </Typography>
          <Typography>{restaurantDetails.price}</Typography>
          <Typography>{"⭐".repeat(props.rating)}</Typography>
          <Typography>{props.location}</Typography>
          <Typography variant="h6">
            <Box
              sx={{
                fontWeight: "600",
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: "1px solid black",
              }}
            >
              Recommended Reviews:
            </Box>
          </Typography>
          <Typography>{props.review}</Typography>
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default RestaurantDetails;
