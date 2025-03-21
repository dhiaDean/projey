import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar';
import { Drawer } from 'expo-router/drawer';
import CFIPlasturgieCard from '@/components/CFIPlasturgieInfo';

import { featuredCourses, popularCategories, getIconComponent } from '@/data/courses';

// This approach assumes that you need to modify how the icons are handled
// Option 1: If possible, update the data/courses.ts file to use the correct IconName type

export default function HomeScreen() {

  const handleSearchPress = () => {
    router.push('/search');
  };

  const handleNotificationPress = () => {
    // Navigate to notifications or show notifications modal
    console.log('Notifications pressed');
  };

  // Helper function to safely handle icon rendering
  const renderCategoryIcon = (iconIdentifier: any) => {
    try {
      // Use a type guard instead of direct assertion
      return getIconComponent(iconIdentifier);
    } catch (error) {
      console.error('Error rendering icon:', error);
      // Return a fallback or empty component
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Navbar */}
      <Navbar
        userName="Balti Chef"
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bonjour,</Text>
            <Text style={styles.userName}>Balti Chef</Text>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar onPress={handleSearchPress} />

        {/* Popular Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories formations</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} color="#4361ee" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {popularCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={[styles.categoryIconContainer, { backgroundColor: category.bgColor }]}>
                  {renderCategoryIcon(category.icon)}
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.courseCount}>{category.courseCount} cours</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Courses Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Formations populaires</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} color="#4361ee" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={featuredCourses}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <CourseCard course={item} />}
            contentContainerStyle={styles.coursesList}
          />
        </View>

        {/* Featured Trainers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Formateurs vedettes</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Voir tout</Text>
              <ChevronRight size={16} color="#4361ee" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trainersContainer}>
            {[1, 2, 3].map((trainer) => (
              <TouchableOpacity key={trainer} style={styles.trainerCard}>
                <Image
                  source={{ uri: `https://randomuser.me/api/portraits/men/${trainer + 20}.jpg` }}
                  style={styles.trainerImage}
                />
                <Text style={styles.trainerName}>John Doe</Text>
                <Text style={styles.trainerSpecialty}>Expert en Business</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>








        {/* Section Qui sommes-nous ? */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Qui sommes-nous ?</Text>
          </View>

          <View style={styles.aboutContainer}>
            <Image
              source={{ uri: 'https://www.plasturgie-tunisie.com/assets/logo.png' }}
              style={styles.logo}
            />
            <Text style={styles.aboutText}>
              CFI Plasturgie est un centre spécialisé dans la formation en plasturgie et composites.
              Il accompagne les professionnels avec des formations innovantes adaptées aux besoins industriels.
            </Text>
            <Image
              source={{ uri: 'https://www.plasturgie-tunisie.com/assets/plasturgie-training.jpg' }}
              style={styles.aboutImage}
            />
            <Text style={styles.aboutText}>
              Nous proposons des formations techniques avancées pour développer l’expertise en plasturgie,
              tout en mettant l’accent sur l'innovation et l'accompagnement professionnel.
            </Text>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },






  aboutContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Inter-Regular',
  },
  aboutImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },



  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4361ee',
    fontFamily: 'Inter-Medium',
    marginRight: 4,
  },
  categoriesContainer: {
    paddingLeft: 20,
  },
  categoryCard: {
    width: 120,
    marginRight: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 4,
  },
  courseCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  coursesList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  trainersContainer: {
    paddingLeft: 20,
  },
  trainerCard: {
    width: 120,
    marginRight: 15,
    alignItems: 'center',
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  trainerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  articleCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  articleContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  articleCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#4361ee',
  },
  articleTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  articleDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
});