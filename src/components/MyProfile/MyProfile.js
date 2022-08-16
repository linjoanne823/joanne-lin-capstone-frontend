import React, { useState, useContext } from "react";
import "./MyProfile.scss";
import Select from "react-select";
import DietOptions from "../Options/DietOptions";
import TextField from "@mui/material/TextField";
import AllergyOptions from "../Options/AllergyOptions";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import DietFilter from "../Filters/DietFilter";
import AllergyFilter from "../Filters/AllergyFilter";

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
    user,
  } = useContext(UserContext);
  // const [firstName, setFirstName] = useState("Joanne");
  // const [lastName, setLastName] = useState("Lin");
  // const [email, setEmail] = useState("joanne@gmail.com");
  // const [password, setPassword] = useState("abc");
  // const [city, setCity] = useState("");
  // const [userId, setUserId] = useState(1);

  // const [dietaryRestriction, setDietaryRestriction] = useState("");
  // const [allergies, setAllergies] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(
  //       "http://localhost:8080/users/",
  //       {
  //         firstNameContext,
  //         lastNameContext,
  //         emailContext,
  //         password,
  //         locationContext,
  //         userId,
  //         dietContext,
  //         allergiesContext,
  //       },
  //       {
  //         "Content-Type": "application/json",
  //       }
  //     )
  //     .then((response) => {
  //       // console.log(response);
  //     });
  // };

  return (
    <div className="my-profile">
      <div>
        <h2 className="my-profile__title">Your Profile</h2>

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
          {/* <div className="my-profile__input-container">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div> */}
          <div>
            <TextField
              id="outlined-basic"
              label="City"
              type="text"
              value={locationContext}
              onChange={(e) => setLocationContext(e.target.value)}
            />
          </div>
          <DietFilter diet={dietContext}/>
          <AllergyFilter intolerances={allergiesContext} />
        </div>
        <div className="my-profile__button">
          {/* <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
