import { Tabs } from "expo-router";
import React from "react";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ tabBarActiveTintColor: "teal" }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="home" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons name="chat" size={size} color={color} />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: "Bookmarks",
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
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="tools"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs>
    </React.Fragment>
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
