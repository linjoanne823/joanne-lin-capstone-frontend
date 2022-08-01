import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Carousel/Carousel.scss";
const sliderImages = [
  {
    title: "first image",
    urls: "https://img.taste.com.au/m3W-xKYX/taste/2017/07/quick-and-easy-meal-planner-128684-2.jpg",
  },
  {
    title: "second image",
    urls: "https://cdn.pixabay.com/photo/2017/08/03/21/48/drinks-2578446_960_720.jpg",
  },
  {
    title: "third image",
    urls: "https://cdn.pixabay.com/photo/2016/11/18/14/39/beans-1834984_960_720.jpg",
  },
];

const Carousel = () => {
  const sizeOfSliderImages = sliderImages.length;
  const [currentImage, setCurrentImage] = useState(0);
  const goToNextImage = () => {
    setCurrentImage(
      (previousImage) => (previousImage + 1) % sizeOfSliderImages
    );
  };

  const useInterval = (goToNextImage) => {
    useEffect(() => {
      const autoloop = setInterval(() => {
        goToNextImage();
      }, 3000);
      return () => clearInterval(autoloop);
    });
  };
  useInterval(goToNextImage);
  return (
    <div className="carousel">
      <div className="carousel__button-container">
        <Link to={"/recipes"}>
          <button className="carousel__button">Recipes</button>
        </Link>
        <Link to={"/restaurants"}>
          <button className="carousel__button">Restaurants</button>
        </Link>
      </div>

      <img src={sliderImages[currentImage].urls} className="carousel__image" />
    </div>
  );
};

export default Carousel;
