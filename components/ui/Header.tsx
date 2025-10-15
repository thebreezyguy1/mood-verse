import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type headerProps = {
  title: string;
};

const Header = (props: headerProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "pink",
    justifyContent: "flex-start",
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
