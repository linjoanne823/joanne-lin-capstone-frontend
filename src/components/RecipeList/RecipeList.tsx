import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import LikeButton from "../LikeButton/LikeButtonRecipes";
import UseModal from "../Modal/UseModal";
import RecipeDetails from "../RecipeDetails/RecipeDetails";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Button, Card, CardContent, Typography } from "@mui/material";
import DietFilter from "../Filters/DietFilter";
import CuisineFilter from "../Filters/CuisineFilter";
import AllergyFilter from "../Filters/AllergyFilter";
import { UserContext } from "../../contexts/UserContext";
import config from "../../config";

const RecipeList = () => {

  const { dietContext, setDietContext, allergiesContext, setAllergiesContext, userId } = useContext(UserContext);
  const [recipes, setRecipes] = useState<{id:number; image: string; title: string}[]>([]);
  const [cuisine, setCuisine] = useState("");
  const [activeModalIndex, setActiveModalIndex] = useState(-1);
  const [noRecipesFound, setNoRecipesFound] = useState(false);

  const buildQueryString = () => {
    let queryString = "";
    if (dietContext) queryString += `diet=${dietContext}&`;

    if (allergiesContext) queryString += `intolerances=${allergiesContext}&`;

    if (cuisine) queryString += `cuisine=${cuisine}`;

    return queryString;
  };

  const getRecipes = () => {
    axios
      .get(`${config.backend_url}/recipes/?${buildQueryString()}?${userId}`)
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

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietContext(e.target.value);
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setAllergiesContext(e.target.value);
  };

  const handleSelectCuisine = (e) => {
    e.preventDefault();
    return setCuisine(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  return (
    <Card sx={{ flexGrow: 1 }}>
      <CardContent sx={{ display: "flex", flexDirection: "row", margin: "1rem", flexWrap:"wrap"}}>
        <DietFilter
          diet={dietContext}
          handleSelectDietaryRestriction={handleSelectDietaryRestriction}
        />
        <AllergyFilter
          intolerances={allergiesContext}
          handleSelectAllergies={handleSelectAllergies}
        />
        <CuisineFilter
          cuisine={cuisine}
          handleSelectCuisine={handleSelectCuisine}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          size="small"
          style={{ margin: "1rem" }}
        >
          Submit
        </Button>
      </CardContent>

      <ImageList
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {noRecipesFound
          ? <Typography style={{paddingBottom:"1rem", paddingLeft:"0.5rem"}}>Oh nuu :/ Maybe try a different combo?</Typography>
          : recipes.map((recipe, i) => {
              return (
                <ImageListItem
                  className="recipes__card"
                  key={recipe.id}
                  onClick={() => setActiveModalIndex(i)}
                >
                  <img
                    src={`${recipe.image}?w=400&fit=crop&auto=format`}
                    srcSet={`${recipe.image}?w=400&fit=crop&auto=format&dpr=2 2x`}
                    alt={recipe.title}
                    loading="lazy"
                  />

                  {activeModalIndex === i && (
                    <UseModal closeModal={() => setActiveModalIndex(-1)}>
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
    </Card>
  );
};

export default RecipeList;
