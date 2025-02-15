import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // pre-load fonts, call APIs, etc
        // 강의의 startLoading과 동일하게 동작
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require("./my-face.jpeg"));
      } catch (error) {
        // 강의의 onError와 동일하게 동작
        console.warn(error);
      } finally {
        // 강의의 onFinish와 동일하게 동작
        setReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done Loading !</Text>
    </View>
  );
}
