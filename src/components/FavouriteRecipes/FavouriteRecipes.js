import axios from "axios";
import React, { useState, useEffect } from "react";

const FavouriteRecipes = () => {
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);

  const getFavouriteRecipes = () => {
    axios
      .get("http://localhost:8080/recipes/favourites/recipes")
      .then((response) => {
        setFavouriteRecipes(response.data);
        console.log(response.data);
      });
  };

  useEffect(() => {
    getFavouriteRecipes();
  }, []);

  return (
    <div>
      {favouriteRecipes.map((element) => {
        return (
          <div>
            <img src={element.image} style={{width:"300px"}}></img>
            <p>{element.title}</p>
           
          </div>
        );
      })}
    </div>
  );
};

export default FavouriteRecipes;
