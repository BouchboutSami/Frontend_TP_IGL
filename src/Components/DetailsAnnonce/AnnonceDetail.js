import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Map from "./maps";

const AnnonceDetail = () => {
  const [annonce, setannonce] = useState([]);
  const [Annonceur, setAnnonceur] = useState([]);

  const firstrender = useRef(true);

  useEffect(() => {
    if (firstrender.current) {
      firstrender.current = false;
      let val = 14;
      axios
        .post("http://127.0.0.1:8000/getAnnonceid", { val })
        .then((response) => {
          setannonce(response.data);
          if (response.data[6] !== null) {
            let id = response.data[6];
            axios
              .post("http://127.0.0.1:8000/getuserid", { id })
              .then((response) => {
                console.log(response.data);
                setAnnonceur(response.data);
              });
          }
        });
    }
  }, [annonce]);

  return (
    <div className="flex flex-col items-center py-24 w-full gap-16">
      <h1 className="text-3xl text-IGLorange text-montserrat">{annonce[10]}</h1>
      <div className="w-1/2 h-[450px] bg-amber-700">
        <img
          alt="Apercu annonce"
          src={"data:image/png;base64," + annonce[9]}
          className="w-full h-full object-fill"
        ></img>
      </div>
      <div className="infos w-1/2 bg-IGLbgLogin flex flex-col text-IGLblanc p-5 gap-5">
        <p>
          <span className="text-IGLorange text-inter">Type de l'annonce:</span>{" "}
          {" " + annonce[2]}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Categorie:</span>
          {" " + annonce[1]}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Prix:</span>{" "}
          {" " + annonce[5] + " DA"}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Superficie:</span>
          {" " + annonce[3] + " m²"}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Wilaya:</span>
          {" " + annonce[7]}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Commune:</span>
          {" " + annonce[8]}
        </p>
        <p>
          <span className="text-IGLorange text-inter">Publié le:</span>
          {" " + annonce[11]}
        </p>
        <p>
          <span className="text-IGLorange text-inter">
            Numéro de téléphone:
          </span>{" "}
          {" " + annonce[12]}
        </p>
      </div>
      <div className="Contact w-1/2 bg-IGLbgLogin flex flex-col text-IGLblanc">
        {annonce[6] ? (
          <p>Publié par:{annonce[0]}</p>
        ) : (
          <p>Cette annonce est scrapée du WEB ( Ouedkniss.com)</p>
        )}
        <p>Numéro de Téléphone du propriétaire: {annonce[12]}</p>
      </div>
      <Map commune={annonce[8]} />
    </div>
  );
};

export default AnnonceDetail;
