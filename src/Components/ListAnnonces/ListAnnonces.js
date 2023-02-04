import React from "react";
import Hero from "./Hero";
import ResultatAnnonces from "./ResultatAnnonces";

const ListAnnonces = () => {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <ResultatAnnonces />
    </div>
  );
};

export default ListAnnonces;
