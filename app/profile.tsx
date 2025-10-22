import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={{ color: "#fff" }}>Back</Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/images/dorian-img.jpg")}
        style={styles.avatar}
      />
      <Text style={styles.name}>Dorian</Text>
      <Text style={styles.bio}>Mood enthusiast. Building vibes.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#FF69B4",
    padding: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#FF69B4",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
  },
  bio: {
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
});
