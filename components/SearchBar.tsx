import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Search, Filter } from 'lucide-react-native';

interface SearchBarProps {
  onPress?: () => void;
  onFilterPress?: () => void;
  placeholder?: string;
  showFilter?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onPress, 
  onFilterPress, 
  placeholder = "Rechercher des formations...",
  showFilter = true
}) => {
  return (
    <TouchableOpacity 
      style={styles.searchContainer} 
      onPress={onPress}
      accessibilityLabel="Search"
      accessibilityHint="Tap to search"
    >
      <Search size={20} color="#64748b" style={styles.searchIcon} />
      <Text style={styles.searchPlaceholder}>{placeholder}</Text>
      
      {showFilter && (
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={onFilterPress}
          accessibilityLabel="Filter"
          accessibilityHint="Tap to filter search results"
        >
          <Filter size={20} color="#1e293b" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;