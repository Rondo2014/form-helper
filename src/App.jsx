import { useEffect, useState } from "react";
import "./App.css";
import TotalCostPage from "./pages/totalcost/TotalCostPage";
import ComponentPage from "./pages/componentlist/ComponentPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="align-middle max-w-[1920px] mx-auto max-h-screen mt-48">
        <Routes>
          <Route exact path="/totalcost" element={<TotalCostPage />} />
          <Route exact path="/componentpage" element={<ComponentPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
