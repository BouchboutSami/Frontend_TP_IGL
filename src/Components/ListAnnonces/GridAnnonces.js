import { React, useState, useEffect } from "react";
import CardAnnonce from "./CardAnnonce";

const GridAnnonces = (props) => {
  const [Annonces, setAnnonces] = useState(props.data);

  useEffect(() => {
    setAnnonces(props.data);
  }, [Annonces, props.data]);

  return (
    <div className="w-3/4 Annonces grid grid-cols-3 gap-6">
      {Annonces.map((annonce) => (
        <CardAnnonce data={annonce} key={annonce[0]} />
      ))}
    </div>
  );
};

export default GridAnnonces;
