import React, { useEffect, useState } from 'react';
import { Award, BookOpen, Heart, Users } from 'lucide-react';
import { fadeIn, staggerChildren } from '../../utils/animation';
import { IMAGES } from '../../constants/images';

const qualifications = [
  { icon: Award, text: 'M.Sc., M.B.A., B.C.B.A., R.B.A (Ont.)' },
  { icon: BookOpen, text: 'OAP Registered Provider' },
  { icon: Heart, text: '10+ Years of Experience' },
  { icon: Users, text: 'Specialized in Ages 2-16' },
];

export function Team() {
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

    const element = document.getElementById('team');
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
    <div id="team" className="bg-white py-12 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center ${isVisible ? fadeIn : 'opacity-0'}`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Led by experienced professionals dedicated to making a difference
          </p>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="max-w-4xl mx-auto">
            <div className={`bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${
              isVisible ? fadeIn : 'opacity-0'
            }`} {...staggerChildren(1)}>
              <div className="lg:grid lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <img
                    className="h-96 w-full object-cover object-center"
                    src={IMAGES.team.therapist}
                    alt="Lead Therapist"
                  />
                  <div className="p-4 bg-purple-50">
                    <div className="grid grid-cols-2 gap-4">
                      {qualifications.map((qual, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <qual.icon className="h-5 w-5 text-purple-600" />
                          <span className="text-sm text-gray-600">{qual.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6 lg:col-span-2">
                  <div className="text-xl font-semibold text-gray-900">
                    Afsheen Sheikh
                  </div>
                  <div className="mt-1 text-purple-600 font-medium">
                    Managing Director & Behaviour Consultant
                  </div>
                  <div className="mt-4 text-gray-600 space-y-4">
                    <p>
                      As an RBA (Ont.) and OAP registered provider serving the Toronto GTA, my journey into special needs therapy began with a personal connection - my son's autism diagnosis. This life-changing event over 20 years ago redirected my path from a successful career in Finance and Banking.
                    </p>
                    <p>
                      My extensive experience encompasses working with children aged 2-16 years, addressing various conditions including Special Needs, ADHD/ADD, Oppositional Defiant Disorder (ODD), Dyspraxia, Down's Syndrome, Dyscalculia, Learning Disabilities, Hyperlexia, Severe Anxiety, and Developmental Delay.
                    </p>
                    <p>
                      Being a parent of a youth with special needs brings a unique perspective to my work, combining professional expertise with personal understanding. I've experienced firsthand the daily challenges families face, from early diagnosis through various developmental stages.
                    </p>
                    <p>
                      My approach focuses on creating tailored strategies for each child, implementing evidence-based, humane, and effective interventions. The goal is to empower differently-abled children and youth, helping them reach their full potential and lead productive, happy lives.
                    </p>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors"
                    >
                      Schedule a Consultation
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center px-4 py-2 border border-purple-600 text-sm font-medium rounded-md shadow-sm text-purple-600 bg-white hover:bg-purple-50 transition-colors"
                    >
                      View Services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}