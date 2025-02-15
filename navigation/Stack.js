import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Text>ScreenOne</Text>
      <TouchableOpacity onPress={() => navigate("ScreenTwo")}>
        <Text>Go to ScreenTwo</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Text>ScreenTwo</Text>
      <TouchableOpacity onPress={() => navigate("ScreenThree")}>
        <Text>Go to ScreenThree</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScreenThree = ({ navigation: { goBack, setOptions } }) => {
  return (
    <View>
      <Text>ScreenThree</Text>
      <TouchableOpacity onPress={() => setOptions({ title: "Three" })}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  );
};

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="ScreenOne" component={ScreenOne} />
      <NativeStack.Screen name="ScreenTwo" component={ScreenTwo} />
      <NativeStack.Screen name="ScreenThree" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
