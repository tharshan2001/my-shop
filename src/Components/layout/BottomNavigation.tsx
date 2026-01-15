'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Settings, Home } from 'lucide-react';

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactElement;
  href: string; 
  showNotification?: boolean;
  notificationColor?: string;
};

export const defaultNavItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: <Home />,
    href: '/',
  },
  {
    id: 'search',
    label: 'Search',
    icon: <Search />,
    href: '/search',
  },
  {
    id: 'cart',
    label: 'Cart',
    icon: <ShoppingBag />,
    href: '/cart',
    showNotification: true,
    notificationColor: 'bg-red-500',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings />,
    href: '/settings',
  },
];

interface BottomNavigationProps {
  activeNav: string;
  navItems?: NavItem[];
  className?: string;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeNav,
  navItems = defaultNavItems,
  className = '',
}) => {
  return (
    <nav
      className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 py-4 px-8 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)] z-20 sm:hidden ${className}`}
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center space-y-1 ${
              activeNav === item.id ? 'text-orange-500/80' : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};