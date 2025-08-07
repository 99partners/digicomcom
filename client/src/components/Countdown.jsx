import { useEffect } from "react";

const Countdown = () => {
  useEffect(() => {
    // Add blur effect to everything except the countdown card
    document.body.style.filter = "blur(px)";
    // document.body.style.overflow = "hidden";

    return () => {
      document.body.style.filter = "none";
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div
        className="relative bg-gradient-to-br from-red-500 to-red-700 p-1 rounded-3xl shadow-2xl animate-fade-in max-w-2xl w-full mx-4"
        style={{ filter: "none" }}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-md text-white rounded-3xl p-10 border border-white border-opacity-30 text-center shadow-inner">
          <div className="absolute top-4 right-4 w-3 h-3 bg-red-300 rounded-full animate-ping"></div>

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight drop-shadow">
            🎉 Coming Soon!
          </h1>

          <h2 className="text-3xl font-semibold mb-6">🚀 Launch Event</h2>

          <p className="text-xl mb-4 font-light">We're launching on</p>

          <div className="text-3xl font-bold mb-6 bg-red-800 py-4 px-6 rounded-xl shadow-lg border-2 border-white border-opacity-20 inline-block">
            📅 July 18, 2025
          </div>

          <p className="text-lg font-light">
            Stay tuned for something{" "}
            <span className="italic text-yellow-300">amazing</span>!
          </p>

          <div className="mt-8"></div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
