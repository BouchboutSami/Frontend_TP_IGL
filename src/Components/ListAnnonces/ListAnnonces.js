import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import ResultatAnnonces from "./ResultatAnnonces";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const ListAnnonces = () => {
  const location = useLocation();
  const [userConnected, setUserConnected] = useState(location.state);
  return (
    <div className="w-full flex flex-col justify-start">
      <Hero user={userConnected} />
      <ResultatAnnonces />
      <Footer />
    </div>
  );
};

export default ListAnnonces;
