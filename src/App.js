import React from "react";
import { HashRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./Frontpage/FrontPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Stations from "./Stations/Stations";
import Journeys from "./Journeys/Journeys";
import UserExperiences from "./UserExperiences/UserExperiences";


function App() {

  return (
    <HashRouter basename ={process.env.PUBLIC_URL}> 
      console.log(basename)
      <ResponsiveAppBar />
      <Routes >
        <Route path="/" exact element={<FrontPage />} />
        <Route path="/stations" exact element={<Stations />} />
          <Route path="/journeys" exact element={<Journeys />} />
          <Route path="/userexperiences" exact element={<UserExperiences />} />     
      </Routes>
    </HashRouter>
  );
}
export default App;
