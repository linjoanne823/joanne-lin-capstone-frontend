import React, { useState, useContext } from "react";
import UseModal from "../Modal/UseModal";
import Button from "@mui/material/Button";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);
  const { userId, setUserId } = useContext(UserContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        return setEmail(e.target.value);

      case "password":
        return setPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/users/login",
        {
          email: email,
          password: password,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
        setIsLoggedIn(true);
        setUserId(response.data.data.user.user_id)
      })
      .catch((err) => {
        console.log(err);
        setIsLoginError(true);
        setErrorMessage("Oh nuu try again :/");
      });
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Log In</h2>
          {isLoginError && (
            <label style={{ color: "red" }}>{errorMessage}</label>
          )}
          <Box component="form" autoComplete="off">
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
              Log In
            </Button>
          </Box>
        </div>
      ) : (
        <h2>You are all logged in!</h2>
      )}
    </div>
  );
};

export default UserLogin;
