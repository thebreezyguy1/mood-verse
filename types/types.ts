export interface Verse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface DailyVerse extends Verse {
  title: string;
}

export interface Bookmark extends DailyVerse {
  id: string;
  date: string;
}
