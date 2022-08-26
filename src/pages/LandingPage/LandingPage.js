import React from "react";
import DropdownMenu from "../../components/Menu/LandingMenu";
import { Typography, Box, } from "@mui/material";

const LandingPage = (props) => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row", backgroundColor:"black" }}>
        <DropdownMenu />
       
          <Box>
            <Box
              sx={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_1280.jpg')`,
                height: "100vh",
                width:"75vw",
                margin:0,
                backgroundRepeat:"no-repeat",
                objectFit:"contain"
              }}
            >
              <Typography style={{ color: "white", display:'flex', justifyContent:"flex-start", fontSize:"4rem", paddingLeft:"1rem", width:"5rem", wordWrap:"normal"}}>Foodie Gram</Typography>
              <Typography style={{ color: "white", display:'flex', justifyContent:"flex-start", fontSize:"2rem", paddingLeft:"1rem", width:"10rem"}}>The only website you need to satisfy your cravings</Typography>

            </Box>
          </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
