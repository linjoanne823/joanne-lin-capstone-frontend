import React, { useState } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";
import "./DropdownMenu.scss";
import { CSSTransition } from "react-transition-group";
import leftArrow from "../../assets/icons/left-arrow-back.svg";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import UseModal from "../Modal/UseModal";
import UserSignUp from "../User/UserSignUp";

const DropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [activeModal, setActiveModal] = useState(false);
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
          <DropdownItem goToMenu="user" setActiveMenu={setActiveMenu}>
            <AiOutlineUser />
          </DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "user"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
      >
        <div className="menu">
          <DropdownItem setActiveMenu={setActiveMenu} goToMenu="main">
            <img src={leftArrow} className="menu__icon" />
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                setActiveModal(!activeModal);
              }}
            >
              {activeModal && (
                <UseModal
                  closeModal={() => {
                    setActiveModal(!activeModal);
                  }}
                >
                  <UserSignUp />
                </UseModal>
              )}
              Sign up
            </div>
          </DropdownItem>
          <DropdownItem>Log in</DropdownItem>
          <DropdownItem>Test User</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
