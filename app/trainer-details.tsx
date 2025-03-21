
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Modal, Animated, PanResponder } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { trainers } from '@/data/trainers';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '@/components/Navbar';

export default function TrainerDetails() {
  const { id } = useLocalSearchParams();
  const trainer = trainers.find(t => t.id === Number(id));
  const translateY = new Animated.Value(0);
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(translateY, {
          toValue: 800,
          duration: 300,
          useNativeDriver: true,
        }).start(() => router.back());
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!trainer) return null;

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => router.back()}
    >
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY }] }
        ]}
        {...panResponder.panHandlers}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.dragIndicator} />
          <Navbar title="Formateur" />
          <ScrollView style={styles.content} bounces={false}>
            <Image source={{ uri: trainer.image }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{trainer.name}</Text>
              <Text style={styles.specialty}>{trainer.specialty}</Text>
              <Text style={styles.stats}>
                {trainer.coursesCount} cours • {trainer.studentsCount} étudiants
              </Text>
              <Text style={styles.bio}>{trainer.bio}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
  dragIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
  },
  content: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  specialty: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  stats: {
    fontSize: 16,
    color: '#4361ee',
    marginBottom: 16,
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
});
