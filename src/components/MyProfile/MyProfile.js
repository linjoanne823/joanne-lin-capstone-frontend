import React from "react";
import "./MyProfile.scss";
import Select from "react-select";
import DietOptions from "../Options/DietOptions";
import TextField from "@mui/material/TextField";
import AllergyOptions from "../Options/AllergyOptions";
import Button from "@mui/material/Button";

const MyProfile = () => {
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
            />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
            />
          </div>
          <div className="my-profile__input-container">
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div className="my-profile__input-container">
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
          </div>
          <p className="my-profile__label">Dietary Restrictions:</p>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={DietOptions}
            className="my-profile__multi-select"
          />
          <p className="my-profile__label">Allergies:</p>
          <Select
            closeMenuOnSelect={false}
            isMulti
            options={AllergyOptions}
            className="my-profile__multi-select"
          />
        </div>
        <div className="my-profile__button">
          <Button variant="outlined">Save</Button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
