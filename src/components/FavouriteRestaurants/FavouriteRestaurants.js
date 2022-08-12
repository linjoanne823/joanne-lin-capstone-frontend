import React, { useState, useEffect } from "react";
import axios from "axios";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";

const FavouriteRestaurants = () => {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [userId, setUserId] = useState(1);
  const getFavouriteRestaurants = () => {
    axios
      .get(`http://localhost:8080/restaurants/favourites/?userId=${userId}`)
      .then((response) => {
        setFavouriteRestaurants(response.data);
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
                    photo={restaurant.photos}
                    price={restaurant.price}
                    rating={restaurant.rating}
                    location={restaurant.location}
                    favouriteRestaurantDetails={restaurant}
                    restaurantId={restaurant.restaurant_id}
                    review={restaurant.reviews.map((element) => {
                      return (
                        <div>
                          <p>{element.user.name}</p>
                          <p>{"⭐".repeat(element.rating)}</p>
                          <p>{element.text}</p>
                        </div>
                      );
                    })}
                    categories={restaurant.categories}
                  />
                }
              </UseModal>
            )}
            <img src={restaurant.photos} style={{ width: "300px" }}></img>
            <p>{restaurant.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRestaurants;
