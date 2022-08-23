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
import UserLogin from "./components/User/UserLogin";
import UseModal from "./components/Modal/UseModal";
import Navigation from "./routes/Navigation";
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  const [userId, setUserId] = useState("");
  const [allergiesContext, setAllergiesContext] = useState([]);
  const [locationContext, setLocationContext] = useState("");
  const [dietContext, setDietContext] = useState("");
  const [emailContext, setEmailContext] = useState("");
  const [firstNameContext, setFirstNameContext] = useState("");
  const [lastNameContext, setLastNameContext] = useState("");
  const [password, setPassword]=useState("")

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <UserContext.Provider
        value={{
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
          password,
          setPassword
        }}
      >
        {!isLoggedIn ? (
          // <UseModal>
          //   <UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
          // </UseModal>
          <LandingPage/>
        ) : (
          <Navigation/>
        )}
      </UserContext.Provider>
    </div>
  );
}

export default App;
