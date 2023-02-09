import React from "react";

const maps = (props) => {
  return (
    <div className="MapCommune w-1/2 h-96">
      <iframe
        title="Localisation"
        src={`https://maps.google.com/maps?q=" +
            ${props.commune} +" "+ ${props.wilaya}
            "&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default maps;
