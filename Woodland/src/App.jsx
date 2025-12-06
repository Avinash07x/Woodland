import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./page/Home";
import TubesCursor from "./component/TubesCursor";

const App = () => {
  return (
    <Router>
      <Navbar />
      {/* ✅ 3D Tubes Background */}
      <TubesCursor />

      {/* ✅ Main Layout */}
      <div className="relative min-h-screen flex flex-col z-10">
        
        {/* ✅ Navbar */}
        

        {/* ✅ Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        {/* ✅ Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
