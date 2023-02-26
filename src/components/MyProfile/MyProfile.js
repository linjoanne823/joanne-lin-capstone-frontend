import React, { useState, useContext, useEffect } from "react";
import "./MyProfile.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import DietFilter from "../Filters/DietFilter";
import AllergyFilter from "../Filters/AllergyFilter";
import LocationSearch from "components/Filters/LocationSearch";
import { Typography, Box} from "@mui/material";
import config from "../../config";


const MyProfile = () => {
  const {
    userId,
  } = useContext(UserContext);

  const token = sessionStorage.getItem("token");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [allergies, setAllergies] = useState([]);


  const getUser = () =>{
    axios
      .get(`${config.backend_url}/users/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data)
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setLocation(response.data.city);
        setDietaryRestriction(response.data.dietary_restrictions);
        setAllergies(response.data.allergies);
      })
      .catch((error) => {
        return console.log(error);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${config.backend_url}/users/?userId=${userId}`, 
        
        {
          firstName,
          lastName,
          email,
          location,
          userId,
          dietaryRestriction,
          allergies,
        },
        {headers: { Authorization: `Bearer ${token}` }},
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
    return setLocation(e.target.value);
  };
  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDietaryRestriction(e.target.value);
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setAllergies(e.target.value);
  };
  return (

    <div className="my-profile">
      <div>
        <Typography style={{ fontSize: "1.5rem", paddingLeft: "1rem" }}>My Profile</Typography>
        <div className="my-profile__container">
          <div className="my-profile__input-container">
            <Typography>First Name</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <Typography>Last Name</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <Typography>Email</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Box sx={{ paddingLeft: "0.5rem" }}>
            <LocationSearch location={location} handleLocationChange={handleLocationChange}/>
            <DietFilter diet={dietaryRestriction} handleSelectDietaryRestriction={handleSelectDietaryRestriction}/>
            <AllergyFilter intolerances={allergies} handleSelectAllergies={handleSelectAllergies}/>
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
