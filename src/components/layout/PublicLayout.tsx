import React, { useEffect } from 'react';
import { Header } from './Header';
import { Hero } from '../home/Hero';
import { Services } from '../home/Services';
import { Approach } from '../home/Approach';
import { Team } from '../home/Team';
import { Contact } from '../home/Contact';
import { BlogPage } from '../blog/BlogPage';
import { SkipLink } from '../common/SkipLink';
import { AccessibilityMenu } from '../common/AccessibilityMenu';
import { generateStructuredData } from '../../utils/seo';

export function PublicLayout() {
  useEffect(() => {
    // Add structured data to the page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = generateStructuredData();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SkipLink />
      <Header />
      <main id="main-content" className="pt-16" tabIndex={-1}>
        <Hero />
        <Services />
        <Approach />
        <Team />
        <BlogPage />
        <Contact />
      </main>
      <footer className="bg-gray-50 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Xable. All rights reserved.
          </p>
        </div>
      </footer>
      <AccessibilityMenu />
    </div>
  );
}