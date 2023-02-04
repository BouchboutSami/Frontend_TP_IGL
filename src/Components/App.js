import React from "react";
import axios from "axios";
// import FormAnnonce from "./DeposerAnnonce/FormAnnonce";
// import Scraping from "./admin/Scraping";
// import Login from "./Login/Login";
// import Signup from "./Signup/Signup";
// import DetAnnonce from "./DetailsAnnonce/AnnonceDetail";
import Home from "./ListAnnonces/ListAnnonces";
import Navbar from "./Navbar/Navbar";

let annonce = {};
let val = 10;
axios.post("http://127.0.0.1:8000/getAnnonceid", { val }).then((response) => {
  annonce = response.data;
  console.log(annonce);
});

const App = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-IGLnoir overflow-x-hidden">
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <Scraping userid="34" /> */}
      {/* <FormAnnonce userid="34" /> */}
      {/* <DetAnnonce Annonce={annonce} /> */}
      <Navbar userid="22" />
      <Home />
    </div>
  );
};

export default App;
