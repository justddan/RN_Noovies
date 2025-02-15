import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Movies = ({ navigation: { navigate } }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Movies</Text>
      <TouchableOpacity
        onPress={() => navigate("Stack", { screen: "ScreenOne" })}
      >
        <Text>Go to Stack</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Movies;
