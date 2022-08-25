import React from "react";
import FavouritesSection from "../../components/FavouritesSection/FavouritesSection";
import { Box } from "@mui/material";
import LoggedInDropdownMenu from "../../components/DropdownMenu/LoggedInDropdownMenu";

const Favourites = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu/>
      <FavouritesSection />
    </Box>
  );
};

export default Favourites;
