import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { blogPosts } from '@/data/blog';
import ArticleCard from '@/components/ArticleCard';
import ForumCard from '@/components/ForumCard';
import Navbar from '@/components/Navbar';

export default function BlogScreen() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      
      <View style={styles.header}>
        <Text style={styles.title}>Blog & Forums</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'articles' && styles.activeTab]} 
          onPress={() => setActiveTab('articles')}
        >
          <Text style={[styles.tabText, activeTab === 'articles' && styles.activeTabText]}>Articles</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'forums' && styles.activeTab]} 
          onPress={() => setActiveTab('forums')}
        >
          <Text style={[styles.tabText, activeTab === 'forums' && styles.activeTabText]}>Forums</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'articles' ? (
        <FlatList
          data={blogPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ArticleCard item={item} />}
          contentContainerStyle={styles.articlesList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <ForumCard
              item={{
                id: item,
                title: 'Comment réussir le fundraising ?',
                replies: 23,
                views: 156,
                author: 'John Doe',
                authorImage: `https://randomuser.me/api/portraits/men/${item + 10}.jpg`,
                date: 'Il y a 2 jours',
              }}
            />
          )}
          contentContainerStyle={styles.forumsList}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#e2e8f0',
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#ffffff',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#64748b',
  },
  activeTabText: {
    color: '#1e293b',
  },
  articlesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  forumsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});