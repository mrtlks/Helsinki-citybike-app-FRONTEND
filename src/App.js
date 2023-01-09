import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from "./Frontpage/FrontPage";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";



function App() {

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" exact element={<FrontPage />} />
      </Routes>

    </BrowserRouter>
  );
}
export default App;
