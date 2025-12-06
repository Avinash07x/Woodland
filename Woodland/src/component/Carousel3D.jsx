import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

const Carousel3D = () => {
  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const radius = 242;
  const progress = useRef({ value: 0 });

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

    if (!carousel) return;

    // ✅ AUTO ROTATION (Infinite Loop)
    const autoRotate = gsap.to(progress.current, {
      value: 1,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });

    // ✅ USER CONTROL
    const observer = Observer.create({
      target: carousel,
      type: "wheel,pointer",
      onPress: () => {
        carousel.style.cursor = "grabbing";
        autoRotate.pause(); // user touch kare to auto stop
      },
      onRelease: () => {
        carousel.style.cursor = "grab";
        autoRotate.resume(); // chhodte hi auto resume
      },
      onChange: (self) => {
        gsap.killTweensOf(progress.current);
        const delta =
          self.event.type === "wheel"
            ? self.deltaY * -0.0005
            : self.deltaX * 0.05;

        gsap.to(progress.current, {
          value: `+=${delta}`,
          duration: 1,
          ease: "power3.out",
        });
      },
    });

    // ✅ POSITION UPDATE LOOP
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
    <div
      ref={carouselRef}
      className="w-full h-screen relative flex justify-center items-center select-none cursor-grab perspective-[800px]"
      style={{ transform: "rotateX(-18deg) translateY(-60px)" }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          ref={(el) => (imagesRef.current[i] = el)}
          className="absolute w-[800px] h-[400px] flex justify-center items-center origin-center"
        >
          <img
            src={src}
            alt={`slide-${i}`}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel3D;
