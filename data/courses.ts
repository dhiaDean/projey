import React from 'react';
import { Music, Code, TrendingUp, Briefcase, Palette } from 'lucide-react-native';

// Define a type for the icon names
type IconName = 'Briefcase' | 'Code' | 'TrendingUp' | 'Palette' | 'Music';

export const featuredCourses = [
  {
    id: 1,
    title: 'Comment réussir dans le fundraising',
    instructor: 'Muhammad Murad',
    rating: 4.8,
    reviewCount: 124,
    duration: '6h 30min',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    category: 'business'
  },
  {
    id: 2,
    title: 'Développement Web Fullstack',
    instructor: 'John Doe',
    rating: 4.6,
    reviewCount: 89,
    duration: '12h 45min',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'technology'
  },
  {
    id: 3,
    title: 'Marketing Digital pour Débutants',
    instructor: 'Sarah Johnson',
    rating: 4.5,
    reviewCount: 76,
    duration: '8h 15min',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    category: 'marketing'
  },
  {
    id: 4,
    title: 'Introduction à la Photographie',
    instructor: 'Michael Brown',
    rating: 4.7,
    reviewCount: 112,
    duration: '5h 20min',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'design'
  }
];

export const allCourses = [
  ...featuredCourses,
  {
    id: 5,
    title: 'Gestion de Projet Agile',
    instructor: 'Emily Wilson',
    rating: 4.4,
    reviewCount: 68,
    duration: '7h 10min',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'business'
  },
  {
    id: 6,
    title: 'Intelligence Artificielle pour Tous',
    instructor: 'David Chen',
    rating: 4.9,
    reviewCount: 145,
    duration: '10h 30min',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    category: 'technology'
  },
  {
    id: 7,
    title: 'Copywriting qui Convertit',
    instructor: 'Jessica Miller',
    rating: 4.6,
    reviewCount: 92,
    duration: '4h 45min',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80',
    category: 'marketing'
  },
  {
    id: 8,
    title: 'Design d\'Interface Utilisateur',
    instructor: 'Alex Turner',
    rating: 4.8,
    reviewCount: 118,
    duration: '9h 20min',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    category: 'design'
  }
];

export const popularCategories = [
  {
    id: 'business',
    name: 'boite eau',
    courseCount: 42,
    bgColor: '#e0f2fe',
    icon: 'Briefcase'
  },
  {
    id: 'technology',
    name: 'shleka plastique',
    courseCount: 65,
    bgColor: '#dcfce7',
    icon: 'Code'
  },
  {
    id: 'marketing',
    name: 'boite gazouz',
    courseCount: 28,
    bgColor: '#fef3c7',
    icon: 'TrendingUp'
  },
  {
    id: 'design',
    name: 'stylo',
    courseCount: 36,
    bgColor: '#fce7f3',
    icon: 'Palette'
  },
  {
    id: 'music',
    name: 'printer machine',
    courseCount: 24,
    bgColor: '#dbeafe',
    icon: 'Music'
  }
];

export const courseCategories = [
  {
    id: 'business',
    title: 'Business',
    courseCount: 42,
    bgColor: '#e0f2fe',
    icon: 'Briefcase'
  },
  {
    id: 'technology',
    title: 'Technologie',
    courseCount: 65,
    bgColor: '#dcfce7',
    icon: 'Code'
  },
  {
    id: 'marketing',
    title: 'Marketing',
    courseCount: 28,
    bgColor: '#fef3c7',
    icon: 'TrendingUp'
  },
  {
    id: 'design',
    title: 'Design',
    courseCount: 36,
    bgColor: '#fce7f3',
    icon: 'Palette'
  },
  {
    id: 'music',
    title: 'Musique',
    courseCount: 24,
    bgColor: '#dbeafe',
    icon: 'Music'
  }
];

// Function to map string identifiers to actual components
export const getIconComponent = (iconName: IconName) => {
  const icons: { [key in IconName]: React.FC<{ size: number; color: string }> } = {
    Briefcase,
    Code,
    TrendingUp,
    Palette,
    Music,
  };
  
  const IconComponent = icons[iconName]; // This is a React component
  return IconComponent ? React.createElement(IconComponent, { size: 20, color: "#0284c7" }) : null; // Use React.createElement
};