import React from "react";
import DropdownMenu from "../../components/DropdownMenu/DropdownMenu";
import Header from "../../components/Header/Header";
import CssBaseline from "@mui/material/CssBaseline";
import { Typography, Box, Container } from "@mui/material";

const LandingPage = (props) => {
  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <DropdownMenu />
        <CssBaseline>
          <Container style={{ paddingLeft: "0", paddingRight: 0 }}>
            <Box
              sx={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2017/11/08/22/18/spaghetti-2931846_1280.jpg')`,
                height: "100vh",
              }}
            >
              <Typography style={{ color: "white", display:'flex', justifyContent:"flex-start", fontSize:"4rem", paddingLeft:"1rem"}}>FoodieGram</Typography>
              <Typography style={{ color: "white", position:'absolute', right:"1rem", bottom:"1rem", width:"30vw", fontSize:"2rem", paddingLeft:"1rem"}}>The only website you need to satisfy your taste buds.</Typography>

            </Box>
          </Container>
        </CssBaseline>
      </Box>
    </div>
  );
};

export default LandingPage;
