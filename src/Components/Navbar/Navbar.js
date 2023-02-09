import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [userConnected, setuserConnected] = useState({});

  useEffect(() => {
    setuserConnected(props.user);
  }, [props.user, userConnected]);

  return (
    <nav className="navbar flex flex-row items-center overflow-hidden">
      <Link to="/" state={{ user: userConnected }}>
        <p className="logo flex flex-row items-center text-IGLblanc">
          Dream Home
        </p>
      </Link>
      <div className="nav-links text-inter">
        <ul className="flex flex-row items-center justify-end gap-16 text-IGLblanc">
          <li className="active">
            <Link to="/DeposerAnnonce" state={{ user: userConnected }}>
              Deposer Annonce
            </Link>
          </li>

          {userConnected.isadmin ? (
            <li className="active">
              <Link to="/AdminScraping" state={{ user: userConnected }}>
                <p className="flex flex-row items-center text-IGLblanc">
                  Admin Panel
                </p>
              </Link>
            </li>
          ) : null}

          <li className="active">
            <Link to="/MonCompte" state={{ user: userConnected }}>
              {userConnected.username}
            </Link>
          </li>
          <li className="active">
            <Link to="/Login">Déconnexion</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
