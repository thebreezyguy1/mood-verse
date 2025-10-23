import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const user = {
    firstName: "Dorian",
    lastName: "Taponzing Donfack",
    email: "doriantaponzing@gmail.com",
    phoneNumber: "+1(470)439-9907",
    address: "3920 Snipes Court, Lilburn, GA",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        <Image
          source={require("../assets/images/dorian-img.jpg")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>
            {user.firstName + " " + user.lastName}
          </Text>
          <Text style={styles.bio}>{user.email}</Text>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <Text style={styles.title}>Email</Text>
          <Text>{user.email}</Text>
        </View>
      </View>
      <View>
        <View style={styles.profileInfo}>
          <Text style={styles.title}>Address</Text>
          <Text>{user.address}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    padding: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  bio: {
    marginTop: 2,
    color: "#fff",
    textAlign: "center",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  profileContainer: {
    marginTop: 20,
  },
  profileInfo: {
    backgroundColor: "#fff",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: "700",
  },
});
