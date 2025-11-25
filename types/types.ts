export interface Verse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface Bookmark extends Verse {
  id: string;
  date: string;
}

export interface DailyVerse extends Verse {
  title: string;
}
