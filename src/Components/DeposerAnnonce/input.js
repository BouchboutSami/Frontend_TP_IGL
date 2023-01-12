import { React, useState } from "react";
import "./select-input.css";

const Input = (props) => {
  const [value, setvalue] = useState("");
  const handleChange = (e) => {
    setvalue(e.target.value);
    props.Change(e, props.id);
  };

  switch (parseInt(props.id)) {
    case 5:
      return (
        <div className="w-2/5 flex flex-row">
          <input
            type="text"
            className="w-full bg-transparent border-b-2 outline-none placeholder:text-IGLblanc"
            placeholder={props.placeholder}
            onChange={handleChange}
          ></input>
        </div>
      );
    case 6:
      return (
        <div className="w-2/5 flex flex-row">
          <input
            type="number"
            className="w-full bg-transparent border-b-2 outline-none placeholder:text-IGLblanc"
            placeholder={props.placeholder}
            onChange={handleChange}
          ></input>
        </div>
      );
    case 7:
      return (
        <div className="w-2/5 flex flex-row">
          <input
            type="number"
            className="w-full bg-transparent border-b-2 outline-none placeholder:text-IGLblanc"
            placeholder={props.placeholder}
            onChange={handleChange}
          ></input>
          <span className="pl-2 border-b-2">m²</span>
        </div>
      );
    case 8:
      return (
        <div className="w-2/5 flex flex-row">
          <input
            type="number"
            className="w-full bg-transparent border-b-2 outline-none placeholder:text-IGLblanc"
            placeholder={props.placeholder}
            onChange={handleChange}
          ></input>
          <span className="pl-2 border-b-2">DA</span>
        </div>
      );
    case 10:
      return (
        <div className="w-full">
          <textarea
            type="text"
            className="w-full bg-transparent border-b-2 outline-none placeholder:text-IGLblanc"
            placeholder={props.placeholder}
            onChange={handleChange}
          ></textarea>
        </div>
      );
    default:
      break;
  }
};

export default Input;
