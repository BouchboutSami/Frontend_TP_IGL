/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { React, useState, useEffect } from "react";
import Input from "./input";
import Picture from "./pictureInput";
import Button from "./buttonSubmit";
import Select from "./Select";
import Data from "./selectData";
import wilayacommune from "./donnees_communes.json";

function getcommunes(wilaya) {
  let communeslist = [{ value: "", text: "Commune" }];
  wilayacommune.forEach((commune) => {
    if (commune.wilaya === wilaya) {
      communeslist.push({ value: commune.commune, text: commune.commune });
    }
  });
  return communeslist;
}
const FormAnnonce = () => {
  const [description, setdescription] = useState("");
  const [file, setfile] = useState("");
  const [prix, setprix] = useState(0);
  const [superficie, setsuperficie] = useState(0);
  const [numtel, setnumtel] = useState("");
  const [titre, settitre] = useState("");
  const [typeAnnonce, settypeAnnonce] = useState("");
  const [typeBien, settypeBien] = useState("");
  const [wilayaSelected, setwilayaSelected] = useState("");
  const [disablecommune, setdisablecommune] = useState(true);
  const [communes, setcommunes] = useState([{ value: "", text: "Commune" }]);
  const [communeSelected, setcommuneSelected] = useState("");

  function handlechange(e, id) {
    e.preventDefault();
    switch (parseInt(id)) {
      case 1:
        settypeAnnonce(e.target.value);
        break;
      case 2:
        settypeBien(e.target.value);
        break;
      case 3:
        setwilayaSelected(e.target.value);
        setdisablecommune(false);
        setcommunes(getcommunes(e.target.value));
        break;
      case 4:
        setcommuneSelected(e.target.value);
        break;
      case 5:
        settitre(e.target.value);
        break;
      case 6:
        setnumtel(e.target.value);
        break;
      case 7:
        setsuperficie(e.target.value);
        break;
      case 8:
        setprix(e.target.value);
        break;
      case 9:
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          const base64 = reader.result;
          setfile(base64);
        };
        break;
      case 10:
        setdescription(e.target.value);
        break;
      default:
        console.log("erreur");
        break;
    }
  }

  function handlesubmit() {
    console.log(
      prix,
      superficie,
      numtel,
      titre,
      typeAnnonce,
      typeBien,
      wilayaSelected,
      communeSelected,
      file,
      description
    );
  }

  return (
    <div className="flex flex-col items-center justify-items-center gap-16 w-1/2 bg-IGLnoir text-IGLblanc font-montserrat overflow-clip">
      <h1 className="self-start font-bold text-4xl">Déposer une annonce</h1>
      <form className="flex flex-row flex-wrap w-full justify-between text-center gap-16">
        <Select id="1" options={Data[0]} Change={handlechange} />
        <Select id="2" options={Data[1]} Change={handlechange} />
        <Select id="3" options={Data[2]} Change={handlechange} />
        <Select id="4" options={communes} Change={handlechange} />
        <Input
          id="5"
          Change={handlechange}
          placeholder="Titre de l'annonce *"
          type="text"
        />
        <Input
          id="6"
          Change={handlechange}
          placeholder="Numéro de téléphone *"
          type="number"
        />
        <Input
          id="7"
          Change={handlechange}
          placeholder="Superficie *"
          type="number"
        />
        <Input
          id="8"
          Change={handlechange}
          placeholder="Prix *"
          type="number"
        />
        <Picture id="9" Change={handlechange} />
        <Input
          id="10"
          Change={handlechange}
          placeholder="Description de l'annonce *"
          type="text"
        />
        <Button id="11" Submit={handlesubmit} />
      </form>
    </div>
  );
};

export default FormAnnonce;
