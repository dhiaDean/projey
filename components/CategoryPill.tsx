import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryPill, isSelected && styles.selectedCategoryPill]} 
    onPress={onPress}
  >
    <Text style={[styles.categoryPillText, isSelected && styles.selectedCategoryPillText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    marginRight: 10,
  },
  selectedCategoryPill: {
    backgroundColor: '#4361ee',
  },
  categoryPillText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  selectedCategoryPillText: {
    color: '#ffffff',
  },
});

export default CategoryPill;