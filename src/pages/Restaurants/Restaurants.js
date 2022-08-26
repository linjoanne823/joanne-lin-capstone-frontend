import React from "react";
import LoggedInDropdownMenu from "../../components/Menu/HomeMenu";
import { Box } from "@mui/material";
import RestaurantList from "../../components/RestaurantList/RestaurantList";

const Restaurants = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu />
     
      <RestaurantList />
      
    </Box>
  );
};

export default Restaurants;
