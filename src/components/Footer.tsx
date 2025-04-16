
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-luxdrive-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and brief description */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-white">
                LUX<span className="text-luxdrive-blue">DRIVE</span>
              </span>
            </Link>
            <p className="text-luxdrive-silver mt-4">
              Experience unparalleled luxury and performance with our premium fleet of vehicles. Your journey to extraordinary begins here.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-luxdrive-blue hover:text-white transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-luxdrive-blue hover:text-white transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-luxdrive-blue hover:text-white transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-luxdrive-blue hover:text-white transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/fleet" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-luxdrive-silver hover:text-white hover:pl-2 transition-all duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="text-luxdrive-blue mr-3 mt-1" />
                <span className="text-luxdrive-silver">+1 (800) LUXDRIVE</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-luxdrive-blue mr-3 mt-1" />
                <span className="text-luxdrive-silver">info@luxdrive.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-luxdrive-blue mr-3 mt-1" />
                <span className="text-luxdrive-silver">
                  123 Luxury Avenue, Beverly Hills, CA 90210, United States
                </span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Newsletter</h3>
            <p className="text-luxdrive-silver mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-luxdrive-blue/50 transition-all duration-300"
                />
              </div>
              <button 
                type="submit" 
                className="w-full btn-luxury py-3"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-luxdrive-silver text-sm">
            &copy; {new Date().getFullYear()} LUXDRIVE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-luxdrive-silver hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-luxdrive-silver hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/cookie" className="text-luxdrive-silver hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
