import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

export function NavLink({ href, children, isScrolled }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`transition-colors duration-300 font-medium ${
        isScrolled
          ? 'text-gray-600 hover:text-purple-600'
          : 'text-gray-500 hover:text-purple-500'
      }`}
    >
      {children}
    </a>
  );
}