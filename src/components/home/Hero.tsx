import React, { useEffect, useState } from 'react';
import { fadeInUp, fadeIn, staggerChildren } from '../../utils/animation';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-purple-50">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className={`${isVisible ? fadeInUp : 'opacity-0'}`}>
              <h1 className="text-3xl sm:text-4xl tracking-tight font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
                <span className="block">Empowering Growth Through</span>
                <span className="block text-purple-600">Understanding & Support</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
                Specialized therapy services tailored for individuals with special needs, fostering independence, confidence, and meaningful connections. Based in Western GTA in Ontario, Canada.
              </p>
            </div>
            <div className={`mt-5 sm:flex sm:justify-start md:mt-8 ${isVisible ? fadeIn : 'opacity-0'}`} {...staggerChildren(1)}>
              <div className="rounded-md shadow">
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors md:py-4 md:text-lg md:px-10"
                >
                  Get Started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#services"
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-gray-50 transition-colors md:py-4 md:text-lg md:px-10"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className={`mt-12 lg:mt-0 lg:col-span-6 ${isVisible ? fadeIn : 'opacity-0'}`} {...staggerChildren(2)}>
            <div className="relative rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
              <img
                src="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?auto=format&fit=crop&q=80"
                alt="Supportive Environment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}