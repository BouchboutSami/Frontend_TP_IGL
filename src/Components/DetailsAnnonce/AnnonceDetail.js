import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Map from "./maps";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import MessageArea from "../DeposerAnnonce/input";
import Button from "../DeposerAnnonce/buttonSubmit";

const AnnonceDetail = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const [annonce, setannonce] = useState({});
  const [Annonceur, setAnnonceur] = useState({});
  const [userConnected, setuserConnected] = useState({});
  const [Message, setMessage] = useState("");
  const [sent, setsent] = useState(false);

  useEffect(() => {
    if (state) {
      setuserConnected(state.user);
      setannonce(state.annonce);
      if (annonce[6] > 0) {
        let val = annonce[6];
        axios
          .post("http://127.0.0.1:8000/getuserid", { val })
          .then((response) => {
            setAnnonceur(response.data);
          });
      }
    }
  }, [annonce, state]);
  function handleMessage(e) {
    setMessage(e.target.value);
  }

  function handleclick() {
    if (Message === "") {
      alert("Le message que vous essayez d'envoyer est vide");
    } else {
      const message = {
        Message_content: Message,
        id_destinataire: Annonceur[0],
        id_emetteur: userConnected.id,
      };
      axios
        .post("http://127.0.0.1:8000/Sendmessage", message)
        .then((response) => {
          setsent(true);
        });
    }
  }

  function SupprimerAnnonce() {
    let val = annonce[0];
    axios
      .post("http://127.0.0.1:8000/Deleteannonce/", { val })
      .then((response) => {
        console.log(response.data);
      })
      .then((response) => {
        let user = userConnected;
        navigate("/", { state: { user } });
      });
  }

  return (
    annonce[9] && (
      <div className="w-screen min-h-screen flex flex-col">
        <Navbar user={userConnected} />
        <div className="flex flex-col items-center py-24 w-full gap-16">
          <h1 className="text-3xl text-IGLorange text-inter">{annonce[10]}</h1>
          <div className="w-1/2">
            <img
              alt="Apercu annonce"
              src={"data:image/png;base64," + annonce[9]}
              className="h-[400px] w-full object-fill rounded-lg"
            />
          </div>
          <div className="infos w-1/2 bg-IGLbgLogin flex flex-col text-IGLblanc p-5 gap-5">
            <p>
              <span className="text-IGLorange text-inter">
                Type de l'annonce:
              </span>{" "}
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
              <span className="text-IGLorange text-inter">Descripton:</span>
              {" " + annonce[4]}
            </p>
            <p>
              <span className="text-IGLorange text-inter">Publié le:</span>
              {" " + annonce[11]}
            </p>
            <p>
              <span className="text-IGLorange text-inter">
                Numéro de téléphone:
              </span>{" "}
              {" 0" + annonce[12]}
            </p>
            {annonce[6] ? (
              <p>
                <span className="text-IGLorange text-inter">Publié par: </span>
                {Annonceur[1]}
              </p>
            ) : (
              <p>Cette annonce est scrapée du WEB ( Ouedkniss.com)</p>
            )}
          </div>
          {annonce[6] !== userConnected.id && !sent && annonce[6] ? (
            <div className="text-IGLblanc w-1/2 flex flex-col gap-3">
              <label className="text-IGLorange">
                Envoyer un message au propriétaire
              </label>
              <div className="mb-5 outline-none">
                <MessageArea id="10" Change={handleMessage} placeholder="=>" />
              </div>
              <Button text="Envoyer le message" Submit={handleclick} />
            </div>
          ) : null}
          {sent ? (
            <Alert
              variant="filled"
              onClose={() => {
                setsent(false);
              }}
            >
              Message envoyé avec Succés
            </Alert>
          ) : null}
          <Map commune={annonce[8]} wilaya={annonce[7]} />
          {Annonceur[0] === userConnected.id ? (
            <Button
              text="Supprimer L'annonce"
              Submit={SupprimerAnnonce}
              color="text-red-600"
            />
          ) : null}
        </div>
      </div>
    )
  );
};

export default AnnonceDetail;
