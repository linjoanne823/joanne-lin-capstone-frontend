import React, { useState, useContext, useEffect } from "react";
import "./MyProfile.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import DietFilter from "../Filters/DietFilter";
import AllergyFilter from "../Filters/AllergyFilter";
import LocationSearch from "components/Filters/LocationSearch";
import { Typography, Box } from "@mui/material";
import config from "../../config";

const MyProfile = () => {
  const {
    allergiesContext,
    setAllergiesContext,
    locationContext,
    setLocationContext,
    dietContext,
    setDietContext,
    emailContext,
    setEmailContext,
    firstNameContext,
    setFirstNameContext,
    lastNameContext,
    setLastNameContext,
    userId,
  } = useContext(UserContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${config.backend_url}/users/?userId=${userId}`,
        {
          firstNameContext,
          lastNameContext,
          emailContext,
          locationContext,
          userId,
          dietContext,
          allergiesContext,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handleLocationChange = (e) => {
    e.preventDefault();
    return setLocationContext(e.target.value);
  };
  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietContext(e.target.value);
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setAllergiesContext(e.target.value);
  };

  return (
    <div className="my-profile">
      <div>
        <Typography style={{ fontSize: "1.5rem", paddingLeft: "1rem" }}>
          My Profile
        </Typography>

        <div className="my-profile__container">
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstNameContext}
              onChange={(e) => setFirstNameContext(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastNameContext}
              onChange={(e) => setLastNameContext(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={emailContext}
              onChange={(e) => {
                setEmailContext(e.target.value);
              }}
            />
          </div>
          <Box sx={{ paddingLeft: "0.5rem" }}>
            <LocationSearch location={locationContext} handleLocationChange={handleLocationChange}/>
            <DietFilter diet={dietContext} handleSelectDietaryRestriction={handleSelectDietaryRestriction}/>
            <AllergyFilter intolerances={allergiesContext} handleSelectAllergies={handleSelectAllergies}/>
          </Box>
        </div>
        <div className="my-profile__button">
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
