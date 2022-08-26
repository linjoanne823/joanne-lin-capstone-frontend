import React from "react";
import "./MenuItem.scss";

const MenuItem = (props) => {
  return (
    <a href="#" className="menu-item" onClick={()=>props.goToMenu && props.setActiveMenu(props.goToMenu)}>
      {props.children}
    </a>
  );
};

export default MenuItem;
