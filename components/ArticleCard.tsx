import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ArticleCardProps {
  item: {
    id: number;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    authorImage: string;
    date: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item }) => (
  <TouchableOpacity style={styles.articleCard}>
    <Image source={{ uri: item.image }} style={styles.articleImage} />
    <View style={styles.articleContent}>
      <Text style={styles.articleCategory}>{item.category}</Text>
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleExcerpt} numberOfLines={2}>{item.excerpt}</Text>
      <View style={styles.articleMeta}>
        <Image source={{ uri: item.authorImage }} style={styles.authorImage} />
        <View>
          <Text style={styles.authorName}>{item.author}</Text>
          <Text style={styles.articleDate}>{item.date}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 180,
  },
  articleContent: {
    padding: 15,
  },
  articleCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#4361ee',
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 10,
  },
  articleExcerpt: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginBottom: 15,
    lineHeight: 20,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  authorName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
  },
  articleDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
});

export default ArticleCard;