import React from "react";

const CardAnnonce = (props) => {
  return (
    <div className="text-IGLgris w-full h-96 flex flex-col items-center bg-IGLbgLogin gap-6 font-thin rounded-lg">
      <div className="imageLogin w-full h-[70%] bg-yellow-400 rounded-lg overflow-hidden">
        <img
          alt="Apercu de l'annonce"
          src={"data:image/png;base64," + props.data[9]}
          className="w-full h-full object-fill"
        ></img>
      </div>
      <div className="w-full h-auto flex justify-between items-center px-[10%]">
        <div className="flex flex-col justify-center gap-5">
          <p>{props.data[5]} DA</p>
          <p className="flex items-center">
            {props.data[7]}, {props.data[8]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <a
            href="/"
            className="flex items-center justify-center bg-IGLgris px-3 py-2 text-IGLbgLogin rounded-md leading-none text-montserrat font-semibold"
          >
            Détails
          </a>
          <p className="pb-2 flex items-center">{props.data[11]}</p>
        </div>
      </div>
    </div>
  );
};

export default CardAnnonce;
