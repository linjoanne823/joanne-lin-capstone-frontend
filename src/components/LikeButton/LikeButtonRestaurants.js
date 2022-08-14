import React, { useState } from "react";
import likeButton from "../../assets/icons/heart-992.svg";
import whiteLikeButton from "../../assets/icons/heart-917.svg";
import "./LikeButton.scss";
import { Box } from "@mui/material";

const LikeButtonRestaurant = (props) => {
  const [liked, setLiked] = useState(props.restaurantDetails.isLiked);

  const toggleImage = () => {
    setLiked(!liked);
    if (!liked) {
      props.handleLike();
    } else {
      props.handleUnlike();
    }
  };

  return (
    <Box onClick={toggleImage}>
      {!liked && <img src={whiteLikeButton} className="toggle-button" />}
      {liked && <img src={likeButton} className="toggle-button" />}
    </Box>
  );
};

export default LikeButtonRestaurant;
