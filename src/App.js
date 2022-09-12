import "./App.scss";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import config from "./config";

function App() {
  const [userId, setUserId] = useState("");
  const [allergiesContext, setAllergiesContext] = useState([]);
  const [locationContext, setLocationContext] = useState("");
  const [dietContext, setDietContext] = useState("");
  const [emailContext, setEmailContext] = useState("");
  const [firstNameContext, setFirstNameContext] = useState("");
  const [lastNameContext, setLastNameContext] = useState("");
  const [passwordContext, setPasswordContext] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const verifyUser = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      axios
        .get(`${config.backend_url}/users/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          setFirstNameContext(response.data.first_name);
          setLastNameContext(response.data.last_name);
          setEmailContext(response.data.email);
          setLocationContext(response.data.city);
          setDietContext(response.data.dietary_restrictions);
          setAllergiesContext(response.data.allergies);
          setUserId(response.data.user_id);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setIsLoggedIn(false)
        });
    }
    console.log(token);
  };
  useEffect(() => {
    verifyUser();
  }, {});

  const renderPage = () => {
    if (isLoading){
      return <div>loading...</div>
    }else if(isLoggedIn){
      return <Navigation/>
    }else {
      return <LandingPage/>
    }
  }

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
          passwordContext,
          setPasswordContext,
        }}
      >
      
        {renderPage()}
      </UserContext.Provider>
    </div>
  );
}

export default App;
