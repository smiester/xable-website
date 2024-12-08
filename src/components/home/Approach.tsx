import React, { useEffect, useState } from 'react';
import { fadeIn, staggerChildren } from '../../utils/animation';
import { IMAGES } from '../../constants/images';

export function Approach() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('approach');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="approach" className="bg-purple-50 py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`lg:text-center ${isVisible ? fadeIn : 'opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Therapeutic Approach
          </h2>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 lg:mx-auto">
            We believe in creating a supportive environment that celebrates diversity and promotes personal growth.
          </p>
        </div>

        <div className="mt-12 sm:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:gap-12 lg:grid-cols-3">
            {[
              {
                image: IMAGES.approach.personCentered,
                title: "Person-Centered Care",
                description: "Every individual is unique. We tailor our approach to match your specific needs, strengths, and goals."
              },
              {
                image: IMAGES.approach.evidenceBased,
                title: "Evidence-Based Methods",
                description: "Our practices are grounded in research and proven therapeutic techniques, ensuring effective support."
              },
              {
                image: IMAGES.approach.collaborative,
                title: "Collaborative Growth",
                description: "We work together with clients and families to create meaningful progress and lasting positive change."
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                  isVisible ? fadeIn : 'opacity-0'
                }`}
                {...staggerChildren(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="px-4 sm:px-6 py-8">
                  <h3 className="text-lg font-medium text-purple-600">{item.title}</h3>
                  <p className="mt-4 text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}