import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-blue-800 to-blue-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 opacity-20 animate-pulse"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and brief description */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-extrabold text-white tracking-wide">
                LUX<span className="text-yellow-400">DRIVE</span>
              </span>
            </Link>
            <p className="text-gray-300 mt-4">
              Experience unparalleled luxury and performance with our premium fleet of vehicles. Your journey to extraordinary begins here.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-transform transform hover:scale-110">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-transform transform hover:scale-110">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-transform transform hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-transform transform hover:scale-110">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/fleet" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-transform duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="text-yellow-400 mr-3 mt-1" />
                <span className="text-gray-300">+1 (800) LUXDRIVE</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-yellow-400 mr-3 mt-1" />
                <span className="text-gray-300">info@luxdrive.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-yellow-400 mr-3 mt-1" />
                <span className="text-gray-300">
                  123 Luxury Avenue, Beverly Hills, CA 90210, United States
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-yellow-400 font-bold text-xl mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/10 border border-yellow-400 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-yellow-400 text-black py-3 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} LUXDRIVE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-yellow-400 text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-yellow-400 text-sm">
              Terms of Service
            </Link>
            <Link to="/cookie" className="text-gray-300 hover:text-yellow-400 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="fixed bottom-5 right-5 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition-transform transform hover:scale-110"
          aria-label="Back to Top"
        >
          ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;
