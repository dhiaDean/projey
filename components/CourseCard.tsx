import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, Clock } from 'lucide-react-native';

interface Course {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  image: string;
  category?: string;
}

interface CourseCardProps {
  course: Course;
  fullWidth?: boolean;
}

export default function CourseCard({ course, fullWidth = false }: CourseCardProps) {
  return (
    <TouchableOpacity style={[styles.card, fullWidth ? styles.fullWidthCard : styles.regularCard]}>
      <Image source={{ uri: course.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{course.title}</Text>
        <Text style={styles.instructor}>{course.instructor}</Text>
        
        <View style={styles.ratingContainer}>
          <Star size={14} color="#f59e0b" fill="#f59e0b" />
          <Text style={styles.rating}>{course.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({course.reviewCount})</Text>
        </View>
        
        <View style={styles.footer}>
          <View style={styles.durationContainer}>
            <Clock size={14} color="#64748b" />
            <Text style={styles.duration}>{course.duration}</Text>
          </View>
          <Text style={styles.price}>{course.price === 0 ? 'Gratuit' : `${course.price} €`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 15,
  },
  regularCard: {
    width: 220,
    marginRight: 15,
  },
  fullWidthCard: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 5,
    height: 44,
  },
  instructor: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#4361ee',
  },
});