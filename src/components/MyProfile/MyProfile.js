import React, { useState, useContext } from "react";
import "./MyProfile.scss";
import Select from "react-select";
import DietOptions from "../Options/DietOptions";
import TextField from "@mui/material/TextField";
import AllergyOptions from "../Options/AllergyOptions";
import Button from "@mui/material/Button";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

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
  } = useContext(UserContext);
  const [firstName, setFirstName] = useState("Joanne");
  const [lastName, setLastName] = useState("Lin");
  const [email, setEmail] = useState("joanne@gmail.com");
  const [password, setPassword] = useState("abc");
  const [city, setCity] = useState("");
  const [userId, setUserId] = useState(1);

  const [dietaryRestriction, setDietaryRestriction] = useState("");
  const [allergies, setAllergies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8080/users/",
        {
          firstName,
          lastName,
          email,
          password,
          city,
          userId,
          dietaryRestriction,
          allergies,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        // console.log(response);
      });
  };
  return (
    <div className="my-profile">
      <div>
        <h2 className="my-profile__title">Edit Profile</h2>

        <div className="my-profile__container">
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="City"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <p className="my-profile__label">Dietary Restrictions:</p>
          <Select
            closeMenuOnSelect={false}
            options={DietOptions}
            className="my-profile__multi-select"
            // value={DietOptions[0]}
            onChange={(e) => setDietaryRestriction(e.value)}
          />
          <p className="my-profile__label">Allergies:</p>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={AllergyOptions}
            // value={AllergyOptions[0]}
            className="my-profile__multi-select"
            onChange={(e) =>
              setAllergies(e.map((selectedOption) => selectedOption.value))
            }
          />
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
