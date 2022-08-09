import React, { useState, useEffect } from "react";
import axios from "axios";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

const FavouriteRestaurants = () => {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [userId, setUserId]=useState(1)
  const getFavouriteRestaurants = () => {
    axios
      .get(`http://localhost:8080/restaurants/favourites/?userId=${userId}`)
      .then((response) => {
        setFavouriteRestaurants(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRestaurants();
  }, []);
  return (
    <div>
      {favouriteRestaurants.map((restaurant, i) => {
        return (
          <div
            onClick={() => {
              setActiveModalIndex(i);
            }}
          >
            {activeModalIndex === i && (
              <UseModal closeModal={setActiveModalIndex}>
                {
                  <RestaurantDetails
                    name={restaurant.name}
                    photo={restaurant.photo}
                    price={restaurant.price}
                    rating={restaurant.ratings}
                    location={restaurant.location}
                    reviewText={restaurant.reviews}
                    categories={restaurant.categories}
                  />
                }
              </UseModal>
            )}
            <img src={restaurant.photo} style={{ width: "300px" }}></img>
            <p>{restaurant.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRestaurants;
