import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./RecipeList.scss";
import LikeButton from "../LikeButton/LikeButton";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import DietFilter from "../Filters/DietFilter";
import CuisineFilter from "../Filters/CuisineFilter";
import AllergyFilter from "../Filters/AllergyFilter";

const RecipeList = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState([]);
  const [cuisine, setCuisine] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [noRecipesFound, setNoRecipesFound] = useState(false);

  const buildQueryString = () => {
    let queryString = "";
    if (diet) queryString += `diet=${diet}&`;

    if (intolerances) queryString += `intolerances=${intolerances}&`;

    if (cuisine) queryString += `cuisine=${cuisine}`;

    return queryString;
  };

  const getRecipes = () => {
    axios
      .get(`http://localhost:8080/recipes/?${buildQueryString()}`)
      .then((response) => {
        setNoRecipesFound(response.data.results.length === 0);
        return setRecipes(response.data.results);
      })
      .catch((error) => {
        return console.log(error);
      });
  };

  useEffect(() => {
    getRecipes();
  }, []);
  console.log(recipes);

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDiet(e.target.value);
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setIntolerances(e.target.value);
  };

  const handleSelectCuisine = (e) => {
    e.preventDefault();
    return setCuisine(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The diet is " + diet);
    getRecipes();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DietFilter
        diet={diet}
        handleSelectDietaryRestriction={handleSelectDietaryRestriction}
      />
      <AllergyFilter
        intolerances={intolerances}
        handleSelectAllergies={handleSelectAllergies}
      />
      <CuisineFilter
        cuisine={cuisine}
        handleSelectCuisine={handleSelectCuisine}
      />

      <Button variant="outlined" onClick={handleSubmit}>
        Submit
      </Button>
      <ImageList
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {noRecipesFound
          ? "Oh nuu :/"
          : recipes.map((recipe, i) => {
              return (
                <ImageListItem
                  className="recipes__card"
                  key={recipe.id}
                  // style={{ backgroundImage: `url(${recipe.image})` }}
                  onClick={() => setActiveModalIndex(i)}
                >
                  <img
                    src={`${recipe.image}?w=400&fit=crop&auto=format`}
                    srcSet={`${recipe.image}?w=400&fit=crop&auto=format&dpr=2 2x`}
                    alt={recipe.title}
                    loading="lazy"
                  />

                  {activeModalIndex === i && (
                    <UseModal closeModal={setActiveModalIndex}>
                      {<RecipeDetails recipeId={recipe.id} />}
                    </UseModal>
                  )}

                  <ImageListItemBar
                    className="recipes__text"
                    title={recipe.title}
                  ></ImageListItemBar>
                </ImageListItem>
              );
            })}
      </ImageList>
    </Box>
  );
};

export default RecipeList;
