import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export const unstable_settings = {
  initialRouteName: "profile",
};

export default function ProfileLayout() {
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <Stack />
    </React.Fragment>
  );
}
