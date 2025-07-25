import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const ImageSlider = ({ slides, height = "400px" }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const totalSlides = slides.length;

    const handlePrev = () => {
        setCurrentStep((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleNext = () => {
        setCurrentStep((prev) => (prev + 1) % totalSlides);
    };

    const getSlideIndex = (offset) => {
        return (currentStep + offset + totalSlides) % totalSlides;
    };

    return (
        <div className="relative overflow-hidden w-full" style={{ height }}>
            <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-30"
                aria-label="Previous slide"
            >
                <ArrowRight className="h-6 w-6 rotate-180" />
            </button>

            <div className="absolute inset-0 flex justify-center items-center">
                {slides.map((slide, index) => {
                    const position = index - currentStep;
                    const isCenter = index === currentStep;
                    const isAdjacent = Math.abs(position) === 1 || 
                                     (position === -(totalSlides - 1)) || 
                                     (position === (totalSlides - 1));
                    
                    if (!isCenter && !isAdjacent) return null;

                    let translateX = '0%';
                    if (position === 1 || position === -(totalSlides - 1)) {
                        translateX = '110%';
                    } else if (position === -1 || position === (totalSlides - 1)) {
                        translateX = '-110%';
                    }

                    return (
                        <div
                            key={index}
                            className={`absolute transition-all duration-500 ease-in-out transform ${
                                isCenter ? 'z-20 scale-100 opacity-100' :
                                isAdjacent ? 'z-10 scale-65 opacity-75' : 'opacity-0'
                            }`}
                            style={{
                                transform: `translateX(${translateX}) scale(${isCenter ? 1 : 0.65})`,
                            }}
                        >
                            <div className="relative">
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className={`rounded-lg shadow-lg object-contain ${
                                        isCenter ? 'max-h-64 sm:max-h-96 w-auto' : 'max-h-40 sm:max-h-64 w-auto'
                                    }`}
                                    onError={(e) => {
                                        console.error(`Failed to load image: ${slide.src}`);
                                        e.target.src = "/assets/fallback.png";
                                    }}
                                />
                                {isCenter && slide.title && (
                                    <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-white bg-opacity-90 p-2 sm:p-4 rounded-lg text-center">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">{slide.title}</h3>
                                        {slide.description && (
                                            <p className="text-gray-600 text-xs sm:text-sm mt-1">{slide.description}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-30"
                aria-label="Next slide"
            >
                <ArrowRight className="h-6 w-6" />
            </button>

            {/* Navigation dots */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStep ? 'bg-green-600 w-4' : 'bg-green-300'
                        }`}
                        onClick={() => setCurrentStep(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;