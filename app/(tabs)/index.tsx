import { ALL_VERSES } from "@/assets/data/kjv";
import HomeCard from "@/components/home-components/HomeCard";
import Header from "@/components/ui/Header";
import { DailyVerse } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

// const daily_verses = [
//   {
//     title: "Verse of the day",
//     verseText:
//       '"Ne te poste pas au carrefour pour exterminer ses fuyards et ne livre pas ses rescapes le jour de la detresse!"',
//     verse: "Abdias 1:14",
//   },
//   {
//     title: "Gospel of the day",
//     verseText:
//       '"Ainsi fut accompli ce que dit l\'Ecriture: Il a été compté parmi les criminels."',
//     verse: "Marc 15:28",
//   },
//   {
//     title: "Psalm of the day",
//     verseText: `\"Que la ruine les atteigne à l’improviste, qu’ils soient pris dans le piège qu’ils ont tendu, qu’ils y tombent pour leur ruine!\"`,
//     verse: "Psaumes 35:8",
//   },
// ];

const STORAGE_KEYS = {
  LAST_PICK_DATE: "@MoodVerse:lastPickDate",
  DAILY_VERSE: "@MoodVerse:verse",
  GOSPEL_VERSE: "@MoodVerse:gospel",
  PSALM_VERSE: "@MoodVerse:psalm",
};

export default function homeScreen() {
  const [dailyVerses, setDailyVerses] = useState<DailyVerse[]>([]);

  const getRandomVerse = () => {
    return ALL_VERSES[Math.floor(Math.random() * ALL_VERSES.length)];
  };

  const getGospelVerse = () => {
    const gospels = ["Mathew", "Mark", "Luke", "John"];
    const gospelVerses = ALL_VERSES.filter((verse) =>
      gospels.includes(verse.book_name)
    );
    return gospelVerses[Math.floor(Math.random() * gospelVerses.length)];
  };

  const getPsalmVerse = () => {
    const psalmVerses = ALL_VERSES.filter(
      (verse) => verse.book_name == "Psalms"
    );
    console.log(psalmVerses);

    return psalmVerses[Math.floor(Math.random() * psalmVerses.length)];
  };

  const getDailyVerse = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const lastPickDate = await AsyncStorage.getItem(
        STORAGE_KEYS.LAST_PICK_DATE
      );
      const storedVerseStr = await AsyncStorage.getItem(
        STORAGE_KEYS.DAILY_VERSE
      );
      const storedGospelStr = await AsyncStorage.getItem(
        STORAGE_KEYS.GOSPEL_VERSE
      );
      const storedPsalmStr = await AsyncStorage.getItem(
        STORAGE_KEYS.PSALM_VERSE
      );

      let verseObj: any = null;
      let gospelObj: any = null;
      let psalmObj: any = null;

      if (
        lastPickDate === today &&
        storedVerseStr != null &&
        storedGospelStr != null &&
        storedPsalmStr != null
      ) {
        // parse previously stored JSON strings
        verseObj = JSON.parse(storedVerseStr);
        gospelObj = JSON.parse(storedGospelStr);
        psalmObj = JSON.parse(storedPsalmStr);
        console.log(`Using stored verse for ${today}`);
      } else {
        // pick new verses and store them as JSON strings
        verseObj = getRandomVerse();
        gospelObj = getGospelVerse();
        psalmObj = getPsalmVerse();
        await AsyncStorage.setItem(
          STORAGE_KEYS.DAILY_VERSE,
          JSON.stringify(verseObj)
        );
        await AsyncStorage.setItem(
          STORAGE_KEYS.GOSPEL_VERSE,
          JSON.stringify(gospelObj)
        );
        await AsyncStorage.setItem(
          STORAGE_KEYS.PSALM_VERSE,
          JSON.stringify(psalmObj)
        );
        await AsyncStorage.setItem(STORAGE_KEYS.LAST_PICK_DATE, today);
        console.log(`New verse picked for ${today}`);
      }

      const newDailyVerse: DailyVerse = {
        ...verseObj,
        title: "Verse of the day",
      };

      const newGospelVerse: DailyVerse = {
        ...gospelObj,
        title: "Gospel of the day",
      };

      const newPsalmVerse: DailyVerse = {
        ...psalmObj,
        title: "Psalm of the day",
      };

      setDailyVerses([newDailyVerse, newGospelVerse, newPsalmVerse]);
    } catch (error) {
      console.error("Error fetching daily verse:", error);
    }
  };

  useEffect(() => {
    getDailyVerse();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "pink" }}>
      <Header title="Daily Verse" />
      <View style={styles.container}>
        {dailyVerses &&
          dailyVerses.map((data, key) => {
            return (
              <HomeCard
                key={key}
                book_name={data.book_name}
                book={data.book}
                chapter={data.chapter}
                verse={data.verse}
                title={data.title}
                text={data.text}
              />
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flex: 1,
    padding: 20,
  },
});
