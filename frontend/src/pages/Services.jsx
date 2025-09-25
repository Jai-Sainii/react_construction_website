import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const [services, setServices] = useState([]);
  const servicesRef = useRef();

  // Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services'); // Replace with your backend URL
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (servicesRef.current) {
      gsap.fromTo(
        servicesRef.current.querySelectorAll('.service-card'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [services]); // re-run animation when services data updates

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive construction solutions designed to bring your vision to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">
                Loading services...
              </p>
            ) : (
              services.map((service) => (
                <motion.div
                  key={service._id} // MongoDB id
                  className="service-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                      <div className="w-8 h-8 bg-orange-500 rounded" />
                    </div>

                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="text-orange-500 font-bold text-2xl mb-6">
                      {service.price}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center justify-center space-x-2"
                    >
                      <span>Get Quote</span>
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose BuildCraft?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver exceptional results through expertise, innovation, and unwavering commitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Expert Team',
                description: 'Skilled professionals with years of experience',
                icon: '👷‍♂️'
              },
              {
                title: 'Quality Materials',
                description: 'Premium materials for lasting durability',
                icon: '🏗️'
              },
              {
                title: 'On-Time Delivery',
                description: 'Projects completed within agreed timelines',
                icon: '⏰'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support',
                icon: '🛠️'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
