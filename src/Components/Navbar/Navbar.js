import React from "react";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <nav className="navbar flex flex-row items-center fixed overflow-hidden">
      <a href="/" className="logo flex flex-row items-center">
        Dream Home
      </a>
      <div className="nav-links text-inter">
        <ul className="flex flex-row items-center justify-end gap-16">
          <li className="active">
            <a href="/">Acceuil</a>
          </li>
          <li className="active">
            {props.user.isadmin ? (
              <a href="/AdminScraping">Admin Panel</a>
            ) : (
              <a href="/">A propos</a>
            )}
          </li>
          <li className="active">
            <a href="/">{props.user.username}</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
