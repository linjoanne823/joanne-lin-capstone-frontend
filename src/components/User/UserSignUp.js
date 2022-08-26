import React, { useState, useContext } from "react";
import UseModal from "../Modal/UseModal";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import DietFilter from "../Filters/DietFilter";
import AllergyFilter from "../Filters/AllergyFilter";
import LocationSearch from "../Filters/LocationSearch";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import config from "../../config";
const UserSignUp = (props) => {
  const {
    userId,
    setUserId,
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
    isLoggedIn,
    setIsLoggedIn,
    passwordContext,
    setPasswordContext,
  } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [diet, setDiet] = useState("");
  const [intolerances, setIntolerances] = useState([]);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [isSignupError, setIsSignupError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSelectDietaryRestriction = (e) => {
    e.preventDefault();
    return setDiet(e.target.value);
  };

  const handleLocationChange = (e) => {
    e.preventDefault();
    return setLocation(e.target.value);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        return setFirstName(e.target.value);

      case "lastName":
        return setLastName(e.target.value);

      case "email":
        return setEmail(e.target.value);

      case "password":
        return setPassword(e.target.value);
    }
  };

  const handleSelectAllergies = (e) => {
    e.preventDefault();
    return setIntolerances(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({
      data: "Registration is in progress...",
      type: "alert-warning",
    });
    console.log(location);
    axios
      .post(
        `${config.backend_url}:8080/users/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          city: location,
          diet: diet,
          intolerances: intolerances,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
        setMessage("Successfully signed up!");
        setIsSignedUp(true);
        setUserId(response.data.data.user.user_id);
        setAllergiesContext(response.data.data.user.allergies);
        setLocationContext(response.data.data.user.city);
        setDietContext(response.data.data.user.dietary_restrictions);
        setEmailContext(response.data.data.user.email);
        setFirstNameContext(response.data.data.user.first_name);
        setLastNameContext(response.data.data.user.last_name);
        setPasswordContext(response.data.data.user.password);
      })
      .catch((err) => {
        console.log(err);
        setIsSignupError(true);
        setErrorMessage("This user already exists :)");
      });
  };

  return (
    <div>
      <div>
        {!isSignedUp ? (
          <div>
            <h2>Sign Up</h2>

            {isSignupError && (
              <label style={{ color: "red" }}>{errorMessage}</label>
            )}
            <Box
              component="form"
              autoComplete="off"
              noValidate
              sx={{ height: "60vh"}}
            >
              <TextField
                name="firstName"
                label="First Name"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "15rem" }}
              ></TextField>
              <TextField
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "15rem" }}
              ></TextField>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                label="Email Address"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "15rem" }}
              ></TextField>
              <TextField
                type="password"
                id="outlined-password-input"
                placeholder="Password"
                name="password"
                label="Password"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "15rem" }}
              ></TextField>
              <DietFilter
                diet={diet}
                handleSelectDietaryRestriction={handleSelectDietaryRestriction}
              />
              <AllergyFilter
                intolerances={intolerances}
                handleSelectAllergies={handleSelectAllergies}
              />
              <LocationSearch
                location={location}
                handleLocationChange={handleLocationChange}
              />

              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" onClick={handleSubmit} style={{marginBottom:"2rem"}}>
                  Create Account
                </Button>
              </Box>
            </Box>
          </div>
        ) : (
          <div>
            <h2>{firstNameContext} now registered!</h2>
            <Button onClick={() => setIsLoggedIn(true)}>Explore</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSignUp;
