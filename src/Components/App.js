import React from "react";
// import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormAnnonce from "./DeposerAnnonce/FormAnnonce";
import Scraping from "./admin/Scraping";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import DetAnnonce from "./DetailsAnnonce/AnnonceDetail";
import Home from "./ListAnnonces/ListAnnonces";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import NotFound from "./notFound/NotFound";
import { useState, useEffect } from "react";

const App = () => {
  const [userConnected, setUserConnected] = useState({});

  function handleLogin(user) {
    setUserConnected(user);
  }

  useEffect(() => {
    if (Object.keys(userConnected).length !== 0) {
      console.log(userConnected);
    }
  }, [userConnected]);

  return (
    <div className="app">
      <BrowserRouter>
        <div className="flex flex-col items-center w-full bg-IGLnoir">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route
              path="/DeposerAnnonce"
              exact
              element={<FormAnnonce userid={userConnected.id} />}
            />
            <Route path="/AdminScraping" exact element={<Scraping />} />
            <Route
              path="/Login"
              exact
              element={<Login onLogin={handleLogin} />}
            />
            {<Route path="/Signup" exact element={<Signup />} />}
            <Route path="/DetAnnonce" exact element={<DetAnnonce />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
