import { React, useState } from "react";
import axios from "axios";
import Select from "../DeposerAnnonce/Select";
import Data from "../DeposerAnnonce/selectData";
import wilayacommune from "../DeposerAnnonce/donnees_communes.json";
import Input from "../DeposerAnnonce/input";
import ButtonSubmit from "../DeposerAnnonce/buttonSubmit";
import { useEffect } from "react";

function getcommunes(wilaya) {
  let communeslist = [{ value: "", text: "Commune" }];
  wilayacommune.forEach((commune) => {
    if (commune.wilaya === wilaya) {
      communeslist.push({ value: commune.commune, text: commune.commune });
    }
  });
  return communeslist;
}

const Filtres = (props) => {
  const [recherche, setrecherche] = useState("");
  const [wilaya, setwilaya] = useState("");
  const [communes, setcommunes] = useState([{ value: "", text: "Commune" }]);
  const [communeSelected, setcommuneSelected] = useState("");
  const [type, setType] = useState("");
  const [Annonces, setAnnonces] = useState([]);

  function handlechange(e, id) {
    e.preventDefault();
    switch (parseInt(id)) {
      case 5:
        setrecherche(e.target.value);
        break;
      case 2:
        setType(e.target.value);
        break;
      case 3:
        setwilaya(e.target.value);
        setcommunes(getcommunes(e.target.value));
        break;
      case 4:
        setcommuneSelected(e.target.value);
        break;
      default:
        console.log("erreur");
        break;
    }
  }

  useEffect(() => {
    if (wilaya === "") {
      setcommuneSelected("");
    }
  }, [wilaya]);

  useEffect(
    () => {
      props.onChange(Annonces);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Annonces]
  );

  function handlesubmit() {
    const filter = {
      recherche: recherche,
      wilaya: wilaya,
      commune: communeSelected,
      typeAnnonce: type,
    };
    axios
      .post("http://127.0.0.1:8000/GetAnnoncesfiltered", filter)
      .then((response) => {
        setAnnonces(response.data);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 w-full h-36 text-IGLblanc">
      <Input
        id="5"
        Change={handlechange}
        placeholder="Recherchez des annonces avec des mots clés"
        type="text"
      />
      <div className="flex flex-row w-full justify-center gap-[10%]">
        <Select
          id="2"
          options={Data[0]}
          Change={handlechange}
          width="w-1/5"
          className="bg-[#2C2B2B]"
        />
        <Select
          id="3"
          options={Data[2]}
          Change={handlechange}
          width="w-1/5"
          className="bg-[#2C2B2B]"
        />
        <Select
          id="4"
          options={communes}
          Change={handlechange}
          width="w-1/5"
          className="bg-[#2C2B2B]"
        />
      </div>
      <ButtonSubmit id="11" Submit={handlesubmit} text="Rechercher" />
    </div>
  );
};

export default Filtres;
