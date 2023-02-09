import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormAnnonce from "./DeposerAnnonce/FormAnnonce";
import Scraping from "./admin/Scraping";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import DetAnnonce from "./DetailsAnnonce/AnnonceDetail";
import Home from "./ListAnnonces/ListAnnonces";
import Footer from "./Footer/Footer";
import NotFound from "./notFound/NotFound";
import MonCompte from "./InfosCompte/InfosCompte";
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
    <div className="app overflow-x-hidden">
      <BrowserRouter>
        <div className="flex flex-col items-center w-full bg-IGLnoir">
          <Routes>
            <Route
              path="/"
              exact
              element={
                Object.keys(userConnected).length !== 0 ? (
                  <Home />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/DeposerAnnonce"
              exact
              element={<FormAnnonce user={userConnected} />}
            />
            <Route
              path="/AdminScraping"
              exact
              element={<Scraping user={userConnected} />}
            />
            <Route
              path="/Login"
              exact
              element={<Login onLogin={handleLogin} />}
            />
            {
              <Route
                path="/Signup"
                exact
                element={<Signup onLogin={handleLogin} />}
              />
            }
            <Route path="/DetAnnonce" exact element={<DetAnnonce />} />
            <Route path="/MonCompte" exact element={<MonCompte />} />
            <Route path="*" exact element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
