import React from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import { Box, Button, Card, CardMedia, CardContent } from "@mui/material";
import video from "../../assets/video/food.mp4";
import { Link } from "react-router-dom";
import LoggedInDropdownMenu from "../../components/DropdownMenu/LoggedInDropdownMenu";

const Home = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu />
      <Card sx={{width:"90vw"}}>
        <CardContent sx={{display:"flex", gap:"1rem"}}>
          <Link to={"/recipes"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#242526",
              }}
            >
              Explore Recipes
            </Button>
          </Link>
          <Link to={"/restaurants"}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#242526",
              }}
            >
              Explore Restaurants
            </Button>
          </Link>
        </CardContent>
        <CardMedia component="video" src={video} autoPlay={true} loop></CardMedia>
      </Card>
    </Box>
  );
};

export default Home;
