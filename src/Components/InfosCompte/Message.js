import React, { useState, useEffect } from "react";
import axios from "axios";

const Message = (props) => {
  const [emetteur, setemetteur] = useState(null);

  useEffect(() => {
    let val = props.message[4];
    axios.post("http://localhost:8000/getuserid", { val }).then((response) => {
      setemetteur(response.data[1]);
    });
  }, [props.message]);

  return (
    emetteur && (
      <div className="flex flex-col items-center bg-IGLbgLogin leading-none py-10 gap-10">
        <div className="flex flex-row justify-between items-center px-10 w-full">
          <p className="text-xl flex gap-4">
            <span className="text-IGLorange text-xl">Reçu le:</span>
            {props.message[1].slice(0, 10)}
          </p>
          <p className="text-xl flex gap-4">
            <span className="text-IGLorange">From:</span>
            {/* {props.message[3].toUpperCase()} */}
            {emetteur}
          </p>
        </div>
        <div className="self-start px-10">
          <p className="text-xl flex gap-4">
            <span className="text-IGLorange text-xl">Message:</span>
            {props.message[2]}
          </p>
        </div>
      </div>
    )
  );
};

export default Message;
