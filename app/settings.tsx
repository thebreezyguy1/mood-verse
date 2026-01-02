import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function settingsScreen() {
  const router = useRouter();

  const settings = [
    {
      type: "general",
      options: [
        {
          name: "Dark mode",
          icon: <FontAwesome5 name="moon" size={24} color="black" />,
          status: "off",
          moreOptionsIcon: null,
        },
        {
          name: "Language",
          icon: <Ionicons name="language" size={24} color="black" />,
          status: "english",
          moreOptionsIcon: null,
        },
        {
          name: "Notifications",
          icon: (
            <MaterialIcons
              name="notifications-active"
              size={24}
              color="black"
            />
          ),
          status: null,
          moreOptionsIcon: (
            <FontAwesome6 name="chevron-right" size={24} color="black" />
          ),
        },
      ],
    },
    {
      type: "about mood verse",
      options: [
        {
          name: "About us",
          icon: <Entypo name="emoji-happy" size={24} color="black" />,
          status: null,
          moreOptionsIcon: (
            <FontAwesome6 name="chevron-right" size={24} color="black" />
          ),
        },
        {
          name: "Bible Versions",
          icon: <FontAwesome5 name="bible" size={24} color="black" />,
          status: null,
          moreOptionsIcon: (
            <FontAwesome6 name="chevron-right" size={24} color="black" />
          ),
        },
        {
          name: "Terms & Conditions",
          icon: <AntDesign name="info-circle" size={24} color="black" />,
          status: null,
          moreOptionsIcon: (
            <FontAwesome6 name="chevron-right" size={24} color="black" />
          ),
        },
        {
          name: "Privacy Policy",
          icon: <MaterialIcons name="privacy-tip" size={24} color="black" />,
          status: null,
          moreOptionsIcon: (
            <FontAwesome6 name="chevron-right" size={24} color="black" />
          ),
        },
      ],
    },
    {
      type: "get in touch",
      options: [
        {
          name: "Give Feedback",
          icon: <MaterialIcons name="feedback" size={24} color="black" />,
          status: null,
          moreOptionsIcon: true,
        },
        {
          name: "Contact Us",
          icon: <FontAwesome6 name="message" size={24} color="black" />,
          status: null,
          moreOptionsIcon: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeBtn}
            >
              <MaterialIcons name="keyboard-backspace" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Settings</Text>
          </View>
          {settings.map((s) => {
            return (
              <View style={styles.settingsGroup}>
                <Text style={{ fontWeight: 700 }}>{s.type.toUpperCase()}</Text>
                {s.options.map((option) => {
                  return (
                    <View style={styles.settings}>
                      <TouchableOpacity style={styles.settingsOption}>
                        <View style={styles.settingsOptionContent}>
                          <View style={styles.settingsOptionLabel}>
                            {option.icon}
                            <Text>{option.name}</Text>
                          </View>
                          {option.status ? (
                            <Text style={styles.settingsOptionStatus}>OFF</Text>
                          ) : null}
                          {option.moreOptionsIcon ? (
                            <FontAwesome6
                              name="chevron-right"
                              size={20}
                              color="#000"
                            />
                          ) : null}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
          })}
          <Pressable style={styles.logoutButton}>
            <Text style={{ color: "#fff", fontWeight: 700 }}>LOG OUT</Text>
          </Pressable>
          <Pressable style={{ alignItems: "center" }}>
            <Text style={{ fontWeight: 700 }}>DELETE ACCOUNT</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>

    // <View style={styles.settingsContainer}>
    //   <Header title="Settings" />
    //   <View style={styles.settingsOptionContainer}>
    //     <TouchableOpacity style={styles.settingsOption}>
    //       <View style={styles.settingsOptionContent}>
    //         <View style={styles.settingsOptionLabel}>
    //           <FontAwesome5 name="moon" size={24} color="black" />
    //           <Text>Dark mode</Text>
    //         </View>
    //         <Text style={styles.settingsOptionStatus}>OFF</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.settingsOption}>
    //       <View style={styles.settingsOptionContent}>
    //         <View style={styles.settingsOptionLabel}>
    //           <Ionicons name="language" size={24} color="black" />
    //           <Text>Language</Text>
    //         </View>
    //         <Text style={styles.settingsOptionStatus}>ENGLISH</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <TouchableOpacity style={styles.settingsOption}>
    //       <View style={styles.settingsOptionContent}>
    //         <View style={styles.settingsOptionLabel}>
    //           <Feather name="send" size={24} color="black" />
    //           <Text>Contact us</Text>
    //         </View>
    //         <Text style={styles.settingsOptionStatus}>OFF</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    //   <TouchableOpacity style={styles.logoutButton}>
    //     <MaterialCommunityIcons name="logout" size={24} color="#fff" />
    //     <Text style={{ color: "#fff", fontWeight: "700" }}>LOG OUT</Text>
    //   </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  // settingsContainer: {
  //   flex: 1,
  //   backgroundColor: "pink",
  // },
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
    marginBottom: 20,
    alignItems: "center",
    gap: 5,
  },
  settingsGroup: {
    marginBottom: 10,
  },
  settings: {
    marginTop: 5,
  },

  safe: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "pink",
  },
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    minHeight: "45%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 36,
    color: "#000",
  },
  editInfo: {
    marginTop: 12,
  },
});
