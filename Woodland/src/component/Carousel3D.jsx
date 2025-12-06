import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const Carousel3D = () => {
  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const progress = useRef({ value: 0 });

  const radius = 300;

  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1494526585095-c41746248156",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5",
  ];

  const imagesCount = images.length;

  useEffect(() => {
    const carousel = carouselRef.current;
    const imgs = imagesRef.current;

    if (!carousel || !imgs.length) return;

    // ✅ AUTO ROTATION (INFINITE)
    const autoRotate = gsap.to(progress.current, {
      value: 1,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });

    // ✅ USER CONTROL
    const observer = Observer.create({
      target: carousel,
      type: "wheel,pointer,touch",
      preventDefault: true,
      onPress: () => {
        carousel.style.cursor = "grabbing";
        autoRotate.pause();
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
        autoRotate.resume();
      },
      onChange: (self) => {
        const delta =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.0005;

        gsap.to(progress.current, {
          value: `+=${delta}`,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    // ✅ ANIMATION LOOP
    const animate = () => {
      imgs.forEach((img, idx) => {
        const theta = idx / imagesCount - progress.current.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const z = Math.cos(theta * Math.PI * 2) * radius;
        const rotateY = 360 * -theta;

        img.style.transform = `
          translate3d(${x}px, 0px, ${z}px)
          rotateY(${rotateY}deg)
        `;
      });
    };

    gsap.ticker.add(animate);

    return () => {
      observer.kill();
      autoRotate.kill();
      gsap.ticker.remove(animate);
    };
  }, [imagesCount]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      <div
        ref={carouselRef}
        className="relative w-full h-full flex justify-center items-center cursor-grab select-none perspective-[1000px]"
        style={{ transform: "rotateX(-15deg) translateY(-40px)" }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            className="absolute w-[700px] h-[380px] md:w-[800px] md:h-[420px] flex justify-center items-center"
          >
            <img
              src={src}
              alt={`slide-${i}`}
              draggable={false}
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Carousel3D;
