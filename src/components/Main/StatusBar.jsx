import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import classes from "./StatusBar.module.css";
import { MenuContext } from "../../contexts/Menu";
import { useNavigate } from "react-router-dom";

const StatusBar = () => {
  const menuctx = useContext(MenuContext);
  const navigate = useNavigate()
  const darkMode = classes.status + " " + classes.statusDark;
  const toggleHandler = () => {
    menuctx.toggleMenu();
  };
  const toggleModeHandler = () => {
    menuctx.toggleMode();
  };
  return (
    <div
      className={menuctx.darkMode ? darkMode : classes.status}
      style={menuctx.menuIsShown ? { width: "86%" } : { width: "100%" }}
    >
      <FontAwesomeIcon
        icon={icon.faBars}
        size="l"
        onClick={toggleHandler}
        style={{ cursor: "pointer" }}
      />

      <div className={classes.notif}>
        {menuctx.darkMode ? (
          <FontAwesomeIcon
            icon={icon.faMoon}
            size="l"
            onClick={toggleModeHandler}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={icon.faCircleHalfStroke}
            size="l"
            onClick={toggleModeHandler}
            style={{ cursor: "pointer" }}
          />
        )}
        
        <FontAwesomeIcon
        onClick={()=>  navigate('/profile')
      }
          icon={icon.faUser}
          size="l"
          style={{ cursor: "pointer" }}
          />
       
        
      </div>
    </div>
  );
};

export default StatusBar;
