import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HhsProviderPage from "./components/hhsProvidersPage";
import HHSProviders from "./components/hhsProviders";
import "./components/styles/ArkansasHeader.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HHSProviders />} />
        <Route path="/hhsproviderspage/:providerId" element={<HhsProviderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
