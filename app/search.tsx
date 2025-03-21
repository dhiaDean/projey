import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { allCourses } from '@/data/courses';
import { trainers } from '@/data/trainers';
import { blogPosts } from '@/data/blog';

type SearchResultType = 'course' | 'trainer' | 'blog';
interface SearchResult {
  id: number;
  type: SearchResultType;
  title: string;
  subtitle: string;
  image: string;
}

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SearchResultType | 'all'>('all');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'fundraising',
    'marketing digital',
    'développement web',
  ]);

  // Go back to the previous screen
  const handleGoBack = () => {
    router.back(); // Pop the stack to return to the previous screen
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    let results: SearchResult[] = [];

    if (activeFilter === 'all' || activeFilter === 'course') {
      const courseResults = allCourses
        .filter(
          (course) =>
            course.title.toLowerCase().includes(query) ||
            course.instructor.toLowerCase().includes(query)
        )
        .map((course) => ({
          id: course.id,
          type: 'course' as SearchResultType,
          title: course.title,
          subtitle: `Par ${course.instructor} • ${course.duration}`,
          image: course.image,
        }));
      results = [...results, ...courseResults];
    }

    if (activeFilter === 'all' || activeFilter === 'trainer') {
      const trainerResults = trainers
        .filter(
          (trainer) =>
            trainer.name.toLowerCase().includes(query) ||
            trainer.specialty.toLowerCase().includes(query)
        )
        .map((trainer) => ({
          id: trainer.id,
          type: 'trainer' as SearchResultType,
          title: trainer.name,
          subtitle: trainer.specialty,
          image: trainer.image,
        }));
      results = [...results, ...trainerResults];
    }

    if (activeFilter === 'all' || activeFilter === 'blog') {
      const blogResults = blogPosts
        .filter(
          (post) =>
            post.title.toLowerCase().includes(query) ||
            post.excerpt.toLowerCase().includes(query) ||
            post.category.toLowerCase().includes(query)
        )
        .map((post) => ({
          id: post.id,
          type: 'blog' as SearchResultType,
          title: post.title,
          subtitle: post.category,
          image: post.image,
        }));
      results = [...results, ...blogResults];
    }

    setSearchResults(results);
  }, [searchQuery, activeFilter]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && !recentSearches.includes(query)) {
      setRecentSearches((prev) => [query, ...prev.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={styles.resultCard}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentSearch = (search: string) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleSearch(search)}
    >
      <Text style={styles.recentSearchText}>{search}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <ArrowLeft size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recherche</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748b" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des formations, formateurs, articles..."
            placeholderTextColor="#94a3b8"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} color="#64748b" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[styles.filterText, activeFilter === 'all' && styles.activeFilterText]}>
            Tout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'course' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('course')}
        >
          <Text style={[styles.filterText, activeFilter === 'course' && styles.activeFilterText]}>
            Formations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'trainer' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('trainer')}
        >
          <Text style={[styles.filterText, activeFilter === 'trainer' && styles.activeFilterText]}>
            Formateurs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'blog' && styles.activeFilterButton]}
          onPress={() => setActiveFilter('blog')}
        >
          <Text style={[styles.filterText, activeFilter === 'blog' && styles.activeFilterText]}>
            Articles
          </Text>
        </TouchableOpacity>
      </View>

      {searchQuery !== '' ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSearchResult}
          contentContainerStyle={styles.resultsContainer}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>Aucun résultat trouvé.</Text>
          }
        />
      ) : (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.recentSearchesTitle}>Recherches récentes</Text>
          {recentSearches.map((search, index) => (
            <View key={index}>{renderRecentSearch(search)}</View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1e293b',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  activeFilterButton: {
    backgroundColor: '#4361ee',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  resultsContainer: {
    paddingHorizontal: 20,
  },
  resultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
    marginTop: 20,
  },
  recentSearchesContainer: {
    paddingHorizontal: 20,
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 15,
  },
  recentSearchItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  recentSearchText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
});