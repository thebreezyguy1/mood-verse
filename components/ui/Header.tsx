import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type headerProps = {
  title: string;
};

const Header = (props: headerProps) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.push("/profile")}
        >
          <Image
            style={styles.profileImg}
            source={require("../../assets/images/dorian-img.jpg")}
          />
        </TouchableOpacity>

        <View>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>{props.title}</Text>
          <View>
            <Image />
            <Text>{new Date().toDateString()}</Text>
          </View>
        </View>
      </View>
      <View
        style={{ flexDirection: "row-reverse", gap: 5, alignItems: "center" }}
      >
        <Pressable onPress={() => router.push("/settings")}>
          <MaterialIcons name="settings" size={30} color="#fff" />
        </Pressable>
        <AntDesign name="logout" size={28} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "pink",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 10,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default Header;
