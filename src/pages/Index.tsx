
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FleetSection from '../components/FleetSection';

import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';
import ScrollIndicator from '../components/ScrollIndicator';
import SpotlightCursor from '../components/SpotlightCursor';
import ScrollReveal from '../components/ScrollReveal';

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = 'LUXDRIVE | Premium Luxury Car Rentals';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Add scroll reveal functionality
    const handleScroll = () => {
      const sections = document.querySelectorAll('.reveal');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;
        
        if (sectionTop < triggerPoint) {
          section.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check for elements already in view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-luxdrive-black text-white">
      <ScrollIndicator />
      <SpotlightCursor />
      <Navbar />
      <Hero />
      
      <ScrollReveal>
      </ScrollReveal>
      
      <ScrollReveal delay={200}>
        <FleetSection />
      </ScrollReveal>
      
      <ScrollReveal delay={300}>

      </ScrollReveal>
      
      <ScrollReveal delay={400}>
        <TestimonialsSection />
      </ScrollReveal>
      
      <Footer />
    </div>
  );
};

export default Index;
