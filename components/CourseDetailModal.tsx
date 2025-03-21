import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { X, Star, Clock, User, BookOpen, Award, Download } from 'lucide-react-native';

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
  description?: string;
  lessons?: { title: string; duration: string }[];
}

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
}

export default function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  const translateY = new Animated.Value(0);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(translateY, {
          toValue: 800,
          duration: 300,
          useNativeDriver: true,
        }).start(onClose);
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  // Mock data for course details
  const description = course.description || "Ce cours vous apprendra les fondamentaux du fundraising et comment réussir à lever des fonds pour votre startup. Vous découvrirez les stratégies les plus efficaces utilisées par les entrepreneurs à succès.";
  const lessons = course.lessons || [
    { title: "Introduction au fundraising", duration: "45 min" },
    { title: "Préparer son pitch deck", duration: "1h 15min" },
    { title: "Identifier les investisseurs potentiels", duration: "55 min" },
    { title: "Négocier les termes du deal", duration: "1h 30min" },
    { title: "Clôturer le tour de financement", duration: "1h 05min" }
  ];
  
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY }] }
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragIndicator} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: course.image }} style={styles.courseImage} />
        
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <X size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.categoryTag}>{course.category || 'Business'}</Text>
            <Text style={styles.title}>{course.title}</Text>
            
            <View style={styles.instructorContainer}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} 
                style={styles.instructorImage} 
              />
              <Text style={styles.instructorName}>{course.instructor}</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <Text style={styles.statText}>{course.rating.toFixed(1)} ({course.reviewCount})</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color="#64748b" />
                <Text style={styles.statText}>{course.duration}</Text>
              </View>
              <View style={styles.statItem}>
                <User size={16} color="#64748b" />
                <Text style={styles.statText}>1,245 étudiants</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos du cours</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ce que vous apprendrez</Text>
            <View style={styles.learningPoints}>
              <View style={styles.learningPoint}>
                <View style={styles.bulletPoint} />
                <Text style={styles.learningText}>Comprendre les fondamentaux du fundraising</Text>
              </View>
              <View style={styles.learningPoint}>
                <View style={styles.bulletPoint} />
                <Text style={styles.learningText}>Créer un pitch deck convaincant</Text>
              </View>
              <View style={styles.learningPoint}>
                <View style={styles.bulletPoint} />
                <Text style={styles.learningText}>Identifier et approcher les investisseurs</Text>
              </View>
              <View style={styles.learningPoint}>
                <View style={styles.bulletPoint} />
                <Text style={styles.learningText}>Négocier efficacement les termes du deal</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contenu du cours</Text>
            <Text style={styles.contentInfo}>5 sections • 10 leçons • Durée totale: {course.duration}</Text>
            
            {lessons.map((lesson, index) => (
              <View key={index} style={styles.lessonItem}>
                <View style={styles.lessonInfo}>
                  <BookOpen size={16} color="#4361ee" />
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                </View>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certification</Text>
            <View style={styles.certificationContainer}>
              <Award size={24} color="#4361ee" />
              <View style={styles.certificationInfo}>
                <Text style={styles.certificationTitle}>Certificat d'accomplissement</Text>
                <Text style={styles.certificationDescription}>
                  Obtenez un certificat après avoir terminé le cours
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{course.price === 0 ? 'Gratuit' : `${course.price} €`}</Text>
          {course.price > 0 && (
            <Text style={styles.priceInfo}>Accès à vie</Text>
          )}
        </View>
        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>S'inscrire maintenant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  courseImage: {
    width: '100%',
    height: 220,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 25,
  },
  categoryTag: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#4361ee',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  instructorName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 6,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 15,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    lineHeight: 22,
  },
  learningPoints: {
    marginTop: 5,
  },
  learningPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4361ee',
    marginTop: 7,
    marginRight: 10,
  },
  learningText: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  contentInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 15,
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonTitle: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginLeft: 10,
  },
  lessonDuration: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  certificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 12,
  },
  certificationInfo: {
    marginLeft: 15,
    flex: 1,
  },
  certificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  certificationDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  priceInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  enrollButton: {
    backgroundColor: '#4361ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  enrollButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
});