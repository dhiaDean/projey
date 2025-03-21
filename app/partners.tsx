import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { partners } from '@/data/partners';
import Navbar from '@/components/Navbar';

export default function PartnersScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Navbar />
      
      <View style={styles.header}>
        <Text style={styles.title}>Nos partenaires</Text>
        <Text style={styles.subtitle}>Découvrez les entreprises qui nous font confiance</Text>
      </View>

      <FlatList
        data={partners}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.partnerCard}>
            <Image source={{ uri: item.logo }} style={styles.partnerLogo} resizeMode="contain" />
            <Text style={styles.partnerName}>{item.name}</Text>
            <Text style={styles.partnerDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.partnersList}
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
  },
  partnersList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  partnerCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  partnerLogo: {
    width: 100,
    height: 60,
    marginBottom: 15,
  },
  partnerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  partnerDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#64748b',
    textAlign: 'center',
  },
});