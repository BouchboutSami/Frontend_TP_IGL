import React from "react";
// import FormAnnonce from "./DeposerAnnonce/FormAnnonce";
import Scraping from "./admin/Scraping";

const App = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen bg-IGLnoir overflow-x-hidden py-16">
      <Scraping userid="34" />
      {/* <FormAnnonce userid="34" /> */}
    </div>
  );
};

export default App;
