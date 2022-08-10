import logo from "./logo.svg";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RecipeList from "./components/RecipeList/RecipeList";
import NavBar from "./components/NavBar/NavBar";
import NavItem from "./components/NavItem/NavItem";
import "./App.scss";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails/RecipeDetails";
import Profile from "./pages/Profile/Profile";
import Favourites from "./pages/Favourites/Favourites";
import Recipes from "./pages/Recipes/Recipes";
function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
