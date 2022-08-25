import React, { useState } from "react";
import DropdownItem from "../DropdownItem/DropdownItem";
import "./DropdownMenu.scss";
import { CSSTransition } from "react-transition-group";
import { IoIosArrowDropleft } from "react-icons/io";
import UseModal from "../Modal/UseModal";
import UserSignUp from "../User/UserSignUp";
import UserLogin from "../User/UserLogin";
import { Typography } from "@mui/material";

const DropdownMenu = (props) => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [activeSignUpModal, setActiveSignUpModal] = useState(false);
  const [activeLogInModal, setActiveLogInModal] = useState(false);

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
            <Typography>Home</Typography>
          </DropdownItem>
          <DropdownItem goToMenu="user" setActiveMenu={setActiveMenu}>
            <Typography>User</Typography>
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
           <IoIosArrowDropleft/>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                setActiveSignUpModal(!activeSignUpModal);
              }}
            >
              {activeSignUpModal && (
                <UseModal
                  closeModal={() => {
                    setActiveSignUpModal(!activeSignUpModal);
                  }}
                >
                  <UserSignUp />
                </UseModal>
              )}
              <Typography>Sign up</Typography>
            </div>
          </DropdownItem>
          <DropdownItem>
            <div
              onClick={() => {
                setActiveLogInModal(!activeLogInModal);
              }}
            >
              {activeLogInModal && (
                <UseModal
                  closeModal={() => {
                    setActiveLogInModal(!activeLogInModal);
                  }}
                >
                  <UserLogin/>
                </UseModal>
              )}
              <Typography>Log In</Typography>
            </div>
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
