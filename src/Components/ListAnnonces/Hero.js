import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Hero.css";

const Hero = (props) => {
  return (
    <div className="heroS w-full h-screen">
      <Navbar user={props.user} />
      <h1 className="titreHero mt-[10%] ml-[8%] text-7xl text-IGLblanc text-montserrat font-bold">
        Trouvez le <span className="text-IGLorange">Bien</span> de vos <br />
        Reves en <span className="text-IGLorange">Algérie</span>
      </h1>
    </div>
  );
};

export default Hero;
