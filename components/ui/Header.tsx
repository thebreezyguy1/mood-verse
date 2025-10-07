import { Image, StyleSheet, Text, View } from "react-native";

type headerProps = {
  title: string;
};

const Header = (props: headerProps) => {
  return (
    <View style={styles.container}>
      <Image />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>{props.title}</Text>
      <View>
        <Image />
        <Text>{new Date().toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "pink",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 5,
  },
});

export default Header;
