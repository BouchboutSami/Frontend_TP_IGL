import React from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Profile from "./assets/Profile.png";
import Tabs from "./Tabs";
import NotFound from "../notFound/NotFound";
import { useState, useEffect } from "react";

const InfosCompte = () => {
  const [userConnected, setuserConnected] = useState({});
  let { state } = useLocation();
  useEffect(() => {
    if (state) {
      setuserConnected(state.user);
    }
  }, [state, userConnected]);

  return Object.keys(userConnected).length !== 0 ? (
    <div className="min-h-screen text-IGLblanc w-screen">
      <Navbar user={state.user} />
      <div className="content flex flex-col justify-center items-center py-12 w-full gap-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <img src={Profile} alt="Profile icon" className="" />
          <p className="text-2xl uppercase text-IGLorange tracking-widest">
            {state.user.username}
          </p>
        </div>
        <Tabs user={state.user} />
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default InfosCompte;
