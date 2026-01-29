import React from "react";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Incident from "./pages/Incident";
import Asset from "./pages/Asset";
import CreateIncidentPage from "./pages/CreateIncidentPage";

const App = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/incidents" element={<Incident />} />
        <Route path="/incidents/create" element={<CreateIncidentPage />} />
        <Route path="/assets" element={<Asset />} />
      </Route>
    </Routes>
  );
};

export default App;
