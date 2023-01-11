import React from "react";
import Input from "./input";
import Picture from "./pictureInput";
import Button from "./buttonSubmit";

const FormAnnonce = () => {
  return (
    <div>
      <h1>Déposer une annonce:</h1>
      <form>
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Input />
        <Picture />
        <Input />
        <Button />
      </form>
    </div>
  );
};

export default FormAnnonce;
