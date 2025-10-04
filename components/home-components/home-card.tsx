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
        <Text>{props.title}</Text>
        <Text>{props.verseText}</Text>
        <Text>{props.verse}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable>
          <MaterialCommunityIcons name="share" size={24} color="black" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="content-copy" size={24} color="black" />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons name="bookmark" size={24} color="black" />
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
    padding: 10,
  },
  content: {
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
