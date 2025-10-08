import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type homeCardProps = {
  title: string;
  verse: string;
  verseText: string;
};

const HomeCard = (props: homeCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.verse}</Text>
        </View>
        <Text style={{ fontStyle: "italic", marginBottom: 5, fontSize: 13 }}>
          {props.verseText}
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable>
          <MaterialCommunityIcons name="share" size={20} color="black" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="content-copy" size={20} color="black" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="bookmark" size={20} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "pink",
    padding: 10,
    backgroundColor: "pink",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  content: {
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "700",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
