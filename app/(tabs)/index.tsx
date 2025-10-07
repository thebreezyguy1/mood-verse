import HomeCard from "@/components/home-components/HomeCard";
import Header from "@/components/ui/Header";
import { StyleSheet, View } from "react-native";

const daily_verses = [
  {
    title: "Verse of the day",
    verseText:
      '"Ne te poste pas au carrefour pour exterminer ses fuyards et ne livre pas ses rescapes le jour de la detresse!"',
    verse: "Abdias 1:14",
  },
  {
    title: "Gospel of the day",
    verseText:
      '"Ainsi fut accompli ce que dit l\'Ecriture: Il a été compté parmi les criminels."',
    verse: "Marc 15:28",
  },
  {
    title: "Psalm of the day",
    verseText: `\"Que la ruine les atteigne à l’improviste, qu’ils soient pris dans le piège qu’ils ont tendu, qu’ils y tombent pour leur ruine!\"`,
    verse: "Psaumes 35:8",
  },
];

export default function homeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "pink" }}>
      <Header title="Daily Verse" />
      <View style={styles.container}>
        {daily_verses &&
          daily_verses.map((data, key) => {
            return (
              <HomeCard
                key={key}
                title={data.title}
                verseText={data.verseText}
                verse={data.verse}
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
