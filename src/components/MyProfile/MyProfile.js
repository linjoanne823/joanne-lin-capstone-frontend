import React, { useState, useContext, useEffect } from "react";
import "./MyProfile.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import DietFilter from "../Filters/DietFilter";
import AllergyFilter from "../Filters/AllergyFilter";
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

  const getUser = () =>{
    const token = sessionStorage.getItem("token");
    axios
    .get(`${config.backend_url}:8080/users/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data)
      setFirstNameContext(response.data.first_name);
      setLastNameContext(response.data.last_name);
      setEmailContext(response.data.email);
      setLocationContext(response.data.city);
      setDietContext(response.data.dietary_restrictions);
      setAllergiesContext(response.data.allergies);
    })
    .catch((err) => console.log(err));
  }

  useEffect(()=>{
    getUser()
  }, {})
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${config.backend_url}:8080/users/?userId=${userId}`,
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
          <div>
            <TextField
              style={{ marginLeft: "1rem" }}
              id="outlined-basic"
              label="City"
              type="text"
              value={locationContext}
              onChange={(e) => setLocationContext(e.target.value)}
            />
          </div> 
          <Box sx={{ paddingLeft: "0.5rem" }}>
            <DietFilter diet={dietContext} />
            <AllergyFilter intolerances={allergiesContext} />
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
