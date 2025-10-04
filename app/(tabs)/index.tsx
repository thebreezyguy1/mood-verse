import HomeCard from "@/components/home-components/home-card";
import { StyleSheet, View } from "react-native";

const daily_verses = [
  {
    title: "Verse of the day",
    verseText:
      "Ne te poste pas au carrefour pour exterminer ses fuyards et ne livre pas ses rescapes le jour de la detresse!",
    verse: "Abdias 1:14",
  },
  {
    title: "Gospel of the day",
    verseText:
      "Ainsi fut accompli ce que dit l'Ecriture: Il a été compté parmi les criminels.",
    verse: "Marc 15:28",
  },
  {
    title: "Psalm of the day",
    verseText: `Que la ruine les atteigne à l’improviste, qu’ils soient pris dans le piège qu’ils ont tendu, qu’ils y tombent pour leur ruine!`,
    verse: "Psaumes 35:8",
  },
];

export default function homeScreen() {
  return (
    <View style={styles.container}>
      {daily_verses &&
        daily_verses.map((data, key) => {
          return (
            <HomeCard
              title={data.title}
              verseText={data.verseText}
              verse={data.verse}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
    flex: 1,
    padding: 20,
  },
});
