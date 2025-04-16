
import React, { useEffect, useState, useRef } from 'react';

interface Car {
  id: number;
  name: string;
  image: string;
  speed: number;
  horsepower: number;
  price: number;
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Lamborghini Aventador',
    image: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    speed: 350,
    horsepower: 740,
    price: 2500,
  },
  {
    id: 2,
    name: 'McLaren 720S',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    speed: 341,
    horsepower: 720,
    price: 2200,
  },
  {
    id: 3,
    name: 'Ferrari SF90 Stradale',
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    speed: 340,
    horsepower: 1000,
    price: 3500,
  },
];

const CarReveal: React.FC = () => {
  const [animatedCars, setAnimatedCars] = useState<number[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: { current: number, target: number } }>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize counts for animation
    const initialCounts: { [key: string]: { current: number, target: number } } = {};
    cars.forEach(car => {
      initialCounts[`${car.id}-speed`] = { current: 0, target: car.speed };
      initialCounts[`${car.id}-horsepower`] = { current: 0, target: car.horsepower };
      initialCounts[`${car.id}-price`] = { current: 0, target: car.price };
    });
    setCounts(initialCounts);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when section is visible
            animateCountUp();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Observe each car element for animation
    cars.forEach((car) => {
      const carElement = document.getElementById(`car-${car.id}`);
      if (carElement) {
        const carObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setAnimatedCars((prev) => 
                  prev.includes(car.id) ? prev : [...prev, car.id]
                );
              }
            });
          },
          { threshold: 0.3 }
        );
        
        carObserver.observe(carElement);
      }
    });

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      cars.forEach((car) => {
        const carElement = document.getElementById(`car-${car.id}`);
        if (carElement) {
          observer.unobserve(carElement);
        }
      });
    };
  }, []);

  const animateCountUp = () => {
    const updatedCounts = { ...counts };
    let anyUpdated = false;

    Object.keys(counts).forEach((key) => {
      const count = updatedCounts[key];
      if (count.current < count.target) {
        const increment = Math.ceil(count.target / 50);
        const newValue = Math.min(count.current + increment, count.target);
        
        if (newValue !== count.current) {
          updatedCounts[key] = { ...count, current: newValue };
          anyUpdated = true;
        }
      }
    });

    if (anyUpdated) {
      setCounts(updatedCounts);
      requestAnimationFrame(animateCountUp);
    }
  };

  return (
    <div ref={sectionRef} id="carReveal" className="py-20 bg-luxdrive-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Exceptional <span className="text-glow">Performance</span>
        </h2>
        
        <div className="space-y-40">
          {cars.map((car, index) => (
            <div 
              id={`car-${car.id}`}
              key={car.id} 
              className={`flex flex-col md:flex-row items-center justify-between gap-10 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Car Image */}
              <div 
                className={`w-full md:w-1/2 overflow-hidden rounded-xl ${
                  animatedCars.includes(car.id) ? 
                    index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right' 
                    : 'opacity-0'
                }`}
                style={{ 
                  transformOrigin: index % 2 === 0 ? 'left' : 'right',
                }}
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-[300px] md:h-[500px] object-cover rounded-xl transform transition-transform duration-700 hover:scale-105"
                />
              </div>
              
              {/* Car Stats */}
              <div 
                className={`w-full md:w-1/2 ${
                  animatedCars.includes(car.id) ? 'animate-fade-in' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">{car.name}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="glass-card p-6 rounded-xl">
                    <div className="text-luxdrive-silver mb-2">Top Speed</div>
                    <div className="text-4xl font-bold text-white flex items-baseline">
                      <span>{counts[`${car.id}-speed`]?.current || 0}</span>
                      <span className="text-lg ml-1 text-luxdrive-blue">km/h</span>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <div className="text-luxdrive-silver mb-2">Horsepower</div>
                    <div className="text-4xl font-bold text-white flex items-baseline">
                      <span>{counts[`${car.id}-horsepower`]?.current || 0}</span>
                      <span className="text-lg ml-1 text-luxdrive-blue">hp</span>
                    </div>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl">
                    <div className="text-luxdrive-silver mb-2">Rental Price</div>
                    <div className="text-4xl font-bold text-white flex items-baseline">
                      <span>${counts[`${car.id}-price`]?.current || 0}</span>
                      <span className="text-lg ml-1 text-luxdrive-blue">/day</span>
                    </div>
                  </div>
                </div>
                
                <button className="btn-luxury mt-8">Reserve Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarReveal;
