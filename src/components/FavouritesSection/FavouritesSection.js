import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Card, CardContent } from "@mui/material";
import FavouriteRecipes from "../FavouriteRecipes/FavouriteRecipes";
import FavouriteRestaurants from "../FavouriteRestaurants/FavouriteRestaurants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FavouritesSection() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "80vw", height:"100vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons
  allowScrollButtonsMobile>
          <Tab
            label="Liked Recipes"
            {...a11yProps(0)}
            style={{ marginRight: "3rem", marginLeft:"1rem" }}
          />
          <Tab label="Liked Restaurants" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FavouriteRecipes />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FavouriteRestaurants />
      </TabPanel>
    </Box>
  );
}
