import React from "react";
import ButtonsWithPictures from "../../components/ButtonBase/ButtonBase";
import Carousel from "../../components/Carousel/Carousl";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <ButtonsWithPictures />
      <div className="homepage__body">
       <DropdownMenu/>
      <Carousel />
      </div>
     
    </div>
  );
};

export default Home;
