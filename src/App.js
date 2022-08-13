import "./App.scss";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Favourites from "./pages/Favourites/Favourites";
import Recipes from "./pages/Recipes/Recipes";
import Restaurants from "./pages/Restaurants/Restaurants";
function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
