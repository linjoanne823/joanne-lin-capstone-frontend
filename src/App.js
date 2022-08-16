import "./App.scss";
import React, { useState } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Favourites from "./pages/Favourites/Favourites";
import Recipes from "./pages/Recipes/Recipes";
import Restaurants from "./pages/Restaurants/Restaurants";
import { UserContext } from "./contexts/UserContext";
import { contextType } from "react-modal";

function App() {
  const [userId, setUserId] = useState("");
  const [allergiesContext, setAllergiesContext] = useState([]);
  const [locationContext, setLocationContext] = useState("");
  const [dietContext, setDietContext] = useState("");
  const [emailContext, setEmailContext] = useState("");
  const [firstNameContext, setFirstNameContext] = useState("");
  const [lastNameContext, setLastNameContext] = useState("");
  return (
    <div>
      <UserContext.Provider value={{ userId, setUserId, allergiesContext, setAllergiesContext,
      locationContext, setLocationContext, dietContext, setDietContext, emailContext, setEmailContext,
      firstNameContext, setFirstNameContext, lastNameContext, setLastNameContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
