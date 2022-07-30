import React, { useState } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";
import "./DropdownMenu.scss";
import { CSSTransition } from "react-transition-group";
import leftArrow from "../../assets/icons/left-arrow-back.svg";

const DropdownMenu = () => {
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
          <DropdownItem>Home</DropdownItem>
          <DropdownItem goToMenu="settings" setActiveMenu={setActiveMenu}>
            Signup
          </DropdownItem>
          <DropdownItem>Login</DropdownItem>
          <DropdownItem>Test User</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
            <DropdownItem><img src={leftArrow} className="menu__icon"/></DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
