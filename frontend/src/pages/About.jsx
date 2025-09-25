import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Users, Clock, Target, Mail, Linkedin } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [team, setTeam] = useState([]);
  const teamRef = useRef();
  const valuesRef = useRef();
  const navigate = useNavigate();

  // Fetch team members from backend
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/team'); // replace with your backend URL
        setTeam(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };
    fetchTeam();
  }, []);

  // GSAP animations
  useEffect(() => {
    if (teamRef.current) {
      gsap.fromTo(
        teamRef.current.querySelectorAll('.team-card'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: teamRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.querySelectorAll('.value-item'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [team]); // re-run animation when team data updates

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project we undertake'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together with clients to achieve shared goals'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Embracing new technologies and construction methods'
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'Delivering projects on time and within budget'
    }
  ];

  const handleClick = () => {
    navigate("/contact"); 
  };

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
              About BuildCraft
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building tomorrow with the expertise of today. We are a team of dedicated professionals
              committed to delivering exceptional construction solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2008, BuildCraft has grown from a small local contractor to a leading 
                construction company serving clients across the region. Our journey began with a 
                simple mission: to build structures that stand the test of time while exceeding 
                our clients' expectations.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Over the years, we've completed hundreds of projects, from custom homes to 
                large-scale commercial developments. Our success is built on the foundation of 
                quality craftsmanship, innovative solutions, and unwavering commitment to our clients.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
                  <div className="text-gray-600">Years of Experience</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Construction site"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="value-item text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The skilled professionals behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.length === 0 ? (
              <p className="text-center text-gray-500 col-span-full">Loading team members...</p>
            ) : (
              team.map((member) => (
                <motion.div
                  key={member._id}
                  className="team-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-gray-200">{member.position}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{member.bio}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <Mail className="h-5 w-5" />
                      </button>
                      <button className="text-gray-400 hover:text-orange-500 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Join Our Team
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We're always looking for talented professionals who share our passion for excellence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Open Positions
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
