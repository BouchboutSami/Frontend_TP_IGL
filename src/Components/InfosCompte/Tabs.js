import { useState, useEffect, React } from "react";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import Message from "./Message";
import Annonce from "./Annonce";
import GridAnnonces from "../ListAnnonces/GridAnnonces";
import Alert from "@mui/material/Alert";

const Tabs = (props) => {
  const [active, setActive] = useState(3);
  const [userConnected, setUserConnected] = useState(null);
  const [Messages, setMessages] = useState(null);
  const [Annonces, setAnnonces] = useState(null);

  function handleclick(e) {
    setActive(parseInt(e.target.id));
  }

  useEffect(() => {
    setUserConnected(props.user);
  }, [props.user, userConnected]);

  useEffect(() => {
    if (userConnected) {
      let val = 0;
      val = userConnected.id;
      axios
        .post("http://localhost:8000/GetmessagesUser/", { val })
        .then((response) => {
          setMessages(response.data);
        });
      val = userConnected.id;
      axios
        .post("http://localhost:8000/annonces_utilisateur", { val })
        .then((response) => {
          setAnnonces(response.data);
        });
    }
  }, [active, userConnected]);
  return (
    userConnected &&
    Messages &&
    Annonces && (
      <div className="w-2/3 min-h-[200px] flex flex-col gap-5">
        <div className="flex flex-row items-center py-3">
          <div
            id="1"
            className={`flex flex-row items-center justify-center gap-4 w-1/3 text-center ${
              active === 1 && "text-IGLorange"
            }`}
            onClick={handleclick}
          >
            {active === 1 ? <CircleIcon className="text-IGLorange" /> : null}
            Mes messages{" "}
          </div>
          <div
            id="2"
            className={`flex flex-row items-center justify-center gap-4 w-1/3 text-center ${
              active === 2 && "text-IGLorange"
            }`}
            onClick={handleclick}
          >
            {active === 2 ? <CircleIcon className="text-IGLorange" /> : null}
            Mes annonces
          </div>
          <div
            id="3"
            className={`flex flex-row items-center justify-center gap-4 w-1/3 text-center ${
              active === 3 && "text-IGLorange"
            }`}
            onClick={handleclick}
          >
            {active === 3 ? <CircleIcon className="text-IGLorange" /> : null}
            Mes infos
          </div>
        </div>
        {/* MESSAGES */}
        <div
          className={`w-full flex-col justify-start items-center ${
            active === 1 ? "flex" : "hidden"
          }`}
        >
          {Messages.length > 0 ? (
            <div className="w-full flex flex-col gap-10 ">
              {Messages.map((message, i) => {
                return <Message key={i} message={message} />;
              })}
              <div className="text-xl flex gap-2 self-center">
                Vous avez
                <span className="text-IGLorange">{Messages.length}</span>
                Messages
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center items-center text-IGLblanc text-4xl col-span-3 text-center mt-24">
              <Alert
                variant="filled"
                severity="error"
                className="w-full text-center self-center"
              >
                Vous n'avez reçu aucun Message
              </Alert>
            </div>
          )}
        </div>
        {/* ANNONCES */}
        <div
          className={`w-full flex-col justify-start items-center ${
            active === 2 ? "flex" : "hidden"
          }`}
        >
          <div className="w-full flex flex-col gap-10 items-center">
            <GridAnnonces
              data={Annonces}
              user={userConnected}
              error="Vous avez 0 Annonces"
              nbcol="2"
            />
            {Annonces.length > 0 ? (
              <div className="text-xl flex gap-2 self-center">
                Vous avez
                <span className="text-IGLorange">{Annonces.length}</span>
                Annonces
              </div>
            ) : null}
          </div>
        </div>
        {/* INFOS */}
        <div
          className={`w-full flex-col justify-start items-center ${
            active === 3 ? "flex" : "hidden"
          }`}
        >
          <p className="text-center">Username : {userConnected.username}</p>
          <p className="text-center">email : {userConnected.email}</p>
        </div>
      </div>
    )
  );
};

export default Tabs;
