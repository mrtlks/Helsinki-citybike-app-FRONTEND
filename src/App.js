import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./Frontpage/FrontPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import Stations from "./Stations/Stations";



function App() {

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" exact element={<FrontPage />} />
        <Route path="/stations" exact element={<Stations />} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
