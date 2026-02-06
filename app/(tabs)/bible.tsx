import Header from "@/components/ui/Header";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { newTestamentBooks, oldTestamentBooks } from "../../assets/data/kjv";

const BibleBookItem = ({
  book,
  onPress,
}: {
  book: any;
  onPress: (book: any) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.bookItem}
      onPress={() => onPress(book)}
      activeOpacity={0.7}
    >
      <Text style={styles.bookName}>{book}</Text>
    </TouchableOpacity>
  );
};

export default function BibleScreen() {
  const [selectedTestament, setSelectedTestament] = useState("OLD");
  const [searchQuery, setSearchQuery] = useState("");
  const OLD_TESTAMENT_BOOKS = oldTestamentBooks;
  const NEW_TESTAMENT_BOOKS = newTestamentBooks;

  const currentBooks =
    selectedTestament === "OLD" ? OLD_TESTAMENT_BOOKS : NEW_TESTAMENT_BOOKS;

  const filteredBooks = currentBooks.filter((book) =>
    book.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleBookPress = (book: string) => {
    console.log("Selected book:", book);
    // Navigate to book detail screen
  };

  return (
    <View style={styles.container}>
      <Header title="Bible" />
      <View style={styles.bibleContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedTestament === "OLD" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedTestament("OLD")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                selectedTestament === "OLD" && styles.toggleTextActive,
              ]}
            >
              OLD TESTAMENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedTestament === "NEW" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedTestament("NEW")}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                selectedTestament === "NEW" && styles.toggleTextActive,
              ]}
            >
              NEW TESTAMENT
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search bible"
            placeholderTextColor={"#B0A99F"}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Book List */}
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <BibleBookItem book={item} onPress={handleBookPress} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F0E8",
    borderRadius: 25,
    padding: 4,
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#2D2D2D",
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2D2D2D",
  },
  toggleTextActive: {
    color: "#ffffff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#2D2D2D",
  },
  bookmarkButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bookmarkIcon: {
    fontSize: 24,
  },
  listContent: {
    paddingBottom: 100,
  },
  bookItem: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  bookName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2D2D2D",
  },
});
