import React, { useState } from "react";
import "./UserInfo.scss";
import Button from "@mui/material/Button";
import axios from "axios";

const UserInfo = (props) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState({
    glutenFree: false,
    vegan: false,
    vegetarian: false,
    ketogenic: false,
    pescetarian: false,
    paleo: false,
  });
  const [allergies, setAllergies] = useState({
    dairy: false,
    egg: false,
    gluten: false,
    grain: false,
    peanut: false,
    treenut: false,
    sesame: false,
    shellfish: false,
    seafood: false,
    soy: false,
  });
  const [city, setCity] = useState("");

  const handleDietaryRestrictionsChange = (e) => {
    e.preventDefault();

    setDietaryRestrictions(
      Object.assign(dietaryRestrictions, {
        [e.target.name]: !dietaryRestrictions[e.target.name],
      })
    );
  };

  const handleAllergiesChange = (e) => {
    e.preventDefault();
    setAllergies(
      Object.assign(allergies, {
        [e.target.name]: !allergies[e.target.name],
      })
    );
  };

  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Dietary Restrictions are " + JSON.stringify(dietaryRestrictions),
      "Allergies are " + JSON.stringify(allergies),
      "City is " + city
    );
    axios
      .post(
        "http://localhost:8080/userinfo",
        {
          dietaryRestrictions: dietaryRestrictions,
          allergies: allergies,
          city: city,
        },
        {
          "Content-Type": "application/json",
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form__title">Dietary Restrictions:</h2>
        <div className="form__outer-container">
          <div className="form__inner-container">
            <div className="form__field-container">
              <input
                type="checkbox"
                name="glutenFree"
                value="Gluten-Free"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="glutenFree" className="form__label">
                Gluten-Free
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="vegan"
                value="Vegan"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="vegan" className="form__label">
                Vegan
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="vegetarian"
                value="Vegetarian"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="vegetarian" className="form__label">
                Vegetarian
              </label>
            </div>
          </div>
          <div className="form__inner-container">
            <div className="form__field-container">
              <input
                type="checkbox"
                name="ketogenic"
                value="Ketogenic"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="ketogenic" className="form__label">
                Ketogenic
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="pescetarian"
                value="Pescetarian"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="pescetarian" className="form__label">
                Pescetarian
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="paleo"
                value="Paleo"
                onChange={handleDietaryRestrictionsChange}
              />
              <label for="paleo" className="form__label">
                Paleo
              </label>
            </div>
          </div>
        </div>
        <h2 className="form__title">Allergies:</h2>
        <div className="form__outer-container">
          <div className="form__inner-container">
            <div className="form__field-container">
              <input
                type="checkbox"
                name="dairy"
                value="Dairy"
                onChange={handleAllergiesChange}
              />
              <label for="dairy" className="form__label">
                Dairy
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="egg"
                value="Egg"
                onChange={handleAllergiesChange}
              />
              <label for="egg" className="form__label">
                Egg
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="gluten"
                value="Gluten"
                onChange={handleAllergiesChange}
              />
              <label for="gluten" className="form__label">
                Gluten
              </label>
            </div>

            <div className="form__field-container">
              <input
                type="checkbox"
                name="grain"
                value="Grain"
                onChange={handleAllergiesChange}
              />
              <label for="grain" className="form__label">
                Grain
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="peanut"
                value="Peanut"
                onChange={handleAllergiesChange}
              />
              <label for="peanut" className="form__label">
                Peanut
              </label>
            </div>
          </div>
          <div className="form__inner-container">
            <div className="form__field-container">
              <input
                type="checkbox"
                name="treenut"
                value="Treenut"
                onChange={handleAllergiesChange}
              />
              <label for="treenut" className="form__label">
                Treenut
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="sesame"
                value="Sesame"
                onChange={handleAllergiesChange}
              />
              <label for="sesame" className="form__label">
                Sesame
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="shellfish"
                value="Shellfish"
                onChange={handleAllergiesChange}
              />
              <label for="shellfish" className="form__label">
                Shellfish
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="seafood"
                value="Seafood"
                onChange={handleAllergiesChange}
              />
              <label for="seafood" className="form__label">
                Seafood
              </label>
            </div>
            <div className="form__field-container">
              <input
                type="checkbox"
                name="soy"
                value="Soy"
                onChange={handleAllergiesChange}
              />
              <label for="soy" className="form__label">
                Soy
              </label>
            </div>
          </div>
        </div>
        <h2 className="form__title">City:</h2>
        <input
          type="text"
          placeholder="Enter your city"
          onChange={handleCityChange}
          className="form__input"
        ></input>
      </form>
      <div className="form__button">
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserInfo;
