import React, { useEffect, useState } from 'react';
import { Heart, Users, Brain, Calendar } from 'lucide-react';
import { scaleIn, staggerChildren } from '../../utils/animation';

const services = [
  {
    title: 'Individual Therapy',
    description: 'Personalized sessions focused on individual growth and development.',
    icon: Heart,
  },
  {
    title: 'Group Sessions',
    description: 'Safe spaces for social interaction and peer support.',
    icon: Users,
  },
  {
    title: 'Cognitive Development',
    description: 'Programs to enhance learning and cognitive abilities.',
    icon: Brain,
  },
  {
    title: 'Flexible Scheduling',
    description: 'Convenient appointment times that work for you.',
    icon: Calendar,
  },
];

export function Services() {
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

    const element = document.getElementById('services');
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
    <div id="services" className="py-12 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isVisible ? scaleIn : 'opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500">
            Comprehensive support tailored to individual needs and goals
          </p>
        </div>

        <div className="mt-12 sm:mt-20 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`pt-6 ${isVisible ? scaleIn : 'opacity-0'}`}
              {...staggerChildren(index)}
            >
              <div className="flow-root bg-gray-50 rounded-lg px-4 sm:px-6 pb-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-md shadow-lg animate-float">
                      <service.icon className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}