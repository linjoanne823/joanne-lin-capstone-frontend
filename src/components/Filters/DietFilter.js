import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const DietFilter = (props) => {

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Dietary Restriction
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.diet}
          onChange={props.handleSelectDietaryRestriction}
          autoWidth
          label="Dietary Restriction"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
          <MenuItem value="Vegan">Vegan</MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Ketogenic">Ketogenic</MenuItem>
          <MenuItem value="Pescetarian">Pescetarian</MenuItem>
          <MenuItem value="Paleo">Paleo</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default DietFilter;
