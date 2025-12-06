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
  const animatingRef = useRef(false);
  const indexRef = useRef(0);
  const autoTimerRef = useRef(null);
  const observerRef = useRef(null);
  const appRef = useRef(null); // store tubes app

  // ----------------------------
  // Tubes background (async load + safe dispose)
  // ----------------------------
  useEffect(() => {
    let mounted = true;

    const loadTubes = async () => {
      try {
        const { default: TubesCursor } = await import(
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        );

        if (!mounted || !canvasRef.current) return;

        // dispose previous if any (shouldn't be, but safe)
        if (appRef.current?.dispose) {
          try {
            appRef.current.dispose();
          } catch (e) {
            // ignore dispose errors
            // console.warn("dispose error", e);
          }
        }

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#f967fb", "#53bc28", "#6958d5"],
            lights: {
              intensity: 200,
              colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
            },
          },
        });

        appRef.current = app;
      } catch (err) {
        // fail gracefully
        // console.error("Failed to load tubes", err);
      }
    };

    loadTubes();

    const handleClick = () => {
      const app = appRef.current;
      if (app?.tubes?.setColors) {
        app.tubes.setColors(randomColors(3));
      }
      if (app?.tubes?.setLightsColors) {
        app.tubes.setLightsColors(randomColors(4));
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      mounted = false;
      document.body.removeEventListener("click", handleClick);

      // clear interval if any
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }

      // dispose the app to free GPU resources (crucial for WebGPU warnings)
      const app = appRef.current;
      if (app?.dispose && typeof app.dispose === "function") {
        try {
          app.dispose();
        } catch (e) {
          // console.warn("app.dispose() threw", e);
        }
      }
      appRef.current = null;
    };
  }, []);

  function randomColors(count) {
    return new Array(count).fill(0).map(() =>
      "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")
    );
  }

  // ----------------------------
  // GSAP Hero slider (defensive)
  // ----------------------------
  useEffect(() => {
    // guard: need container to exist
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // query all nodes and filter out any falsy entries
      const sections = gsap.utils.toArray(".slide").filter(Boolean);
      const slideImgs = gsap.utils.toArray(".slide__img").filter(Boolean);
      const outerWrappers = gsap.utils.toArray(".slide__outer").filter(Boolean);
      const innerWrappers = gsap.utils.toArray(".slide__inner").filter(Boolean);
      const countEl = document.querySelector(".count") || null;

      // if there are no sections, nothing to animate
      if (sections.length === 0) return;

      const wrap = gsap.utils.wrap(0, sections.length);

      // Ensure arrays align in length when used by index
      // Prepare flat targets for global sets (only valid DOM nodes)
      const allTargets = [...sections, ...slideImgs].filter(Boolean);

      // initial positions (safe - index checks)
      try {
        gsap.set(outerWrappers, { xPercent: 100 });
        gsap.set(innerWrappers, { xPercent: -100 });
        if (outerWrappers[0]) gsap.set(outerWrappers[0], { xPercent: 0 });
        if (innerWrappers[0]) gsap.set(innerWrappers[0], { xPercent: 0 });
      } catch (e) {
        // if GSAP complains about any elements, ignore to avoid throwing
        // console.warn("Initial GSAP set error", e);
      }

      function gotoSection(index, direction) {
        if (animatingRef.current) return;
        animatingRef.current = true;

        index = wrap(index);

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "expo.inOut" },
          onComplete: () => (animatingRef.current = false),
        });

        const currentIdx = indexRef.current;
        const currentSection = sections[currentIdx];
        const nextSection = sections[index];

        const heading = currentSection?.querySelector?.(".slide__heading") ?? null;
        const nextHeading = nextSection?.querySelector?.(".slide__heading") ?? null;

        // Only set DOM nodes that exist to avoid undefined zIndex errors
        try {
          // reset zIndex/visibility for sections and images safely
          gsap.set(allTargets, { zIndex: 0, autoAlpha: 0 });

          if (sections[currentIdx]) gsap.set(sections[currentIdx], { zIndex: 1, autoAlpha: 1 });
          if (slideImgs[index]) gsap.set(slideImgs[index], { zIndex: 1, autoAlpha: 1 });

          if (sections[index]) gsap.set(sections[index], { zIndex: 2, autoAlpha: 1 });
          if (slideImgs[currentIdx]) gsap.set(slideImgs[currentIdx], { zIndex: 2, autoAlpha: 1 });
        } catch (e) {
          // swallow to avoid crash; animation may be degraded
          // console.warn("safe gsap.set failed", e);
        }

        if (countEl) {
          try {
            tl.set(countEl, { text: index + 1 }, 0);
          } catch (e) {
            // ignore count text errors
          }
        }

        // Build animation using only existing elements
        try {
          const outerTarget = outerWrappers[index] || null;
          const innerTarget = innerWrappers[index] || null;
          const imageTarget = slideImgs[index] || null;
          const prevImageTarget = slideImgs[currentIdx] || null;

          if (outerTarget) tl.fromTo(outerTarget, { xPercent: 100 * direction }, { xPercent: 0 }, 0);
          if (innerTarget) tl.fromTo(innerTarget, { xPercent: -100 * direction }, { xPercent: 0 }, 0);
          if (heading) tl.to(heading, { xPercent: 30 * direction }, 0);
          if (nextHeading) tl.fromTo(nextHeading, { xPercent: -30 * direction }, { xPercent: 0 }, 0);
          if (imageTarget) tl.fromTo(imageTarget, { xPercent: 125 * direction, scale: 1.3 }, { xPercent: 0, scale: 1 }, 0);
          if (prevImageTarget) tl.fromTo(prevImageTarget, { xPercent: 0, scale: 1 }, { xPercent: -125 * direction, scale: 1.3 }, 0);
        } catch (e) {
          // animation building error - ensure we don't leave animatingRef stuck
          animatingRef.current = false;
        }

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
        if (autoTimerRef.current) {
          clearInterval(autoTimerRef.current);
          autoTimerRef.current = null;
        }
      }

      startAutoScroll();

      // create Observer and keep reference for cleanup
      const obs = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: 0.7,
        onUp: () => gotoSection(indexRef.current + 1, 1),
        onDown: () => gotoSection(indexRef.current - 1, -1),
      });
      observerRef.current = obs;

      // return cleanup for this context (stop auto scroll)
      return () => {
        stopAutoScroll();
        if (obs && typeof obs.kill === "function") {
          try {
            obs.kill();
          } catch (e) {
            // ignore
          }
        }
      };
    }, containerRef);

    return () => {
      // revert gsap context
      try {
        ctx.revert();
      } catch (_e) {}
      // kill observer if still present
      if (observerRef.current && typeof observerRef.current.kill === "function") {
        try {
          observerRef.current.kill();
        } catch (_e) {}
        observerRef.current = null;
      }
      // clear interval
      if (autoTimerRef.current) {
        clearInterval(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden font-[Montserrat]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />

      <div ref={containerRef} className="relative z-10 w-full h-screen">
        {slides.map((slide, i) => (
          <section key={i} className="slide absolute inset-0 w-full h-full">
            <div className="slide__outer w-full h-full overflow-hidden">
              <div className="slide__inner w-full h-full overflow-hidden">
                <div className="flex items-center justify-center h-full relative">
                  <h2 className="slide__heading text-white font-extrabold text-[clamp(1rem,5vw,5rem)] z-10">
                    {slide.title}
                  </h2>
                  <img
                    className="slide__img absolute inset-0 w-full h-full object-cover opacity-50"
                    src={slide.img}
                    alt=""
                    loading="lazy"
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
