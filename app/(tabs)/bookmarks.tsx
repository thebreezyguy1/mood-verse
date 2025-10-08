import Header from "@/components/ui/Header";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type bookmarkProps = {
  verse: string;
  date: string;
  verseText: string;
};

export default function bookmarksScreen() {
  const bookmarks = [
    {
      id: "1",
      verse: "Marc 9:43",
      verseText:
        "Si ta main te pousse à mal agir, coupe-la. Mieux vaut pour toi entrer manchot dans la vie que d'avoir les deux mains et d'aller en enfer, dans le feu qui ne s'éteint pas,",
      date: "2025-01-29 01:01",
    },
    {
      id: "2",
      verse: "Psaumes 71:5",
      verseText:
        "car tu es mon espérance, Seigneur, Eternel, l’objet de ma confiance depuis ma jeunesse.",
      date: "2025-03-16 17:05",
    },
  ];

  const Bookmark = ({ verse, date, verseText }: bookmarkProps) => {
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
          <Pressable>
            <MaterialCommunityIcons name="share" size={20} color="pink" />
          </Pressable>
          <Pressable>
            <MaterialCommunityIcons
              name="content-copy"
              size={20}
              color="pink"
            />
          </Pressable>

          <TouchableOpacity /*onPress={unfavorite}*/>
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
      <View style={styles.bookmarksInnerContainer}>
        <FlatList
          data={bookmarks}
          renderItem={({ item }) => (
            <Bookmark
              verse={item.verse}
              date={item.date}
              verseText={item.verseText}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookmarksContainer: {
    flex: 1,
    backgroundColor: "pink",
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
});
