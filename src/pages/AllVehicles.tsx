import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import ScrollIndicator from '../components/ScrollIndicator';
import SpotlightCursor from '../components/SpotlightCursor';
import ScrollReveal from '../components/ScrollReveal';
import { cars } from '../data/cars';

const AllVehicles = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCars, setFilteredCars] = useState(cars);

  // Filter categories
  const categories = ['All', 'Exotic', 'Sports', 'Luxury'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.category === category));
    }
  };

  return (
      <div className="min-h-screen bg-background text-foreground">
        <ScrollIndicator />
        <SpotlightCursor />
        <Navbar />

        <div className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-4 ">
              Our <span className=" text-blue-600">Premium</span> Fleet
            </h1>
            <p className="text-blue-600 text-center max-w-3xl mx-auto mb-12"> {/* Changed text-muted-foreground to text-blue-600 */}
              Choose from our selection of world-class vehicles, each offering unparalleled performance and luxury.
            </p>

            {/* Category Filter */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap gap-2 p-1 bg-secondary/50 backdrop-blur-sm rounded-full border border-border">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${
                            selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'text-foreground/70 hover:text-foreground'
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
                  <ScrollReveal key={car.id}>
                    <CarCard {...car} />
                  </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
  );
};

export default AllVehicles;
