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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/recipes" element={<RecipeList/>} />
          <Route path='/recipes/:recipeId' element ={<RecipeDetails/>}/>
          <Route path="/restaurants" element={<RestaurantList/>} />
        </Routes>
      </BrowserRouter>
      {/* <NavBar>
        <NavItem icon="🙂" />
        <NavItem icon="🙂" />
        <caretIcon/>
        <NavItem icon= "⬇" >
          <DropdownMenu/>
        </NavItem>
      </NavBar> */}
      {/* <Home/>
      <RestaurantList /> */}
      {/* <RecipeList /> */}
    </div>
  );
}

export default App;
