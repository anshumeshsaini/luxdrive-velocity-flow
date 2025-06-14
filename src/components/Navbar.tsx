import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../Assests/Screenshot_2025-04-13_at_10.31.11_PM-removebg-preview.png'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent px-4 py-2"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div>

        </div>
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold text-blue-600">
              LUX<span className="text-blue-600">DRIVE</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="navbar-item text-blue-600">Home</Link>
            <div className="relative group">
              <button className="navbar-item flex items-center text-blue-600">
                Fleet <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-luxdrive-black/90 backdrop-blur-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-white/10">
                <Link to="/fleet/sports" className="block px-4 py-2 text-sm text-blue-600 hover:bg-luxdrive-blue/20">Sports</Link>
                <Link to="/fleet/luxury" className="block px-4 py-2 text-sm text-blue-600 hover:bg-luxdrive-blue/20">Luxury</Link>
                <Link to="/fleet/exotic" className="block px-4 py-2 text-sm text-blue-600 hover:bg-luxdrive-blue/20">Exotic</Link>
              </div>
            </div>
            <Link to="/services" className="navbar-item text-blue-600">Services</Link>
            <Link to="/about" className="navbar-item text-blue-600">About</Link>
            <Link to="/contact" className="navbar-item text-blue-600">Contact</Link>
          </div>

          {/* Call to action */}
          <div className="hidden md:block text-blue-600">
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
        className={`md:hidden bg-black-700 overflow-hidden transition-all duration-500 ease-in-out ${
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
          <button onClick={() => setMenuOpen(false)} className="btn-luxury self-start text-blue-600 mt-2">Book Now</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
