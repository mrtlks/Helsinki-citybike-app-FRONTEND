import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./Frontpage/FrontPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Stations from "./Stations/Stations";
import Journeys from "./Journeys/Journeys";
import UserExperiences from "./UserExperiences/UserExperiences";


function App() {

  return (
<<<<<<< HEAD
    <BrowserRouter basename ="/#"> 
      console.log(basename)
=======
    <BrowserRouter basename ={process.env.PUBLIC_URL}> 
    console.log(basename)
>>>>>>> 6c467bc1f04f460acea70b019f8d4df937036a47
      <ResponsiveAppBar />
      <Routes >
        <Route path="/" exact element={<FrontPage />} />
        <Route path={`/stations`} exact element={<Stations />} />
          <Route path={`/journeys`} exact element={<Journeys />} />
          <Route path={`/userexperiences`} exact element={<UserExperiences />} />     
      </Routes>
    </BrowserRouter>
  );
}
export default App;
