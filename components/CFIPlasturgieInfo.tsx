import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';

const CFIPlasturgieInfo = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Image
          source={{ uri: 'https://www.plasturgie-tunisie.com/assets/logo.png' }} 
          style={styles.logo}
        />
        <Card.Content>
          <Text style={styles.title}>À propos de CFI Plasturgie</Text>
          <Text style={styles.description}>
            CFI Plasturgie est un centre spécialisé en formation dans le domaine des polymères et des matériaux composites.
            Il accompagne les professionnels en proposant des formations innovantes adaptées aux besoins industriels.
          </Text>
          <Image
            source={{ uri: 'https://www.plasturgie-tunisie.com/assets/plasturgie-training.jpg' }} 
            style={styles.image}
          />
          <Text style={styles.subtitle}>Notre Expertise</Text>
          <Text style={styles.description}>
            - Formations en plasturgie et composites 🏭  
            - Techniques innovantes et pratiques 🔬  
            - Accompagnement des professionnels 💡  
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default CFIPlasturgieInfo;
