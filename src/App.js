import logo from "./logo.svg";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RecipeList from "./components/RecipeList/RecipeList";
import NavBar from "./components/NavBar/NavBar";
import NavItem from "./components/NavItem/NavItem";
import "./App.scss";
import DropdownMenu from "./components/DropdownMenu/DropdownMenu";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="App">
      {/* <NavBar>
        <NavItem icon="🙂" />
        <NavItem icon="🙂" />
        <caretIcon/>
        <NavItem icon= "⬇" >
          <DropdownMenu/>
        </NavItem>
      </NavBar> */}
      <Home/>
      <RestaurantList />
      {/* <RecipeList /> */}
    </div>
  );
}

export default App;
