import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Observer, TextPlugin);

const slides = [
  {
    title: "SCROLL",
    img: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
    
  },
  {
    title: "SWIPE",
    img: "https://images.unsplash.com/photo-1558603668-6570496b66f8",
  },
  {
    title: "SCROLL",
    img: "https://images.unsplash.com/photo-1537165924986-cc3568f5d454",
  },
  {
    title: "SWIPE",
    img: "https://images.unsplash.com/photo-1589271243958-d61e12b61b97",
  },
];

export default function TubesCursor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animatingRef = useRef(false);
  const indexRef = useRef(0);
  const autoTimerRef = useRef(null);

  // ============================
  // ✅ TUBES CURSOR BACKGROUND
  // ============================
  useEffect(() => {
    let app;

    const loadTubes = async () => {
      const { default: TubesCursor } = await import(
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );

      app = TubesCursor(canvasRef.current, {
        tubes: {
          colors: ["#f967fb", "#53bc28", "#6958d5"],
          lights: {
            intensity: 200,
            colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
          },
        },
      });
    };

    loadTubes();

    const handleClick = () => {
      const colors = randomColors(3);
      const lightColors = randomColors(4);

      if (app?.tubes) {
        app.tubes.setColors(colors);
        app.tubes.setLightsColors(lightColors);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  function randomColors(count) {
    return new Array(count).fill(0).map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
  }

  // ============================
  // ✅ GSAP HERO SLIDER
  // ============================
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".slide");
      const images = gsap.utils.toArray(".image").reverse();
      const slideImages = gsap.utils.toArray(".slide__img");
      const outerWrappers = gsap.utils.toArray(".slide__outer");
      const innerWrappers = gsap.utils.toArray(".slide__inner");
      const count = document.querySelector(".count");

      const wrap = gsap.utils.wrap(0, sections.length);

      gsap.set(outerWrappers, { xPercent: 100 });
      gsap.set(innerWrappers, { xPercent: -100 });
      gsap.set(outerWrappers[0], { xPercent: 0 });
      gsap.set(innerWrappers[0], { xPercent: 0 });

      function gotoSection(index, direction) {
        if (animatingRef.current) return;
        animatingRef.current = true;

        index = wrap(index);

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => (animatingRef.current = false),
        });

        const currentSection = sections[indexRef.current];
        const heading = currentSection.querySelector(".slide__heading");
        const nextSection = sections[index];
        const nextHeading = nextSection.querySelector(".slide__heading");

        gsap.set([sections, images], { zIndex: 0, autoAlpha: 0 });
        gsap.set([sections[indexRef.current], images[index]], {
          zIndex: 1,
          autoAlpha: 1,
        });
        gsap.set([sections[index], images[indexRef.current]], {
          zIndex: 2,
          autoAlpha: 1,
        });

        count && tl.set(count, { text: index + 1 });

        tl.fromTo(
          outerWrappers[index],
          { xPercent: 100 * direction },
          { xPercent: 0 },
          0
        )
          .fromTo(
            innerWrappers[index],
            { xPercent: -100 * direction },
            { xPercent: 0 },
            0
          )
          .to(heading, { xPercent: 30 * direction }, 0)
          .fromTo(
            nextHeading,
            { xPercent: -30 * direction },
            { xPercent: 0 },
            0
          )
          .fromTo(
            images[index],
            { xPercent: 125 * direction, scale: 1.3 },
            { xPercent: 0, scale: 1 },
            0
          )
          .fromTo(
            images[indexRef.current],
            { xPercent: 0, scale: 1 },
            { xPercent: -125 * direction, scale: 1.3 },
            0
          )
          .fromTo(slideImages[index], { scale: 2 }, { scale: 1 }, 0);

        indexRef.current = index;
      }

      function startAutoScroll() {
        stopAutoScroll();
        autoTimerRef.current = setInterval(() => {
          if (!animatingRef.current) {
            gotoSection(indexRef.current + 1, 1);
          }
        }, 4000);
      }

      function stopAutoScroll() {
        if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      }

      startAutoScroll();

      Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: 0.7,
        onUp: () => gotoSection(indexRef.current + 1, 1),
        onDown: () => gotoSection(indexRef.current - 1, -1),
      });

      return () => stopAutoScroll();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ============================
  // ✅ FINAL JSX
  // ============================
  return (
    <div className="relative w-full h-screen overflow-hidden font-[Montserrat]">
      
      {/* ✅ 3D TUBES BACKGROUND */}
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      {/* ✅ HERO SLIDER CONTENT */}
      <div ref={containerRef} className="relative z-10 w-full h-screen">
        {slides.map((slide, i) => (
          <section
            key={i}
            className={`slide absolute inset-0 w-full h-full`}
          >
            <div className="slide__outer w-full h-full overflow-hidden">
              <div className="slide__inner w-full h-full overflow-hidden">
                <div className="flex items-center justify-center h-full">
                  <h2 className="slide__heading text-white font-extrabold text-[clamp(5rem,15vw,15rem)]">
                    {slide.title}
                  </h2>
                  <img
                    className="slide__img absolute inset-0 w-full h-full object-cover opacity-50"
                    src={slide.img}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
