import About from "../component/About";
import Carousel3D from "../component/Carousel3D";
import Contact from "../component/Contact";
import Hero from "../component/hero";
import Projects from "../component/Projects";
import Services from "../component/Services";
import React from "react";

function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Carousel3D />
            <Projects />
            <About />
            <Contact />
        </>
    );
}

export default Home;