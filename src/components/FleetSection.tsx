import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';
import { cars } from '../data/cars';

// Filter categories
const categories = ['All', 'Exotic', 'Sports', 'Luxury'];

const FleetSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCars, setFilteredCars] = useState(cars.slice(0, 6));
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter cars based on selected category
    if (selectedCategory === 'All') {
      setFilteredCars(cars.slice(0, 6));
    } else {
      const filtered = cars.filter(car => car.category === selectedCategory);
      setFilteredCars(filtered.slice(0, 6));
    }
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards when they enter the viewport
            const timer = setTimeout(() => {
              setAnimatedCards(cars.map(car => car.id));
            }, 200);
            
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div id="fleet" ref={sectionRef} className="relative py-20 bg-white">
      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50"></div>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-blue-600">
          Our Premium Fleet
        </h2>
        <p className="text-blue-600 text-center max-w-3xl mx-auto mb-12">
          Choose from our selection of world-class vehicles, each offering unparalleled performance and luxury.
        </p>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-1 bg-white backdrop-blur-sm rounded-full border border-border">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div 
              key={car.id} 
              className={`transform transition-all duration-700 ${
                animatedCards.includes(car.id) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${(car.id % 3) * 0.1}s` }}
            >
              <CarCard {...car} />
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/all-vehicles" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition-all">
            View All Vehicles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FleetSection;
