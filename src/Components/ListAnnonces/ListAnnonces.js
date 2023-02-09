import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import ResultatAnnonces from "./ResultatAnnonces";
import { useLocation } from "react-router-dom";

const ListAnnonces = () => {
  let { state } = useLocation();
  console.log("state/", state);
  const [userConnected, setUserConnected] = useState({});

  useEffect(() => {
    setUserConnected(state.user);
    console.log("test", userConnected);
  }, [state, userConnected]);

  return (
    <div className="w-full flex flex-col justify-start">
      <Hero user={userConnected} />
      <ResultatAnnonces user={userConnected} />
    </div>
  );
};

export default ListAnnonces;
