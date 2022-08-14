import React, { useState } from "react";
import UseModal from "../Modal/UseModal";
import UserInfo from "../UserInfo/UserInfo";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box, TextField } from "@mui/material";

const UserSignUp = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUpForm, setShowSignUpForm] = useState(true);
  const [goToUserInfo, setGoToUserInfo] = useState(false);

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

  const hideSignUpAndShowUserInfo = () => {
    setShowSignUpForm(!showSignUpForm);
    setGoToUserInfo(!goToUserInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hideSignUpAndShowUserInfo();
    axios
      .post(
        "http://localhost:8080/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
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
    <div>
      <div>
        {showSignUpForm ? (
          <div>
            <h2>Sign Up</h2>
            <Box component="form" autoComplete="off" noValidate>
              <TextField
                name="firstName"
                label="First Name"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "25rem" }}
                // className="signup__input"
              ></TextField>
              <TextField
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "25rem" }}
              ></TextField>
              <TextField
                type="email"
                placeholder="Email"
                name="email"
                label="Email Address"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "25rem" }}
              ></TextField>
              <TextField
                type="password"
                id="outlined-password-input"
                placeholder="Password"
                name="password"
                label="Password"
                onChange={handleChange}
                style={{ marginBottom: "1rem", width: "25rem" }}
              ></TextField>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleSubmit}>
                Create Account
              </Button>
            </Box>
          </div>
        ) : null}
        {goToUserInfo && <UserInfo />}
      </div>
    </div>
  );
};

export default UserSignUp;
