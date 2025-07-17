import React, { useEffect, useState } from 'react';
import { CheckCircle2, Sparkles, Trophy, Gift } from 'lucide-react';

const SuccessMessage = ({ message, onClose, redirectPath }) => {
  const [confetti, setConfetti] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Create confetti particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 4,
        speedY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.5 ? 'square' : 'circle'
      });
    }
    setConfetti(particles);

    // Show message with delay
    setTimeout(() => setShowMessage(true), 300);

    // Animate confetti
    const animateConfetti = () => {
      setConfetti(prevConfetti => 
        prevConfetti.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          rotation: particle.rotation + particle.rotationSpeed,
          speedY: particle.speedY + 0.1, // gravity
          opacity: particle.y > window.innerHeight ? 0 : particle.opacity - 0.005
        })).filter(particle => particle.opacity > 0)
      );
    };

    const interval = setInterval(animateConfetti, 16);

    // Auto redirect after 3 seconds
    const redirectTimeout = setTimeout(() => {
      if (onClose) onClose();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimeout);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Confetti */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : '2px',
            zIndex: 1000
          }}
        />
      ))}

      {/* Success Message */}
      <div className={`bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center transform transition-all duration-500 ${
        showMessage ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        {/* Success Icon with Animation */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          {/* Sparkle effects around the icon */}
          <div className="absolute -top-2 -right-2 animate-pulse">
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse delay-300">
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <div className="absolute top-0 left-0 animate-pulse delay-500">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600 mb-6">
          {message || 'Your application has been submitted successfully!'}
        </p>

        {/* Celebration Icons */}
        <div className="flex justify-center space-x-4 mb-6">
          <div className="animate-bounce delay-100">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="animate-bounce delay-200">
            <Gift className="w-6 h-6 text-green-500" />
          </div>
          <div className="animate-bounce delay-300">
            <Sparkles className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="text-sm text-gray-500 mb-4">
          Redirecting to your applications...
        </div>
        
        {/* Loading bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-600 h-2 rounded-full loading-bar"></div>
        </div>

        {/* Manual redirect button */}
        <button
          onClick={onClose}
          className="mt-4 text-green-600 hover:text-green-700 text-sm font-medium transition-colors"
        >
          Continue →
        </button>
      </div>

      <style>
        {`
          .loading-bar {
            animation: loadingBar 3s linear;
            animation-fill-mode: forwards;
          }
          
          @keyframes loadingBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default SuccessMessage; 