
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxElements = document.querySelectorAll('.parallax');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
        (element as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFleet = () => {
    const fleetSection = document.getElementById('fleet');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-luxdrive-black/70 via-luxdrive-black/60 to-luxdrive-black/90 z-10"></div>
        <video 
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-driving-through-a-mountain-road-at-night-48695-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="typewriter-container max-w-4xl mx-auto">
          <h1 
            ref={headingRef} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-glow">Drive into the Future</span>
          </h1>
          <p className="text-luxdrive-silver text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            Experience luxury redefined. Exclusive vehicles for those who demand excellence.
          </p>
        </div>
        
        <div className="animate-fade-in opacity-0" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
          <button 
            onClick={scrollToFleet}
            className="btn-luxury group flex items-center mx-auto"
          >
            Explore Fleet
            <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float cursor-pointer"
        onClick={scrollToFleet}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2">
          <div className="w-1 h-3 bg-luxdrive-blue rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Particles or design elements */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 bg-luxdrive-blue/10 rounded-full blur-3xl parallax" data-speed="-0.2"></div>
      <div className="hidden md:block absolute bottom-1/3 right-1/4 w-96 h-96 bg-luxdrive-blue/5 rounded-full blur-3xl parallax" data-speed="0.3"></div>
    </div>
  );
};

export default Hero;
