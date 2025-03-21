import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import CourseCard from '@/components/CourseCard';
import SearchBar from '@/components/SearchBar';
import CategoryPill from '@/components/CategoryPill';
import Navbar from '@/components/Navbar';
import { allCourses, courseCategories } from '@/data/courses';

export default function CatalogueScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);

  const handleSearchPress = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      
      <View style={styles.header}>
        <Text style={styles.title}>Catalogue des formations</Text>
      </View>

      <SearchBar onPress={handleSearchPress} />

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        <CategoryPill 
          label="Tous" 
          isSelected={selectedCategory === 'all'} 
          onPress={() => setSelectedCategory('all')} 
        />
        
        {courseCategories.map((category) => (
          <CategoryPill 
            key={category.id} 
            label={category.title} 
            isSelected={selectedCategory === category.id} 
            onPress={() => setSelectedCategory(category.id)} 
          />
        ))}
      </ScrollView>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard course={item} fullWidth />
        )}
        contentContainerStyle={styles.coursesList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  coursesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});