import React, { useState } from "react";
import UseModal from "../Modal/UseModal";
import UserInfo from "../UserInfo/UserInfo";
import Button from "@mui/material/Button";
import "./UserSignUp.scss";
import axios from "axios";

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
            <form>
              <div className="signup__input-container">
                <label className="signup__label">First Name:</label>
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  className="signup__input"
                ></input>
              </div>
              <div className="signup__input-container">
                <label className="signup__label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  className="signup__input"
                ></input>
              </div>
              <div className="signup__input-container">
                <label className="signup__label">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className="signup__input"
                ></input>
              </div>
              <div className="signup__input-container">
                <label className="signup__label">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  className="signup__input"
                ></input>
              </div>
            </form>
            <div className="signup__button">
              <Button variant="outlined" onClick={handleSubmit}>
                Create Account
              </Button>
            </div>
          </div>
        ) : null}
        {goToUserInfo && <UserInfo />}
      </div>
    </div>
  );
};

export default UserSignUp;
