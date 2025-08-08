import { useEffect } from "react";

const Countdown = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-900 bg-opacity-95">
      <style>
        {`
          @keyframes pulse-slow {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
        `}
      </style>
      <div className="relative bg-gradient-to-br from-green-500 to-emerald-700 p-2 rounded-2xl shadow-2xl max-w-lg w-full mx-4 animate-pulse-slow">
        <div className="bg-gray-800 bg-opacity-85 backdrop-blur-lg text-white rounded-xl p-8 border border-green-300 border-opacity-30 text-center shadow-inner">
          <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>

          <h1 className="text-4xl font-bold mb-4 tracking-wide text-green-100 drop-shadow-lg">
            Coming Soon
          </h1>

          <h2 className="text-2xl font-medium mb-6 text-green-200">Launch Event</h2>

          <p className="text-lg mb-4 font-light text-gray-100">
            We're launching on
          </p>

          <div className="text-2xl font-semibold mb-6 bg-green-800 py-3 px-6 rounded-lg shadow-md border border-green-400 border-opacity-40 inline-block">
            July 18, 2025
          </div>

          <p className="text-base font-light text-gray-200">
            Stay tuned for something{" "}
            <span className="italic text-green-300 font-medium">extraordinary</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;