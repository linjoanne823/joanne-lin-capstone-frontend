import React, { useState } from "react";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "firstName":
        return setFirstName(e.target.value);
        break;
      case "lastName":
        return setLastName(e.target.value);
        break;
      case "email":
        return setEmail(e.target.value);
        break;
      case "password":
        return setPassword(e.target.value);
        break;
    }
  };

  return (
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
      <button>Create Account</button>
    </div>
  );
};

export default UserSignUp;
