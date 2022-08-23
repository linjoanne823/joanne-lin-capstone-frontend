import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import {
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import config from "../../config";
import { UserContext } from "../../contexts/UserContext";

const FavouriteRestaurants = () => {
  const [favouriteRestaurants, setFavouriteRestaurants] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const { userId } = useContext(UserContext);
  const getFavouriteRestaurants = () => {
    axios
      .get(
        `${config.backend_url}:8080/restaurants/favourites/?userId=${userId}`
      )
      .then((response) => {
        setFavouriteRestaurants(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRestaurants();
  }, []);
  return (
    <ImageList
      sx={{
        mb: 8,
        gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))!important",
        marginBottom: 0,
      }}
    >
      {favouriteRestaurants.map((restaurant, i) => {
        return (
          <ImageListItem
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
            <img
              src={`${restaurant.photos}?w=300&fit=crop&auto=format`}
              srcSet={`${restaurant.photos}?w=300&fit=crop&auto=format&dpr=2 2x`}
              loading="lazy"
            />
            <ImageListItemBar title={restaurant.name}></ImageListItemBar>
          </ImageListItem>
        );
      })}
    </ImageList>
  );
};

export default FavouriteRestaurants;
