/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import axios from "axios";
import { React, useState } from "react";
import Input from "./input";
import Picture from "./pictureInput";
import Button from "./buttonSubmit";
import Select from "./Select";
import Data from "./selectData";
import wilayacommune from "./donnees_communes.json";
import Navbar from "../Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function getcommunes(wilaya) {
  let communeslist = [{ value: "", text: "Commune" }];
  wilayacommune.forEach((commune) => {
    if (commune.wilaya === wilaya) {
      communeslist.push({ value: commune.commune, text: commune.commune });
    }
  });
  return communeslist;
}

const FormAnnonce = (props) => {
  let navigate = useNavigate();
  let { state } = useLocation();
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
          let base64 = reader.result;
          base64 = base64.substring(23);
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
    const annonce = {
      categorie: typeBien,
      type_annonce: typeAnnonce,
      surface: superficie,
      description: description,
      prix: prix,
      id_contact: state.user.id,
      wilaya: wilayaSelected,
      commune: communeSelected,
      image: file,
      titre: titre,
      date_publication: new Date().toISOString().slice(0, 10),
      telephone: numtel,
    };
    const fullData = Object.values(annonce).every((x) => x !== 0 && x !== "");
    if (fullData) {
      axios
        .post("http://localhost:8000/DeposerAnnonce/", annonce)
        .then((response) => console.log(response.data));
      const user = state.user;
      navigate("/", { state: { user } });
    } else {
      alert("Veuillez Remplir l'intégralité du formulaire");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Navbar user={props.user} />
      <div className="pb-36 pt-16 flex flex-col items-center justify-items-center gap-16 w-1/2 bg-IGLnoir text-IGLblanc font-montserrat overflow-clip">
        <h1 className="self-start font-bold text-4xl">Déposer une annonce</h1>
        <form className="flex flex-row flex-wrap w-full justify-between text-center gap-16">
          <Select
            id="1"
            options={Data[0]}
            Change={handlechange}
            width="w-full"
          />
          <Select
            id="2"
            options={Data[1]}
            Change={handlechange}
            width="w-full"
          />
          <Select
            id="3"
            options={Data[2]}
            Change={handlechange}
            width="w-full"
          />
          <Select
            id="4"
            options={communes}
            Change={handlechange}
            width="w-full"
          />
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
            width="2/5"
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
          <Button id="11" Submit={handlesubmit} text="Déposer l'annonce" />
        </form>
      </div>
    </div>
  );
};

export default FormAnnonce;
