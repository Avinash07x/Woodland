// TubesCursor.jsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(Observer, TextPlugin);

const slides = [
  {
    title: "Coastal Villa",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
  },
  {
    title: "The Willow Loft",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600",
  },
  {
    title: "Sunshine Retreat",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600",
  },
  {
    title: "Forest Pavilion",
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=1600",
  },
];

export default function TubesCursor() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const appRef = useRef(null);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const autoTimerRef = useRef(null);

  // -------------------------------------------------
  // TUBES BACKGROUND (FIXED)
  // -------------------------------------------------
  useEffect(() => {
    let mounted = true;

    const randomColors = (count) =>
      Array.from({ length: count }, () =>
        "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
      );

    const loadTubes = async () => {
      try {
        const { default: TubesCursorApp } = await import(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );

        if (!mounted || !canvasRef.current) return;

        if (appRef.current?.dispose) appRef.current.dispose();

        appRef.current = TubesCursorApp(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });
      } catch (e) {
        console.error("Tubes load error:", e);
      }
    };

    loadTubes();

    const clickHandler = () => {
      const app = appRef.current;
      if (!app?.tubes) return;

      app.tubes.setColors(randomColors(3));
      app.tubes.setLightsColors(randomColors(4));
    };

    document.addEventListener("click", clickHandler);

    return () => {
      mounted = false;
      document.removeEventListener("click", clickHandler);
      if (appRef.current?.dispose) appRef.current.dispose();
      appRef.current = null;
    };
  }, []);

  // -------------------------------------------------
  // SLIDER (FIXED & STABLE)
  // -------------------------------------------------
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const slidesEl = gsap.utils.toArray(".slide");
      const images = gsap.utils.toArray(".slide__img");
      const headings = gsap.utils.toArray(".slide__heading");

      const wrap = gsap.utils.wrap(0, slidesEl.length);

      gsap.set(slidesEl, { autoAlpha: 0 });
      gsap.set(slidesEl[0], { autoAlpha: 1 });

      const gotoSlide = (index, direction) => {
        if (animatingRef.current) return;
        animatingRef.current = true;

        index = wrap(index);
        const current = indexRef.current;

        const tl = gsap.timeline({
          defaults: { duration: 1.2, ease: "expo.inOut" },
          onComplete: () => (animatingRef.current = false),
        });

        tl.set(slidesEl[index], { autoAlpha: 1 })
          .fromTo(
            images[index],
            { xPercent: 120 * direction, scale: 1.3 },
            { xPercent: 0, scale: 1 },
            0
          )
          .fromTo(
            headings[index],
            { xPercent: -40 * direction, opacity: 0 },
            { xPercent: 0, opacity: 1 },
            0
          )
          .to(
            images[current],
            { xPercent: -120 * direction, scale: 1.3 },
            0
          )
          .to(headings[current], { opacity: 0 }, 0)
          .set(slidesEl[current], { autoAlpha: 0 });

        indexRef.current = index;
      };

      autoTimerRef.current = setInterval(() => {
        gotoSlide(indexRef.current + 1, 1);
      }, 4500);

      Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        wheelSpeed: 0.6,
        tolerance: 30,
        preventDefault: false, // page scroll works
        debounce: true,
        onUp: () => gotoSlide(indexRef.current + 1, 1),
        onDown: () => gotoSlide(indexRef.current - 1, -1),
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearInterval(autoTimerRef.current);
    };
  }, []);

  // -------------------------------------------------
  // JSX
  // -------------------------------------------------
  return (
    <div className="relative w-full h-screen overflow-hidden font-[Montserrat]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      <div ref={containerRef} className="relative z-10 w-full h-screen">
        {slides.map((slide, i) => (
          <section
            key={i}
            className="slide absolute inset-0 flex items-center justify-center"
          >
            <h2 className="slide__heading absolute z-10 text-white font-extrabold text-[clamp(1.5rem,6vw,5rem)]">
              {slide.title}
            </h2>
            <img
              className="slide__img w-full h-full object-cover opacity-60"
              src={slide.img}
              alt={slide.title}
              loading="lazy"
            />
          </section>
        ))}
      </div>
    </div>
  );
}
