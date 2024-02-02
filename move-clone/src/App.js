import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import CreateRoute from "./Component/CreateRoute";
import GoogleMap from "./Component/GoogleMaps";

function App() {
  return (
    <div>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/Login" element={<Home />} />
  <Route path="/CreateRoute" element={<CreateRoute />} />
  <Route path="/maps" element={<GoogleMap />} />
</Routes>

    </div>
  );
}
 
export default App;
