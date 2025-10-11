import Header from "@/components/ui/Header";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function settingsScreen() {
  return (
    <View style={styles.settingsContainer}>
      <Header title="Settings" />
      <View style={styles.settingsOptionContainer}>
        <TouchableOpacity style={styles.settingsOption}>
          <View style={styles.settingsOptionContent}>
            <View style={styles.settingsOptionLabel}>
              <FontAwesome5 name="moon" size={24} color="black" />
              <Text>Dark mode</Text>
            </View>
            <Text style={styles.settingsOptionStatus}>OFF</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <View style={styles.settingsOptionContent}>
            <View style={styles.settingsOptionLabel}>
              <Ionicons name="language" size={24} color="black" />
              <Text>Language</Text>
            </View>
            <Text style={styles.settingsOptionStatus}>ENGLISH</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsOption}>
          <View style={styles.settingsOptionContent}>
            <View style={styles.settingsOptionLabel}>
              <Feather name="send" size={24} color="black" />
              <Text>Contact us</Text>
            </View>
            <Text style={styles.settingsOptionStatus}>OFF</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={24} color="#fff" />
        <Text style={{ color: "#fff", fontWeight: "700" }}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  settingsOption: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    fontWeight: 700,
  },
  settingsOptionLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingsOptionContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  settingsOptionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsOptionStatus: {
    fontWeight: "700",
    color: "pink",
  },
  logoutButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
    gap: 5,
  },
});
