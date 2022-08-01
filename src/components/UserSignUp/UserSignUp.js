import React, { useState } from "react";
import UseModal from "../Modal/UseModal";
import UserInfo from "../UserInfo/UserInfo";

const UserSignUp = () => {
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

  const hideSignUpAndShowUserInfo = (e) => {
    e.preventDefault();
    setShowSignUpForm(!showSignUpForm);
    setGoToUserInfo(!goToUserInfo);
  };

  return (
    <div>
      <div>
        {showSignUpForm ? (
          <div>
            <h2>Sign Up</h2>
            <form>
              <label>First Name:</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
              ></input>
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
              ></input>
              <label>Email:</label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              ></input>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              ></input>
            </form>
            <button onClick={hideSignUpAndShowUserInfo}>Create Account</button>
          </div>
        ) : null}
        {goToUserInfo && <UserInfo />}
      </div>
    </div>
  );
};

export default UserSignUp;
