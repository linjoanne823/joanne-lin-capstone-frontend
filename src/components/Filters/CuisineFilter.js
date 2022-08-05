import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CuisineFilter = (props) => {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Cuisine</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={props.cuisine}
          onChange={props.handleSelectCuisine}
          autoWidth
          label="Cuisine"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="African">African</MenuItem>
          <MenuItem value="American">American</MenuItem>
          <MenuItem value="British">British</MenuItem>
          <MenuItem value="Cajun">Cajun</MenuItem>
          <MenuItem value="Caribbean">Caribbean</MenuItem>
          <MenuItem value="Chinese">Chinese</MenuItem>
          <MenuItem value="Eastern European">Eastern European</MenuItem>
          <MenuItem value="French">French</MenuItem>
          <MenuItem value="German">German</MenuItem>
          <MenuItem value="Greek">Greek</MenuItem>
          <MenuItem value="Indian">Indian</MenuItem>
          <MenuItem value="Irish">Irish</MenuItem>
          <MenuItem value="Italian">Italian</MenuItem>
          <MenuItem value="Japanese">Japanese</MenuItem>
          <MenuItem value="Jewish">Jewish</MenuItem>
          <MenuItem value="Korean">Korean</MenuItem>
          <MenuItem value="Latin American">Latin American</MenuItem>
          <MenuItem value="Mediterranean">Mediterranean</MenuItem>
          <MenuItem value="Mexican">Mexican</MenuItem>
          <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
          <MenuItem value="Nordic">Nordic</MenuItem>
          <MenuItem value="Spanish">Spanish</MenuItem>
          <MenuItem value="Thai">Thai</MenuItem>
          <MenuItem value="Vietnamese">Vietnamese</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CuisineFilter;
