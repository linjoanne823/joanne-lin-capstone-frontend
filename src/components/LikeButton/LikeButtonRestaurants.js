import React, { useState } from "react";
import likeButton from "../../assets/icons/heart-992.svg";
import whiteLikeButton from "../../assets/icons/heart-917.svg";
import "./LikeButton.scss";

const LikeButton = (props) => {
  const [liked, setLiked] = useState(false);


  const toggleImage = () => {
    setLiked(!liked);
    if (!liked) {
      props.handleLike();
    } else {
      props.handleUnlike();
    }
  };



  return (
    <div onClick={toggleImage}>
      {!liked && <img src={whiteLikeButton} className="toggle-button" />}
      {liked && <img src={likeButton} className="toggle-button" />}
    </div>
  );
};

export default LikeButton;
