import { Image, StyleSheet, Text, View } from "react-native";

type headerProps = {
  title: string;
};

const Header = (props: headerProps) => {
  return (
    <View style={styles.container}>
      <Image />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "pink",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Header;
