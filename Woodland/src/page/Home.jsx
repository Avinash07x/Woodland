import React from "react";
import TubesCursor from "../component/TubesCursor";
import About from "../component/About";
import Contact from "../component/Contact";
import Projects from "../component/Projects";
import Services from "../component/Services";
import StatsFeatured from "../component/StatsFeatured";

function Home() {
  return (
    <>
      <TubesCursor />
      <About />
      <Services />
      <Projects />
      <StatsFeatured />
      <Contact />
    </>
  );
}

export default Home;
