import React from "react";
import LoggedInDropdownMenu from "../../components/DropdownMenu/LoggedInDropdownMenu";
import MyProfile from "../../components/MyProfile/MyProfile";
import "./Profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <LoggedInDropdownMenu />
      <MyProfile />
    </div>
  );
};

export default Profile;
