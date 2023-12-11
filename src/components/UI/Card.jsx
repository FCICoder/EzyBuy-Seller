import React, { useContext } from "react";
import classes from "./Card.module.css";
import { MenuContext } from "../../contexts/Menu";
const Card = (props) => {
  const menuCtx = useContext(MenuContext);
  const darkClasses = classes.card + " " + classes.cardDark;
  return (
    <div className={menuCtx.darkMode ? darkClasses : classes.card}>
      {props.children}
    </div>
  );
};

export default Card;
