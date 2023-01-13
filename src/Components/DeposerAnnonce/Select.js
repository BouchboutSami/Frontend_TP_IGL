import React from "react";
import { useState } from "react";
import "./select-input.css";

const Select = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [value, setvalue] = useState("");
  const handleChange = (e) => {
    setvalue(e.target.value);
    props.Change(e, props.id);
  };

  return (
    <div className="w-2/5">
      <select
        className="w-full bg-IGLnoir border-0 border-b-2 border-IGLgris text-IGLgris outline-none style widthHeight"
        onChange={handleChange}
      >
        {props.options.map((option) => (
          <option
            disabled={option.disabled}
            key={option.text}
            value={option.value}
          >
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
