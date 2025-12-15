import { Bookmark, Verse } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert } from "react-native";

interface BookmarksContextType {
  bookmarks: Bookmark[];
  isLoading: boolean;
  addBookmark: (item: Omit<Verse, "id" | "data">) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
  isVerseBookmarked: (id: string) => boolean;
  refreshBookmarks: () => Promise<void>;
}

export const BookmarksContext = createContext<BookmarksContextType | undefined>(
  undefined
);

const BOOKMARKS_STORAGE_KEY = "@MoodVerse:Bookmarks";

const createVerseId = (book: number, chapter: number, verse: number) =>
  `${book}-${chapter}-${verse}`;

export const BookmarksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStoredBookmarks = async (): Promise<Bookmark[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return jsonValue !== null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Error reading storage:", e);
      return [];
    }
  };

  const saveBookmarks = async (currentBookmarks: Bookmark[]) => {
    try {
      const jsonValue = JSON.stringify(currentBookmarks);
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Error saving storage:", e);
    }
  };

  const refreshBookmarks = useCallback(async () => {
    setIsLoading(true);
    const storedBookmarks = await getStoredBookmarks();
    setBookmarks(storedBookmarks);
    setIsLoading(false);
  }, []);

  const addBookmark = useCallback(async (item: Omit<Verse, "id" | "date">) => {
    const id = createVerseId(item.book, item.chapter, item.verse);
    const currentBookmarks = await getStoredBookmarks();

    if (currentBookmarks.some((b) => b.id === id)) {
      Alert.alert("Already Bookmarked", "This verse is already saved!");
      return;
    }

    const newBookmark: Bookmark = {
      ...item,
      title: `${item.book_name}, ${item.chapter}:${item.verse}`,
      id: id,
      date: new Date().toLocaleDateString("en-US"),
    };

    const updatedBookmarks = [newBookmark, ...currentBookmarks];
    setBookmarks(updatedBookmarks);
    await saveBookmarks(updatedBookmarks);
    Alert.alert("Success", "Verse added to bookmarks!");
  }, []);

  const removeBookmark = useCallback(async (id: string) => {
    const currentBookmarks = await getStoredBookmarks();
    const updatedBookmarks = currentBookmarks.filter((b) => b.id !== id);

    setBookmarks(updatedBookmarks);
    await saveBookmarks(updatedBookmarks);
    Alert.alert("Removed", "Verse removed from bookmarks!");
  }, []);

  const isVerseBookmarked = useCallback(
    (id: string) => {
      return bookmarks.some((b) => b.id === id);
    },
    [bookmarks]
  );

  useEffect(() => {
    refreshBookmarks();
  }, [refreshBookmarks]);

  const contextValue: BookmarksContextType = {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    isVerseBookmarked,
    refreshBookmarks,
  };

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a Bookmarks Provider");
  }
  return context;
};
