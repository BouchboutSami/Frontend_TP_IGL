import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar flex flex-row items-center absolute">
      <a href="/" className="logo flex flex-row items-center">
        Dream Home
      </a>
      <div className="nav-links text-inter">
        <ul className="flex flex-row items-center justify-end gap-16">
          <li className="active">
            <a href="/">Acceuil</a>
          </li>
          <li className="active">
            <a href="/">A propos</a>
          </li>
          <li className="active">
            <a href="/">Mon compte</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
