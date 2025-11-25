import { Bookmark, DailyVerse } from "@/types/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, Share, StyleSheet, Text, View } from "react-native";

const HomeCard = ({
  book_name,
  book,
  chapter,
  verse,
  title,
  text,
}: DailyVerse) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const BOOKMARKS_STORAGE_KEY = "@MoodVerse:Bookmarks";

  const getVerseId = () => {
    return `${book_name}-${chapter}-${verse}`;
  };

  const getBookmarks = async (): Promise<Bookmark[]> => {
    const jsonValue = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  };

  const saveBookmarks = async (currentBookmarks: Bookmark[]) => {
    const jsonValue = JSON.stringify(currentBookmarks);
    await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue);
  };

  const addBookmark = async () => {
    const currentBookmarks = await getBookmarks();
    const id = getVerseId();

    if (currentBookmarks.some((b) => b.id === id)) {
      Alert.alert("Already Bookmarked", "This verse is already bookmarked.");
      return;
    }

    const newBookmark: Bookmark = {
      id: id,
      date: new Date().toISOString(),
      book_name: book_name,
      book: book,
      chapter: chapter,
      verse: verse,
      text: text,
    };
    const updatedBookmarks = [newBookmark, ...currentBookmarks];
    await saveBookmarks(updatedBookmarks);
    setIsBookmarked(true);
    Alert.alert("Success", "Verse added to bookmarks!");
  };

  const removeBookmark = async () => {
    try {
      const currentBookmarks = await getBookmarks();
      const id = getVerseId();

      const updatedBookmarks = currentBookmarks.filter((b) => b.id !== id);
      await saveBookmarks(updatedBookmarks);
      setIsBookmarked(false);
      Alert.alert("Removed", "Verse removed from bookmarks!");
    } catch (e) {
      console.error("Failed to remove bookmark:", e);
      Alert.alert("Error", "Could not remove bookmark.");
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

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const bookmarks = await getBookmarks();
        const id = getVerseId();
        const isMarked = bookmarks.some((b) => b.id === id);
        setIsBookmarked(isMarked);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };
    checkBookmarkStatus();
  }, [book_name, chapter, verse]);

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
        <Pressable onPress={isBookmarked ? removeBookmark : addBookmark}>
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
