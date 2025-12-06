import React from "react";

import About from "../component/About";
import Carousel3D from "../component/Carousel3D";
import Contact from "../component/Contact";
import Projects from "../component/Projects";
import Services from "../component/Services";
import StatsFeatured from "../component/StatsFeatured";

function Home() {
  return (
    <>
      <About />
      <Services />
      <Projects />
      <StatsFeatured />
      <Carousel3D />
      <Contact />
    </>
  );
}

export default Home;
