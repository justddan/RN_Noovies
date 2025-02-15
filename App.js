import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import { View, StyleSheet, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tab";
import Stack from "./navigation/Stack";

SplashScreen.preventAutoHideAsync();

// const loadFonts = (fonts) => {
//   return fonts.map((font) => Font.loadAsync(font));
// };

// const loadImages = (images) => {
//   return images.map((image) => {
//     if (typeof image === "string") {
//       return Image.prefetch(image);
//     } else {
//       return Asset.loadAsync(image);
//     }
//   });
// };

export default function App() {
  // const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // pre-load fonts, call APIs, etc
  //       // 강의의 startLoading과 동일하게 동작
  //       const fonts = loadFonts([Ionicons.font]);
  //       const images = loadAssets([
  //         require("./my-face.jpeg"),
  //         "https://picsum.photos/200/300",
  //       ]);
  //       await Promise.all([...fonts, ...images]);
  //     } catch (error) {
  //       // 강의의 onError와 동일하게 동작
  //       console.warn(error);
  //     } finally {
  //       // 강의의 onFinish와 동일하게 동작
  //       setReady(true);
  //     }
  //   }

  //   prepare();
  // }, []);

  const isDark = useColorScheme() === "dark";

  const [fontsLoaded] = useFonts(Ionicons.font);

  const [assets] = useAssets([require("./my-face.jpeg")]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <NavigationContainer
      onReady={onLayoutRootView}
      // theme={isDark ? DarkTheme : DefaultTheme}
    >
      {/* <Tabs /> */}
      <Stack />
    </NavigationContainer>
  );
}
