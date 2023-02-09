import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";

const Hero = (props) => {
  const [userConnected, setuserConnected] = useState({});

  useEffect(() => {
    setuserConnected(props.user);
  }, [props, userConnected]);

  return (
    <div className="heroS w-full h-screen">
      <Navbar user={userConnected} />
      <h1 className="titreHero mt-[10%] ml-[8%] md:text-7xl text-4xl text-IGLblanc text-montserrat font-bold">
        Trouvez le <span className="text-IGLorange">Bien</span> de vos <br />
        Rêves en <span className="text-IGLorange">Algérie</span>
      </h1>
    </div>
  );
};

export default Hero;
