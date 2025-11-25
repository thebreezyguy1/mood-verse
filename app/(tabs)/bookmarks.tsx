import Header from "@/components/ui/Header";
import { Bookmark } from "@/types/types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type bookmarkProps = {
  verse: string;
  date: string;
  verseText: string;
  itemId: string;
};

export default function bookmarksScreen() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const bookmarks = [
  //   {
  //     id: "1",
  //     verse: "Marc 9:43",
  //     verseText:
  //       "Si ta main te pousse à mal agir, coupe-la. Mieux vaut pour toi entrer manchot dans la vie que d'avoir les deux mains et d'aller en enfer, dans le feu qui ne s'éteint pas,",
  //     date: "2025-01-29 01:01",
  //   },
  //   {
  //     id: "2",
  //     verse: "Psaumes 71:5",
  //     verseText:
  //       "car tu es mon espérance, Seigneur, Eternel, l’objet de ma confiance depuis ma jeunesse.",
  //     date: "2025-03-16 17:05",
  //   },
  // ];

  const BOOKMARKS_STORAGE_KEY = "@MoodVerse:Bookmarks";

  const getBookmarks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (jsonValue !== null) {
        setBookmarks(JSON.parse(jsonValue));
      } else {
        setBookmarks([]);
      }
    } catch (e) {
      console.error("Error loading bookmarks:", e);
      Alert.alert("Error", "Could not load saved bookmarks.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmarks = async (currentBookmarks: Bookmark[]) => {
    try {
      const jsonValue = JSON.stringify(currentBookmarks);
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving bookmarks:", e);
    }
  };

  const removeBookmark = async (id: string) => {
    const updatedBookmarks = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updatedBookmarks);
    saveBookmarks(updatedBookmarks);
    Alert.alert("Removed", "Bookmark successfully removed.");
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
    getBookmarks();
  }, []);

  // const STORAGE_KEYS = {
  //   bookmarks: "@MoodVerse:bookmarks",
  // };

  // const getBookmarks = async () => {
  //   try {
  //     const storedbookmarks = await AsyncStorage.getItem(
  //       STORAGE_KEYS.bookmarks
  //     );
  //     let bookmarkObj: any = null
  //     bookmarkObj.
  //   } catch (error) {}
  // };

  const Bookmark = ({ verse, date, verseText, itemId }: bookmarkProps) => {
    return (
      <View style={styles.bookmarkContainer}>
        <View style={styles.bookmarkHeader}>
          <Text style={styles.verse}>{verse}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View>
          <Text>{verseText}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable onPress={() => handleShare(`${verse} - ${verseText}`)}>
            <MaterialCommunityIcons name="share" size={20} color="pink" />
          </Pressable>
          <Pressable onPress={() => handleCopy(`${verse} - ${verseText}`)}>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color="pink"
            />
          </Pressable>

          <TouchableOpacity onPress={() => removeBookmark(itemId)}>
            <MaterialCommunityIcons
              name="bookmark-off"
              size={20}
              color="pink"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.bookmarksContainer}>
      <Header title="Bookmarks" />
      {/* Add search bar and filter drop-down box */}
      {isLoading ? (
        <Text style={styles.loadingText}>Loading bookmarks...</Text>
      ) : (
        <View style={styles.bookmarksInnerContainer}>
          {bookmarks.length > 0 ? (
            <FlatList
              data={bookmarks}
              renderItem={({ item }) => (
                <Bookmark
                  verse={`${item.book_name}, ${item.chapter}: ${item.verse}`}
                  date={item.date}
                  verseText={item.text}
                  itemId={item.id}
                />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <View style={styles.bookmarksEmptyContainer}>
              <MaterialCommunityIcons
                style={styles.bookmarkLogo}
                name="bookmark"
                size={60}
                color="pink"
              />
              <Text style={styles.emptyBookmarkTitle}>
                No bookmarks added yet
              </Text>
              <Text style={{ textAlign: "center", paddingHorizontal: 20 }}>
                Save verses that are meaningful to you by tapping the bookmark
                icon
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bookmarksContainer: {
    flex: 1,
    backgroundColor: "pink",
  },
  bookmarksEmptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  bookmarkLogo: {
    borderRadius: 50,
    borderWidth: 2,
    padding: 5,
    borderColor: "pink",
  },
  emptyBookmarkTitle: {
    fontSize: 20,
    fontWeight: 500,
  },
  bookmarksInnerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  listContainer: {
    margin: 5,
    marginHorizontal: 20,
  },
  bookmarkContainer: {
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "pink",
  },
  bookmarkHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  date: {
    fontSize: 10,
    color: "pink",
    fontWeight: "700",
  },
  verse: {
    color: "pink",
    fontWeight: "700",
    fontSize: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
    marginTop: 5,
  },
  loadingText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#888",
  },
});
