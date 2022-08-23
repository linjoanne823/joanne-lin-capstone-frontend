import React, { useState } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";
import "./DropdownMenu.scss";
import { CSSTransition } from "react-transition-group";
import { IoIosArrowDropleft } from "react-icons/io";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const LoggedInDropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  return (
    <div className="dropdown">
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
      >
        <div className="menu">
          <DropdownItem>
            <Link to={"/"}>
              <Typography>Home</Typography>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={"/profile"}>
              <Typography>Profile</Typography>
            </Link>
          </DropdownItem>
          <DropdownItem goToMenu="explore" setActiveMenu={setActiveMenu}>
            <Typography>Explore</Typography>
          </DropdownItem>
          <DropdownItem>
            <Link to={"/favourites"}>
              <Typography>Favourites</Typography>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Typography>Logout</Typography>
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "explore"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main">
            <IoIosArrowDropleft />
          </DropdownItem>
          <DropdownItem>
            <Link to={"/recipes"}>
              <Typography>Find Recipes</Typography>
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to={"/restaurants"}>
              <Typography>Find Restaurants</Typography>
            </Link>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default LoggedInDropdownMenu;
