import { useBookmarks } from "@/context/BookmarksContext";
import { DailyVerse } from "@/types/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import React from "react";
import { Alert, Pressable, Share, StyleSheet, Text, View } from "react-native";

const HomeCard = ({
  book_name,
  book,
  chapter,
  verse,
  title,
  text,
}: DailyVerse) => {
  const { isVerseBookmarked, addBookmark, removeBookmark } = useBookmarks();

  const verseId = `${book}-${chapter}-${verse}`;
  const isBookmarked = isVerseBookmarked(verseId);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(verseId);
    } else {
      const item: DailyVerse = {
        book_name: book_name,
        book: book,
        chapter: chapter,
        verse: verse,
        title: title,
        text: text,
      };
      addBookmark(item);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert("Copied!", "Verse copied to clipboard!");
    } catch (err) {
      Alert.alert("Copy failed", "Unable to copy verse to clipboard.");
    }
  };

  const handleShare = async (message: string) => {
    try {
      await Share.share({
        title: "My Daily Verse",
        message: message,
      });
    } catch (error: any) {
      Alert.alert("Share Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text>{`${book_name}, ${chapter}: ${verse}`}</Text>
        </View>
        <Text style={{ fontStyle: "italic", marginBottom: 5, fontSize: 13 }}>
          {text}
        </Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          onPress={() =>
            handleShare(`${book_name}, ${chapter}: ${verse} - ${text}`)
          }
        >
          <MaterialCommunityIcons name="share" size={20} color="black" />
        </Pressable>
        <Pressable
          onPress={() =>
            handleCopy(`${book_name}, ${chapter}: ${verse} - ${text}`)
          }
        >
          <MaterialCommunityIcons name="content-copy" size={20} color="black" />
        </Pressable>
        <Pressable onPress={handleBookmarkToggle}>
          <MaterialCommunityIcons
            name={isBookmarked ? "bookmark-off" : "bookmark"}
            size={20}
            color="black"
          />
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
