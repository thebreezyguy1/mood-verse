import SearchFilterModal from "@/components/SearchFilterModal";
import SortFilterModal from "@/components/SortFilterModal";
import Header from "@/components/ui/Header";
import { useBookmarks } from "@/context/BookmarksContext";
import { Bookmark } from "@/types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as Clipboard from "expo-clipboard";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type bookmarkProps = {
  verse: string;
  date: string;
  verseText: string;
  itemId: string;
};

export type FilterType = "text" | "title";
export type SortFilterType = "asc" | "desc";

export default function bookmarksScreen() {
  const { bookmarks, isLoading, removeBookmark, refreshBookmarks } =
    useBookmarks();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isSortFilterModalVisible, setIsSortFilterModalVisible] =
    useState(false);
  const [activeFilterType, setActiveFilterType] = useState<FilterType>("text");
  const [activeSortFilterType, setActiveSortFilterType] =
    useState<SortFilterType>("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const getFilteredBookmarks = () => {
    if (!searchTerm) {
      return bookmarks;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();

    return bookmarks.filter((bookmark) => {
      const targetString =
        activeFilterType == "text" ? bookmark.text : bookmark.title;
      return targetString.toLowerCase().includes(lowerCaseSearch);
    });
  };

  const getSortedBookmarks = (filteredBookmarks: Bookmark[]) => {
    const sortableBookmarks = [...filteredBookmarks];
    return sortableBookmarks.sort((a, b) => {
      const dateA = new Date(a.date.replaceAll("/", "-"));
      const dateB = new Date(b.date.replaceAll("/", "-"));

      if (activeSortFilterType === "asc") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime();
      }
    });
  };

  const filteredAndSortedBookmarks = () => {
    const filteredData = getFilteredBookmarks();
    return getSortedBookmarks(filteredData);
  };

  const filteredAndSortedData = filteredAndSortedBookmarks();

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

  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert("Copied!", "Verse copied to clipboard!");
    } catch (err) {
      Alert.alert("Copy failed", "Unable to copy verse to clipboard:");
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

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
  };

  useFocusEffect(
    useCallback(() => {
      refreshBookmarks();
    }, [refreshBookmarks])
  );

  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const openSortFilterModal = () => {
    setIsSortFilterModalVisible(true);
  };

  const handleFilterSelect = (filterType: FilterType) => {
    setActiveFilterType(filterType);
  };

  const handleSortFilterSelect = (sortFilterType: SortFilterType) => {
    setActiveSortFilterType(sortFilterType);
  };

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

          <TouchableOpacity onPress={() => handleRemoveBookmark(itemId)}>
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
            <>
              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search a bookmark..."
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />
                <Pressable onPress={openFilterModal}>
                  <FontAwesome name="filter" size={18} color="#c2c2c2" />
                </Pressable>
                <Pressable onPress={openSortFilterModal}>
                  <MaterialCommunityIcons
                    name="sort-calendar-ascending"
                    size={20}
                    color="#c2c2c2"
                  />
                </Pressable>
              </View>
              {filteredAndSortedData.length > 0 ? (
                <>
                  <FlatList
                    data={filteredAndSortedData}
                    renderItem={({ item }) => (
                      <Bookmark
                        verse={item.title}
                        date={item.date}
                        verseText={item.text}
                        itemId={item.id}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                  />
                  <SearchFilterModal
                    isVisible={isFilterModalVisible}
                    onClose={() => setIsFilterModalVisible(false)}
                    onApplyFilter={handleFilterSelect}
                    currentFilter={activeFilterType}
                  />
                  <SortFilterModal
                    isVisible={isSortFilterModalVisible}
                    onClose={() => setIsSortFilterModalVisible(false)}
                    onApplyFilter={handleSortFilterSelect}
                    currentFilter={activeSortFilterType}
                  />
                </>
              ) : (
                <Text>No Bookmarks</Text>
              )}
            </>
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
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: "#c2c2c2",
  },
});
