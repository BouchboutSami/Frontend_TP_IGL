import { React, useState } from "react";
import Button from "../DeposerAnnonce/buttonSubmit";
import Select from "../DeposerAnnonce/Select";
import Data from "../DeposerAnnonce/selectData";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Scraping = () => {
  function handleSubmit() {
    seterrorScraping(false);
    if (wilayaSelected === 0) {
      alert("Choisissez la wilaya dont vous voulez scraper les annonces");
    } else {
      const wilaya = wilayaSelected;
      setloading(true);
      console.log("Sarted Scraping");
      axios
        .post("http://localhost:8000/scrap/", { wilaya })
        .then((response) => {
          console.log("Finished Scraping");
          setData([...data, ...response.data]);
          setloading(false);
        })
        .catch((error) => {
          console.error(error);
          setloading(false);
          seterrorScraping(true);
        });
    }
  }

  function handlechange(e, id) {
    seterrorScraping(false);
    let wilaya = Data[3](e.target.value);
    setwilayaSelected(wilaya);
  }

  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [errorScraping, seterrorScraping] = useState(false);
  const [wilayaSelected, setwilayaSelected] = useState(0);

  return (
    <div className="w-1/2 flex flex-col justify-center items-center gap-10">
      <Select id="1" options={Data[2]} Change={handlechange} />
      <Button
        id="1"
        text="Importer des annonces externes"
        Submit={handleSubmit}
      />
      {(loading && (
        <div className="flex flex-col justify-center items-center gap-4">
          <CircularProgress />
          <p className="text-IGLblanc font-montserrat">Data Loading</p>
        </div>
      )) || <p className="text-IGLblanc font-montserrat">Admin Panel</p>}
      {data.length > 0 &&
        data.map((annonce, i) => {
          return (
            <img
              key={i}
              className="text-IGLblanc font-montserrat"
              src={`data:image/jpeg;base64,${annonce.image}`}
              alt="Apercu l'annonce"
            />
          );
        })}
      {errorScraping && (
        <p className="text-IGLblanc font-montserrat">
          Erreur lors de l'opération du Web Scraping
        </p>
      )}
    </div>
  );
};

export default Scraping;
