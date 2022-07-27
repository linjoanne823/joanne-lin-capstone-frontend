import logo from "./logo.svg";
import "./App.css";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import RecipeList from "./components/RecipeList/RecipeList";

function App() {
  return (
    <div className="App">
      Hello!
      {/* <RestaurantList/> */}
      <RecipeList />
    </div>
  );
}

export default App;
