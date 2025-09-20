import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AmazonCalculator from "./AmazonCalculator";
import FlipkartCalculator from "./FlipkartCalculator";
import MeeshoCalculator from "./MeeshoCalculator";
import JioMartCalculator from "./JioMartCalculator";
import SwiggyCalculator from "./SwiggyCalculator";
import ZomatoCalculator from "./ZomatoCalculator";

const ProfitCalculator = () => {
  const [activeCalculator, setActiveCalculator] = useState("amazon");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderCalculator = () => {
    switch (activeCalculator) {
      case "amazon":
        return <AmazonCalculator />;
      case "flipkart":
        return <FlipkartCalculator />;
      case "meesho":
        return <MeeshoCalculator />;
      case "jiomart":
        return <JioMartCalculator />;
      case "swiggy":
        return <SwiggyCalculator />;
      case "zomato":
        return <ZomatoCalculator />;
      default:
        return <AmazonCalculator />;
    }
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-gradient-to-br from-green-50 to-white"
    >
      <article>
        <header className="pt-24 pb-16 px-4 sm:px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              E-Commerce <span className="text-green-600">Profit</span>{" "}
              Calculators
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Calculate your profit margins across different e-commerce
              platforms
            </p>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>
              Note: The provided calculation is an approximation only. Actual
              results may differ due to external factors such as market
              fluctuations or operational variables.
            </p>
          </div>
        </header>

        <section className="py-8 px-4 sm:px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
              <button
                onClick={() => setActiveCalculator("amazon")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "amazon"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Amazon Calculator
              </button>

              <button
                onClick={() => setActiveCalculator("flipkart")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "flipkart"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Flipkart Calculator
              </button>

              <button
                onClick={() => setActiveCalculator("meesho")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "meesho"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Meesho Calculator
              </button>

              <button
                onClick={() => setActiveCalculator("jiomart")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "jiomart"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                JioMart Calculator
              </button>

              <button
                onClick={() => setActiveCalculator("swiggy")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "swiggy"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Swiggy Calculator
              </button>

              <button
                onClick={() => setActiveCalculator("zomato")}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors ${
                  activeCalculator === "zomato"
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Zomato Calculator
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-8">
              {renderCalculator()}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProfitCalculator;
