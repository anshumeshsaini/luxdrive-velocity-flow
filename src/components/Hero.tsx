import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import car from '../Assests/car.png';
import WhyChooseUs from './WhyChooseus';

const cars = [
  {
    image: 'https://images.unsplash.com/photo-1606813909944-50d92b2f9889?auto=format&fit=crop&w=1400&q=80',
    name: 'Lamborghini Huracán',
  },
  {
    image: 'https://images.unsplash.com/photo-1617009523532-4aa803b8c8b9?auto=format&fit=crop&w=1400&q=80',
    name: 'BMW i8',
  },
  {
    image: 'https://images.unsplash.com/photo-1583267748388-9331870549e4?auto=format&fit=crop&w=1400&q=80',
    name: 'McLaren 720S',
  },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      document.querySelectorAll('.parallax').forEach((element) => {
        const speed = parseFloat((element as HTMLElement).dataset.speed || '0.5');
        (element as HTMLElement).style.transform = `translateY(${y * speed}px)`;
      });

      const index = Math.floor(y / 400) % cars.length;
      setActiveIndex(index);
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
      <>
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white z-10" />
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

          {/* Hero Section */}
          <section ref={heroRef} className="relative z-20 min-h-screen flex items-center text-black">
            <div className="w-1/2 h-full flex flex-col justify-center px-8 sm:px-12 lg:px-16">
              <h1 ref={headingRef} className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                Drive <span className="text-blue-600">Excellence</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-700">
                Experience the pinnacle of automotive luxury with our curated collection of high-performance vehicles.
              </p>
              <div className="flex space-x-4">
                <button
                    onClick={scrollToFleet}
                    className="group bg-blue-700 text-white hover:bg-blue-500 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(29,78,216,0.5)] flex items-center space-x-2"
                >
                  <span>Explore Fleet</span>
                  <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="relative overflow-hidden px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 group bg-blue-500 text-white">
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 border border-blue-700 group-hover:border-blue-500 rounded-full transition-colors" />
                  <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 bg-blue-700/10" />
                </button>
              </div>
            </div>

            {/* Car Image Parallax */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <img
                  src={car}
                  alt={cars[activeIndex]?.name || "Luxury Car"}
                  className="w-full h-full object-cover transition-all duration-1000 ease-out"
                  style={{
                    transform: `scale(${1 - scrollY * 0.0005})`,
                    opacity: Math.max(0, 1 - scrollY * 0.002),
                    filter: `brightness(${1 - scrollY * 0.001})`,
                    willChange: 'transform, opacity, filter',
                  }}
              />
            </div>
          </section>

          {/* Scroll Indicator */}
          <div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float cursor-pointer z-30"
              onClick={scrollToFleet}
          >
            <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2">
              <div className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Parallax Decorative Elements */}
          <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl parallax" data-speed="-0.2"></div>
          <div className="hidden md:block absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl parallax" data-speed="0.3"></div>
        </div>

        {/* Next Section */}
        <div>
          <WhyChooseUs />
        </div>
      </>
  );
};

export default Hero;
