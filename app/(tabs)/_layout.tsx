import { Tabs } from "expo-router";
import React from "react";

import { BookmarksProvider } from "@/context/BookmarksContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <BookmarksProvider>
      <SafeAreaView
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "pink" }}
      >
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#FFC0CB",
            tabBarInactiveTintColor: "#c2c2c2",
            tabBarStyle: {
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderTopColor: "#fff",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: false,

              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="home"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: "Chat",
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="chat"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tabs.Screen
            name="bookmarks"
            options={{
              title: "Bookmarks",
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="bookmark"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tabs.Screen
            name="bible"
            options={{
              title: "Bible",
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                return (
                  <FontAwesome5 name="book-open" size={size} color={color} />
                );
              },
            }}
          />
        </Tabs>
      </SafeAreaView>
    </BookmarksProvider>
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
    //     headerShown: false,
    //     tabBarButton: HapticTab,
    //   }}>
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: 'Home',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="explore"
    //     options={{
    //       title: 'Explore',
    //       tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
    //     }}
    //   />
    // </Tabs>
  );
}
