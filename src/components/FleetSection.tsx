
import React, { useState, useEffect, useRef } from 'react';
import CarCard from './CarCard';

// Sample data for cars
const cars = [
  {
    id: 1,
    name: 'Lamborghini Aventador',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1526609606445-967998caf593?q=80&w=700&auto=format&fit=crop',
    price: 2500,
    rating: 4.9,
    transmission: 'Automatic',
    seats: 2,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-short-car-ignition-1541.mp3',
  },
  {
    id: 2,
    name: 'Porsche 911 GT3',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1611821064430-0d40291922bf?q=80&w=700&auto=format&fit=crop',
    price: 1800,
    rating: 4.8,
    transmission: 'Manual',
    seats: 2,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-sports-car-passing-by-1536.mp3',
  },
  {
    id: 3,
    name: 'Ferrari F8 Tributo',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=700&auto=format&fit=crop',
    price: 2200,
    rating: 4.9,
    transmission: 'Automatic',
    seats: 2,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-car-driving-on-gravel-1560.mp3',
  },
  {
    id: 4,
    name: 'Mercedes-AMG GT',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=700&auto=format&fit=crop',
    price: 1600,
    rating: 4.7,
    transmission: 'Automatic',
    seats: 2,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-car-engine-start-1566.mp3',
  },
  {
    id: 5,
    name: 'Aston Martin DBS',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=700&auto=format&fit=crop',
    price: 2100,
    rating: 4.8,
    transmission: 'Automatic',
    seats: 4,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-sports-car-passing-fast-1548.mp3',
  },
  {
    id: 6,
    name: 'McLaren 720S',
    category: 'Exotic',
    image: 'https://images.unsplash.com/photo-1568844293986-ca411d4d8b22?q=80&w=700&auto=format&fit=crop',
    price: 2300,
    rating: 4.9,
    transmission: 'Automatic',
    seats: 2,
    engineSound: 'https://assets.mixkit.co/sfx/preview/mixkit-car-acceleration-1539.mp3',
  },
];

// Filter categories
const categories = ['All', 'Exotic', 'Sports', 'Luxury'];

const FleetSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCars, setFilteredCars] = useState(cars);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter cars based on selected category
    if (selectedCategory === 'All') {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.category === selectedCategory));
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
    <div id="fleet" ref={sectionRef} className="py-20 bg-gradient-to-b from-luxdrive-black to-luxdrive-black/95">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">
          Our <span className="text-glow">Premium</span> Fleet
        </h2>
        <p className="text-luxdrive-silver text-center max-w-3xl mx-auto mb-12">
          Choose from our selection of world-class vehicles, each offering unparalleled performance and luxury.
        </p>
        
        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 p-1 bg-luxdrive-black/50 backdrop-blur-sm rounded-full border border-white/10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-luxdrive-blue text-white' 
                    : 'text-white/70 hover:text-white'
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
          <button className="btn-luxury">View All Vehicles</button>
        </div>
      </div>
    </div>
  );
};

export default FleetSection;
