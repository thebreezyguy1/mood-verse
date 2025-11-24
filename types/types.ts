export interface Verse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface Bookmark {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
  date: string;
}

export interface DailyVerse extends Verse {
  title: string;
}
