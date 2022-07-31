import React, { useState } from "react";
import likeButton from "../../assets/icons/heart-992.svg";
import whiteLikeButton from "../../assets/icons/heart-917.svg";
import "./LikeButton.scss";

const LikeButton = () => {
  const [toggled, setToggled] = useState(true);

  const toggleImage = () => setToggled(!toggled);

  return (
    <div onClick={toggleImage}>
      {toggled && <img src={whiteLikeButton} className="toggle-button" />}
      {!toggled && <img src={likeButton} className="toggle-button" />}
    </div>
  );
};

export default LikeButton;