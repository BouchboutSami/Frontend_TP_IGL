import { React, useState, useEffect } from "react";
import CardAnnonce from "./CardAnnonce";
import Alert from "@mui/material/Alert";

const GridAnnonces = (props) => {
  const [Annonces, setAnnonces] = useState(props.data);
  const [userConnected, setuserConnected] = useState({});

  useEffect(() => {
    setuserConnected(props.user);
  }, [props, userConnected]);

  useEffect(() => {
    setAnnonces(props.data.reverse());
  }, [Annonces, props.data]);

  return (
    <div className={`w-3/4 Annonces grid grid-cols-${props.nbcol} gap-6`}>
      {Annonces.length !== 0 ? (
        Annonces.map((annonce) => (
          <CardAnnonce data={annonce} key={annonce[0]} user={userConnected} />
        ))
      ) : (
        <div className="w-full flex justify-center items-center text-IGLblanc text-4xl col-span-3 text-center mt-24">
          <Alert
            variant="filled"
            severity="error"
            className="w-full text-center self-center"
          >
            {props.error}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default GridAnnonces;
