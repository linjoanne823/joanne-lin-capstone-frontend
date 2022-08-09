import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./RestaurantList.scss";
import Dropdown from "react-dropdown";
import { convertLength } from "@mui/material/styles/cssUtils";
import LikeButton from "../LikeButton/LikeButtonRecipes";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { IoMdRestaurant } from "react-icons/io";
import DietFilter from "../Filters/DietFilter";

const RestaurantList = (props) => {
  const presetCategories = ["Vegan", "Gluten-Free", "Vegetarian"];
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [userId, setUserId] = useState(1);

  const getRestaurants = () => {
    const fetchSetOfCategories = (businesses) => {
      //set automatically eliminates duplicates
      const categories = new Set();
      businesses.forEach((business) => {
        //loops through all businesses and in each business
        //loops through all the categories
        business.categories.forEach((category) => {
          if (!presetCategories.includes(category.title))
            //this excludes the preset ones
            categories.add(category.title); //and only adds those not in preset
        });
      });
      return [...categories].sort(); //will convert Set back into an array and sort it alphabetically
    };

    const data = JSON.stringify({
      term: "restaurant",
      location: location || "Vancouver",
      categories: dietaryRestriction,
    });

    const config = {
      method: "POST",
      url: `http://localhost:8080/restaurants/?userId=${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        console.log(response.data.search.business);
        setRestaurants(response.data.search.business);
        setCategories(fetchSetOfCategories(response.data.search.business));
        console.log(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRestaurants();
  }, []);
  console.log(restaurants);

  const handleLocationChange = (e) => {
    e.preventDefault();
    return setLocation(e.target.value);
  };

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietaryRestriction(e.target.value);
  };

  const handleSelectCategories = (e) => {
    e.preventDefault();
    return setSelectCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRestaurants();
    console.log(restaurants);
  };

  console.log(categories);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "1rem" }}>
        {/* <form onSubmit={handleSubmit}> */}
        <DietFilter
          diet={dietaryRestriction}
          handleSelectDietaryRestriction={handleSelectDietaryRestriction}
        />
        {/* <input
            type="text"
            placeholder="Enter a different city"
            onChange={handleLocationChange}
          ></input> */}
        {/* </form> */}
        <button onClick={handleSubmit}>Search</button>
        <form onSubmit={handleSubmit}>
          <select onChange={handleSelectCategories}>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </form>
      </Box>
      <button onClick={handleSubmit}>Filter</button>
      <ImageList
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))!important",
        }}
      >
        {restaurants
          .filter((restaurant) => {
            return restaurant.categories.some((category) => {
              return category.title === selectCategory || selectCategory === "";
            });
          })
          .map((restaurant, i) => {
            return (
              <ImageListItem
                className="restaurants__card"
                key={restaurant.id}
                // style={{
                //   backgroundImage: `url(${restaurant.photos})`,
                //   backgroundSize: "18.125rem 12.5rem",
                //   backgroundRepeat: "no-repeat",
                // }}
                onClick={() => setActiveModalIndex(i)}
              >
                <img
                  src={`${restaurant.photos}?w=400&fit=crop&auto=format`}
                  srcSet={`${restaurant.photos}?w=400&fit=crop&auto=format&dpr=2 2x`}
                  alt={restaurant.name}
                  loading="lazy"
                />
                {activeModalIndex === i && (
                  // <div onClick={() => props.closeModal(-1)}>
                  <UseModal closeModal={setActiveModalIndex}>
                    {
                      <RestaurantDetails
                        name={restaurant.name}
                        photo={restaurant.photos}
                        price={restaurant.price}
                        rating={restaurant.rating}
                        location={restaurant.location.address1}
                        restaurant={restaurant}
                        review={restaurant.reviews.map((element) => {
                          return (
                            <div className="restaurants__review">
                              <p>{element.user.name}</p>
                              <p>{"⭐".repeat(element.rating)}</p>
                              <p>{element.text}</p>
                            </div>
                          );
                        })}
                        categories={restaurant.categories
                          .map((element) => element.title)
                          .join(" / ")}
                      />
                    }
                  </UseModal>
                  // </div>
                )}
                <ImageListItemBar
                  className="recipes__text"
                  title={restaurant.name}
                ></ImageListItemBar>
              </ImageListItem>
            );
          })}
      </ImageList>
    </Box>
  );
};

export default RestaurantList;
