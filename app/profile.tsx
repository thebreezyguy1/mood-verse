import { useUser } from "@/context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();

  const dialNumber = (raw: string) => {
    const digits = raw.replace(/[^+0-9]/g, "");
    const tel = `tel:${digits}`;
    Linking.openURL(tel).catch(() => {});
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerBar}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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
          <View style={styles.profileInfo}>
            <Text style={styles.title}>Address</Text>
            <Text>
              {user.streetAddress1 + ", " + user.city + ", " + user.zipCode}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.title}>Phone Number</Text>
            <TouchableOpacity onPress={() => dialNumber(user.phone)}>
              <Text style={styles.phoneText}>{"+" + user.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Link href={"/edit-profile"} push asChild>
        <TouchableOpacity style={styles.editProfileBtn}>
          <MaterialCommunityIcons name="account-edit" size={24} color="black" />
          <Text>Edit Profile</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    padding: 20,
    paddingBottom: 50,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
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
  headerBar: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 8,
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
  phoneText: {
    color: "#333",
    textDecorationLine: "underline",
  },
  editProfileBtn: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ad40a2",
  },
});
