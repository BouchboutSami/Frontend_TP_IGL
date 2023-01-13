/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const PictureInput = (props) => {
  const [value, setvalue] = useState(null);
  const handleChange = (e) => {
    setvalue(e.target.value);
    props.Change(e, props.id);
  };

  return (
    <div className="relative w-full h-48 bg-transparent border-2 border-IGLgris text-IGLblanc flex flex-col items-center justify-center">
      <label className="absolute top-4 left-4">Importer une image *</label>
      <input
        type="file"
        onChange={handleChange}
        accept="image/* "
        required
      ></input>
    </div>
  );
};

export default PictureInput;
