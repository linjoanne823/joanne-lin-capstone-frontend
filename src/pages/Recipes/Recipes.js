import React from "react";
import LoggedInDropdownMenu from "../../components/DropdownMenu/LoggedInDropdownMenu";
import RecipeList from "../../components/RecipeList/RecipeList";
import { Box } from "@mui/material";

const Recipes = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu />
      <RecipeList />
    </Box>
  );
};

export default Recipes;
