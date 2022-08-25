import React from "react";
import "./DropdownItem.scss";

const DropdownItem = (props) => {
  return (
    <a href="#" className="menu-item" onClick={()=>props.goToMenu && props.setActiveMenu(props.goToMenu)}>
      {props.children}
    </a>
  );
};

export default DropdownItem;
