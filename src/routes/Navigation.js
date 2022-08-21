import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import { contextType } from "react-modal";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Recipes from "../pages/Recipes/Recipes";
import Restaurants from "../pages/Restaurants/Restaurants";
import Favourites from "../pages/Favourites/Favourites";

function Navigation() {
//   const [userId, setUserId] = useState("");
//   const [allergiesContext, setAllergiesContext] = useState([]);
//   const [locationContext, setLocationContext] = useState("");
//   const [dietContext, setDietContext] = useState("");
//   const [emailContext, setEmailContext] = useState("");
//   const [firstNameContext, setFirstNameContext] = useState("");
//   const [lastNameContext, setLastNameContext] = useState("");
  return (
    <div>
    
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/recipes" element={<Recipes/>} />
            <Route path="/restaurants" element={<Restaurants/>} />
            <Route path="/favourites" element={<Favourites/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default Navigation;
