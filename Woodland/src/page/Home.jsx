import React from "react";
import TubesCursor from "../component/TubesCursor";
import About from "../component/About";
import Services from "../component/Services";
import Projects from "../component/Projects";
import StatsFeatured from "../component/StatsFeatured";
import Contact from "../component/Contact";
import FAQ from "../component/FAQ";

function Home() {
  return (
    <>
      <TubesCursor />
      <About />
      <Services />
      <Projects />
      <StatsFeatured />
      <FAQ />
      <Contact />
    </>
  );
}

export default Home;
