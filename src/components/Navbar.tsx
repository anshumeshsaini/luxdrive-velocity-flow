
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-luxdrive-black/90 backdrop-blur-lg py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-extrabold ${scrolled ? 'text-luxdrive-white' : 'text-luxdrive-white'}`}>
              LUX<span className="text-luxdrive-blue">DRIVE</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="navbar-item">Home</Link>
            <div className="relative group">
              <button className="navbar-item flex items-center">
                Fleet <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-luxdrive-black/90 backdrop-blur-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10">
                <Link to="/fleet/sports" className="block px-4 py-2 text-sm text-white hover:bg-luxdrive-blue/20">Sports</Link>
                <Link to="/fleet/luxury" className="block px-4 py-2 text-sm text-white hover:bg-luxdrive-blue/20">Luxury</Link>
                <Link to="/fleet/exotic" className="block px-4 py-2 text-sm text-white hover:bg-luxdrive-blue/20">Exotic</Link>
              </div>
            </div>
            <Link to="/services" className="navbar-item">Services</Link>
            <Link to="/about" className="navbar-item">About</Link>
            <Link to="/contact" className="navbar-item">Contact</Link>
          </div>

          {/* Call to action */}
          <div className="hidden md:block">
            <button className="btn-luxury">Book Now</button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-luxdrive-black/95 backdrop-blur-xl overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? 'max-h-screen py-4' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-white py-2 border-b border-white/10">Home</Link>
          <div className="py-2 border-b border-white/10">
            <span className="text-white">Fleet</span>
            <div className="pl-4 mt-2 flex flex-col space-y-2">
              <Link to="/fleet/sports" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white">Sports</Link>
              <Link to="/fleet/luxury" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white">Luxury</Link>
              <Link to="/fleet/exotic" onClick={() => setMenuOpen(false)} className="text-white/80 hover:text-white">Exotic</Link>
            </div>
          </div>
          <Link to="/services" onClick={() => setMenuOpen(false)} className="text-white py-2 border-b border-white/10">Services</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-white py-2 border-b border-white/10">About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="text-white py-2 border-b border-white/10">Contact</Link>
          <button onClick={() => setMenuOpen(false)} className="btn-luxury self-start mt-2">Book Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
