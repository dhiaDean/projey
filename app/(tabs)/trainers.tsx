import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { trainers } from "@/data/trainers";
import Navbar from "@/components/Navbar";

export default function TrainersScreen() {
  const handleTrainerPress = (id: number) => {
    router.push(`/trainer-details?id=${id}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Navbar title="Formateurs" />
      <FlatList
        data={trainers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trainerCard}
            onPress={() => handleTrainerPress(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.trainerImage} />
            <View style={styles.trainerInfo}>
              <Text style={styles.trainerName}>{item.name}</Text>
              <Text style={styles.trainerSpecialty}>{item.specialty}</Text>
              <Text style={styles.trainerStats}>
                {item.coursesCount} cours • {item.studentsCount} étudiants
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  trainerCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  trainerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  trainerSpecialty: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  trainerStats: {
    fontSize: 12,
    color: "#4361ee",
  },
});
