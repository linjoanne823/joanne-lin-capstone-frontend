import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

const LocationSearch = (props) => {
  return (
    <Box>
      <TextField id ="outlined-basic" variant="outlined" label="Enter city"sx={{ m: 1, minWidth: 200 }} onChange={props.handleLocationChange} value={props.location}/>
    </Box>
  );
};

export default LocationSearch
