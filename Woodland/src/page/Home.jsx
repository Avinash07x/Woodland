import React from "react";

import About from "../component/About";
import Carousel3D from "../component/Carousel3D";
import Contact from "../component/Contact";
import Projects from "../component/Projects";
import Services from "../component/Services";

function Home() {
  return (
    <>
      <Services />
      <Carousel3D />
      <Projects />
      <About />
      <Contact />
    </>
  );
}

export default Home;
