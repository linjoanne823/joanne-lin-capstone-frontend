import React from "react";
import LoggedInDropdownMenu from "../../components/Menu/HomeMenu";
import MyProfile from "../../components/MyProfile/MyProfile";
import ProfileCard from "components/MyProfile/ProfileCard";
import { Box } from "@mui/material";



const Profile = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <LoggedInDropdownMenu />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <ProfileCard/>
        <MyProfile />
      </Box>
      
    
    </Box>
  );
};

export default Profile;
