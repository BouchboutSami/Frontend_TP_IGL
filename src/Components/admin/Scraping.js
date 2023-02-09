import { React, useEffect, useState } from "react";
import Button from "../DeposerAnnonce/buttonSubmit";
import Select from "../DeposerAnnonce/Select";
import Data from "../DeposerAnnonce/selectData";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cardannonce from "../ListAnnonces/CardAnnonce";
import Navbar from "../Navbar/Navbar";
import Alert from "@mui/material/Alert";
import Listusers from "./Listusers";

const Scraping = () => {
  const location = useLocation();

  function handleSubmit() {
    setData([]);
    seterrorScraping(false);
    if (wilayaSelected === 0) {
      alert("Choisissez la wilaya dont vous voulez scraper les annonces");
    } else {
      const val = wilayaSelected;
      setloading(true);
      console.log("Sarted Scraping");
      axios
        .post("http://localhost:8000/scrap/", { val })
        .then((response) => {
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
  const [userConnected, setUserConnected] = useState({});
  useEffect(() => {
    setUserConnected(location.state.user);
  }, [location]);

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <Navbar user={userConnected} />
      <div className="w-1/2 flex flex-col items-center gap-10 min-h-screen">
        <label className="text-xl text-IGLorange">Choisir la wilaya</label>
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
        )) ||
          null}
        <div className="grid grid-cols-2 justify-center items-center gap-6">
          {data.length > 0 &&
            data.map((annonce, i) => {
              annonce = Object.values(annonce);
              annonce.unshift(-1);
              return <Cardannonce data={annonce} key={i} />;
            })}
        </div>
        {errorScraping && (
          <Alert variant="filled" severity="error">
            Erreur lors de l'opération du Web scraping
          </Alert>
        )}
        <Listusers />
      </div>
    </div>
  );
};

export default Scraping;
