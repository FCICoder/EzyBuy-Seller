import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icon from "@fortawesome/free-solid-svg-icons";
import classes from "./Nav.module.css";
const Nav = () => {

  function signOutHandler(){
    localStorage.removeItem('retailerToken')
    localStorage.removeItem('retailerEmail')
    window.location.reload()
  }
  return (
    <div>
      <ul className={classes.links}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/"
            end
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faHome} />
            </div>
            <p>Dashboard</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/profile"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faUserAlt} />
            </div>
            <p>Profile</p>
          </NavLink>
        </li>
        <hr />
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/Orders"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faBoxOpen} />
            </div>
            <p>Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/products"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faShop} />
            </div>
            <p>Products</p>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/Clients"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faUsers} />
            </div>
            <p>Clients</p>
          </NavLink>
        </li> */}
        <hr />
        
        {/* <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/Profits"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faSackDollar} />
            </div>
            <p>Profits</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/Settings"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faGear} />
            </div>
            <p>Settings</p>
          </NavLink>
        </li> */}
        <li onClick={()=>signOutHandler()}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="/login"
          >
            <div className={classes.icon}>
              <FontAwesomeIcon icon={icon.faRightFromBracket} />
            </div>
            <p>Sign out</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
