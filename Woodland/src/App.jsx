import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./page/Home";
import TubesCursor from "./component/TubesCursor"; // ✅ Import here

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="relative min-h-screen flex flex-col">
        <div className="relative z-20 flex flex-col min-h-screen">



          <TubesCursor />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>

      </div>
    </Router>
  );
};

export default App;
