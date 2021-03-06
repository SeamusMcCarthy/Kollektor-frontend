import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../contexts/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          CATEGORIES
        </NavLink>
      </li>
      <li>
        <NavLink to="/users" exact>
          USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/user/${auth.userId}`}>MY ENTRIES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/new">NEW ENTRY</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/profile/${auth.userId}`}>PROFILE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
