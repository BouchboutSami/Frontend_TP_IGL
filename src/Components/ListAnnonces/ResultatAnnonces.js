import React from "react";
import axios from "axios";
import GridAnnonces from "./GridAnnonces";
import Filtres from "./filtres";
import { useState, useRef, useEffect } from "react";

const ResultatAnnonces = (props) => {
  const [Annonces, setAnnonces] = useState([]);
  const [userConnected, setuserConnected] = useState({});

  useEffect(() => {
    setuserConnected(props.user);
  }, [props, userConnected]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const filter = {
        recherche: "",
        wilaya: "",
        commune: "",
        typeAnnonce: "",
      };
      axios
        .post("http://127.0.0.1:8000/GetAnnoncesfiltered", filter)
        .then((response) => {
          setAnnonces(response.data);
        });
      firstRender.current = false;
    }
  }, [Annonces]);

  function filtre(annonces) {
    setAnnonces(annonces);
  }

  return (
    <div className="w-full flex flex-col items-center gap-16 bg-IGLnoir pb-48">
      <h1 className="mt-6 text-2xl font-bold text-IGLorange underline-offset-2">
        Résultats de la Recherche
      </h1>
      <Filtres onChange={filtre} />
      <GridAnnonces
        data={Annonces}
        user={userConnected}
        error="Aucune annonce ne correspond à votre recherche"
        nbcol="3"
      />
    </div>
  );
};

export default ResultatAnnonces;
