import Header from "@/components/ui/Header";
import { StyleSheet, Text, View } from "react-native";

export default function BibleScreen() {
  return (
    <View style={styles.container}>
      <Header title="Bible" />
      <View style={styles.bibleContainer}>
        <Text>Coming Soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
  bibleContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
