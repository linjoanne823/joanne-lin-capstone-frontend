import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UseModal from "../Modal/UseModal";
import RestaurantDetails from "../RestaurantDetails/RestaurantDetails";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import DietFilter from "../Filters/DietFilter";
import LocationSearch from "../Filters/LocationSearch";
import { UserContext } from "../../contexts/UserContext";

const RestaurantList = (props) => {

  const {
    userId,
    locationContext,
    setLocationContext,
    dietContext,
    setDietContext
  } = useContext(UserContext)
  const presetCategories = ["Vegan", "Gluten-Free", "Vegetarian"];
  const [restaurants, setRestaurants] = useState([]);
  // const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  // const [diet, setDiet] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  // const [userId, setUserId] = useState(1);

  const getRestaurants = () => {
    const fetchSetOfCategories = (businesses) => {
      //set automatically eliminates duplicates
      const categories = new Set();
      businesses.forEach((business) => {
        //loops through all businesses and in each business
        //loops through all the categories
        business.categories.split(",").forEach((category) => {
          if (!presetCategories.includes(category))
            //this excludes the preset ones
            categories.add(category); //and only adds those not in preset
        });
      });
      return [...categories].sort(); //will convert Set back into an array and sort it alphabetically
    };

    const spoonacularToYelpMap = {
      "Gluten-Free": "gluten_free",
      Vegan: "vegan",
      Vegetarian: "vegatarian",
    };

    const data = JSON.stringify({
      term: "restaurant",
      location: locationContext || "Vancouver",
      categories: spoonacularToYelpMap[dietContext] || "",
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
        setRestaurants(response.data);
        setCategories(fetchSetOfCategories(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleLocationChange = (e) => {
    e.preventDefault();
    return setLocationContext(e.target.value);
  };

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietContext(e.target.value);
  };

  const handleSelectCategories = (e) => {
    e.preventDefault();
    return setSelectCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRestaurants();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", margin: "1rem" }}>
   
        <FormControl onSubmit={handleSubmit} sx={{display:"flex", flexDirection:"row"}}>
          <DietFilter
            diet={dietContext}
            handleSelectDietaryRestriction={handleSelectDietaryRestriction}
          />
          <LocationSearch
            location={locationContext}
            handleLocationChange={handleLocationChange}
          />
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          size="small"
          style={{ margin: "1rem" }}
          onClick={handleSubmit}
        >
          Search!
        </Button>
        <FormControl sx={{ m: 1, minWidth: 200 }} onSubmit={handleSubmit}>
          <InputLabel>Categories</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            label="Categories"
            onChange={handleSelectCategories}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((category, index) => {
              return (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <ImageList
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))!important",
        }}
      >
        {restaurants
          .filter((restaurant) => {
            return restaurant.categories.split(",").some((category) => {
              return category === selectCategory || selectCategory === "";
            });
          })
          .map((restaurant, i) => {
            return (
              <ImageListItem
                className="restaurants__card"
                key={i}
                onClick={() => setActiveModalIndex(i)}
              >
                <img
                  src={`${restaurant.photos}?w=400&fit=crop&auto=format`}
                  srcSet={`${restaurant.photos}?w=400&fit=crop&auto=format&dpr=2 2x`}
                  alt={restaurant.name}
                  loading="lazy"
                />
                {activeModalIndex === i && (
                  <UseModal closeModal={() => setActiveModalIndex(-1)}>
                    {
                      <RestaurantDetails
                        name={restaurant.name}
                        photo={restaurant.photos}
                        price={restaurant.price}
                        rating={restaurant.rating}
                        location={restaurant.location.address1}
                        restaurant={restaurant}
                        restaurantId={restaurant.restaurant_id}
                        review={restaurant.reviews.map((element) => {
                          return (
                            <Box sx={{ borderBottom: "1px solid black" }}>
                              <Typography>{element.user.name}</Typography>
                              <Typography>
                                {"⭐".repeat(element.rating)}
                              </Typography>
                              <Typography>{element.text}</Typography>
                            </Box>
                          );
                        })}
                        categories={restaurant.categories
                          .split(",")
                          .map((element) => element)
                          .join(" / ")}
                      />
                    }
                  </UseModal>
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
