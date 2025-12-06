import { useEffect, useRef } from "react";

export default function TubesCursor() {
  const canvasRef = useRef(null);

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

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
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

  return (
    <div className="relative w-full h-screen overflow-hidden font-[Montserrat]">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
      />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-3">
        <h1 className="text-white text-[80px] font-bold uppercase drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
          Woodland
        </h1>
      </div>
    </div>
  );
}
