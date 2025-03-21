import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ForumCardProps {
  item: {
    id: number;
    title: string;
    replies: number;
    views: number;
    author: string;
    authorImage: string;
    date: string;
  };
}

const ForumCard: React.FC<ForumCardProps> = ({ item }) => (
  <TouchableOpacity style={styles.forumCard}>
    <View style={styles.forumHeader}>
      <Text style={styles.forumTitle}>{item.title}</Text>
      <View style={styles.forumStats}>
        <Text style={styles.forumReplies}>{item.replies} réponses</Text>
        <Text style={styles.forumViews}>• {item.views} vues</Text>
      </View>
    </View>
    <View style={styles.forumMeta}>
      <Image source={{ uri: item.authorImage }} style={styles.forumAuthorImage} />
      <Text style={styles.forumAuthorName}>{item.author}</Text>
      <Text style={styles.forumDate}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  forumCard: {
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
  forumHeader: {
    marginBottom: 15,
  },
  forumTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 5,
  },
  forumStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forumReplies: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  forumViews: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    marginLeft: 5,
  },
  forumMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  forumAuthorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  forumAuthorName: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#1e293b',
    marginRight: 10,
  },
  forumDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
});

export default ForumCard;