import React from "react";
import { useReducer } from "react";
export const MenuContext = React.createContext({
  menuIsShown: true,
  darkMode: false,
});
const initalState = {
  menuIsShown: true,
  darkMode: false,
};
const menuReducer = (state, action) => {
  if (action.type === "TOGGLE") {
    const updatedStatus = !state.menuIsShown;
    return {
      darkMode: state.darkMode,
      menuIsShown: updatedStatus,
    };
  }
  if (action.type === "MODE") {
    const updatedMode = !state.darkMode;
    return {
      darkMode: updatedMode,
      menuIsShown: state.menuIsShown,
    };
  }
  return initalState;
};

const MenuContextProvider = (props) => {
  const [menu, dispatchMenu] = useReducer(menuReducer, initalState);

  const toggleMenuHandler = () => {
    dispatchMenu({ type: "TOGGLE" });
  };
  const toggleModeHandler = () => {
    dispatchMenu({ type: "MODE" });
  };
  const context = {
    menuIsShown: menu.menuIsShown,
    darkMode: menu.darkMode,
    toggleMenu: toggleMenuHandler,
    toggleMode: toggleModeHandler,
  };
  return (
    <MenuContext.Provider value={context}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
