import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Johnson',
    position: 'CEO, Johnson Enterprises',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'LUXDRIVE exceeded all my expectations. The Lamborghini Aventador was immaculate, and the service was impeccable. I\'ll definitely be back for my next business trip.',
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    position: 'Fashion Designer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: 'Renting the McLaren from LUXDRIVE made my weekend unforgettable. From booking to drop-off, everything was seamless and professional. The car was a dream to drive!',
  },
  {
    id: 3,
    name: 'David Chen',
    position: 'Tech Entrepreneur',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 4,
    text: 'As someone who appreciates fine engineering, I was blown away by the Ferrari F8 from LUXDRIVE. The team went above and beyond to ensure I had all I needed for a perfect drive.',
  },
  {
    id: 4,
    name: 'Sophia Martinez',
    position: 'Travel Influencer',
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    rating: 5,
    text: 'My followers couldn\'t get enough of the Aston Martin I rented from LUXDRIVE. The car was spotless, the process was effortless, and the staff was incredibly helpful.',
  },
  {
    id: 5,
    name: 'James Wilson',
    position: 'Executive Director',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    text: 'LUXDRIVE is my go-to for all luxury car rentals. Their fleet is always in pristine condition, and their service is consistently top-notch. Highly recommended!',
  },
];

const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setActiveIndex(index);
    // Pause autoplay temporarily when manually navigating
    setAutoplay(false);
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    // Resume autoplay after 5 seconds
    const timer = setTimeout(() => setAutoplay(true), 5000);
    autoplayTimerRef.current = timer;
  };

  // Set up autoplay
  useEffect(() => {
    if (autoplay) {
      const timer = setTimeout(() => {
        nextTestimonial();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [activeIndex, autoplay]);

  // Clean up timers
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            What Our <span className="text-glow">Clients</span> Say
          </h2>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="glass-card rounded-2xl p-8 md:p-12 bg-white shadow-lg">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-24 h-24 rounded-full object-cover border-4 border-luxdrive-blue/30"
                        />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'fill-luxdrive-gold text-luxdrive-gold' : 'text-gray-400'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-blue-600 mb-6 italic text-lg">"{testimonial.text}"</p>
                        <div>
                          <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                          <p className="text-luxdrive-blue">{testimonial.position}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-5 md:-translate-x-12 bg-luxdrive-black/50 backdrop-blur-sm hover:bg-luxdrive-blue text-white rounded-full p-3 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-5 md:translate-x-12 bg-luxdrive-black/50 backdrop-blur-sm hover:bg-luxdrive-blue text-white rounded-full p-3 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goToTestimonial(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-luxdrive-blue w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
