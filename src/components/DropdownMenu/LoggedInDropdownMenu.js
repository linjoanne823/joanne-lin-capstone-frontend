import React, { useState } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";
import "./DropdownMenu.scss";
import { CSSTransition } from "react-transition-group";
import leftArrow from "../../assets/icons/left-arrow-back.svg";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosArrowDropleft } from "react-icons/io";
import { MdOutlineExplore } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

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
            <AiOutlineHome />
          </DropdownItem>
          <DropdownItem>
            <AiOutlineUser />
          </DropdownItem>
          <DropdownItem goToMenu="explore" setActiveMenu={setActiveMenu}>
            <MdOutlineExplore />
          </DropdownItem>
          <DropdownItem>
            <AiOutlineHeart />
          </DropdownItem>
          <DropdownItem>
            <BiLogOutCircle />
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
          <DropdownItem>Find Recipes</DropdownItem>
          <DropdownItem>Find Restaurants</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default LoggedInDropdownMenu;
