import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CardAnnonce = (props) => {
  const navigate = useNavigate();
  const [userConnected, setuserConnected] = useState(props.user);
  useEffect(() => {
    setuserConnected(props.user);
  }, [props, userConnected]);
  return (
    <div className="text-IGLgris h-96 flex flex-col items-center bg-IGLbgLogin gap-6 font-thin rounded-lg">
      <div className="imageLogin w-full h-[70%] bg-yellow-400 rounded-lg overflow-hidden">
        <img
          alt="Apercu de l'annonce"
          src={"data:image/png;base64," + props.data[9]}
          className="w-full h-full object-fill"
        ></img>
      </div>
      <div className="w-full flex justify-between items-center px-[10%]">
        <div className="flex flex-col justify-center gap-5 h-full">
          <p>{props.data[5]} DA</p>
          <p className="flex items-center">
            {props.data[7]}, {props.data[8]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 h-full">
          <Link
            to="/DetAnnonce"
            state={{ user: userConnected, annonce: props.data }}
          >
            <p className="flex items-center justify-center bg-IGLgris px-3 py-2 text-IGLbgLogin rounded-md leading-none text-montserrat font-semibold">
              Détails
            </p>
          </Link>

          <p className="pb-2 flex items-center">{props.data[11]}</p>
        </div>
      </div>
    </div>
  );
};

export default CardAnnonce;
