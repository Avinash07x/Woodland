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
      <TubesCursor />
      <div className="relative min-h-screen flex flex-col z-10">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
