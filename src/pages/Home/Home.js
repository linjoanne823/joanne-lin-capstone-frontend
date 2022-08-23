import React from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import { Box, Button } from "@mui/material";
import video from "../../assets/video/food.mp4";
import { Link } from "react-router-dom";
import LoggedInDropdownMenu from "../../components/DropdownMenu/LoggedInDropdownMenu";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu/>
      <Box>
        <Link to={"/recipes"}>
          <Button
            variant="contained"
            sx={{position:'absolute', left:"40rem", top:"10rem", zIndex:"10", backgroundColor:"#242526"}}>
            Explore Recipes
          </Button>
        </Link>
        <Link to={"/restaurants"}>
          <Button
          variant="contained"
          sx={{position:'absolute', left:"60rem", top:"10rem", zIndex:"10", backgroundColor:"#242526"}}>
          Explore Restaurants
          </Button>
        </Link>
        <video src={video} autoPlay={true} style={{ width: "90vw" }}></video>
      </Box>
    </Box>
  );
};

export default Home;
