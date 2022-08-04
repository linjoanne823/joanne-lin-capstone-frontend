import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Header from "../../components/Header/Header";
import "./Home.scss";

const Home = () => {
  return (
    <div>
      <div className="homepage__body">
        <DropdownMenu />
        <Carousel />
      </div>
    </div>
  );
};

export default Home;
