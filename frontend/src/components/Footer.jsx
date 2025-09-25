import React from 'react';
import { Link } from 'react-router-dom';
import { HardHat, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <HardHat className="h-8 w-8 text-orange-500" />
              <span className="font-bold text-xl">BuildCraft</span>
            </div>
            <p className="text-gray-300 mb-4">
              Building dreams into reality with precision, quality, and innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-orange-500 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-orange-500 transition-colors">Projects</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Residential Construction</span></li>
              <li><span className="text-gray-300">Commercial Construction</span></li>
              <li><span className="text-gray-300">Infrastructure Development</span></li>
              <li><span className="text-gray-300">Renovation & Remodeling</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">Sikar( Rajasthan ), India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">+91 93_______</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">builderdelhi@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} BuildCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;