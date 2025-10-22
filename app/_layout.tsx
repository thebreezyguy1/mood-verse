import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <StatusBar style="light" backgroundColor="#FF69B4" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="profile"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </View>
  );
}
