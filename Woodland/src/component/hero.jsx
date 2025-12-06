import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(Observer, TextPlugin);

const slides = [
  {
    title: "SCROLL",
    img: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
    bg: "bg-[#6d597a]",
  },
  {
    title: "SWIPE",
    img: "https://images.unsplash.com/photo-1558603668-6570496b66f8",
    bg: "bg-[#355070]",
  },
  {
    title: "SCROLL",
    img: "https://images.unsplash.com/photo-1537165924986-cc3568f5d454",
    bg: "bg-[#b56576]",
  },
  {
    title: "SWIPE",
    img: "https://images.unsplash.com/photo-1589271243958-d61e12b61b97",
    bg: "bg-[#9a8c98]",
  },
];

const Hero = () => {
  const containerRef = useRef(null);
  const animatingRef = useRef(false);
  const indexRef = useRef(0);
  const autoTimerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".slide");
      const images = gsap.utils.toArray(".image").reverse();
      const slideImages = gsap.utils.toArray(".slide__img");
      const outerWrappers = gsap.utils.toArray(".slide__outer");
      const innerWrappers = gsap.utils.toArray(".slide__inner");
      const count = document.querySelector(".count");
      if (!sections.length || !images.length) return;

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

        count && tl.set(count, { text: index + 1 }, 0.3);

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

      // Auto-scroll
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

      const observer = Observer.create({
        target: containerRef.current,
        type: "wheel,touch,pointer",
        preventDefault: true,
        wheelSpeed: -1,
        onUp: () => {
          stopAutoScroll();
          gotoSection(indexRef.current + 1, 1);
          startAutoScroll();
        },
        onDown: () => {
          stopAutoScroll();
          gotoSection(indexRef.current - 1, -1);
          startAutoScroll();
        },
        tolerance: 15,
      });

      const keyHandler = (e) => {
        if (animatingRef.current) return;

        if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
          stopAutoScroll();
          gotoSection(indexRef.current - 1, -1);
          startAutoScroll();
        }

        if (
          e.code === "ArrowDown" ||
          e.code === "ArrowRight" ||
          e.code === "Space" ||
          e.code === "Enter"
        ) {
          stopAutoScroll();
          gotoSection(indexRef.current + 1, 1);
          startAutoScroll();
        }
      };

      window.addEventListener("keydown", keyHandler);

      return () => {
        stopAutoScroll();
        observer.kill();
        window.removeEventListener("keydown", keyHandler);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO SLIDES */}
      <div projects ref={containerRef}  className="relative w-full h-screen">
        {slides.map((slide, i) => (
          <section
            key={i}
            className={`slide absolute  inset-0 w-full h-full ${slide.bg} hidden`}
          >
            <div className="slide__outer w-full h-full overflow-hidden">
              <div className="slide__inner w-full h-full overflow-hidden">
                <div className="slide__content absolute w-full h-full flex items-center justify-center">
                  <div className="slide__container relative w-full max-w-[1400px] mx-auto h-[90vh] grid grid-cols-10 grid-rows-10 px-4">
                    <h2 className="slide__heading text-white font-extrabold text-[clamp(5rem,15vw,15rem)] col-span-8 row-span-2 self-end">
                      {slide.title}
                    </h2>
                    <figure className="slide__img-cont col-span-7 row-span-5 mt-16 overflow-hidden">
                      <img
                        className="slide__img w-full h-full object-cover"
                        src={slide.img}
                        alt=""
                      />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Overlay */}
        <section className="overlay mt-20 absolute inset-0 z-20">
          <div className="overlay__content relative w-full max-w-[1400px] mx-auto h-[90vh] grid grid-cols-10 grid-rows-10 px-4">
            <p className="overlay__count col-start-10 row-start-3 text-white text-right text-[clamp(3rem,4vw,15rem)]">
              0<span className="count">1</span>
            </p>
            <figure className="overlay__img-cont relative overflow-hidden col-span-8 row-span-6">
              {slides.map((slide, i) => (
                <img
                  key={i}
                  className="image absolute w-full h-full object-cover"
                  src={slide.img}
                  alt=""
                />
              ))}
            </figure>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
